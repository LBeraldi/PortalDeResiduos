# TASK — Publicações e materiais como lista de documentos; miniaturas 4:3

> Pacote de design: `03-spec-paginas.md` (PG-05), `02-spec-componentes.md` (CP-07), RC-1. Decisões: ADR-005 (a) estendida aos documentos locais do acervo. Nível de autonomia: 2. Depende da D2.4.

## Contexto

Publicações e Cooperativas mostram os arquivos em cartões com capa cortada (`object-fit: cover`), sem tamanho nem origem. A mesma lista de publicações está copiada à mão em `src/data/search.ts`. Os cartões de Produções cortam capas e ilustrações.

## Objetivo

Uma fonte única dos documentos do acervo, `src/data/documents.ts`, com os 11 documentos e os textos atuais. Publicações e Cooperativas passam a usar `DocumentRow`, com tamanho vindo de um arquivo gerado. As capas dos cartões de Produções ficam em moldura 4:3, sem corte.

## Não objetivos

- Página Documentos com filtros e busca lendo a lista (D3.9).
- Mostrar "ano": o ano disponível é o da pasta de upload, que não é o de publicação.

## Spec

- **Dado** `documents.ts`, **então** há 11 documentos: 2 notas técnicas, 3 artigos, 1 revista, 1 estudo, 2 cartilhas e 2 modelos editáveis, cada um com título, tipo, formato, `href` em `/uploads/` e página de contexto quando existe.
- **Dado** `npm run sync:data`, **então** `document-sizes.generated.ts` grava o tamanho de cada arquivo local de `documents.ts` (`fs.statSync`).
- **Dado** Publicações, **então** as 5 publicações (revista, artigos e nota sobre taxa de RSU) aparecem como `DocumentRow` com capa, "PDF · <tamanho>", "Arquivo local" e "Abrir PDF".
- **Dado** Cooperativas, **então** a cartilha e os dois modelos aparecem como `DocumentRow` ("DOCX · 31 KB", "DOC · 120 KB").
- **Dado** um cartão de Produções, **então** a capa fica em moldura 4:3 com fundo papel e `object-fit: contain`.

## Dados e fontes de verdade

- Arquivos/componentes: `src/data/documents.ts` (novo), `scripts/generate-document-sizes.mjs` (novo), `src/data/document-sizes.generated.ts` (gerado), `package.json` (`sync:data`), `src/pages/ResourcePages.tsx`, `src/styles/pages.css`.
- Fonte original: listas atuais de `PublicationsPage`, `Cooperatives`, `TechnicalNote`, `CatadoresOverview` e `Composting`; arquivos em `public/uploads`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: 11 documentos por tipo; tamanhos gerados iguais aos reais | passa |
| E2 | Contrato: Publicações e Cooperativas usam `DocumentRow` a partir de `documents` | passa |
| E3 | Navegador: linhas, tamanhos e links HTTP 200; miniaturas 4:3 em Produções | conforme a Spec |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `documents.ts`, `generate-document-sizes.mjs`, `document-sizes.generated.ts`, `sync:data`, `PublicationsPage`, `Cooperatives`, `DocumentRow` (`description`), CSS, decision-log.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.5.md`.
- Limitações/riscos: sem ano de publicação; a busca ainda usa a lista copiada à mão até a D3.9.
- Próximo passo: D3.6.
