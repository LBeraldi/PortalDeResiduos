import { type FormEvent, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Pause, Play, Search } from "lucide-react"
import { openSiteSearch } from "./SiteSearch"
import { newsByDate } from "../pages/NewsPages"
import { territoryStats } from "../data/territory"
import { searchSite, type SearchEntry } from "../data/search"
import { Link } from "./router"

type Navigate = (to: string) => void

type InstitutionalSlide = {
  label: string
  title: string
  text: string
  stat?: string
  statLabel?: string
}

const institutionalSlides: InstitutionalSlide[] = [
  {
    label: "O projeto",
    title: "Informação para dar o destino certo.",
    text: "O Portal Resíduos MS organiza dados, ferramentas e cooperação para uma disposição final ambientalmente adequada em Mato Grosso do Sul.",
  },
  {
    label: "Trajetória",
    title: "Desde 2015, um diagnóstico para todo o estado.",
    text: "O trabalho começou com o Projeto Curupira, reunindo informações sobre gestão, gerenciamento e disposição final nos municípios sul-mato-grossenses.",
    stat: "79",
    statLabel: "municípios no diagnóstico inicial",
  },
  {
    label: "Cooperação técnica",
    title: "Conhecimento que vira ação pública.",
    text: "Em 2020, MPMS e UEMS formalizaram o convênio técnico-científico para fortalecer a Política Nacional de Resíduos Sólidos no estado.",
  },
  {
    label: "Resultados",
    title: "Uma mudança concreta no território.",
    text: "A força-tarefa entre instituições públicas reduziu a disposição final inadequada e contribuiu para o encerramento de lixões.",
    stat: "80% → 5%",
    statLabel: "de municípios com disposição inadequada em oito anos",
  },
  {
    label: "Inclusão socioprodutiva",
    title: "Catadores no centro da transformação.",
    text: "Em 2024, o CAOMA lançou o Projeto Valoriza para apoiar a inclusão social e produtiva de catadores de materiais recicláveis.",
  },
]

type HomeArea = { kicker: string; title: string; text: string; href: string; cta: string; external?: { label: string; href: string } }

const homeAreas: HomeArea[] = [
  { kicker: "Ferramenta digital", title: "Apoio a decisão", text: "Indicadores e cenários para qualificar o gerenciamento municipal.", href: "/apoio-a-decisao/", cta: "Acessar", external: { label: "Abrir sistema GRS", href: "https://sadgrs.streamlit.app/" } },
  { kicker: "Inclusão socioprodutiva", title: "Cooperativas", text: "Materiais para fortalecer a organização e o trabalho dos catadores.", href: "/cooperativas/", cta: "Acessar" },
  { kicker: "Biblioteca pública", title: "Publicações", text: "Estudos, artigos e notas técnicas para consulta e compartilhamento.", href: "/publicacoes/", cta: "Acessar" },
  { kicker: "Sistema estadual", title: "Logística Reversa", text: "Um caminho para que embalagens retornem ao setor empresarial e tenham destinação ambientalmente adequada.", href: "/logistica-reversa/", cta: "Entender o sistema" },
]

function HomeHeroSearch({ navigate }: { navigate: Navigate }) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const searchRef = useRef<HTMLFormElement>(null)
  const results = searchSite(query, 6)
  const showSuggestions = focused && query.trim().length >= 2

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    openSiteSearch(query)
  }

  const openEntry = (entry: SearchEntry) => {
    if (entry.external) {
      window.open(entry.href, "_blank", "noopener,noreferrer")
    } else {
      navigate(entry.href)
    }
    setQuery("")
    setFocused(false)
  }

  return (
    <form ref={searchRef} className="home-hero-search" role="search" onSubmit={submitSearch} onFocus={() => setFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false) }}>
      <label className="sr-only" htmlFor="home-hero-search-input">Pesquisar no acervo</label>
      <div className="home-hero-search-form">
        <Search size={18} aria-hidden="true" />
        <input id="home-hero-search-input" type="search" placeholder="Pesquisar no acervo..." value={query} onChange={(event) => setQuery(event.target.value)} role="combobox" aria-expanded={showSuggestions} aria-controls="home-hero-search-results" aria-autocomplete="list" autoComplete="off" />
        <button type="submit">Pesquisar <ArrowRight size={16} /></button>
      </div>
      {showSuggestions && <div className="home-hero-search-suggestions" id="home-hero-search-results" aria-live="polite">
        {results.length === 0 ? (
          <p>Nenhum resultado para “{query}”. Continue com Enter para buscar no acervo completo.</p>
        ) : (
          <ul role="listbox" aria-label="Sugestões de busca">
            {results.map((entry) => <li key={`${entry.kind}-${entry.href}`} role="option"><button type="button" onClick={() => openEntry(entry)}><span className="home-hero-search-result-kind">{entry.kind}</span><span>{entry.label}</span><ArrowRight size={15} aria-hidden="true" /></button></li>)}
          </ul>
        )}
      </div>}
    </form>
  )
}

function HighlightContent({ slide }: { slide: InstitutionalSlide }) {
  return <>
    <p className="home-hero-slide-label">{slide.label}</p>
    <h2>{slide.title}</h2>
    <p>{slide.text}</p>
    {slide.stat && slide.statLabel && <div className="home-hero-stat"><strong>{slide.stat}</strong><span>{slide.statLabel}</span></div>}
  </>
}

