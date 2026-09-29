import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  image?: string
  /** Trilha de navegação, mostrada acima da sobrelinha e do título (CP-10.1). */
  crumbs?: Crumb[]
  /** Conteúdo curto abaixo da descrição, como selos. */
  children?: ReactNode
}

/**
 * Herói de página compartilhado. Substitui os componentes quase idênticos que
 * existiam em InstitutionalPages, ResourcePages, ProductionPages, NewsPages,
 * LegacyPages e o antigo `PageIntro` de App.tsx. Sempre em papel: o verde-mata
 * fica para a página inicial e o rodapé (CP-10.2).
 */
export function PageHero({ eyebrow, title, description, image, crumbs, children }: PageHeroProps) {
  return (
    <section className={`page-hero${image ? ' has-figure' : ''}`}>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          {crumbs && <Breadcrumbs items={crumbs} className="page-hero-crumbs" />}
          <div className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" /> {eyebrow}
          </div>
          <h1>{title}</h1>
          {description && <p className="page-hero-desc">{description}</p>}
          {children && <div className="page-hero-extra">{children}</div>}
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
