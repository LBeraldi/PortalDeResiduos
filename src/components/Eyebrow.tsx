import type { ReactNode } from 'react'

/**
 * Rótulo estrutural (o "eyebrow" acima de um título). Substitui as cópias de
 * `SectionLabel` espalhadas pelos arquivos de página e o markup inline
 * `<div className="eyebrow">…`.
 */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`eyebrow ${className}`.trim()}>
      <span className="eyebrow-line" aria-hidden="true" />
      {children}
    </div>
  )
}
