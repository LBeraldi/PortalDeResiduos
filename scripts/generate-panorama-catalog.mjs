import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const sqlPath = path.join(root, 'BD', 'u195698278_HZYqx.sql')
const uploadsDir = path.join(root, 'public', 'uploads', '2025', '03')
const territoryPath = path.join(root, 'src', 'data', 'territory.ts')
const outputPath = path.join(root, 'src', 'data', 'panoramas.generated.ts')

const normalize = (value) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]/g, '')

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const sql = fs.readFileSync(sqlPath, 'utf8')
const territory = fs.readFileSync(territoryPath, 'utf8')
const namesBlock = territory.match(/const NAMES: string\[\] = \[(.*?)\n\]/s)?.[1]

if (!namesBlock) throw new Error(`Não foi possível localizar a lista de municípios em ${territoryPath}`)

const municipalityNames = [...namesBlock.matchAll(/'([^']+)'/g)].map((match) => match[1])
const uploadFiles = fs.readdirSync(uploadsDir)
const localPdfs = uploadFiles.filter((file) => /\.pdf$/i.test(file) && /panorama|gestao/i.test(file))
const localPdfSet = new Set(localPdfs)

const sqlRows = sql
  .split(/\r?\n/)
  .map((line, index) => {
    const guidMatch = line.match(/'(https?:\/\/portalresiduosms\.online\/wp-content\/uploads\/([^']+\.pdf))'/i)
    if (!guidMatch || !/panorama|gestao/i.test(guidMatch[2])) return null

    const idMatch = line.match(/^\((\d+),/)
    return {
      id: idMatch ? Number(idMatch[1]) : 0,
      line: index + 1,
      guid: guidMatch[1],
      file: decodeURIComponent(guidMatch[2].split('/').pop()),
    }
  })
  .filter(Boolean)
  .filter((row) => localPdfSet.has(row.file))

const aliases = {
  'Dois Irmãos do Buriti': ['doisirmaosdoburiti', 'doisirmaos'],
  'Ribas do Rio Pardo': ['ribasdoriopardo', 'ribasdorp'],
  'Rio Verde de Mato Grosso': ['rioverdematogrosso', 'rioverde'],
  'Nova Andradina': ['novaandradina'],
}

const candidatesFor = (name) => aliases[name] ?? [normalize(name)]
const assignments = new Map(municipalityNames.map((name) => [name, []]))

for (const row of sqlRows) {
  const fileKey = normalize(row.file)
  const matches = municipalityNames
    .flatMap((name) => candidatesFor(name).map((alias) => ({ name, alias })))
    .filter(({ alias }) => fileKey.includes(alias))
    .sort((left, right) => right.alias.length - left.alias.length)

  if (matches[0]) assignments.get(matches[0].name).push(row)
}

const preferredFiles = {
  dourados: 'PANORAMA-DA-GESTAO-DOS-RESIDUOS-SOLIDOS-DE-DOURADOS-MS.pdf',
}

const records = municipalityNames.map((name) => {
  const slug = slugify(name)
  const matches = assignments.get(name) ?? []
  const preferred = preferredFiles[slug]
  const selected = matches.find((row) => row.file === preferred) ?? matches[0]

  if (!selected) throw new Error(`Panorama não encontrado no SQL/uploads para: ${name}`)

  const cover = `${selected.file.replace(/\.pdf$/i, '')}-pdf.jpg`
  if (!uploadFiles.includes(cover)) throw new Error(`Capa não encontrada para ${name}: ${cover}`)

  return {
    slug,
    name,
    file: selected.file,
    cover,
    sizeBytes: fs.statSync(path.join(uploadsDir, selected.file)).size,
    sourcePostId: selected.id,
    sourceGuid: selected.guid,
  }
})

const generated = `// Este arquivo é gerado por scripts/generate-panorama-catalog.mjs.\n// Fonte: BD/u195698278_HZYqx.sql + public/uploads/2025/03.\n\nexport type PanoramaRecord = {\n  slug: string\n  name: string\n  file: string\n  cover: string\n  sizeBytes: number\n  sourcePostId: number\n  sourceGuid: string\n}\n\nexport const panoramaRecords: PanoramaRecord[] = ${JSON.stringify(records, null, 2)}\n`

fs.writeFileSync(outputPath, generated)
console.log(`Catálogo gerado: ${records.length} municípios, ${new Set(records.map((record) => record.file)).size} PDFs e ${new Set(records.map((record) => record.cover)).size} capas.`)