const [introSlide, ...highlights] = institutionalSlides

function HomeInstitutionalHero({ navigate }: { navigate: Navigate }) {
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const paused = userPaused || hoverPaused || reducedMotion

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    if (paused) return
    const interval = window.setInterval(() => setActive((current) => (current + 1) % highlights.length), 8000)
    return () => window.clearInterval(interval)
  }, [paused])

  const show = (next: number) => setActive((next + highlights.length) % highlights.length)

  return (
    <section className="home-institutional-hero" id="sobre-projeto" aria-labelledby="home-hero-title">
      <div className="container home-institutional-hero-inner">
        <div className="home-hero-intro">
          <div className="eyebrow home-hero-eyebrow"><span className="eyebrow-line" /> Projeto Resíduos Sólidos — Disposição Legal</div>
          <h1 id="home-hero-title">Informação para dar o destino certo.</h1>
          <p className="home-hero-lead">{introSlide.text}</p>
          <HomeHeroSearch navigate={navigate} />
        </div>
        <section
          className="home-hero-carousel"
          aria-roledescription="carrossel" aria-label="Destaques"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onFocusCapture={() => setHoverPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoverPaused(false)
          }}
        >
          <div className="home-hero-slides" aria-live={paused ? "polite" : "off"}>
            {highlights.map((item, index) => <div key={item.label} className={"home-hero-slide" + (index === active ? " is-active" : "")} role="group" aria-roledescription="destaque" aria-label={(index + 1) + " de " + highlights.length} aria-hidden={index !== active}><HighlightContent slide={item} /></div>)}
          </div>
          <div className="home-hero-controls">
            <button type="button" className="home-hero-nav" onClick={() => show(active - 1)} aria-label="Destaque anterior"><ChevronLeft size={17} /></button>
            <button type="button" className="home-hero-nav" onClick={() => setUserPaused(!userPaused)} aria-label={userPaused ? "Continuar destaques" : "Pausar destaques"}>{userPaused ? <Play size={15} /> : <Pause size={15} />}</button>
            <div className="home-hero-dots">
              {highlights.map((item, index) => <button type="button" key={item.label} className={index === active ? "is-active" : ""} onClick={() => show(index)} aria-label={"Mostrar destaque " + (index + 1) + ": " + item.label} aria-current={index === active ? "true" : undefined} />)}
            </div>
            <button type="button" className="home-hero-nav" onClick={() => show(active + 1)} aria-label="Próximo destaque"><ChevronRight size={17} /></button>
          </div>
        </section>
      </div>
    </section>
  )
}

export function HomePage({ navigate }: { navigate: Navigate }) {
  return <>
    <HomeInstitutionalHero navigate={navigate} />

    <section className="section container home-shortcuts" aria-label="Atalhos">
      <div className="home-tiles">
        <Link to="/diretorios/" className="home-tile">
          <span className="home-tile-kicker">Pareceres</span>
          <strong className="home-tile-number">{territoryStats.withPanorama}</strong>
          <p>municípios com parecer ou panorama publicado.</p>
          <span className="home-tile-cta">Abrir diretórios municipais <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>
        <Link to="/projeto-valoriza/" className="home-tile">
          <span className="home-tile-kicker">Inclusão socioprodutiva</span>
          <strong className="home-tile-title">Projeto Valoriza</strong>
          <p>Cadeia da reciclagem mais justa.</p>
          <span className="home-tile-cta">Abrir Projeto Valoriza <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>
        <Link to="/nota-tecnica/" className="home-tile">
          <span className="home-tile-kicker">Documento técnico</span>
          <strong className="home-tile-title">Nota Técnica</strong>
          <p>Reconhecimento dos catadores recicláveis.</p>
          <span className="home-tile-cta">Abrir Nota Técnica <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>
      </div>
    </section>

    <section className="section container">
      <div className="section-heading">
        <div><div className="eyebrow"><span className="eyebrow-line" /> Encontre um caminho</div><h2>Áreas para <span>começar.</span></h2></div>
        <p className="section-heading-note">Cada área responde a uma necessidade concreta da gestão de resíduos.</p>
      </div>
      <div className="home-areas">
        {homeAreas.map((area) => <article className="home-area" key={area.title}>
          <span className="card-kicker">{area.kicker}</span>
          <h3>{area.title}</h3>
          <p>{area.text}</p>
          <div className="home-area-actions">
            <Link to={area.href} className="text-link">{area.cta}<span className="sr-only">: {area.title}</span> <ArrowRight size={16} aria-hidden="true" /></Link>
            {area.external && <a className="text-link" href={area.external.href} target="_blank" rel="noopener">{area.external.label} <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>}
          </div>
        </article>)}
      </div>
    </section>

    <section className="section news-section">
      <div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Atualizações</div><h2>Notícias do <span>território.</span></h2></div><Link to="/noticias/" className="text-link">Ver todas <ArrowRight size={16} /></Link></div><div className="news-grid">{newsByDate.slice(0, 3).map((item) => <Link to={"/noticias/" + item.slug + "/"} className="news-card" key={item.slug}><div className="news-image"><img src={item.image} alt="" loading="lazy" /></div><div className="news-card-copy"><p className="news-card-meta"><span className="news-card-category">{item.category}</span><span>{item.date}</span></p><h3>{item.title}</h3></div></Link>)}</div></div>
    </section>
  </>
}
