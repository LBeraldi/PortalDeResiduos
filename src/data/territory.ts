// Índice territorial baseado no catálogo extraído dos dados do WordPress.

import { panoramaRecords } from "./panoramas.generated"

export type Municipality = {
  slug: string
  name: string
  hasPanorama: boolean
}

/** Baixa a caixa, remove acentos e troca espaços por hífen — mesmo formato dos slugs de `cityRecords`. */
export const citySlug = (name: string): string =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')

const NAMES: string[] = [
  'Água Clara',
  'Alcinópolis',
  'Amambai',
  'Anastácio',
  'Anaurilândia',
  'Angélica',
  'Antônio João',
  'Aparecida do Taboado',
  'Aquidauana',
  'Aral Moreira',
  'Bandeirantes',
  'Bataguassu',
  'Batayporã',
  'Bela Vista',
  'Bodoquena',
  'Bonito',
  'Brasilândia',
  'Caarapó',
  'Camapuã',
  'Campo Grande',
  'Caracol',
  'Cassilândia',
  'Chapadão do Sul',
  'Corguinho',
  'Coronel Sapucaia',
  'Corumbá',
  'Costa Rica',
  'Coxim',
  'Deodápolis',
  'Dois Irmãos do Buriti',
  'Douradina',
  'Dourados',
  'Eldorado',
  'Fátima do Sul',
  'Figueirão',
  'Glória de Dourados',
  'Guia Lopes da Laguna',
  'Iguatemi',
  'Inocência',
  'Itaporã',
  'Itaquiraí',
  'Ivinhema',
  'Japorã',
  'Jaraguari',
  'Jardim',
  'Jateí',
  'Juti',
  'Ladário',
  'Laguna Carapã',
  'Maracaju',
  'Miranda',
  'Mundo Novo',
  'Naviraí',
  'Nioaque',
  'Nova Alvorada do Sul',
  'Nova Andradina',
  'Novo Horizonte do Sul',
  'Paraíso das Águas',
  'Paranaíba',
  'Paranhos',
  'Pedro Gomes',
  'Ponta Porã',
  'Porto Murtinho',
  'Ribas do Rio Pardo',
  'Rio Brilhante',
  'Rio Negro',
  'Rio Verde de Mato Grosso',
  'Rochedo',
  'Santa Rita do Pardo',
  'São Gabriel do Oeste',
  'Selvíria',
  'Sete Quedas',
  'Sidrolândia',
  'Sonora',
  'Tacuru',
  'Taquarussu',
  'Terenos',
  'Três Lagoas',
  'Vicentina',
]

export const municipalities: Municipality[] = NAMES.map((name) => {
  const slug = citySlug(name)
  return { slug, name, hasPanorama: panoramaRecords.some((panorama) => panorama.slug === slug) }
})

export const territoryStats = {
  total: municipalities.length,
  withPanorama: municipalities.filter((m) => m.hasPanorama).length,
  // Agregado estadual (estudo da União apresentado em audiência pública — fonte Semadesc, dez/2025).
  adequateDisposal: 76,
  adequateShare: '96,2%',
}
