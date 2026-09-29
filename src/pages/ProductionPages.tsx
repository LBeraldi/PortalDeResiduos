import { PageHero } from '../components/PageHero'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Eyebrow'
import { ArrowRight, BookOpen, FileText, Leaf, MapPin, Recycle, Search, Sprout, Users } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { panoramaRecords } from '../data/panoramas.generated'
import { selectiveCollectionPlans } from "../data/selective-collection-plans.generated"
import { Link } from '../components/router'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

const featuredPanorama = panoramaRecords.find((record) => record.slug === 'dourados') ?? panoramaRecords[0]
const panoramaAsset = (file: string) => `${ASSET}2025/03/${file}`

const municipalities = panoramaRecords

function ProductionHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image?: string }) { return <PageHero eyebrow={eyebrow} title={title} description={description} image={image} /> }

function ProductionCard({ icon, eyebrow, title, text, meta, href, image, navigate }: { icon: ReactNode; eyebrow: string; title: string; text: string; meta: string; href: string; image: string; navigate: Navigate }) {
  return <Link to={href} className="production-card"><div className="production-card-cover"><img src={image} alt="" /><span className="production-card-icon">{icon}</span></div><div className="production-card-body"><span className="doc-type">{eyebrow}</span><h2>{title}</h2><p>{text}</p><span className="production-card-footer"><span>{meta}</span><ArrowRight size={16} /></span></div></Link>
}

function LinkCard({ icon, title, text, href, navigate }: { icon: ReactNode; title: string; text: string; href: string; navigate: Navigate }) {
  return <Link to={href} className="production-link-card"><span className="production-link-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight size={16} /></Link>
}

export function ProductionHub({ navigate }: { navigate: Navigate }) {
  const products = [
    { icon: <BarChartIcon />, eyebrow: 'Sistema digital', title: 'Apoio a decisão', text: 'Ferramentas e indicadores para analisar cenários e qualificar a gestão municipal.', meta: 'Aplicação externa', href: '/apoio-a-decisao/', image: `${ASSET}2023/07/machine-learning.png` },
    { icon: <BookOpen />, eyebrow: 'Biblioteca territorial', title: 'Materiais compilados', text: 'Panoramas, planos e documentos organizados para consulta por tema e município.', meta: 'Documentos e planos', href: '/materiais-compilados/', image: panoramaAsset(featuredPanorama.cover) },
    { icon: <Sprout />, eyebrow: 'Mobilização', title: 'Educação ambiental', text: 'Conteúdos e planos para aproximar informação, escola, comunidade e território.', meta: 'Planos de ação', href: '/educacao-ambiental/', image: `${ASSET}2025/03/Cartilha_compostagem_acelerada-pdf.jpg` },
    { icon: <Users />, eyebrow: 'Inclusão socioprodutiva', title: 'Panorama e censo dos catadores', text: 'Dados e referências para reconhecer o trabalho dos catadores em Mato Grosso do Sul.', meta: 'Publicação em PDF', href: '/panorama-e-censo-dos-catadores/', image: `${ASSET}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final-pdf.jpg` },
  ]
  return <><ProductionHero eyebrow="Produtos do convênio" title="Produções do Convênio" description="Um mapa para encontrar estudos, planos, ferramentas e referências desenvolvidos pelo convênio técnico-científico." image={`${ASSET}2021/07/recicla-2048x1001.png`} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio' }]} /><section className="section container production-overview"><div className="production-heading"><div><Eyebrow>Escolha um caminho</Eyebrow><h2>Conhecimento organizado para <span>virar ação.</span></h2></div><p>As produções estão agrupadas pelo tipo de decisão que ajudam a tomar: planejar, educar, acompanhar indicadores e fortalecer pessoas.</p></div><div className="production-grid">{products.map((product) => <ProductionCard key={product.title} {...product} navigate={navigate} />)}</div></section><section className="production-band"><div className="container production-band-inner"><div><Eyebrow>Leitura transversal</Eyebrow><h2>Comece pelo território.</h2><p>Os panoramas municipais reúnem um retrato da gestão de resíduos e ajudam a transformar dados gerais em prioridades locais.</p></div><Link to="/panoramas-da-gestao-de-residuos/" className="button button-primary">Explorar panoramas <ArrowRight size={16} /></Link></div></section></>
}

