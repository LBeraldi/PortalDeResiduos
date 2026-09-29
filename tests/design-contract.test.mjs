// Contratos do refinamento de design (docs/design-refactor/).
// Sem dependências; no mesmo estilo de tests/project-contract.test.mjs.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

test('D0.2: check:quality roda o gate de design', () => {
  const scripts = JSON.parse(read('package.json')).scripts
  assert.match(scripts['check:design'], /check-contrast\.mjs/)
  assert.match(scripts['check:design'], /check-design-rules\.mjs/)
  assert.match(scripts['check:quality'], /npm run check:design/)
})

test('D1.1: no celular o logo é recortado na marca do projeto e o botão de menu tem 44 px', () => {
  const css = read('src/styles.css')
  const mobile = [...css.matchAll(/@media \(max-width: 900px\) \{([\s\S]*?)\n\}/g)].map((m) => m[1]).join('\n')
  assert.match(mobile, /\.brand img \{[^}]*object-fit: cover[^}]*object-position: left/)
  assert.match(mobile, /\.menu-toggle \{[^}]*width: 44px[^}]*height: 44px/)
})

test('D1.1: Esc fecha o menu móvel e devolve o foco ao botão', () => {
  const app = read('src/App.tsx')
  assert.match(app, /event\.key !== 'Escape'/)
  assert.match(app, /menuToggleRef\.current\?\.focus\(\)/)
})

