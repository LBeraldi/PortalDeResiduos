import { useId } from 'react'
import { ArrowRight } from 'lucide-react'
import { municipalities, territoryStats } from '../data/territory'
import { Link } from './router'

type TerritoryIndexProps = {
  navigate: (to: string) => void
  /** `full` (padrão) para herói da Home e página de cidades; `strip` para faixa compacta. */
  variant?: 'full' | 'strip'
  title?: string
}

/**
 * Elemento-assinatura do portal: os 79 municípios de Mato Grosso do Sul como um
 * índice único. Célula com panorama publicado abre a ficha do município; célula
 * sem panorama fica inerte (só enquanto o acervo estiver incompleto). Não
 * representa adequação de disposição por município — apenas a cobertura do acervo.
 */
export function TerritoryIndex({ navigate, variant = 'full', title = 'Onde o projeto atua' }: TerritoryIndexProps) {
  const headingId = useId()
  const { total, withPanorama } = territoryStats
  const pending = total - withPanorama
  const partial = pending > 0

  return (
    <section className={`territory territory--${variant}`} aria-labelledby={headingId}>
      <div className="territory-head">
        <h2 id={headingId}>{title}</h2>
        <p>
          {partial ? (
            <>
              {total} municípios acompanhados · <strong>{withPanorama}</strong> com panorama publicado
            </>
          ) : (
            <>
              <strong>{total}</strong> municípios de Mato Grosso do Sul · panorama publicado para todos
            </>
          )}
        </p>
      </div>

      <ul
        className="territory-grid"
        aria-label={
          partial
            ? `Índice de municípios: ${withPanorama} com panorama publicado, ${pending} em migração`
            : `Índice dos ${total} municípios de Mato Grosso do Sul`
        }
      >
        {municipalities.map((m) => (
          <li key={m.slug}>
            {m.hasPanorama ? (
              <Link to={`/cidades/${m.slug}/`} className="territory-cell is-linked">
                {m.name}
                <span className="sr-only"> — abrir panorama municipal</span>
              </Link>
            ) : (
              <span className="territory-cell" title={`${m.name} — panorama em migração`}>
                {m.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="territory-foot">
        {partial ? (
          <p className="territory-legend">
            <span className="territory-key is-linked" aria-hidden="true" /> panorama publicado
            <span className="territory-key" aria-hidden="true" /> em migração
          </p>
        ) : (
          <p className="territory-hint">Clique em um município para abrir o panorama de gestão de resíduos.</p>
        )}
        <Link to="/cidades/" className="text-link">
          Ver diretório de cidades <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