export function MaterialsCompiled({ navigate }: { navigate: Navigate }) {
  return <><ProductionHero eyebrow="Biblioteca territorial" title="Materiais Compilados" description="Documentos de referência para conhecer a realidade dos municípios, planejar serviços e acompanhar a evolução da gestão." image={panoramaAsset(featuredPanorama.cover)} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio', href: '/producoes-do-convenio/' }, { label: 'Materiais Compilados' }]} /><section className="section container production-overview"><div className="production-heading"><div><Eyebrow>Três conjuntos de documentos</Eyebrow><h2>Do diagnóstico ao <span>planejamento.</span></h2></div><p>Entre por um tema e encontre documentos locais, panoramas municipais e o diretório de cidades atendidas pelo projeto.</p></div><div className="production-link-grid"><LinkCard icon={<MapPin />} title="Panoramas da gestão de resíduos" text="Diagnósticos e referências para os municípios de MS." href="/panoramas-da-gestao-de-residuos/" navigate={navigate} /><LinkCard icon={<Recycle />} title="Plano de coleta seletiva" text="Diretrizes para organizar a coleta e a recuperação de materiais." href="/plano-de-coleta-seletiva/" navigate={navigate} /><LinkCard icon={<Leaf />} title="Plano de compostagem" text="Caminhos para tratar a fração orgânica na escala local." href="/plano-de-compostagem/" navigate={navigate} /><LinkCard icon={<Users />} title="Municípios contemplados" text="Acesse o recorte territorial e os panoramas disponíveis." href="/municipios-contemplados/" navigate={navigate} /></div></section></>
}

const panoramaFiles = panoramaRecords

export function Panoramas({ navigate }: { navigate: Navigate }) {
  return <><ProductionHero eyebrow="Leitura do território" title="Panoramas da Gestão de Resíduos" description="Diagnósticos municipais para compreender serviços, infraestrutura, destinação e prioridades de cada território." image={panoramaAsset(panoramaRecords.find((record) => record.slug === 'campo-grande')?.cover ?? featuredPanorama.cover)} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Materiais Compilados', href: '/materiais-compilados/' }, { label: 'Panoramas da Gestão de Resíduos' }]} /><section className="section container catalogue-section"><div className="catalogue-heading"><div><Eyebrow>Catálogo completo</Eyebrow><h2>Um retrato de cada <span>município.</span></h2></div><p>{panoramaFiles.length} municípios têm um panorama identificado no acervo local. Os documentos apoiam decisões sobre coleta, tratamento e disposição final.</p></div><div className="catalogue-grid">{panoramaFiles.map((item) => <DocumentTile key={item.name} title={item.name} href={panoramaAsset(item.file)} />)}</div><div className="catalogue-note"><MapPin size={20} /><div><strong>Veja o recorte ampliado</strong><p>A página de municípios reúne os territórios contemplados e os caminhos de consulta disponíveis.</p></div><Link to="/municipios-contemplados/" className="text-link">Ver municípios <ArrowRight size={15} /></Link></div></section></>
}

function DocumentTile({ title, href }: { title: string; href: string }) {
  return <a className="document-tile" href={href} target="_blank" rel="noreferrer"><span className="document-tile-icon"><FileText size={21} /></span><span className="doc-type">PDF · Panorama municipal</span><strong>{title}</strong><span className="text-link">Abrir panorama <ArrowRight size={15} /></span></a>
}

