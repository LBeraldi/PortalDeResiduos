import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

const read = (relativePath) => {
  const absolutePath = path.join(root, relativePath)
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${relativePath}: arquivo esperado não encontrado`)
    return ''
  }
  return fs.readFileSync(absolutePath, 'utf8')
}

const normalizeRoute = (value) => {
  const clean = value.split(/[?#]/)[0]
  if (clean === '/') return '/'
  return `/${clean.replace(/^\/+|\/+$/g, '')}/`
}

const siteMap = read('src/data/siteMap.ts')
const routePaths = [...siteMap.matchAll(/page\(\s*(['"])(.*?)\1/g)].map((match) => match[2])
const normalizedRoutes = routePaths.map(normalizeRoute)
const duplicateRoutes = [...new Set(normalizedRoutes.filter((route, index) => normalizedRoutes.indexOf(route) !== index))]

if (duplicateRoutes.length) failures.push(`siteMap: rotas duplicadas após normalização: ${duplicateRoutes.join(', ')}`)
if (!routePaths.includes('/diretorios/')) failures.push('siteMap: rota canônica /diretorios/ ausente')
if (!siteMap.includes("'directories'")) failures.push('siteMap: RouteKind directories ausente')

const panoramaSource = read('src/data/panoramas.generated.ts')
const panoramaFiles = [...panoramaSource.matchAll(/"file":\s*"([^"]+)"/g)].map((match) => match[1])
if (panoramaFiles.length === 0) failures.push('panoramas.generated.ts: nenhum registro encontrado')
for (const file of panoramaFiles) {
  const asset = path.join(root, 'public', 'uploads', '2025', '03', file)
  if (!fs.existsSync(asset)) failures.push(`panorama: arquivo ausente em public/uploads/2025/03/${file}`)
}

const selectiveSource = read('src/data/selective-collection-plans.generated.ts')
const selectivePlans = [...selectiveSource.matchAll(/"sourcePostId":\s*(\d+)/g)]
if (selectivePlans.length !== 15) failures.push(`selective-collection: esperados 15 planos, encontrados ${selectivePlans.length}`)

for (const relativePath of [
  'AGENTS.md',
  'docs/development/context.md',
  'docs/development/quality-gates.md',
  'tasks/templates/TASK_template.md',
]) read(relativePath)

if (failures.length) {
  console.error('Falhas de validação do projeto:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`Validação do projeto OK: ${routePaths.length} rotas, ${panoramaFiles.length} panoramas e ${selectivePlans.length} planos.`)
}
