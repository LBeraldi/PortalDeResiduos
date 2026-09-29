# TASK — Mostrar o nome real da página no título da aba em fichas e notícias

> Pacote de design: `docs/design-refactor/`. Spec: PG-G.2. Nível de autonomia: 2.

## Contexto

`App.tsx` monta `document.title` a partir de `resolveRoute(path).title`. Rotas dinâmicas fora do `siteMap` recebem título genérico: toda notícia vira "Notícia · Portal Resíduos MS" e as fichas de município que não estão listadas no `siteMap` (59 de 79) viram "Município · Portal Resíduos MS". Abas, histórico e favoritos ficam indistinguíveis.

## Objetivo

Ficha: "<Município> · Portal Resíduos MS". Notícia: "<título da notícia> · Portal Resíduos MS".

## Não objetivos

- Mudar o título das demais rotas.
- Alterar `siteMap.ts` ou criar rotas.

## Spec

- **Dado** `/cidades/agua-clara/` (fora do `siteMap`), **quando** carrega, **então** o título é "Água Clara · Portal Resíduos MS".
- **Dado** `/cidades/bonito/` (no `siteMap`), **quando** carrega, **então** o título continua "Bonito · Portal Resíduos MS".
- **Dado** `/corumba/` (alias legado), **quando** carrega, **então** o título é "Corumbá · Portal Resíduos MS".
- **Dado** uma notícia, **quando** carrega, **então** o título é o título da notícia seguido de " · Portal Resíduos MS".
- **Dado** um slug de município ou notícia inexistente, **quando** carrega, **então** o título genérico atual se mantém.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx` (efeito de título).
- Fonte original: `cityRecords` (`src/pages/CityPages.tsx`, derivado de `panoramas.generated.ts`) e `newsRecords` (`src/pages/NewsPages.tsx`).
- Dados que não podem ser duplicados: nomes de municípios e títulos de notícias.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: o título usa `cityRecords` e `newsRecords` | passa |
| E2 | Navegador: `document.title` em ficha fora do `siteMap`, ficha no `siteMap`, `/corumba/`, notícia e slug inexistente | conforme a Spec |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` e `npm run check:design` passaram
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/App.tsx` (`pageTitle`), contrato em `tests/design-contract.test.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D1.8.md`.
- Limitações/riscos: slug inexistente mantém o título genérico.
- Próximo passo: D1.9.