export function SelectiveCollection({ navigate, nested = false }: { navigate: Navigate; nested?: boolean }) {
  const municipalitiesHref = nested ? "/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/municipios-contemplados/" : "/municipios-contemplados/"
  const totalDocuments = selectiveCollectionPlans.reduce((total, plan) => total + plan.documents.length, 0)

  return <>
    <ProductionHero eyebrow="Planejamento municipal" title="Plano de Coleta Seletiva" description="Planos e documentos locais para estruturar a coleta, ampliar a recuperação de materiais e fortalecer a participação da comunidade." image={ASSET + "2021/10/residuos-solidos-1400x788.png"} />
    <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Materiais Compilados", href: "/materiais-compilados/" }, { label: "Plano de Coleta Seletiva" }]} />
    <section className="section container collection-plan-intro">
      <article className="prose">
        <Eyebrow>Acervo municipal</Eyebrow>
        <h2>Planejamento que vira <span>serviço.</span></h2>
        <p>O acervo reúne os produtos publicados para os municípios contemplados: plano municipal, cronograma operacional, mapas de apoio e minuta de lei para a coleta seletiva.</p>
        <p>Escolha um município para abrir o plano diretamente ou consulte os demais documentos do seu conjunto de materiais.</p>
        <div className="collection-plan-facts" aria-label="Resumo do acervo">
          <div><strong>{selectiveCollectionPlans.length}</strong><span>municípios com plano</span></div>
          <div><strong>{totalDocuments}</strong><span>documentos disponíveis</span></div>
          <div><strong>5</strong><span>itens por município</span></div>
        </div>
        <Link to={municipalitiesHref} className="button button-dark">Ver diretório de municípios <ArrowRight size={16} /></Link>
      </article>
      <aside className="collection-plan-aside">
        <Eyebrow>O que você encontra</Eyebrow>
        <div className="collection-plan-aside-icon"><Recycle size={30} /></div>
        <strong>Um conjunto completo por cidade</strong>
        <ul>
          <li>Plano Municipal de Coleta Seletiva</li>
          <li>Cronograma operacional</li>
          <li>Mapas de apoio à implantação</li>
          <li>Minuta de lei municipal</li>
        </ul>
      </aside>
    </section>
    <section className="section container collection-plan-catalogue">
      <div className="catalogue-heading">
        <div><Eyebrow>Planos publicados</Eyebrow><h2>Encontre seu <span>município.</span></h2></div>
        <p>Os links abaixo foram recuperados dos materiais associados a cada página municipal no banco de dados do portal.</p>
      </div>
      <div className="collection-plan-grid">
        {selectiveCollectionPlans.map((plan) => <article className="collection-plan-card" key={plan.sourcePostId}>
          <div className="collection-plan-card-heading"><span className="collection-plan-pin"><MapPin size={17} /></span><div><span className="doc-type">Plano municipal</span><h3>{plan.name}</h3></div></div>
          <a className="collection-plan-primary" href={plan.primaryDocumentUrl} target="_blank" rel="noreferrer">Abrir plano <FileText size={15} /></a>
          <details className="collection-plan-documents">
            <summary>{plan.documents.length} documentos disponíveis <ArrowRight size={14} /></summary>
            <ul>{plan.documents.map((document) => <li key={plan.sourcePostId + "-" + document.title + "-" + document.description}><a href={document.url} target="_blank" rel="noreferrer"><span>{document.title}</span><small>{document.description || "Abrir documento"}</small></a></li>)}</ul>
          </details>
        </article>)}
      </div>
    </section>
  </>
}

export function Composting({ navigate, nested = false }: { navigate: Navigate; nested?: boolean }) {
  const href = `${ASSET}2025/03/Cartilha_compostagem_acelerada.pdf`
  return <><ProductionHero eyebrow="Cuidado com a matéria orgânica" title="Plano de Compostagem" description="Orientações para reduzir o envio de resíduos orgânicos aos aterros e transformar matéria em recurso para o território." image={`${ASSET}2025/03/Cartilha_compostagem_acelerada-pdf.jpg`} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Materiais Compilados', href: '/materiais-compilados/' }, { label: 'Plano de Compostagem' }]} /><section className="section container education-layout"><article className="prose"><Eyebrow>Resíduo orgânico é recurso</Eyebrow><h2>Mais vida no solo, menos rejeito.</h2><p>A compostagem aproxima a gestão de resíduos da agricultura, da educação ambiental e do cuidado cotidiano com o território. O planejamento ajuda a escolher escala, método e parceiros.</p><p>Use a cartilha como ponto de partida para entender a compostagem acelerada e construir uma estratégia adequada ao município.</p><div className="education-points"><div><Sprout size={20} /><strong>Redução na origem</strong><span>Menos matéria orgânica no fluxo de rejeitos.</span></div><div><Leaf size={20} /><strong>Benefício ambiental</strong><span>Transformação em composto e melhoria do solo.</span></div><div><BookOpen size={20} /><strong>Educação prática</strong><span>Conhecimento que pode ser aplicado em escolas e comunidades.</span></div></div><Link to="/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/" className="button button-dark">Ver municípios contemplados <ArrowRight size={16} /></Link></article><aside className="education-aside"><Eyebrow>Material local</Eyebrow><img src={`${ASSET}2025/03/Cartilha_compostagem_acelerada-pdf.jpg`} alt="Capa da cartilha de compostagem" /><strong>Cartilha de compostagem acelerada</strong><p>Material introdutório para consulta e compartilhamento.</p><a className="text-link" href={href} target="_blank" rel="noreferrer">Abrir cartilha <ArrowRight size={15} /></a></aside></section></>
}

