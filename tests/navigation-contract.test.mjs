// NAV-4: nenhum link interno aponta para uma rota que não existe.
// Sem dependências; no mesmo estilo de tests/project-contract.test.mjs.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))

const siteMap = read('src/data/siteMap.ts')
const routes = new Set([...siteMap.matchAll(/page\(\s*['"]([^'"]+)['"]/g)].map((m) => m[1]))
const citySlugs = new Set([...read('src/data/panoramas.generated.ts').matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1]))
const newsSlugs = new Set([...siteMap.matchAll(/^\s*'([a-z0-9-]+)',?$/gm)].map((m) => m[1]))

const exists = (p) => {
  const clean = p.split('#')[0].split('?')[0]
  if (clean === '/' || routes.has(clean)) return true
  const cidade = clean.match(/^\/cidades\/([^/]+)\/$/)
  if (cidade) return citySlugs.has(cidade[1])
  const noticia = clean.match(/^\/noticias\/([^/]+)\/$/)
  if (noticia) return newsSlugs.has(noticia[1])
  return false
}

test('todo destino interno citado no código existe no mapa de rotas', () => {
  const files = walk('src').filter((f) => /\.(tsx?|mjs)$/.test(f) && !f.includes('generated') && !f.endsWith('siteMap.ts'))
  const quebrados = []
  for (const f of files) {
    const src = read(f)
    for (const m of src.matchAll(/['"`](\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/(?:#[a-z0-9-]+)?)['"`]/g)) {
      const alvo = m[1]
      if (alvo.startsWith('/uploads/')) continue
      if (!exists(alvo)) quebrados.push(`${f}: ${alvo}`)
    }
  }
  assert.deepEqual([...new Set(quebrados)], [])
})

// NAV-5: toda página de conteúdo tem pelo menos um link de entrada.
// Fora da regra: rotas legadas do WordPress, aliases (mesmo título e tipo de outra
// rota já alcançada), fichas de município (links gerados a partir do catálogo) e
// o índice de busca, que só lista rotas.
test('toda página de conteúdo do siteMap é destino de algum link', () => {
  const rotas = [...siteMap.matchAll(/page\(\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"](?:,\s*\{([^}]*)\})?/g)]
    .map((m) => ({ path: m[1], title: m[2], kind: m[3], legacy: /status: ['"]legacy['"]/.test(m[4] ?? '') }))
  const fontes = walk('src').filter((f) => /\.tsx?$/.test(f) && !f.includes('generated') && !f.endsWith('siteMap.ts') && !f.endsWith('search.ts'))
  const destinos = new Set(fontes.flatMap((f) => [...read(f).matchAll(/\b(?:to|href)\s*[=:]\s*\{?\s*['"`](\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/)(?:#[a-z0-9-]+)?['"`]/g)].map((m) => m[1])))
  const alcancados = new Set(rotas.filter((r) => destinos.has(r.path)).map((r) => `${r.kind}|${r.title}`))
  const orfas = rotas
    .filter((r) => r.path !== '/' && !r.legacy && r.kind !== 'cities' && r.kind !== 'article')
    .filter((r) => !alcancados.has(`${r.kind}|${r.title}`))
    .map((r) => r.path)
  assert.deepEqual(orfas, [])
})
