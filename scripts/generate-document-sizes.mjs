// Tamanho dos documentos locais do acervo (ADR-005, estendida aos documentos de
// src/data/documents.ts). Uso: npm run sync:data
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = fs.readFileSync(path.join(root, 'src/data/documents.ts'), 'utf8')
const prefix = source.match(/const U = '([^']+)'/)?.[1]
if (!prefix) throw new Error('documents.ts: prefixo de uploads (const U) não encontrado')

const hrefs = [...source.matchAll(/href: `\$\{U\}([^`]+)`/g)].map((m) => prefix + m[1])
if (hrefs.length === 0) throw new Error('documents.ts: nenhum href encontrado')

const sizes = Object.fromEntries(hrefs.map((href) => {
  const file = path.join(root, 'public', href)
  if (!fs.existsSync(file)) throw new Error(`Arquivo não encontrado: public${href}`)
  return [href, fs.statSync(file).size]
}))

const out = `// Este arquivo é gerado por scripts/generate-document-sizes.mjs.\n// Fonte: src/data/documents.ts + public/uploads.\n\nexport const documentSizes: Record<string, number> = ${JSON.stringify(sizes, null, 2)}\n`
fs.writeFileSync(path.join(root, 'src/data/document-sizes.generated.ts'), out)
console.log(`Tamanhos gerados: ${hrefs.length} documentos.`)
