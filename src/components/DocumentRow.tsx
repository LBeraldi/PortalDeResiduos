import { ExternalLink, FileText } from 'lucide-react'
import { formatSize } from '../data/fileSize'

export type DocumentRowProps = {
  title: string
  /** Tipo do documento: "Panorama municipal", "Nota técnica", "Plano de coleta seletiva"… */
  type: string
  href: string
  /** "PDF", "DOCX"… Omitido em links do Google Drive, cujo formato não é conhecido. */
  format?: string
  sizeBytes?: number
  origin: 'local' | 'drive'
  /** Capa do documento, quando existe; senão, ícone de arquivo. */
  cover?: string
  /** Frase curta já publicada sobre o documento. */
  description?: string
}

/** Linha de documento (CP-07): miniatura, título, metadados em registro e a ação de abrir. */
export function DocumentRow({ title, type, href, format, sizeBytes, origin, cover, description }: DocumentRowProps) {
  const local = origin === 'local'
  const size = local ? formatSize(sizeBytes) : ''
  const formatAndSize = [format, size].filter(Boolean).join(' · ')
  const action = local ? `Abrir ${format ?? 'arquivo'}` : 'Abrir no Drive'
  return (
    <div className="document-row">
      <span className="document-row-thumb" aria-hidden="true">
        {cover ? <img src={cover} alt="" loading="lazy" decoding="async" /> : <FileText size={22} />}
      </span>
      <div className="document-row-body">
        <h3>{title}</h3>
        {description && <p className="document-row-desc">{description}</p>}
        <p className="document-row-meta">
          <span>{type}</span>
          {formatAndSize && <span>{formatAndSize}</span>}
          <span>{local ? 'Arquivo local' : 'Google Drive'}</span>
        </p>
      </div>
      <a className="button button-ghost document-row-action" href={href} target="_blank" rel="noopener">
        {action} <ExternalLink size={15} aria-hidden="true" />
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </div>
  )
}
