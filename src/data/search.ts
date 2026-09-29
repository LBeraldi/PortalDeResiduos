// Índice de busca do portal — montado uma única vez a partir dos dados estáticos
// já presentes no bundle: rotas (siteMap), notícias (NewsPages), municípios
// (cities.ts), documentos do acervo (documents.ts) e dos planos de coleta seletiva.
// Sem dependências novas, sem back-end.

import { siteRoutes } from './siteMap'
import { newsRecords } from '../pages/NewsPages'
import { cityRecords } from './cities'
import { documents } from './documents'
import { selectiveCollectionPlans } from './selective-collection-plans.generated'

export type SearchKind = 'Página' | 'Notícia' | 'Município' | 'Documento'

export type SearchEntry = {
  label: string
  kind: SearchKind
  /** Caminho interno para `navigate()` ou, quando `external`, uma URL completa. */
  href: string
  external?: boolean
  keywords?: string
}

const norm = (value: string): string =>
  value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

// Rotas que não valem como resultado de busca (aliases e páginas de legado do WordPress).
const ROUTE_BLOCKLIST = new Set<string>([
  '/home/',
  "/sobre/",
  '/documentos/',
  '/corumba/',
  '/booking/',
  '/pagina-exemplo/',
  '/educacao-ambiental/planos-de-educacao-ambiental/',
  '/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/',
  '/producoes-do-convenio/materiais-compilados/educacao-ambiental/',
  '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/',
  '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/',
  '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/municipios-contemplados/',
  '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/',
  '/producoes-do-convenio/panorama-e-censo-dos-catadores/',
])

const ROUTE_KEYWORDS: Record<string, string> = {
  "/": "início home portal projeto história convênio mpms uems curupira",
  '/cidades/': 'municípios panorama panoramas municipais território diagnóstico',
  '/publicacoes/': 'biblioteca estudos artigos notas técnicas documentos pdf',
  '/apoio-a-decisao/': 'sistema grs indicadores ferramenta dados streamlit',
  '/cooperativas/': 'catadores reciclagem estatuto cartilha inclusão',
  '/projeto-valoriza/': 'catadores censo inclusão socioprodutiva power bi',
  '/diretorios/': 'municípios pareceres panoramas gestão de resíduos diretório',
  '/logistica-reversa/': 'embalagens sisrev imasul retorno',
  '/materiais-compilados/': 'panoramas planos documentos território',
  '/panorama-e-censo-dos-catadores/': 'catadores censo livro publicação',
  '/nota-tecnica/': 'catadores documento técnico pdf',
  '/educacao-ambiental/': 'planos escolas comunidade conscientização',
  '/diferenca-de-lixao-e-aterro-sanitario/': 'lixão aterro sanitário destinação',
  '/como-separar-corretamente-seu-lixo/': 'coleta seletiva recicláveis orgânicos rejeito',
}

const routeEntries: SearchEntry[] = (() => {
  const seenTitle = new Set<string>()
  const entries: SearchEntry[] = []
  for (const route of siteRoutes) {
    if (ROUTE_BLOCKLIST.has(route.path)) continue
    if (route.kind === 'article' || route.kind === 'cities') continue
    const titleKey = norm(route.title)
    if (seenTitle.has(titleKey)) continue
    seenTitle.add(titleKey)
    entries.push({
      label: route.title,
      kind: 'Página',
      href: route.path,
      keywords: ROUTE_KEYWORDS[route.path],
    })
  }
  return entries
})()

const newsEntries: SearchEntry[] = newsRecords.map((record) => ({
  label: record.title,
  kind: 'Notícia',
  href: `/noticias/${record.slug}/`,
  keywords: `${record.category} ${record.date}`,
}))

const cityEntries: SearchEntry[] = cityRecords.map((city) => ({
  label: city.name,
  kind: 'Município',
  href: `/cidades/${city.slug}/`,
  keywords: 'panorama municipal gestão de resíduos',
}))

// Documentos do acervo (mesma fonte da página Documentos): o resultado abre o arquivo (NAV-6).
const documentEntries: SearchEntry[] = documents.map((doc) => ({
  label: doc.title,
  kind: 'Documento',
  href: doc.href,
  external: true,
  keywords: `${doc.type} ${doc.format} ${doc.description}`,
}))

// Documentos dos planos de coleta seletiva (15 municípios). URL repetida na fonte entra uma vez (a primeira).
const planEntries: SearchEntry[] = []
const planUrls = new Set<string>()
for (const plan of selectiveCollectionPlans) {
  for (const doc of plan.documents) {
    if (planUrls.has(doc.url)) continue
    planUrls.add(doc.url)
    const detalhe = doc.description && doc.description !== `${plan.name.toUpperCase()} - MS` ? ` — ${doc.description}` : ''
    planEntries.push({ label: `${plan.name}: ${doc.title}${detalhe}`, kind: 'Documento', href: doc.url, external: true, keywords: `plano de coleta seletiva ${plan.name}` })
  }
}

export const searchIndex: SearchEntry[] = [
  ...routeEntries,
  ...newsEntries,
  ...cityEntries,
  ...documentEntries,
  ...planEntries,
]

const KIND_WEIGHT: Record<SearchKind, number> = {
  Página: 0.6,
  Município: 0.2,
  Notícia: 0,
  Documento: 0,
}

export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = norm(query)
  if (q.length < 2) return []
  const tokens = q.split(/\s+/).filter(Boolean)

  const scored: Array<{ entry: SearchEntry; score: number }> = []
  for (const entry of searchIndex) {
    const label = norm(entry.label)
    const words = label.split(/\s+/)
    const hay = `${label} ${norm(entry.kind)} ${norm(entry.keywords ?? '')}`

    let score = 0
    let matchedAll = true
    for (const token of tokens) {
      if (label === token) score += 12
      else if (label.startsWith(token)) score += 6
      else if (words.some((w) => w.startsWith(token))) score += 4
      else if (label.includes(token)) score += 2
      else if (hay.includes(token)) score += 1
      else {
        matchedAll = false
        break
      }
    }
    if (!matchedAll) continue
    if (label.startsWith(q)) score += 3
    score += KIND_WEIGHT[entry.kind]
    scored.push({ entry, score })
  }

  scored.sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label, 'pt-BR'))
  return scored.slice(0, limit).map((s) => s.entry)
}
