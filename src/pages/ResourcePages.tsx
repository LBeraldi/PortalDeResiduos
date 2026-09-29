import { PageHero } from '../components/PageHero'
import type { Crumb } from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Eyebrow'
import { ArrowRight, BarChart3, BookOpen, ExternalLink, FileArchive, FileText, Gauge, HandHeart, Laptop, Recycle, Search, Users } from 'lucide-react'
import { Link } from '../components/router'
import { DocumentRow } from '../components/DocumentRow'
import { documents } from '../data/documents'
import { documentSizes } from '../data/document-sizes.generated'
import { useRef, useState } from 'react'
import { cityRecords, normalizeName } from '../data/cities'
import type { DocumentType, PortalDocument } from '../data/documents'
import { selectiveCollectionPlans } from '../data/selective-collection-plans.generated'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

function ResourceHero({ eyebrow, title, description, crumbs }: { eyebrow: string; title: string; description: string; crumbs?: Crumb[] }) { return <PageHero eyebrow={eyebrow} title={title} description={description} crumbs={crumbs} /> }

function ToolPanel({ icon, eyebrow, title, text, href, label }: { icon: React.ReactNode; eyebrow: string; title: string; text: string; href: string; label: string }) {
  return <article className="tool-panel"><div className="tool-panel-icon">{icon}</div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p><a className="button button-primary" href={href} target="_blank" rel="noreferrer">{label} <ExternalLink size={15} /></a></article>
}

export function Cooperatives() {
  return <><ResourceHero eyebrow="Inclusão e cidadania" title="Cooperativas" description="Materiais para apoiar a organização, a formalização e o reconhecimento do trabalho dos catadores." crumbs={[{ label: 'Início', href: '/' }, { label: 'Cooperativas' }]} /><section className="resource-section section container"><div className="resource-intro"><div><Eyebrow>Fortalecer a reciclagem</Eyebrow><h2>Quem faz a transformação acontecer.</h2></div><p>As cooperativas e associações de catadores exercem um papel ambiental, econômico e social essencial. Esta área reúne referências para facilitar o acesso a informações e documentos de apoio.</p></div><div className="resource-stats"><div><Users size={21} /><strong>Trabalho reconhecido</strong><span>Organização e inclusão socioprodutiva.</span></div><div><Recycle size={21} /><strong>Materiais recuperados</strong><span>Mais reciclagem e menos rejeitos.</span></div><div><HandHeart size={21} /><strong>Cooperação</strong><span>Instituições trabalhando em rede.</span></div></div><h2 className="resource-list-title">Materiais disponíveis</h2><div className="document-list">{documents.filter((doc) => doc.context === '/cooperativas/').map((doc) => <DocumentRow key={doc.href} title={doc.title} type={doc.type} description={doc.description} href={doc.href} format={doc.format} sizeBytes={documentSizes[doc.href]} origin="local" cover={doc.cover} />)}</div></section></>
}

type Grupo = { id: string; label: string; tipos: DocumentType[] }

// Tipos agrupados como na proposta da página Documentos (10-navegacao.md).
const GRUPOS: Grupo[] = [
  { id: 'todos', label: 'Todos', tipos: [] },
  { id: 'notas', label: 'Notas técnicas', tipos: ['Nota técnica'] },
  { id: 'artigos', label: 'Artigos e revista', tipos: ['Artigo', 'Revista'] },
  { id: 'estudos', label: 'Estudos', tipos: ['Estudo'] },
  { id: 'cartilhas', label: 'Cartilhas', tipos: ['Cartilha'] },
  { id: 'modelos', label: 'Modelos editáveis', tipos: ['Modelo editável'] },
]
const noGrupo = (doc: PortalDocument, grupo: Grupo) => grupo.tipos.length === 0 || grupo.tipos.includes(doc.type)

