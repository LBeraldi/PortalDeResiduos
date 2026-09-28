import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  image?: string
  /** `paper` (padrão) para a maioria das páginas; `mata` para poucas telas de alto impacto. */
  tone?: 'paper' | 'mata'
}

/**
 * Herói de página compartilhado. Substitui os componentes quase idênticos que
 * existiam em InstitutionalPages, ResourcePages, ProductionPages, NewsPages,
 * LegacyPages e o antigo `PageIntro` de App.tsx.
 */
export function PageHero({ eyebrow, title, description, image, tone = 'paper' }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${tone}${image ? ' has-figure' : ''}`}>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" /> {eyebrow}
          </div>
          <h1>{title}</h1>
          {description && <p className="page-hero-desc">{description}</p>}
        </div>
        {image && (
          <div className="page-hero-figure">
            <img src={image} alt="" loading="lazy" decoding="async" />
          </div>
        )}
      </div>
    </section>
  )
}
