// Contratos do refinamento de design (docs/design-refactor/).
// Sem dependências; no mesmo estilo de tests/project-contract.test.mjs.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

test('D0.2: check:quality roda o gate de design', () => {
  const scripts = JSON.parse(read('package.json')).scripts
  assert.match(scripts['check:design'], /check-contrast\.mjs/)
  assert.match(scripts['check:design'], /check-design-rules\.mjs/)
  assert.match(scripts['check:quality'], /npm run check:design/)
})

test('D1.1: no celular o logo é recortado na marca do projeto e o botão de menu tem 44 px', () => {
  const css = read('src/styles.css')
  const mobile = [...css.matchAll(/@media \(max-width: 900px\) \{([\s\S]*?)\n\}/g)].map((m) => m[1]).join('\n')
  assert.match(mobile, /\.brand img \{[^}]*object-fit: cover[^}]*object-position: left/)
  assert.match(mobile, /\.menu-toggle \{[^}]*width: 44px[^}]*height: 44px/)
})

test('D1.1: Esc fecha o menu móvel e devolve o foco ao botão', () => {
  const app = read('src/App.tsx')
  assert.match(app, /event\.key !== 'Escape'/)
  assert.match(app, /menuToggleRef\.current\?\.focus\(\)/)
})

test('D1.2: a busca do herói mostra foco e as sugestões têm chave única', () => {
  const home = read('src/components/HomePage.tsx')
  assert.doesNotMatch(home, /key=\{`-`\}/)
  assert.match(home, /key=\{`\$\{entry\.kind\}-\$\{entry\.href\}`\}/)
  const css = read('src/styles.css')
  assert.match(css, /--cerrado-claro: #d4a15f;/)
  assert.match(css, /\.home-hero-search-form:focus-within \{[^}]*outline: 2px solid var\(--cerrado-claro\)/)
})

test('D1.3: a página inicial tem um único h1 fixo, fora do carrossel', () => {
  const home = read('src/components/HomePage.tsx')
  assert.equal((home.match(/<h1[\s>]/g) ?? []).length, 1)
  assert.match(home, /<h1[^>]*>Informação para dar o destino certo\.<\/h1>/)
  assert.doesNotMatch(home, /<h1>\{slide\.title\}<\/h1>/)
})

test('D1.3: destaques trocam a cada 8 s, com pausa e região viva só quando pausado', () => {
  const home = read('src/components/HomePage.tsx')
  assert.match(home, /aria-roledescription="carrossel" aria-label="Destaques"/)
  assert.match(home, /setInterval\([^\n]*, 8000\)/)
  assert.match(home, /"Pausar destaques"/)
  assert.match(home, /"Continuar destaques"/)
  assert.match(home, /className="home-hero-slides" aria-live=\{paused \? "polite" : "off"\}/)
})

test('D1.4: navegação interna usa <Link>, nunca <a href="/…"> nem botão com navigate()', () => {
  const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
  for (const f of walk('src').filter((f) => f.endsWith('.tsx') && !f.endsWith('router.tsx'))) {
    const src = read(f)
    assert.doesNotMatch(src, /<a [^>]*href="\/(?!uploads\/)/, f)
    assert.doesNotMatch(src, /onClick=\{\(\)\s*=>\s*navigate\(/, f)
  }
})

test('D1.5: capa e arquivo mostram as notícias da mais recente para a mais antiga', async () => {
  const { sortByDate } = await import('../src/data/newsDate.ts')
  const datas = [...read('src/pages/NewsPages.tsx').matchAll(/date: '([^']+)'/g)].map((m) => ({ date: m[1] }))
  assert.equal(datas.length, 8)
  const ordem = sortByDate(datas).map((n) => n.date)
  assert.deepEqual(ordem.slice(0, 3), ['20 de dezembro de 2025', '20 de dezembro de 2025', '15 de dezembro de 2021'])
  assert.equal(ordem.at(-1), '25 de outubro de 2021')
  assert.doesNotMatch(read('src/components/HomePage.tsx'), /newsRecords\.slice\(0,\s*3\)/)
  assert.match(read('src/pages/NewsPages.tsx'), /export const newsByDate = sortByDate\(newsRecords\)/)
})
