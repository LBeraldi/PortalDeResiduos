import { createContext, useContext } from 'react'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

export type NavigateFn = (to: string) => void

const NavContext = createContext<NavigateFn | null>(null)

export function NavProvider({ navigate, children }: { navigate: NavigateFn; children: ReactNode }) {
  return <NavContext.Provider value={navigate}>{children}</NavContext.Provider>
}

export function useNavigate(): NavigateFn {
  const navigate = useContext(NavContext)
  if (!navigate) throw new Error('useNavigate precisa estar dentro de <NavProvider>.')
  return navigate
}

const isInternal = (to: string) => to.startsWith('/') && !to.startsWith('//')

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

/**
 * Link interno. Renderiza um `<a href>` real — Ctrl/⌘/clique-do-meio abrem em
 * nova aba, a URL aparece ao passar o mouse, e crawlers enxergam o destino —
 * mas o clique esquerdo simples navega pela SPA sem recarregar a página.
 * URLs externas, `mailto:` e âncoras passam direto para o navegador.
 */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate()
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (!isInternal(to)) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
