import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')

test('o mapa de rotas mantém a entrada canônica de Diretórios', () => {
  const source = read('src/data/siteMap.ts')
  assert.match(source, /page\(['"]\/diretorios\/['"],\s*['"]Diretórios['"],\s*['"]directories['"]\s*,/)
})

test('os catálogos gerados têm conteúdo e origem versionada no projeto', () => {
  const panoramas = read('src/data/panoramas.generated.ts')
  const plans = read('src/data/selective-collection-plans.generated.ts')
  assert.match(panoramas, /export const panoramaRecords/)
  assert.match(panoramas, /"sourcePostId"/)
  assert.match(plans, /export const selectiveCollectionPlans/)
  assert.match(plans, /"primaryDocumentUrl"/)
})

test('o contrato de desenvolvimento está disponível para o próximo ciclo', () => {
  for (const relativePath of [
    'AGENTS.md',
    'docs/development/context.md',
    'docs/development/quality-gates.md',
    'docs/development/spec-template.md',
    'docs/development/eval-template.md',
  ]) assert.ok(fs.existsSync(path.join(root, relativePath)), relativePath)
})
