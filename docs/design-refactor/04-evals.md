# 04. Evals

Eval-driven development: o estado atual já foi medido (baseline abaixo). Cada tarefa declara qual eval melhora e quais não podem piorar. Resultados de cada execução vão em `evals/AAAA-MM-DD-<tarefa>.md`, com resumo em `PROGRESS.md`.

## Baseline (2026-09-28, versão 75c3614)

| Métrica | Valor | Meta | Spec |
|---|---|---|---|
| `font-size` abaixo de 12 px | 32 declarações | 0 | DS-06 |
| Valores fixos de `font-size` | 13 | ≤ 8 | DS-07 |
| Hex fora de `:root` em `styles.css` | 14 | 0 | AGENTS regra 1 |
| `onClick={() => navigate(` | 48 | 0 | CP-02 |
| `<Link ` no código | 10 | cresce | CP-02 |
| Botão de menu visível em 390 px | não (x = 433) | sim | CP-01.1 |
| Altura `/` 1440 / 390 | 4.020 / 6.395 px | ≤ 3.200 / 4.800 | PG-01.5 |
| Altura `/panoramas-da-gestao-de-residuos/` 390 | 24.921 px | ≤ 5.000 | PG-02.3 |
| Altura `/cidades/` 390 | 10.530 px | ≤ 5.000 | PG-02.3 |
| Parte fixa do cabeçalho | 108 px | ≤ 72 | CP-01.3 |
| Rótulo do slide sobre mata-deep | 3,43:1 | ≥ 4,5 | DS-02 |
| Notícias da capa | 3 de 2021 | 3 mais recentes | PG-01.4 |
| Listagens distintas de municípios | 4 | 1 | PG-02.1 |

## E1. Contraste (determinístico)

`node scripts/check-contrast.mjs`. Todos os pares em OK. Roda em todo PR a partir da D0.2.

## E2 a E5. Regras no código (determinístico, catraca)

`node scripts/check-design-rules.mjs`. Mede fonte mínima, escala, hex fora de `:root`, hex em `.tsx` e navegação por botão. Falha se passar do teto; cada tarefa que melhora um número baixa o teto no mesmo PR. Nunca subir um teto sem ADR.

## E6. Testes de contrato (determinístico)

Em `tests/design-contract.test.mjs`, no mesmo estilo de `tests/project-contract.test.mjs` (leitura de fonte com `node:test`, sem dependências). Exemplos de asserções que cada tarefa adiciona no passo Red:

```js
test('a página inicial tem um único h1 fora do carrossel', () => {
  const src = read('src/components/HomePage.tsx')
  assert.equal((src.match(/<h1[\s>]/g) ?? []).length, 1)
  assert.doesNotMatch(src, /slide[^\n]*<h1/)
})
test('as notícias da capa saem ordenadas por data', () => {
  assert.doesNotMatch(read('src/components/HomePage.tsx'), /newsRecords\.slice\(0,\s*3\)/)
})
test('o rodapé não tem links sociais sem destino', () => {
  assert.doesNotMatch(read('src/App.tsx'), /href="#(facebook|linkedin)"/)
})
```

Para comportamento que depende de DOM (ordem real das notícias, foco), preferir extrair uma função pura (por exemplo `sortNewsByDate` em `src/data/news.ts`) e testá-la importando o `.ts` por um arquivo `.mjs` gerado no build, ou convertendo o dado para `.mjs`. Se nenhuma opção couber sem dependência, registrar como cenário manual (E8).

## E7. Navegador (métrico, Playwright fora do repo por enquanto)

O repositório não tem Playwright e o `decision-log.md` decidiu não adicionar runner agora. Até a ADR-003 ser respondida, o agente mede com um Playwright instalado **fora** do projeto (global ou em outra pasta), sem alterar `package.json`:

```js
// medir.mjs (não versionar) — node medir.mjs com o dev server em :5173
import { chromium } from 'playwright'
const rotas = ['/', '/cidades/', '/diretorios/', '/panoramas-da-gestao-de-residuos/', '/cidades/bonito/', '/noticias/']
const b = await chromium.launch()
for (const w of [390, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage()
  for (const r of rotas) {
    await p.goto('http://localhost:5173' + r); await p.waitForLoadState('networkidle')
    const m = await p.evaluate(() => ({
      altura: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      h1: document.querySelectorAll('h1').length,
      menu: (() => { const t = document.querySelector('.menu-toggle'); return t ? Math.round(t.getBoundingClientRect().right) : null })(),
      titulo: document.title,
    }))
    console.log(w, r, JSON.stringify(m))
  }
}
await b.close()
```

Se a ADR-003 aprovar `@playwright/test` e `@axe-core/playwright` como devDependencies, isto vira `tests/e2e/` e entra no gate, com axe exigindo 0 violações `serious`/`critical`.

## E8. Gate manual de interface (já existe no repo)

Conforme `docs/development/quality-gates.md`: desktop e celular, fluxo principal, teclado/foco, console, movimento reduzido. Registrar no eval da tarefa.

## E9. Rubrica visual

`templates/rubrica-visual.md`, aplicada a screenshots antes/depois em 390 e 1440. Pode ser pontuada por um LLM como avaliador, mas a nota final é do humano no review. Nenhum critério pode cair em relação ao "antes".
