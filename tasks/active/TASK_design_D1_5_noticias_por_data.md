# TASK — Ordenar notícias da mais recente para a mais antiga

> Pacote de design: `docs/design-refactor/`. Specs: PG-01.4, PG-04.1. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

A capa usa `newsRecords.slice(0, 3)` e mostra três notícias de 25/10/2021; existem duas de 20/12/2025. O arquivo `/noticias/` também está do mais antigo para o mais novo. As datas são texto ("20 de dezembro de 2025").

## Objetivo

Capa e arquivo mostram primeiro as mais recentes.

## Não objetivos

- Mudar o conteúdo das notícias.
- Mudar o layout dos cartões.

## Spec

- **Dado** a capa, **quando** carrega, **então** as notícias mostradas são as duas de 20/12/2025 e a de 15/12/2021.
- **Dado** `/noticias/`, **quando** carrega, **então** a primeira é de 20/12/2025 e a última de 25/10/2021.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/NewsPages.tsx`, `src/components/HomePage.tsx`
- Fonte original, se houver: `newsRecords` em NewsPages.tsx. Opção: adicionar campo ISO `isoDate` a cada registro (derivado da data textual existente) e ordenar por ele.
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Teste de contrato | HomePage não usa `newsRecords.slice(0, 3)` sem ordenação |
| E2 | Teste da função de ordenação, se extraída | ordem esperada das 8 |
| E3 | Manual na capa e no arquivo | ordem correta |

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
