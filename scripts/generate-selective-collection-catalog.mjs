import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const sqlPath = path.join(root, 'BD', 'u195698278_HZYqx.sql')
const panoramasPath = path.join(root, 'src', 'data', 'panoramas.generated.ts')
const outputPath = path.join(root, 'src', 'data', 'selective-collection-plans.generated.ts')
const collectionPlanParentId = '1127'

const parseSqlRow = (line) => {
  let index = 1
  const values = []

  while (index < line.length) {
    while (/\s/.test(line[index] ?? '')) index += 1
    if (line[index] === ')') break

    if (line[index] === "'") {
      let value = ''
      index += 1
      while (index < line.length) {
        if (line[index] === '\\') {
          value += line[index + 1] ?? ''
          index += 2
          continue
        }
        if (line[index] === "'") {
          index += 1
          break
        }
        value += line[index]
        index += 1
      }
      values.push(value)
    } else {
      const start = index
      while (index < line.length && line[index] !== ',' && line[index] !== ')') index += 1
      values.push(line.slice(start, index).trim())
    }

    while (/\s/.test(line[index] ?? '')) index += 1
    if (line[index] === ',') index += 1
  }

  return values
}

const findWidgets = (nodes, widgets = []) => {
  for (const node of nodes ?? []) {
    if (node.widgetType === 'aux_testimonial') {
      const { title, content, link } = node.settings ?? {}
      if (title && link?.url) widgets.push({ title, description: content || '', url: link.url })
    }
    findWidgets(node.elements, widgets)
  }
  return widgets
}

const sql = fs.readFileSync(sqlPath, 'utf8')
const lines = sql.split(/\r?\n/)
const panoramaSource = fs.readFileSync(panoramasPath, 'utf8')
const namesBySlug = new Map(
  [...panoramaSource.matchAll(/"slug": "([^"]+)",\s+"name": "([^"]+)"/g)].map(([, slug, name]) => [slug, name]),
)

const elementorDataByPostId = new Map()
const pages = []

for (const line of lines) {
  if (!/^\(\d+,/.test(line)) continue
  const fields = parseSqlRow(line)

  if (fields.length === 23 && fields[17] === collectionPlanParentId && fields[20] === 'page' && fields[7] === 'publish') {
    pages.push({ id: fields[0], title: fields[5], slug: fields[11] })
  }

  if (fields.length === 4 && fields[2] === '_elementor_data') {
    elementorDataByPostId.set(fields[1], fields[3])
  }
}

const plans = pages.map((page) => {
  const serialized = elementorDataByPostId.get(page.id)
  if (!serialized) throw new Error(`Dados Elementor não encontrados para ${page.title} (${page.id})`)

  const documents = findWidgets(JSON.parse(serialized))
  if (!documents.length) throw new Error(`Documentos não encontrados para ${page.title} (${page.id})`)

  const primaryDocument = documents.find((document) => document.title === 'Plano Municipal de Coleta Seletiva' && !document.description.includes('ANEXO')) ?? documents[0]

  return {
    sourcePostId: Number(page.id),
    slug: page.slug,
    name: namesBySlug.get(page.slug) ?? page.title,
    documents,
    primaryDocumentUrl: primaryDocument.url,
  }
})

if (plans.length !== 15) throw new Error(`Esperados 15 municípios com plano de coleta seletiva; encontrados ${plans.length}`)

const generated = `// Gerado por scripts/generate-selective-collection-catalog.mjs.\n// Fonte: wp_posts e wp_postmeta (Elementor) em BD/u195698278_HZYqx.sql.\n\nexport type SelectiveCollectionDocument = {\n  title: string\n  description: string\n  url: string\n}\n\nexport type SelectiveCollectionPlan = {\n  sourcePostId: number\n  slug: string\n  name: string\n  documents: SelectiveCollectionDocument[]\n  primaryDocumentUrl: string\n}\n\nexport const selectiveCollectionPlans: SelectiveCollectionPlan[] = ${JSON.stringify(plans, null, 2)}\n`

fs.writeFileSync(outputPath, generated)
console.log(`Catálogo de coleta seletiva gerado: ${plans.length} municípios e ${plans.reduce((total, plan) => total + plan.documents.length, 0)} documentos.`)
