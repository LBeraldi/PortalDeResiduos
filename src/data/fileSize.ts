// Tamanho de arquivo para exibição (RC-1). O número vem do gerador (ADR-005), nunca digitado.

/** 3250585 → "3,1 MB"; 839680 → "820 KB"; sem tamanho → "". */
export function formatSize(bytes: number | undefined): string {
  if (!bytes || bytes <= 0) return ''
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb).toLocaleString('pt-BR')} KB`
  return `${(kb / 1024).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MB`
}
