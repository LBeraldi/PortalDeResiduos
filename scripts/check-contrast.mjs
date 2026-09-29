// E1. Contraste dos pares de tokens (WCAG 2.2). Sem dependências.
// Uso: node scripts/check-contrast.mjs
// Quando os tokens de 01-spec-design-system.md existirem em src/styles.css,
// trocar a lista fixa pela leitura de :root (tarefa D2.1).
const pares = [
  // [frente, fundo, mínimo, descrição]
  ['#1a231e', '#f5f3ec', 4.5, 'ink / paper'],
  ['#55605a', '#f5f3ec', 4.5, 'ink-soft / paper'],
  ['#55605a', '#fbfaf5', 4.5, 'ink-soft / paper-raised'],
  ['#636a61', '#f5f3ec', 4.5, 'ink-faint / paper'],
  ['#636a61', '#ece9de', 4.5, 'ink-faint / paper-sunk'],
  ['#1b4b3a', '#f5f3ec', 4.5, 'mata / paper'],
  ['#fbfaf5', '#1b4b3a', 4.5, 'raised / mata (botão)'],
  ['#edf0e9', '#12352a', 4.5, 'on-mata / mata-deep'],
  ['#a9c0b0', '#12352a', 4.5, 'on-mata-soft / mata-deep'],
  ['#d4a15f', '#12352a', 4.5, 'cerrado-claro / mata-deep'],
  ['#8a5a1f', '#f5f3ec', 4.5, 'cerrado-texto / paper'],
  ['#8a5a1f', '#fbfaf5', 4.5, 'cerrado-texto / raised'],
  ['#256b3f', '#e4efe6', 4.5, 'positive'],
  ['#8a5a1f', '#f6ecdc', 4.5, 'warning'],
  ['#a13f22', '#f6e4de', 4.5, 'negative'],
  ['#1b4b3a', '#ece9de', 4.5, 'info (mata / sunk)'],
  ['#8a8470', '#fbfaf5', 3, 'field-border / raised'],
  ['#b0742e', '#f5f3ec', 3, 'foco cerrado / paper'],
  ['#b0742e', '#fbfaf5', 3, 'foco cerrado / raised'],
  ['#d4a15f', '#12352a', 3, 'foco cerrado-claro / mata-deep'],
]
const lum = (h) => {
  const c = [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05) }
let falhas = 0
for (const [f, b, min, nome] of pares) {
  const r = ratio(f, b)
  const ok = r >= min
  if (!ok) falhas++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${nome.padEnd(32)} ${r.toFixed(2)} (mín. ${min})`)
}
process.exit(falhas ? 1 : 0)
