import { Link } from './router'

export type Crumb = { label: string; href?: string }

/**
 * Trilha de navegação única do portal. Substitui as seis cópias que existiam,
 * uma por arquivo de página, com duas APIs diferentes. O último item sem `href`
 * é a página atual; com `href`, é um nível acima (a notícia não repete o título).
 */
export function Breadcrumbs({ items, className = 'container' }: { items: Crumb[]; className?: string }) {
  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Trilha de navegação">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`}>
              {item.href ? (
                <Link to={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
              {!last && (
                <span className="breadcrumbs-sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
