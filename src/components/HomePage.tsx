import { type FormEvent, useEffect, useRef, useState } from "react"
import { ArrowRight, BarChart3, BookOpen, ChevronLeft, ChevronRight, Pause, Play, Recycle, Search } from "lucide-react"
import { openSiteSearch } from "./SiteSearch"
import { newsRecords } from "../pages/NewsPages"
import { territoryStats } from "../data/territory"
import { searchSite, type SearchEntry } from "../data/search"
import { Link } from "./router"

const ASSET = "/uploads/"
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

const homeAreas = [
  { icon: <BarChart3 />, kicker: "Ferramenta digital", title: "Apoio a decisão", text: "Indicadores e cenários para qualificar o gerenciamento municipal.", href: "/apoio-a-decisao/", image: "/uploads/2023/07/machine-learning.png" },
  { icon: <Recycle />, kicker: "Inclusão socioprodutiva", title: "Cooperativas", text: "Materiais para fortalecer a organização e o trabalho dos catadores.", href: "/cooperativas/", image: "/uploads/2022/08/cartilha_frente.png" },
  { icon: <BookOpen />, kicker: "Biblioteca pública", title: "Publicações", text: "Estudos, artigos e notas técnicas para consulta e compartilhamento.", href: "/publicacoes/", image: "/uploads/2025/12/Revista-IBRAPARC-pdf.jpg" },
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

    <section className="section container home-summary">
      <div className="home-summary-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> Um acervo para agir</div>
        <h2>Conhecimento organizado para <span>virar ação.</span></h2>
        <p>Diagnósticos, planos, publicações e ferramentas para aproximar informação de quem planeja e de quem participa do cotidiano das cidades.</p>
        <div className="home-summary-actions">
          <Link to="/producoes-do-convenio/" className="button button-dark">Explorar produções <ArrowRight size={16} /></Link>
          <Link to="/cidades/" className="text-link">Ver municípios <ArrowRight size={16} /></Link>
        </div>
      </div>
      <div className="home-summary-mosaic" aria-label="Principais áreas do portal">
        <Link to="/diretorios/" className="home-impact-card home-impact-card--territory">
          <span className="home-impact-label">Pareceres</span>
          <strong>{territoryStats.withPanorama}</strong>
          <p>municípios com parecer ou panorama publicado.</p>
          <span className="home-impact-stamp">MS</span>
          <span className="sr-only"> — abrir diretórios municipais</span>
        </Link>
        <Link to="/projeto-valoriza/" className="home-impact-card home-impact-card--image">
          <img src="/uploads/2021/07/JOB-090-Banner-Projeto-Resíduos-Sólidos.jpg" alt="Trabalhadores e materiais da cadeia da reciclagem" loading="lazy" />
          <div><span className="home-impact-label">Inclusão socioprodutiva</span><strong>Projeto Valoriza</strong><p>Cadeia da reciclagem mais justa.</p></div>
          <span className="sr-only"> — abrir Projeto Valoriza</span>
        </Link>
        <Link to="/nota-tecnica/" className="home-impact-card home-impact-card--change">
          <span className="home-impact-label">Documento técnico</span>
          <strong>Notas Técnicas</strong>
          <p>Reconhecimento dos catadores recicláveis.</p>
          <small>Publicação <span>·</span> Projeto Valoriza</small>
          <span className="sr-only"> — abrir Nota Técnica</span>
        </Link>
      </div>
    </section>

    <section className="section container">
      <div className="section-heading">
        <div><div className="eyebrow"><span className="eyebrow-line" /> Encontre um caminho</div><h2>Áreas para <span>começar.</span></h2></div>
        <p className="section-heading-note">Cada área responde a uma necessidade concreta da gestão de resíduos.</p>
      </div>
      <div className="home-areas">
        {homeAreas.map((area) => <Link to={area.href} className="feature-card" key={area.title}><div className="feature-visual"><img src={area.image} alt="" loading="lazy" /><span className="card-icon">{area.icon}</span></div><div className="feature-card-content"><span className="card-kicker">{area.kicker}</span><h3>{area.title}</h3><p>{area.text}</p><span className="card-arrow">Acessar <ArrowRight size={17} /></span></div></Link>)}
      </div>
    </section>

    <section className="section news-section">
      <div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Atualizações</div><h2>Notícias do <span>território.</span></h2></div><Link to="/noticias/" className="text-link">Ver todas <ArrowRight size={16} /></Link></div><div className="news-grid">{newsRecords.slice(0, 3).map((item) => <Link to={"/noticias/" + item.slug + "/"} className="news-card" key={item.slug}><div className="news-image"><img src={item.image} alt="" loading="lazy" /><span className="news-date">{item.date}</span></div><div className="news-card-copy"><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-link">Ler notícia <ArrowRight size={15} /></span></div></Link>)}</div></div>
    </section>

    <section className="section container reverse-strip"><div className="reverse-art"><img src={ASSET + "2021/10/logistica-reversa-ilust.png"} alt="Ciclo de logística reversa" loading="lazy" /></div><div className="reverse-copy"><div className="eyebrow"><span className="eyebrow-line" /> Sistema estadual</div><h2>Logística <span>Reversa</span></h2><p>Um caminho para que embalagens retornem ao setor empresarial e tenham destinação ambientalmente adequada.</p><Link to="/logistica-reversa/" className="text-link">Entender o sistema <ArrowRight size={16} /></Link></div></section>
  </>
}
