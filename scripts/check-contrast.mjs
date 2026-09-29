// E1. Contraste dos pares de tokens (WCAG 2.2). Sem dependências.
// Uso: node scripts/check-contrast.mjs
// Lê os valores de :root em src/styles.css; os pares são declarados pelo nome do token.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8')
const bloco = css.match(/:root\s*{[^}]*}/)?.[0] ?? ''
const tokens = Object.fromEntries([...bloco.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b/g)].map((m) => [m[1], m[2]]))

const pares = [
  // [frente, fundo, mínimo, uso]
  ['ink', 'paper', 4.5, 'texto principal'],
  ['ink-soft', 'paper', 4.5, 'texto de apoio'],
  ['ink-soft', 'paper-raised', 4.5, 'texto de apoio em cartão'],
  ['ink-faint', 'paper', 4.5, 'metadados'],
  ['ink-faint', 'paper-sunk', 4.5, 'metadados em cabeçalho de tabela'],
  ['mata', 'paper', 4.5, 'links e títulos de cartão'],
  ['paper-raised', 'mata', 4.5, 'botão primário'],
  ['on-mata', 'mata-deep', 4.5, 'texto sobre mata'],
  ['on-mata-soft', 'mata-deep', 4.5, 'texto de apoio sobre mata'],
  ['cerrado-claro', 'mata-deep', 4.5, 'rótulo sobre mata'],
  ['cerrado-texto', 'paper', 4.5, 'categoria de notícia'],
  ['cerrado-texto', 'paper-raised', 4.5, 'categoria em cartão'],
  ['positive', 'positive-bg', 4.5, 'selo positivo'],
  ['warning', 'warning-bg', 4.5, 'selo "Em migração"'],
  ['negative', 'negative-bg', 4.5, 'erro de formulário'],
  ['mata', 'paper-sunk', 4.5, 'informação neutra'],
  ['field-border', 'paper-raised', 3, 'borda de campo (1.4.11)'],
  ['cerrado', 'paper', 3, 'anel de foco em papel'],
  ['cerrado', 'paper-raised', 3, 'anel de foco em cartão'],
  ['cerrado-claro', 'mata-deep', 3, 'anel de foco sobre mata'],
]
const lum = (h) => {
  const c = [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05) }
let falhas = 0
for (const [f, b, min, uso] of pares) {
  const nome = `${f} / ${b}`.padEnd(32)
  if (!tokens[f] || !tokens[b]) {
    falhas++
    console.log(`FAIL ${nome} token ausente em :root (${!tokens[f] ? f : b})`)
    continue
  }
  const r = ratio(tokens[f], tokens[b])
  const ok = r >= min
  if (!ok) falhas++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${nome} ${r.toFixed(2)} (mín. ${min}) ${uso}`)
}
process.exit(falhas ? 1 : 0)
