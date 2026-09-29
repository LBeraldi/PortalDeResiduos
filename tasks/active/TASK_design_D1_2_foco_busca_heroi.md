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

- [ ] Comportamento principal
- [ ] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [ ] Acessibilidade e responsividade avaliadas (E7 e E8, 390 e 1440)
- [ ] `npm run check:quality` passou
- [ ] `npm run check:design` passou, com teto atualizado quando aplicável
- [ ] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações:
- Evidências:
- Limitações/riscos:
- Próximo passo:
