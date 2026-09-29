import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Recycle,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import { resolveRoute, type RouteKind, type SiteRoute } from './data/siteMap'
import { LandfillDifference, LegalDisposition, PlantModel, SeparateWaste } from './pages/InstitutionalPages'
import { Cooperatives, DecisionSupport, PublicationsPage, TechnicalNote, UserGuide, ValorizaHub } from './pages/ResourcePages'
import { CatadoresOverview, Composting, EducationPlans, EnvironmentalEducation, MaterialsCompiled, Municipalities, Panoramas, ProductionHub, SelectiveCollection } from './pages/ProductionPages'
import { CityDetail, CityDirectory, Directories, cityRecords } from './pages/CityPages'
import { NewsArchive, NewsArticle, newsRecords } from './pages/NewsPages'
import { LegacyNotice, ReciclaMatch, ReverseLogistics } from './pages/LegacyPages'
import { HomePage } from './components/HomePage'
import { PageHero } from './components/PageHero'
import { SiteSearch } from './components/SiteSearch'
import { Link, NavProvider, type NavigateFn } from './components/router'

const ASSET = '/uploads/'

type RouteKey = Exclude<RouteKind, 'not-found'> | 'not-found'

const routeFromPath = (path: string): RouteKey => resolveRoute(path)?.kind ?? 'not-found'

/** Título da aba: fichas e notícias usam o nome real; o resto usa o título do siteMap. */
function pageTitle(path: string, routeInfo: SiteRoute | null): string {
  if (!routeInfo) return 'Página não encontrada'
  const slug = path.split('/').filter(Boolean).pop() ?? ''
  if (routeInfo.kind === 'article') return newsRecords.find((record) => record.slug === slug)?.title ?? routeInfo.title
  if (routeInfo.kind === 'cities' && routeInfo.path !== '/cidades/') {
    return cityRecords.find((city) => city.slug === slug || city.legacyPath === routeInfo.path)?.name ?? routeInfo.title
  }
  return routeInfo.title
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (path !== "/sobre/" && path !== "/sobre") return
    window.history.replaceState({}, "", "/#sobre-projeto")
    setPath("/")
    window.requestAnimationFrame(() => document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "auto" }))
  }, [path])

  const navigate = useCallback<NavigateFn>((to) => {
    setMenuOpen(false)
    if (to === window.location.pathname + window.location.search + window.location.hash) return
    window.history.pushState({}, "", to)
    const [pathname, hash] = to.split("#")
    setPath(pathname.split("?")[0] || "/")
    window.requestAnimationFrame(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "auto" })
      else window.scrollTo({ top: 0, behavior: "auto" })
    })
  }, [])

  const route = routeFromPath(path)
  const routeInfo = resolveRoute(path)

  useEffect(() => {
    const title = pageTitle(path, routeInfo)
    document.title = title + ' · Portal Resíduos MS'
    document
      .querySelector('meta[name=description]')
      ?.setAttribute(
        'content',
        'Portal Resíduos MS — ' + title + '. Informação, dados e ferramentas para uma gestão responsável dos resíduos sólidos em Mato Grosso do Sul.',
      )
  }, [path, routeInfo?.title])

  useEffect(() => {
    // Move o foco para o conteúdo novo a cada troca de rota (pula o carregamento inicial).
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [path])

  return (
    <NavProvider navigate={navigate}>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <Header route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} />
        <main id="main-content" tabIndex={-1}>
          {route === 'home' && <HomePage navigate={navigate} />}          {route === 'projects' && routeInfo?.path === '/disposicao-legal/' && <LegalDisposition navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/modelo-de-usinas-de-triagem-de-residuos/' && <PlantModel navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/como-separar-corretamente-seu-lixo/' && <SeparateWaste navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/diferenca-de-lixao-e-aterro-sanitario/' && <LandfillDifference navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/cooperativas/' && <Cooperatives />}
          {route === 'projects' && routeInfo?.path === '/nota-tecnica/' && <TechnicalNote />}
          {route === 'projects' && routeInfo?.path === '/apoio-a-decisao/' && <DecisionSupport navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/apoio-a-decisao/guia-do-usuario-do-grs/' && <UserGuide navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/producoes-do-convenio/' && <ProductionHub navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/materiais-compilados/' && <MaterialsCompiled navigate={navigate} />}
          {route === 'projects' && (routeInfo?.path === '/panoramas-da-gestao-de-residuos/' || routeInfo?.path === '/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/') && <Panoramas navigate={navigate} />}
          {route === 'projects' && (routeInfo?.path === '/plano-de-coleta-seletiva/' || routeInfo?.path === '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/') && <SelectiveCollection navigate={navigate} nested={routeInfo.path.startsWith('/producoes-do-convenio/')} />}
          {route === 'projects' && (routeInfo?.path === '/plano-de-compostagem/' || routeInfo?.path === '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/') && <Composting navigate={navigate} nested={routeInfo.path.startsWith('/producoes-do-convenio/')} />}
          {route === 'projects' && (routeInfo?.path === '/municipios-contemplados/' || routeInfo?.path === '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/municipios-contemplados/') && <Municipalities navigate={navigate} mode="coleta" />}
          {route === 'projects' && routeInfo?.path === '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/' && <Municipalities navigate={navigate} mode="compostagem" />}
          {route === 'projects' && (routeInfo?.path === '/educacao-ambiental/' || routeInfo?.path === '/producoes-do-convenio/materiais-compilados/educacao-ambiental/') && <EnvironmentalEducation navigate={navigate} />}
          {route === 'projects' && (routeInfo?.path === '/planos-de-educacao-ambiental/' || routeInfo?.path === '/educacao-ambiental/planos-de-educacao-ambiental/') && <EducationPlans navigate={navigate} />}
          {route === 'projects' && (routeInfo?.path === '/panorama-e-censo-dos-catadores/' || routeInfo?.path === '/producoes-do-convenio/panorama-e-censo-dos-catadores/') && <CatadoresOverview navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/recicla-match/' && <ReciclaMatch navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/logistica-reversa/' && <ReverseLogistics navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/booking/' && <LegacyNotice title="Booking" description="Esta página fazia parte da instalação original do WordPress e não continha uma área pública de conteúdo do portal. O endereço foi mantido para evitar links quebrados durante a migração." navigate={navigate} />}
          {route === 'projects' && routeInfo?.path === '/pagina-exemplo/' && <LegacyNotice title="Página de exemplo" description="Esta era a página padrão criada pelo WordPress. Ela foi mantida como rota compatível, mas o conteúdo público do projeto está organizado nas áreas atuais do portal." navigate={navigate} />}
          {route === 'projects' && !['/disposicao-legal/', '/modelo-de-usinas-de-triagem-de-residuos/', '/como-separar-corretamente-seu-lixo/', '/diferenca-de-lixao-e-aterro-sanitario/', '/cooperativas/', '/nota-tecnica/', '/apoio-a-decisao/', '/apoio-a-decisao/guia-do-usuario-do-grs/', '/producoes-do-convenio/', '/materiais-compilados/', '/panoramas-da-gestao-de-residuos/', '/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/', '/plano-de-coleta-seletiva/', '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/', '/plano-de-compostagem/', '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/', '/municipios-contemplados/', '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/municipios-contemplados/', '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/', '/educacao-ambiental/', '/producoes-do-convenio/materiais-compilados/educacao-ambiental/', '/planos-de-educacao-ambiental/', '/educacao-ambiental/planos-de-educacao-ambiental/', '/panorama-e-censo-dos-catadores/', '/producoes-do-convenio/panorama-e-censo-dos-catadores/', '/recicla-match/', '/logistica-reversa/', '/booking/', '/pagina-exemplo/'].includes(routeInfo?.path ?? '') && <Projects navigate={navigate} />}
          {route === 'news' && <NewsArchive navigate={navigate} />}
          {route === 'article' && <NewsArticle path={path} navigate={navigate} />}
          {route === 'contact' && <Contact />}
          {route === 'cities' && routeInfo?.path === '/cidades/' && <CityDirectory navigate={navigate} />}
          {route === 'cities' && routeInfo?.path !== '/cidades/' && <CityDetail path={routeInfo?.path ?? path} navigate={navigate} />}
          {route === 'publications' && <PublicationsPage navigate={navigate} />}
          {route === 'valoriza' && <ValorizaHub navigate={navigate} />}
          {route === 'directories' && <Directories navigate={navigate} />}
          {route === 'not-found' && <NotFound navigate={navigate} />}
        </main>
        <Footer navigate={navigate} />
      </div>
    </NavProvider>
  )
}

const NAV_LINKS = [
  ['Início', '/', 'home'],
  ['Produções do Convênio', '/producoes-do-convenio/', 'projects'],
  ['Cidades', '/cidades/', 'cities'],
  ['Notícias', '/noticias/', 'news'],
  ['Contato', '/contact/', 'contact'],
] as const

function Header({ route, menuOpen, setMenuOpen, navigate }: { route: RouteKey; menuOpen: boolean; setMenuOpen: (open: boolean) => void; navigate: NavigateFn }) {
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuToggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, setMenuOpen])

  return (
    <>
      <div className="topline">
        <span>Convênio técnico-científico MPMS · UEMS</span>
        <span className="topline-right">Mato Grosso do Sul</span>
      </div>
      <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Portal Resíduos MS — ir para o início">
          <img src={`${ASSET}2020/03/logo.png`} alt="Portal Resíduos MS" />
        </Link>
        <button ref={menuToggleRef} className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-navigation">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegação principal">
          {NAV_LINKS.map(([label, href, key]) => (
            <Link key={href} to={href} className={route === key ? 'active' : ''} aria-current={route === key ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <SiteSearch navigate={navigate} />
      </div>
      </header>
    </>
  )
}

function PageIntro({ eyebrow, title, description, image }: { eyebrow: string; title: string; description?: string; image?: string }) {
  return <PageHero eyebrow={eyebrow} title={title} description={description} image={image} />
}

function NotFound({ navigate }: { navigate: NavigateFn }) {
  return (
    <section className="not-found section container" aria-labelledby="not-found-title">
      <div className="not-found-mark"><Search size={24} /></div>
      <div className="eyebrow"><span className="eyebrow-line" /> Rota não encontrada</div>
      <h1 id="not-found-title">Esta página ainda não está disponível.</h1>
      <p>O endereço não corresponde a uma rota conhecida do Portal Resíduos MS. Volte ao início ou consulte as áreas principais do projeto.</p>
      <div className="not-found-actions">
        <Link to="/" className="button button-dark">Voltar ao início <ArrowRight size={16} /></Link>
        <Link to="/producoes-do-convenio/" className="text-link">Explorar produções <ArrowRight size={15} /></Link>
      </div>
    </section>
  )
}

function Projects({ navigate }: { navigate: NavigateFn }) {
  const projects = [
    { icon: <BarChart3 />, tag: 'Ferramenta', title: 'Apoio à decisão', text: 'Estimativas, indicadores e ferramentas para auxiliar o gerenciamento de resíduos sólidos.', href: '/apoio-a-decisao/' },
    { icon: <Recycle />, tag: 'Plataforma', title: 'Recicla Match', text: 'Plataforma para aproximar parceiros e fortalecer a cadeia da reciclagem.', href: '/recicla-match/' },
    { icon: <FileText />, tag: 'Biblioteca', title: 'Materiais compilados', text: 'Panoramas da gestão, planos municipais e estudos para os 79 municípios.', href: '/materiais-compilados/' },
    { icon: <Leaf />, tag: 'Mobilização', title: 'Educação ambiental', text: 'Planos, conteúdos e caminhos para ampliar a conscientização ambiental.', href: '/educacao-ambiental/' },
    { icon: <MapPin />, tag: 'Território', title: 'Cidades', text: 'Acesse informações municipais, pontos de entrega e coleta seletiva.', href: '/cidades/' },
    { icon: <ShieldCheck />, tag: 'Sistema', title: 'Logística Reversa', text: 'Diretrizes e referências para uma destinação ambientalmente adequada.', href: '/logistica-reversa/' },
  ]
  return <><PageIntro eyebrow="Nossos produtos" title="Produções do Convênio" description="Neste ambiente você encontra os produtos desenvolvidos pelo convênio celebrado entre o Ministério Público de Mato Grosso do Sul e a Universidade Estadual de Mato Grosso do Sul." image={`${ASSET}2021/07/recicla.png`} /><section className="section container"><div className="project-grid">{projects.map((project) => <Link to={project.href} className="project-card" key={project.title}><span className="card-kicker">{project.tag}</span><span className="project-icon">{project.icon}</span><h2>{project.title}</h2><p>{project.text}</p><span className="text-link">Acessar produção <ArrowRight size={15} /></span></Link>)}</div></section></>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const subject = String(data.get('subject') ?? '') || 'Contato pelo portal'
    const message = String(data.get('message') ?? '')
    const body = `${message}\n\n—\n${name}${email ? ` <${email}>` : ''}`
    window.location.href = `mailto:contato@portalresiduosms.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return <><PageIntro eyebrow="Fale conosco" title="Contato" description="Envie uma mensagem para o Projeto Resíduos Sólidos — Disposição Legal." /><section className="section container contact-layout"><div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line" /> Contate-nos</div><h2>Envie uma <span>mensagem</span></h2><p>Use o formulário para montar uma mensagem no seu aplicativo de e-mail, ou escreva diretamente para a nossa equipe.</p><div className="contact-detail"><Mail size={18} /><div><small>E-mail</small><strong>contato@portalresiduosms.online</strong></div></div><div className="contact-detail"><MapPin size={18} /><div><small>Localização</small><strong>Campo Grande — Mato Grosso do Sul</strong></div></div></div><form className="contact-form" onSubmit={submit}>{sent ? <div className="form-success"><Check size={28} /><h3>Abrimos seu aplicativo de e-mail</h3><p>A mensagem foi montada com o que você preencheu. Se nada abriu, escreva diretamente para contato@portalresiduosms.online.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Escrever outra mensagem <ArrowRight size={15} /></button></div> : <><label>Seu nome<input required name="name" placeholder="Como podemos chamar você?" /></label><label>Seu e-mail<input required type="email" name="email" placeholder="voce@exemplo.com" /></label><label>Assunto<input required name="subject" placeholder="Sobre o que você quer falar?" /></label><label>Mensagem<textarea required name="message" rows={5} placeholder="Escreva sua mensagem" /></label><button className="button button-dark" type="submit">Montar e-mail <ArrowRight size={16} /></button></>}</form></section></>
}

function Footer({ navigate }: { navigate: NavigateFn }) {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><img src={`${ASSET}2021/07/logo_white-1.png`} alt="Portal Resíduos MS" /><p>Informação, cooperação e ferramentas para uma gestão responsável dos resíduos sólidos.</p><div className="socials"><a href="mailto:contato@portalresiduosms.online" aria-label="E-mail"><Mail size={17} /></a></div></div><div><h3>Explorar</h3><Link to="/#sobre-projeto">Sobre o projeto</Link><Link to="/producoes-do-convenio/">Produções do convênio</Link><Link to="/noticias/">Notícias</Link></div><div><h3>Ferramentas</h3><Link to="/cidades/">Cidades</Link><Link to="/diretorios/">Diretórios</Link><Link to="/publicacoes/">Publicações</Link><Link to="/projeto-valoriza/">Projeto Valoriza</Link></div><div className="footer-contact"><h3>Fale com a gente</h3><p>contato@portalresiduosms.online</p><p>Campo Grande — MS</p><Link to="/contact/" className="footer-cta">Enviar mensagem <ArrowRight size={15} /></Link></div></div><div className="footer-bottom container"><span>© {new Date().getFullYear()} Portal Resíduos MS</span><span>Projeto Disposição Legal · MPMS + UEMS</span></div></footer>
}

export default App