/** Documentos (/publicacoes/ e /documentos/): a lista única do acervo não municipal, com filtro e busca. */
export function PublicationsPage({ navigate: _navigate }: { navigate: Navigate }) {
  const [grupoId, setGrupoId] = useState('todos')
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const grupo = GRUPOS.find((item) => item.id === grupoId) ?? GRUPOS[0]
  const termo = normalizeName(query.trim())
  const visiveis = documents.filter((doc) => noGrupo(doc, grupo) && normalizeName(`${doc.title} ${doc.type} ${doc.description}`).includes(termo))
  const limpar = () => { setQuery(''); inputRef.current?.focus() }
  return <><ResourceHero eyebrow="Biblioteca do projeto" title="Documentos" description="Estudos, artigos, notas técnicas e materiais de referência para apoiar decisões sobre resíduos sólidos." crumbs={[{ label: 'Início', href: '/' }, { label: 'Documentos' }]} />
    <section className="section container document-library" aria-label="Lista de documentos">
      <div className="municipality-index-tools">
        <label className="search-field"><Search size={17} aria-hidden="true" /><span className="sr-only">Buscar no acervo</span><input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Título ou tema" /></label>
        <div className="segmented" role="group" aria-label="Filtrar por tipo">
          {GRUPOS.map((item) => <button key={item.id} type="button" aria-pressed={grupoId === item.id} onClick={() => setGrupoId(item.id)}>{item.label} <span className="segmented-count">{documents.filter((doc) => noGrupo(doc, item)).length}</span></button>)}
        </div>
      </div>
      <p className="municipality-index-count" aria-live="polite">{visiveis.length} {visiveis.length === 1 ? 'documento' : 'documentos'}{termo ? <> para “{query.trim()}”</> : null}</p>
      {visiveis.length === 0
        ? <div className="municipality-index-empty"><p>Nenhum documento encontrado para “{query}”.</p><button type="button" className="button button-ghost" onClick={limpar}>Limpar busca</button></div>
        : <div className="document-list">{visiveis.map((doc) => <DocumentRow key={doc.href} title={doc.title} type={doc.type} description={doc.description} href={doc.href} format={doc.format} sizeBytes={documentSizes[doc.href]} origin="local" cover={doc.cover} />)}</div>}
      <div className="document-library-note"><Eyebrow>Por município</Eyebrow><p>{cityRecords.length} panoramas e os planos de coleta seletiva de {selectiveCollectionPlans.length} municípios.</p><Link to="/cidades/" className="text-link">Ir para Municípios <ArrowRight size={15} /></Link></div>
    </section></>
}

export function TechnicalNote() {
  const href = `${ASSET}2025/12/NOTA_TECNICA_-_Catadores__revisada.pdf`
  return <><ResourceHero eyebrow="Documento técnico" title="Nota Técnica" description="Catadores de materiais recicláveis: referências para reconhecimento, inclusão e fortalecimento da cadeia da reciclagem." crumbs={[{ label: 'Início', href: '/' }, { label: 'Publicações', href: '/publicacoes/' }, { label: 'Nota Técnica' }]} /><section className="resource-section section container"><div className="document-feature"><div className="document-cover"><img src={`${ASSET}2025/12/NOTA_TECNICA_-_Catadores__revisada-pdf-1024x1024.jpg`} alt="Capa da Nota Técnica sobre catadores" /></div><article className="prose"><Eyebrow>Leitura recomendada</Eyebrow><h2>Uma referência para políticas mais inclusivas.</h2><p>Esta nota técnica integra o conjunto de materiais do Projeto Valoriza e reúne fundamentos para compreender o papel dos catadores de materiais recicláveis e as condições necessárias para sua inclusão social e produtiva.</p><p>O documento pode apoiar gestores públicos, instituições, cooperativas e demais parceiros na construção de soluções que reconheçam o trabalho realizado e fortaleçam a reciclagem.</p><a className="button button-dark" href={href} target="_blank" rel="noreferrer">Abrir nota técnica <FileText size={16} /></a></article></div></section><section className="resource-band resource-band-dark"><div className="container band-content"><Eyebrow>Conteúdo relacionado</Eyebrow><h2>Conheça o Projeto Valoriza.</h2><p>Uma iniciativa para dar visibilidade aos catadores e aproximar instituições, cooperativas e políticas públicas.</p><Link to="/projeto-valoriza/" className="button button-primary">Acessar projeto <ArrowRight size={16} /></Link></div></section></>
}

