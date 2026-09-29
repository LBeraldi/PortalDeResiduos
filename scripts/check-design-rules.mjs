// E2–E5. Regras de design medidas no código. Sem dependências.
// Uso: node scripts/check-design-rules.mjs
// Funciona como catraca: falha se algum número passar do teto. Cada tarefa que
// melhora um número baixa o teto correspondente no mesmo PR.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))

// Tetos. Baseline medido em 2026-09-28 (versão 75c3614).
const TETO = {
  fonteAbaixoDe12px: 0, // D1.7: era 32 (DS-06)
  tamanhosDistintos: 5, // D1.7: era 13; meta 8 valores fixos fora de clamp() (DS-07)
  hexForaDoRoot: 0, // D2.1: era 14 (regra 1 do AGENTS)
  hexEmTsx: 0, // manter 0
  navegacaoPorBotao: 0, // D1.4: era 48 (CP-02)
}

// Lê src/styles.css seguindo os @import locais, na ordem (camadas de src/styles/, D2.8).
const lerCss = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')
  .replace(/@import '(\.\/[^']+)';/g, (_, arquivo) => lerCss(path.join(path.dirname(rel), arquivo)))
const css = lerCss('src/styles.css')
const rootBlock = css.match(/:root\s*{[^}]*}/)?.[0] ?? ''
const cssSemRoot = css.replace(rootBlock, '')

const sizes = [...css.matchAll(/font-size:\s*([^;}]+)/g)].map((m) => m[1].trim())
const px = (v) => {
  const m = v.match(/^([\d.]+)(rem|px|em)$/)
  if (!m) return null
  return m[2] === 'px' ? +m[1] : +m[1] * 16
}
const pequenas = sizes.filter((v) => { const n = px(v); return n !== null && n < 12 })
const distintos = new Set(sizes.filter((v) => !v.startsWith('clamp') && !v.startsWith('var(')))

const hexRe = /#[0-9a-fA-F]{3,8}\b/g
const hexForaDoRoot = (cssSemRoot.match(hexRe) ?? []).length
const tsx = walk('src').filter((f) => f.endsWith('.tsx'))
const hexEmTsx = tsx.reduce((n, f) => n + (read(f).match(hexRe) ?? []).length, 0)
const navegacaoPorBotao = tsx.reduce((n, f) => n + (read(f).match(/onClick=\{\(\)\s*=>\s*navigate\(/g) ?? []).length, 0)

const medido = {
  fonteAbaixoDe12px: pequenas.length,
  tamanhosDistintos: distintos.size,
  hexForaDoRoot,
  hexEmTsx,
  navegacaoPorBotao,
}
let falhas = 0
for (const [k, v] of Object.entries(medido)) {
  const ok = v <= TETO[k]
  if (!ok) falhas++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${k.padEnd(20)} ${String(v).padStart(3)} (teto ${TETO[k]})`)
}
if (pequenas.length) console.log(`     abaixo de 12px: ${[...new Set(pequenas)].join(', ')}`)
process.exit(falhas ? 1 : 0)
