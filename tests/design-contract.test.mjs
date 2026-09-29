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
