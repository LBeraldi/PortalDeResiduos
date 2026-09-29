import { useMemo, useRef, useState, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { Badge } from './Badge'
import { Eyebrow } from './Eyebrow'
import { Link } from './router'
import { cityRecords, normalizeName } from '../data/cities'
import { selectiveCollectionPlans } from '../data/selective-collection-plans.generated'

type Filtro = 'todos' | 'com-plano'

const comPlano = new Set(selectiveCollectionPlans.map((plan) => plan.slug))
const inicial = (name: string) => normalizeName(name).charAt(0).toUpperCase()

type MunicipalityIndexProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
}

/**
 * Índice único dos municípios (CP-06), usado em /cidades/, /diretorios/ e
 * /panoramas-da-gestao-de-residuos/ (ADR-001). Busca sem acentos, filtro pelos
 * municípios com plano de coleta seletiva e salto por letra.
 */
export function MunicipalityIndex({ eyebrow, title, description }: MunicipalityIndexProps) {
  const [query, setQuery] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const inputRef = useRef<HTMLInputElement>(null)
  const termo = normalizeName(query.trim())

  const visiveis = useMemo(
    () => cityRecords.filter((city) => (filtro === 'todos' || comPlano.has(city.slug)) && normalizeName(city.name).includes(termo)),
    [filtro, termo],
  )
  const grupos = useMemo(() => {
    const porLetra = new Map<string, typeof visiveis>()
    for (const city of visiveis) porLetra.set(inicial(city.name), [...(porLetra.get(inicial(city.name)) ?? []), city])
    return [...porLetra.entries()]
  }, [visiveis])

  const limpar = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <section className="section container municipality-index" aria-labelledby="indice-municipios-titulo">
      <div className="municipality-index-head">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id="indice-municipios-titulo">{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="municipality-index-tools">
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Buscar município</span>
          <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar município" />
        </label>
        <div className="segmented" role="group" aria-label="Filtrar municípios">
          <button type="button" aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>
            Todos <span className="segmented-count">{cityRecords.length}</span>
          </button>
          <button type="button" aria-pressed={filtro === 'com-plano'} onClick={() => setFiltro('com-plano')}>
            Com plano de coleta seletiva <span className="segmented-count">{comPlano.size}</span>
          </button>
        </div>
      </div>

      {grupos.length > 0 && (
        <nav className="municipality-az" aria-label="Índice alfabético">
          {grupos.map(([letra]) => <a key={letra} href={`#municipios-${letra.toLowerCase()}`}>{letra}</a>)}
        </nav>
      )}

      <p className="municipality-index-count" aria-live="polite">
        {visiveis.length} de {cityRecords.length} municípios{termo ? <> para “{query.trim()}”</> : null}
      </p>

      {visiveis.length === 0 ? (
        <div className="municipality-index-empty">
          <p>Nenhum município encontrado para “{query}”.</p>
          <button type="button" className="button button-ghost" onClick={limpar}>Limpar busca</button>
        </div>
      ) : (
        <div className="municipality-groups">
          {grupos.map(([letra, cidades]) => (
            <section key={letra} className="municipality-group" aria-labelledby={`municipios-${letra.toLowerCase()}`}>
              <h3 id={`municipios-${letra.toLowerCase()}`}>{letra}</h3>
              <ul>
                {cidades.map((city) => (
                  <li key={city.slug}>
                    <Link to={`/cidades/${city.slug}/`} aria-label={`${city.name}: abrir ficha`}>{city.name}</Link>
                    {comPlano.has(city.slug) && <Badge variant="doc">Plano de coleta seletiva</Badge>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