export function Municipalities({ navigate, mode = "coleta" }: { navigate: Navigate; mode?: "coleta" | "compostagem" }) {
  const [query, setQuery] = useState("")
  const resourceItems = useMemo(() => {
    if (mode === "coleta") return selectiveCollectionPlans.map((plan) => ({ name: plan.name, href: plan.primaryDocumentUrl, meta: plan.documents.length + " documentos de coleta seletiva" }))
    return municipalities.map((item) => ({ name: item.name, href: panoramaAsset(item.file), meta: "Panorama municipal · PDF" }))
  }, [mode])
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const filtered = useMemo(() => resourceItems.filter((item) => item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery)), [normalizedQuery, resourceItems])
  const isSelectiveCollection = mode === "coleta"
  const parent = isSelectiveCollection ? "Plano de Coleta Seletiva" : "Plano de Compostagem"
  const back = isSelectiveCollection ? "/plano-de-coleta-seletiva/" : "/plano-de-compostagem/"

  return <>
    <ProductionHero eyebrow="Recorte territorial" title="Municípios Contemplados" description={"Consulte os municípios associados ao " + parent.toLowerCase() + " e acesse os materiais municipais disponíveis."} image={panoramaAsset(panoramaRecords.find((record) => record.slug === "bonito")?.cover ?? featuredPanorama.cover)} />
    <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Materiais Compilados", href: "/materiais-compilados/" }, { label: parent, href: back }, { label: "Municípios Contemplados" }]} />
    <section className="section container municipality-section">
      <div className="catalogue-heading"><div><Eyebrow>Diretório territorial</Eyebrow><h2>Escolha um <span>município.</span></h2></div><label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar município" /></label></div>
      <p className="municipality-description">{isSelectiveCollection ? resourceItems.length + " municípios possuem materiais de coleta seletiva publicados no acervo." : "Consulte os panoramas municipais disponíveis no acervo."}</p>
      <div className="municipality-grid">{filtered.map((item) => <a className="municipality-card" key={item.name} href={item.href} target="_blank" rel="noreferrer"><MapPin size={17} /><span><strong>{item.name}</strong><small>{item.meta}</small></span><ArrowRight size={16} /></a>)}</div>
      {filtered.length === 0 && <div className="empty-note">Nenhum município encontrado. Tente outro termo.</div>}
      <Link to={back} className="text-link">Voltar para {parent} <ArrowRight size={15} /></Link>
    </section>
  </>
}

