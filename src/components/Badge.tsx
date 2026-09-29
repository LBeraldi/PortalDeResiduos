import type { ReactNode } from 'react'

export type BadgeVariant = 'doc' | 'positive' | 'warning' | 'outline'

/** Selo de registro (CP-08): formato de arquivo, disponibilidade, "Em migração". */
export function Badge({ variant = 'doc', children }: { variant?: BadgeVariant; children: ReactNode }) {
  return <span className={`badge badge--${variant}`}>{children}</span>
}
