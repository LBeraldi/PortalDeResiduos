# TASK — Levar todo texto a no mínimo 12 px e corrigir o rótulo sobre mata

> Pacote de design: `docs/design-refactor/`. Specs: DS-02, DS-06. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

Há 32 declarações de `font-size` abaixo de 12 px (de `0.5625rem` a `0.72rem`), em selos, rótulos e metadados. O rótulo do slide em `--cerrado` sobre `--mata-deep` tem 3,43:1.

## Objetivo

Nenhum texto abaixo de 12 px; rótulo sobre mata com ≥ 4,5:1.

## Não objetivos

- Reescalar títulos e corpo (D2.2).

## Spec

- **Dado** qualquer página, **quando** inspeciono os textos menores, **então** nenhum tem menos de 12 px calculados.
- **Dado** o herói da inicial, **quando** leio o rótulo do slide, **então** ele usa `--cerrado-claro` (#d4a15f, 5,78:1).

## Dados e fontes de verdade

- Arquivos/componentes: `src/styles.css`
- Fonte original, se houver: Tokens em 01-spec-design-system.md.
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | `check-design-rules` fonteAbaixoDe12px | 0 (baixar teto de 32 para 0) |
| E2 | `check-contrast` | todos OK |
| E3 | Screenshots 390 e 1440 da inicial, cidades e notícia | sem quebra de layout |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [x] Acessibilidade e responsividade avaliadas (E7 e E8, 390 e 1440)
- [x] `npm run check:quality` passou
- [x] `npm run check:design` passou, com teto atualizado quando aplicável
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/styles.css` (32 tamanhos → 0.75rem; rótulo e separador sobre mata em `--cerrado-claro`), tetos em `scripts/check-design-rules.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D1.7.md` — texto calculado abaixo de 12 px 0 em 12 rotas × 2 larguras.
- Limitações/riscos: alturas +3 a +43 px.
- Próximo passo: D1.8.
