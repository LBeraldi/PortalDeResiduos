import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, CornerDownLeft, Search, X } from 'lucide-react'
import { searchSite, type SearchEntry } from '../data/search'

type SiteSearchProps = {
  navigate: (to: string) => void
}

type SiteSearchRequest = {
  query?: string
}

const SITE_SEARCH_OPEN_EVENT = "portal-residuos:open-search"

/** Abre o painel global de busca já existente, opcionalmente com uma consulta. */
export function openSiteSearch(query = "") {
  window.dispatchEvent(new CustomEvent<SiteSearchRequest>(SITE_SEARCH_OPEN_EVENT, { detail: { query } }))
}

/**
 * Busca do portal. Índice 100% client-side (rotas, notícias, municípios e
 * publicações). Abre um painel modal sobre a página; `Esc` fecha; as setas
 * percorrem os resultados; `Enter` abre o resultado ativo.
 */
export function SiteSearch({ navigate }: SiteSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const results = useMemo(() => searchSite(query), [query])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    const openFromRequest = (event: Event) => {
      const request = event as CustomEvent<SiteSearchRequest>
      setQuery(request.detail?.query ?? "")
      setOpen(true)
    }
    window.addEventListener(SITE_SEARCH_OPEN_EVENT, openFromRequest)
    return () => window.removeEventListener(SITE_SEARCH_OPEN_EVENT, openFromRequest)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    triggerRef.current?.focus()
  }, [])

  const openEntry = useCallback(
    (entry: SearchEntry) => {
      if (entry.external) {
        window.open(entry.href, '_blank', 'noopener,noreferrer')
      } else {
        navigate(entry.href)
      }
      close()
    },
    [navigate, close],
  )

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previousOverflow
    }
  }, [open])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      openEntry(results[active])
    } else if (event.key === 'Tab') {
      // Trava o foco dentro do painel enquanto o modal está aberto.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="header-search"
        aria-label="Buscar no portal"
        onClick={() => setOpen(true)}
      >
        <Search size={18} aria-hidden="true" />
        <span className="header-search-label">Buscar</span>
      </button>

      {open &&
        createPortal(
          <div className="search-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
            <div
              ref={panelRef}
              className="search-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Buscar no portal"
              onKeyDown={onKeyDown}
            >
              <div className="search-field-row">
                <Search size={18} aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  className="search-input"
                  placeholder="Buscar páginas, notícias, municípios…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  autoComplete="off"
                />
                <button type="button" className="search-close" aria-label="Fechar busca" onClick={close}>
                  <X size={18} />
                </button>
              </div>

              <div className="search-results" aria-live="polite">
                {query.trim().length < 2 ? (
                  <p className="search-hint">
                    Digite ao menos duas letras. A busca cobre páginas do portal, notícias, municípios e publicações.
                  </p>
                ) : results.length === 0 ? (
                  <p className="search-hint">Nada encontrado para “{query}”. Tente outro termo.</p>
                ) : (
                  <ul id={listId} role="listbox" aria-label="Resultados">
                    {results.map((entry, index) => (
                      <li key={`${entry.kind}-${entry.href}`} role="option" aria-selected={index === active}>
                        <button
                          type="button"
                          className={`search-result${index === active ? ' is-active' : ''}`}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => openEntry(entry)}
                        >
                          <span className="search-result-kind">{entry.kind}</span>
                          <span className="search-result-label">{entry.label}</span>
                          {entry.external ? <ArrowUpRight size={15} aria-hidden="true" /> : <CornerDownLeft size={14} aria-hidden="true" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
