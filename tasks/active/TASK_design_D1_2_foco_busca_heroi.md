# TASK — Mostrar o foco na busca do herói e corrigir a chave das sugestões

> Pacote de design: `docs/design-refactor/`. Specs: CP-04.1, CP-04.2. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

O campo da busca do herói tem `outline:0` e o formulário não tem `:focus-within`: quem navega por teclado não vê onde está. As sugestões usam `key={`-`}` em todos os itens.

## Objetivo

Foco sempre visível no campo; lista de sugestões sem aviso de chave no console.

## Não objetivos

- Mudar o visual do herói.
- Mudar a lógica de busca.

## Spec

- **Dado** o campo sem foco, **quando** chego nele com Tab, **então** o formulário mostra contorno de 2 px `--cerrado-claro` (5,78:1 sobre mata-deep).
- **Dado** digito 2 letras, **quando** as sugestões aparecem, **então** o console não mostra aviso de chave duplicada.
- **Dado** as sugestões abertas, **quando** uso setas e Enter, **então** o comportamento atual se mantém.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/HomePage.tsx` (HomeHeroSearch), `src/styles.css` (`.home-hero-search-form`)
- Fonte original, se houver: —
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Tab até o campo em 1440 e 390 | contorno visível, screenshot |
| E2 | Console com sugestões abertas | sem aviso de key |
| E3 | Teste de contrato | `HomePage.tsx` não contém `key={`-`}` |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [x] Acessibilidade e responsividade avaliadas (E7 e E8, 390 e 1440)
- [x] `npm run check:quality` passou
- [x] `npm run check:design` passou, com teto atualizado quando aplicável
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/components/HomePage.tsx` (chave `${kind}-${href}`), `src/styles.css` (`--cerrado-claro` e `:focus-within`), `tests/design-contract.test.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D1.2.md` — contorno 2 px no foco em 390 e 1440; avisos de chave 3 → 0.
- Limitações/riscos: CP-04.3 (`aria-activedescendant`) não coberto; a tarefa pede manter o comportamento das setas.
- Próximo passo: D1.3.
