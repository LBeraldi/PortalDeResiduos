import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react'

export type AlertTone = 'warning' | 'success' | 'error'

const ICONS = { warning: TriangleAlert, success: CircleCheck, error: CircleAlert } as const

/** Aviso na página (CP-08). Só o tom `error` interrompe o leitor de tela. */
export function Alert({ tone, title, children }: { tone: AlertTone; title: string; children?: ReactNode }) {
  const Icon = ICONS[tone]
  return (
    <div className={`alert alert--${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <Icon size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}