export function DecisionSupport({ navigate }: { navigate: Navigate }) {
  return <><ResourceHero eyebrow="Ferramenta digital" title="Apoio a Decisão" description="Sistemas, indicadores e referências para qualificar o gerenciamento de resíduos sólidos." crumbs={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio', href: '/producoes-do-convenio/' }, { label: 'Apoio a Decisão' }]} /><section className="resource-section section container"><div className="tool-grid"><ToolPanel icon={<Gauge />} eyebrow="Sistema GRS" title="Dados para decidir com mais segurança." text="Acesse a aplicação de apoio à decisão e consulte informações que ajudam a analisar cenários, estimativas e alternativas para a gestão de resíduos." href="https://sadgrs.streamlit.app/" label="Abrir sistema GRS" /><article className="tool-context"><Eyebrow>Como usar esta área</Eyebrow><h2>Da informação à decisão.</h2><div className="tool-points"><div><BarChart3 size={20} /><strong>Indicadores</strong><span>Consulte dados que ajudam a comparar situações e prioridades.</span></div><div><BookOpen size={20} /><strong>Orientação</strong><span>Use o guia do usuário para navegar pelo sistema.</span></div><div><Laptop size={20} /><strong>Acesso externo</strong><span>A aplicação abre em uma nova aba e depende de conexão com a internet.</span></div></div><Link to="/apoio-a-decisao/guia-do-usuario-do-grs/" className="button button-dark">Ler guia do usuário <ArrowRight size={16} /></Link></article></div></section></>
}

export function UserGuide({ navigate }: { navigate: Navigate }) {
  return <><ResourceHero eyebrow="Apoio ao usuário" title="Guia do usuário do GRS" description="Orientações para acessar e interpretar as informações do sistema de apoio à decisão." crumbs={[{ label: 'Início', href: '/' }, { label: 'Apoio a Decisão', href: '/apoio-a-decisao/' }, { label: 'Guia do usuário do GRS' }]} /><section className="resource-section section container"><div className="guide-layout"><article className="prose"><Eyebrow>Comece por aqui</Eyebrow><h2>Uma leitura rápida para explorar o sistema.</h2><p>O Guia do usuário apresenta a lógica de navegação do GRS, os principais indicadores e o modo de consultar as informações disponíveis para os municípios.</p><div className="guide-steps"><div><span>01</span><strong>Abra o sistema</strong><p>Acesse o GRS pela ferramenta online.</p></div><div><span>02</span><strong>Escolha o recorte</strong><p>Selecione o município ou indicador que deseja analisar.</p></div><div><span>03</span><strong>Interprete os dados</strong><p>Use os resultados como apoio ao planejamento.</p></div></div><a className="button button-primary" href="https://sadgrs.streamlit.app/" target="_blank" rel="noreferrer">Abrir sistema GRS <ExternalLink size={15} /></a></article><aside className="guide-aside"><div className="guide-aside-icon"><FileArchive /></div><h3>Guia em preparação</h3><p>A rota está pronta para receber o arquivo original do WordPress assim que o documento for associado ao upload correto.</p><Link to="/apoio-a-decisao/" className="text-link">Voltar para Apoio a Decisão <ArrowRight size={15} /></Link></aside></div></section></>
}

export function ValorizaHub({ navigate }: { navigate: Navigate }) {
  const powerBiUrl = 'https://app.powerbi.com/view?r=eyJrIjoiNjU5NDU2ZGItNzM0NC00OTk3LWE3NGMtYzM2YTkzZDk3OGVkIiwidCI6IjliNjcxODAyLWJlYTAtNGExMC05ZGU4LTcwMjk0YWNkOWU2OCJ9'
  return <><ResourceHero eyebrow="Inclusão socioprodutiva" title="Projeto Valoriza" description="Catadores no centro de uma cadeia de reciclagem mais justa, reconhecida e sustentável." crumbs={[{ label: 'Início', href: '/' }, { label: 'Projeto Valoriza' }]} /><section className="resource-section section container"><div className="valoriza-feature"><article className="prose"><Eyebrow>Censo de catadores de Mato Grosso do Sul</Eyebrow><h2>Valorizar quem transforma.</h2><p>O Projeto Valoriza reconhece o papel ambiental, econômico e social dos catadores de materiais recicláveis e busca aproximar instituições para construir soluções duradouras.</p><p>Esta área reúne dados, publicações e uma ferramenta de visualização para apoiar o conhecimento sobre a realidade dos catadores em Mato Grosso do Sul.</p><Link to="/nota-tecnica/" className="text-link">Ler a nota técnica <ArrowRight size={15} /></Link></article><div className="valoriza-photo"><img src={`${ASSET}2025/12/cooperativa-reciclagem-maracaju3-e1756383239741-758x568.jpeg`} alt="Cooperativa de reciclagem" /></div></div><div className="dashboard-heading"><Eyebrow>Dados em visualização</Eyebrow><h2>Explore o painel do projeto.</h2><p>O painel é carregado a partir do Power BI e pode levar alguns instantes para aparecer.</p></div><div className="dashboard-frame"><iframe title="Painel Power BI do Projeto Valoriza" src={powerBiUrl} loading="lazy" allowFullScreen /></div></section></>
}