test('D1.2: a busca do herói mostra foco e as sugestões têm chave única', () => {
  const home = read('src/components/HomePage.tsx')
  assert.doesNotMatch(home, /key=\{`-`\}/)
  assert.match(home, /key=\{`\$\{entry\.kind\}-\$\{entry\.href\}`\}/)
  const css = read('src/styles.css')
  assert.match(css, /--cerrado-claro: #d4a15f;/)
  assert.match(css, /\.home-hero-search-form:focus-within \{[^}]*outline: 2px solid var\(--cerrado-claro\)/)
})

test('D1.3: a página inicial tem um único h1 fixo, fora do carrossel', () => {
  const home = read('src/components/HomePage.tsx')
  assert.equal((home.match(/<h1[\s>]/g) ?? []).length, 1)
  assert.match(home, /<h1[^>]*>Informação para dar o destino certo\.<\/h1>/)
  assert.doesNotMatch(home, /<h1>\{slide\.title\}<\/h1>/)
})

test('D1.3: destaques trocam a cada 8 s, com pausa e região viva só quando pausado', () => {
  const home = read('src/components/HomePage.tsx')
  assert.match(home, /aria-roledescription="carrossel" aria-label="Destaques"/)
  assert.match(home, /setInterval\([^\n]*, 8000\)/)
  assert.match(home, /"Pausar destaques"/)
  assert.match(home, /"Continuar destaques"/)
  assert.match(home, /className="home-hero-slides" aria-live=\{paused \? "polite" : "off"\}/)
})

test('D1.4: navegação interna usa <Link>, nunca <a href="/…"> nem botão com navigate()', () => {
  const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
  for (const f of walk('src').filter((f) => f.endsWith('.tsx') && !f.endsWith('router.tsx'))) {
    const src = read(f)
    assert.doesNotMatch(src, /<a [^>]*href="\/(?!uploads\/)/, f)
    assert.doesNotMatch(src, /onClick=\{\(\)\s*=>\s*navigate\(/, f)
  }
})

test('D1.5: capa e arquivo mostram as notícias da mais recente para a mais antiga', async () => {
  const { sortByDate } = await import('../src/data/newsDate.ts')
  const datas = [...read('src/pages/NewsPages.tsx').matchAll(/date: '([^']+)'/g)].map((m) => ({ date: m[1] }))
  assert.equal(datas.length, 8)
  const ordem = sortByDate(datas).map((n) => n.date)
  assert.deepEqual(ordem.slice(0, 3), ['20 de dezembro de 2025', '20 de dezembro de 2025', '15 de dezembro de 2021'])
  assert.equal(ordem.at(-1), '25 de outubro de 2021')
  assert.doesNotMatch(read('src/components/HomePage.tsx'), /newsRecords\.slice\(0,\s*3\)/)
  assert.match(read('src/pages/NewsPages.tsx'), /export const newsByDate = sortByDate\(newsRecords\)/)
})

test('D1.6: o rodapé não tem links sociais sem destino e mantém o e-mail', () => {
  const app = read('src/App.tsx')
  assert.doesNotMatch(app, /href="#(facebook|linkedin)"/)
  assert.match(app, /href="mailto:contato@portalresiduosms\.online" aria-label="E-mail"/)
})

test('D1.7: texto cerrado sobre mata usa --cerrado-claro (5,78:1)', () => {
  const css = read('src/styles.css')
  assert.match(css, /\.home-hero-slide-label \{[^}]*color: var\(--cerrado-claro\)/)
  assert.match(css, /\.home-impact-card--change small span \{ color: var\(--cerrado-claro\)/)
})

test('D1.8: o título da aba de ficha e notícia vem dos dados reais', () => {
  const app = read('src/App.tsx')
  assert.match(app, /function pageTitle\(/)
  assert.match(app, /newsRecords\.find\(/)
  assert.match(app, /cityRecords\.find\(/)
  assert.match(app, /const title = pageTitle\(path, routeInfo\)\n\s*document\.title = title \+ ' · Portal Resíduos MS'/)
})

test('D1.9: a busca global não mostra o × nativo do navegador', () => {
  assert.match(read('src/styles.css'), /\.search-input::-webkit-search-cancel-button \{[^}]*display: none/)
})

test('D2.1: tokens da DS-02 em :root e nenhum alias legado', () => {
  const css = read('src/styles.css')
  const root = css.match(/:root\s*\{[^}]*\}/)[0]
  for (const [nome, valor] of Object.entries({
    '--cerrado-texto': '#8a5a1f', '--field-border': '#8a8470', '--positive': '#256b3f', '--positive-bg': '#e4efe6',
    '--warning': '#8a5a1f', '--warning-bg': '#f6ecdc', '--negative': '#a13f22', '--negative-bg': '#f6e4de',
  })) assert.match(root, new RegExp(`${nome}: ${valor};`), nome)
  assert.doesNotMatch(css, /--(green|deep|mint|soft|white|adequado|rejeito)\b/)
})

test('D2.1: foco em mata usa --cerrado-claro e o painel de busca (papel) usa o anel padrão', () => {
  const css = read('src/styles.css')
  assert.doesNotMatch(css, /\.search-panel :focus-visible/)
  assert.match(css, /\.site-footer :focus-visible[^{]*\{ outline-color: var\(--cerrado-claro\)/)
  assert.match(css, /\.search-field:focus-within \{[^}]*outline: 2px solid var\(--cerrado\)/)
  assert.match(css, /\.search-field-row:focus-within \{[^}]*outline: 2px solid var\(--cerrado\)/)
})

test('D2.2: escala tipográfica da DS-05 e mono fora da navegação', () => {
  const css = read('src/styles.css')
  const root = css.match(/:root\s*\{[^}]*\}/)[0]
  assert.match(root, /--step-5: clamp\(2\.25rem, 5vw, 4rem\);/)
  assert.match(root, /--step-4: clamp\(1\.75rem, 3\.4vw, 2\.5rem\);/)
  assert.match(root, /--step-ui: 0\.9375rem;/)
  assert.match(root, /--step-small: 0\.875rem;/)
  const regra = (sel) => css.match(new RegExp(`(?:^|\\n)${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{([^}]*)\\}`))?.[1] ?? ''
  for (const sel of ['.main-nav a', '.territory-cell', '.contact-form label']) {
    assert.doesNotMatch(regra(sel), /font-mono/, sel)
  }
  assert.match(regra('.main-nav a'), /font-size: var\(--step-ui\)/)
  assert.doesNotMatch(css, /\.header-search::before \{[^}]*font-mono/)
})

test('D2.3: Badge, Alert e Field existem com as variantes e ligações da CP-08', () => {
  const badge = read('src/components/Badge.tsx')
  assert.match(badge, /'doc' \| 'positive' \| 'warning' \| 'outline'/)
  const alert = read('src/components/Alert.tsx')
  assert.match(alert, /'warning' \| 'success' \| 'error'/)
  assert.match(alert, /role=\{tone === 'error' \? 'alert' : undefined\}/)
  const field = read('src/components/Field.tsx')
  assert.match(field, /htmlFor=\{id\}/)
  assert.match(field, /'aria-describedby': message \? messageId : undefined/)
  assert.match(field, /'aria-invalid': error \? true : undefined/)
  const css = read('src/styles.css')
  assert.match(css, /\.badge \{[^}]*font-family: var\(--font-mono\)[^}]*border-radius: var\(--radius\)/)
  assert.match(css, /\.alert--error \{[^}]*border-left-color: var\(--negative\)/)
  assert.match(css, /\.field-control \{[^}]*min-height: 44px[^}]*border: 1px solid var\(--field-border\)/)
})

test('D2.4: o catálogo de panoramas grava o tamanho real de cada PDF (ADR-005)', () => {
  const src = read('src/data/panoramas.generated.ts')
  const pares = [...src.matchAll(/"file": "([^"]+)",[\s\S]*?"sizeBytes": (\d+)/g)]
  assert.equal(pares.length, 79)
  for (const [, file, size] of pares) {
    assert.equal(Number(size), fs.statSync(path.join(root, 'public/uploads/2025/03', file)).size, file)
  }
})

test('D2.4: formatSize escreve o tamanho em pt-BR', async () => {
  const { formatSize } = await import('../src/data/fileSize.ts')
  assert.equal(formatSize(3250585), '3,1 MB')
  assert.equal(formatSize(839680), '820 KB')
  assert.equal(formatSize(undefined), '')
})

test('D2.4: DocumentRow abre em nova aba com aviso para leitor de tela e mostra a origem', () => {
  const row = read('src/components/DocumentRow.tsx')
  assert.match(row, /target="_blank" rel="noopener"/)
  assert.match(row, /<span className="sr-only"> \(abre em nova aba\)<\/span>/)
  assert.match(row, /'Arquivo local'/)
  assert.match(row, /'Google Drive'/)
  assert.match(row, /'Abrir no Drive'/)
})

test('D2.5: barra informativa fora do cabeçalho fixo, Cidades no menu e busca fora do <nav>', () => {
  const app = read('src/App.tsx')
  assert.match(app, /<div className="topline">[\s\S]*?Convênio técnico-científico MPMS · UEMS[\s\S]*?<\/div>\s*<header className="site-header">/)
  assert.match(app, /\['Cidades', '\/cidades\/', 'cities'\]/)
  const nav = app.match(/<nav id="main-navigation"[\s\S]*?<\/nav>/)[0]
  assert.doesNotMatch(nav, /SiteSearch/)
  assert.match(read('src/components/SiteSearch.tsx'), /<span className="header-search-label">Buscar<\/span>/)
  assert.match(read('src/styles.css'), /\.header-inner \{[^}]*min-height: 68px/)
})
