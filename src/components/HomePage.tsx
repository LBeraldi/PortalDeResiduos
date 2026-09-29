import { type FormEvent, useEffect, useRef, useState } from "react"
import { ArrowRight, BarChart3, BookOpen, ChevronLeft, ChevronRight, Recycle, Search } from "lucide-react"
import { openSiteSearch } from "./SiteSearch"
import { newsRecords } from "../pages/NewsPages"
import { territoryStats } from "../data/territory"
import { searchSite, type SearchEntry } from "../data/search"

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

function InstitutionalSlideContent({ slide }: { slide: InstitutionalSlide }) {
  return <>
    <p className="home-hero-slide-label">{slide.label}</p>
    <h1>{slide.title}</h1>
    <p>{slide.text}</p>
    {slide.stat && slide.statLabel && <div className="home-hero-stat"><strong>{slide.stat}</strong><span>{slide.statLabel}</span></div>}
  </>
}

function HomeInstitutionalHero({ navigate }: { navigate: Navigate }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [enteringSlide, setEnteringSlide] = useState<number | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<"next" | "previous">("next")
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const slide = institutionalSlides[activeSlide]

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || enteringSlide !== null) return
    const interval = window.setInterval(() => {
      setTransitionDirection("next")
      setEnteringSlide((activeSlide + 1) % institutionalSlides.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [activeSlide, enteringSlide, paused, reducedMotion])

  const showSlide = (next: number, direction: "next" | "previous") => {
    const normalized = (next + institutionalSlides.length) % institutionalSlides.length
    if (normalized === activeSlide || enteringSlide !== null) return
    if (reducedMotion) {
      setActiveSlide(normalized)
      return
    }
    setTransitionDirection(direction)
    setEnteringSlide(normalized)
  }

  const finishTransition = () => {
    if (enteringSlide === null) return
    setActiveSlide(enteringSlide)
    setEnteringSlide(null)
  }

  return (
    <section className="home-institutional-hero" id="sobre-projeto" aria-label="Sobre o Projeto Resíduos Sólidos">
      <div className="container home-institutional-hero-inner">
        <div
          className="home-hero-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Sobre o Projeto Resíduos Sólidos"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
          }}
        >
          <div className="eyebrow home-hero-eyebrow"><span className="eyebrow-line" /> Projeto Resíduos Sólidos — Disposição Legal</div>
          <div className="home-hero-slide-viewport">
            <div className={"home-hero-slide" + (enteringSlide !== null ? " is-leaving to-" + transitionDirection : "")} aria-live="off" aria-hidden={enteringSlide !== null}><InstitutionalSlideContent slide={slide} /></div>
            {enteringSlide !== null && <div className={"home-hero-slide is-entering from-" + transitionDirection} aria-live="off" onAnimationEnd={finishTransition}><InstitutionalSlideContent slide={institutionalSlides[enteringSlide]} /></div>}
          </div>
          <div className="home-hero-controls">
            <button type="button" className="home-hero-nav" onClick={() => showSlide(activeSlide - 1, "previous")} aria-label="Mostrar mensagem anterior" disabled={enteringSlide !== null}><ChevronLeft size={17} /></button>
            <div className="home-hero-dots" aria-label="Selecionar mensagem institucional">
              {institutionalSlides.map((item, index) => <button type="button" key={item.label} className={index === activeSlide ? "is-active" : ""} onClick={() => showSlide(index, index > activeSlide ? "next" : "previous")} aria-label={"Mostrar mensagem " + (index + 1) + ": " + item.label} aria-current={index === activeSlide ? "true" : undefined} disabled={enteringSlide !== null}><span className="sr-only">{item.label}</span></button>)}
            </div>
            <button type="button" className="home-hero-nav" onClick={() => showSlide(activeSlide + 1, "next")} aria-label="Mostrar próxima mensagem" disabled={enteringSlide !== null}><ChevronRight size={17} /></button>
          </div>
        </div>
        <HomeHeroSearch navigate={navigate} />
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
          <button type="button" className="button button-dark" onClick={() => navigate("/producoes-do-convenio/")}>Explorar produções <ArrowRight size={16} /></button>
          <button type="button" className="text-link" onClick={() => navigate("/cidades/")}>Ver municípios <ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="home-summary-mosaic" aria-label="Principais áreas do portal">
        <button type="button" className="home-impact-card home-impact-card--territory" onClick={() => navigate("/diretorios/")}>
          <span className="home-impact-label">Pareceres</span>
          <strong>{territoryStats.withPanorama}</strong>
          <p>municípios com parecer ou panorama publicado.</p>
          <span className="home-impact-stamp">MS</span>
          <span className="sr-only"> — abrir diretórios municipais</span>
        </button>
        <button type="button" className="home-impact-card home-impact-card--image" onClick={() => navigate("/projeto-valoriza/")}>
          <img src="/uploads/2021/07/JOB-090-Banner-Projeto-Resíduos-Sólidos.jpg" alt="Trabalhadores e materiais da cadeia da reciclagem" loading="lazy" />
          <div><span className="home-impact-label">Inclusão socioprodutiva</span><strong>Projeto Valoriza</strong><p>Cadeia da reciclagem mais justa.</p></div>
          <span className="sr-only"> — abrir Projeto Valoriza</span>
        </button>
        <button type="button" className="home-impact-card home-impact-card--change" onClick={() => navigate("/nota-tecnica/")}>
          <span className="home-impact-label">Documento técnico</span>
          <strong>Notas Técnicas</strong>
          <p>Reconhecimento dos catadores recicláveis.</p>
          <small>Publicação <span>·</span> Projeto Valoriza</small>
          <span className="sr-only"> — abrir Nota Técnica</span>
        </button>
      </div>
    </section>

    <section className="section container">
      <div className="section-heading">
        <div><div className="eyebrow"><span className="eyebrow-line" /> Encontre um caminho</div><h2>Áreas para <span>começar.</span></h2></div>
        <p className="section-heading-note">Cada área responde a uma necessidade concreta da gestão de resíduos.</p>
      </div>
      <div className="home-areas">
        {homeAreas.map((area) => <button type="button" className="feature-card" key={area.title} onClick={() => navigate(area.href)}><div className="feature-visual"><img src={area.image} alt="" loading="lazy" /><span className="card-icon">{area.icon}</span></div><div className="feature-card-content"><span className="card-kicker">{area.kicker}</span><h3>{area.title}</h3><p>{area.text}</p><span className="card-arrow">Acessar <ArrowRight size={17} /></span></div></button>)}
      </div>
    </section>

    <section className="section news-section">
      <div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Atualizações</div><h2>Notícias do <span>território.</span></h2></div><button type="button" className="text-link" onClick={() => navigate("/noticias/")}>Ver todas <ArrowRight size={16} /></button></div><div className="news-grid">{newsRecords.slice(0, 3).map((item) => <button type="button" className="news-card" key={item.slug} onClick={() => navigate("/noticias/" + item.slug + "/")}><div className="news-image"><img src={item.image} alt="" loading="lazy" /><span className="news-date">{item.date}</span></div><div className="news-card-copy"><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-link">Ler notícia <ArrowRight size={15} /></span></div></button>)}</div></div>
    </section>

    <section className="section container reverse-strip"><div className="reverse-art"><img src={ASSET + "2021/10/logistica-reversa-ilust.png"} alt="Ciclo de logística reversa" loading="lazy" /></div><div className="reverse-copy"><div className="eyebrow"><span className="eyebrow-line" /> Sistema estadual</div><h2>Logística <span>Reversa</span></h2><p>Um caminho para que embalagens retornem ao setor empresarial e tenham destinação ambientalmente adequada.</p><button type="button" className="text-link" onClick={() => navigate("/logistica-reversa/")}>Entender o sistema <ArrowRight size={16} /></button></div></section>
  </>
}
