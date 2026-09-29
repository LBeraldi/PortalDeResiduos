// Municípios com panorama: identidade (slug, nome) e arquivos, derivados do catálogo gerado.

import { panoramaRecords } from './panoramas.generated'

export type CityRecord = {
  slug: string
  name: string
  file: string
  cover: string
  sizeBytes: number
  legacyPath?: string
}

export const cityRecords: CityRecord[] = panoramaRecords.map((panorama) => ({
  slug: panorama.slug,
  name: panorama.name,
  file: panorama.file,
  cover: panorama.cover,
  sizeBytes: panorama.sizeBytes,
  ...(panorama.slug === 'corumba' ? { legacyPath: '/corumba/' } : {}),
}))

/** Remove acentos e caixa para comparar nomes ("Água" casa com "agua"). */
export const normalizeName = (value: string) => value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