export function EnvironmentalEducation({ navigate }: { navigate: Navigate }) {
  return <><ProductionHero eyebrow="Conhecimento em movimento" title="Educação Ambiental" description="Planos e conteúdos para transformar informação em participação, cuidado e corresponsabilidade." image={`${ASSET}2021/07/recicla.png`} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio', href: '/producoes-do-convenio/' }, { label: 'Educação Ambiental' }]} /><section className="section container education-layout"><article className="prose"><Eyebrow>Aprender para cuidar</Eyebrow><h2>Educação ambiental é parte da infraestrutura.</h2><p>Uma política de resíduos funciona melhor quando as pessoas entendem o que acontece depois do descarte e conseguem participar das soluções.</p><p>Esta área reúne caminhos para planejar ações educativas, conectar escolas e comunidades e apoiar a mudança de hábitos no território.</p><div className="education-points"><div><BookOpen size={20} /><strong>Conteúdo claro</strong><span>Explicações que aproximam a política do cotidiano.</span></div><div><Users size={20} /><strong>Mobilização</strong><span>Participação de escolas, bairros e organizações.</span></div><div><Recycle size={20} /><strong>Continuidade</strong><span>Ações educativas ligadas ao serviço público.</span></div></div><Link to="/educacao-ambiental/planos-de-educacao-ambiental/" className="button button-dark">Acessar planos <ArrowRight size={16} /></Link></article><aside className="education-aside"><Eyebrow>Próximo passo</Eyebrow><div className="education-aside-icon"><Sprout size={36} /></div><strong>Planos de Educação Ambiental</strong><p>Veja como organizar objetivos, públicos e ações para cada contexto.</p><Link to="/educacao-ambiental/planos-de-educacao-ambiental/" className="text-link">Abrir planos <ArrowRight size={15} /></Link></aside></section></>
}

export function EducationPlans({ navigate }: { navigate: Navigate }) {
  return <><ProductionHero eyebrow="Planejamento educativo" title="Planos de Educação Ambiental" description="Uma estrutura prática para organizar ações educativas conectadas à gestão de resíduos." image={`${ASSET}2025/03/Cartilha_compostagem_acelerada-pdf.jpg`} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Educação Ambiental', href: '/educacao-ambiental/' }, { label: 'Planos de Educação Ambiental' }]} /><section className="section container plan-section"><div className="catalogue-heading"><div><Eyebrow>Como transformar intenção em prática</Eyebrow><h2>Planeje, envolva e <span>acompanhe.</span></h2></div><p>Um bom plano dá clareza para quem participa, ajuda a escolher prioridades e cria um ritmo de acompanhamento para as ações.</p></div><div className="plan-steps"><div><span>01</span><strong>Conhecer</strong><p>Leia o contexto local e identifique os públicos envolvidos.</p></div><div><span>02</span><strong>Priorizar</strong><p>Escolha problemas concretos e objetivos possíveis de acompanhar.</p></div><div><span>03</span><strong>Mobilizar</strong><p>Conecte escolas, serviços, cooperativas e comunidades.</p></div><div><span>04</span><strong>Acompanhar</strong><p>Registre resultados e ajuste as próximas ações.</p></div></div><div className="catalogue-note"><BookOpen size={20} /><div><strong>Educação ligada ao território</strong><p>Consulte também os planos de coleta seletiva e compostagem para conectar comunicação e serviço.</p></div><Link to="/materiais-compilados/" className="text-link">Ver materiais <ArrowRight size={15} /></Link></div></section></>
}

export function CatadoresOverview({ navigate }: { navigate: Navigate }) {
  const href = `${ASSET}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final.pdf`
  return <><ProductionHero eyebrow="Inclusão socioprodutiva" title="Panorama e Censo dos Catadores" description="Dados e referências para reconhecer o trabalho dos catadores e fortalecer a cadeia da reciclagem em Mato Grosso do Sul." image={`${ASSET}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final-pdf.jpg`} /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio', href: '/producoes-do-convenio/' }, { label: 'Panorama e Censo dos Catadores' }]} /><section className="section container catadores-layout"><article className="prose"><Eyebrow>Conhecer para valorizar</Eyebrow><h2>Quem recupera materiais também constrói política pública.</h2><p>O panorama e censo reúnem informações para dar visibilidade às trajetórias, condições de trabalho e contribuições ambientais e econômicas dos catadores.</p><p>O material apoia gestores, instituições e organizações na construção de soluções mais inclusivas para a reciclagem.</p><a className="button button-dark" href={href} target="_blank" rel="noreferrer">Abrir panorama e censo <FileText size={16} /></a><Link to="/nota-tecnica/" className="text-link">Ler nota técnica relacionada <ArrowRight size={15} /></Link></article><aside className="catadores-cover"><img src={`${ASSET}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final-pdf-746x1024.jpg`} alt="Capa do Panorama e Censo dos Catadores" /><span>Publicação do Projeto Valoriza</span></aside></section></>
}

function BarChartIcon() {
  return <span className="mini-bars" aria-hidden="true"><i /><i /><i /></span>
}
