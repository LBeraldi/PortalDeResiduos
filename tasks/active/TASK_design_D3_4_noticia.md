# TASK — Notícia com data e resumo uma vez e "Em números" só com números

> Pacote de design: `03-spec-paginas.md` (PG-04). Regra de conteúdo RC-3. Nível de autonomia: 2. Depende da D2.2 e da D2.7.

## Contexto

Na página de notícia a data aparece três vezes (sobrelinha do herói, faixa de metadados e cartão) e o resumo duas (descrição do herói e primeiro parágrafo em destaque). A trilha repete o título inteiro, que é longo. O bloco "Em foco" põe em destaque numérico valores que não são números ("Compartilhada", "Sisrev/MS", "Separar em casa"), o que a RC-3 proíbe. O título usa o tamanho de display (até 64 px) e, com 15 palavras, ocupa sete linhas no desktop.

## Objetivo

Data e categoria uma vez, na sobrelinha; resumo uma vez, como linha fina; trilha "Início / Notícias" sem o título; "Em números" só com fatos cujo valor tem dígito, e sem o bloco quando não houver nenhum; título do artigo na escala de h2.

## Não objetivos

- Mudar o texto das notícias.
- Mudar a imagem das notícias.

## Spec

- **Dado** uma notícia, **então** a sobrelinha é "<categoria> · <data>" e não há outra data nem outra cópia do resumo na página.
- **Dado** a trilha, **então** é "Início / Notícias", com "Notícias" como link.
- **Dado** fatos com valor numérico ("76 de 79", "96,2%"), **então** aparecem em "Em números"; os sem dígito ("Audiência pública") não.
- **Dado** "Por que devemos separar…" (nenhum fato numérico), **então** não há bloco "Em números".
- **Dado** a fonte original, **então** continua destacada com ícone de link externo.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/NewsPages.tsx`, `src/data/newsDate.ts` (função `numericFacts`), `src/components/{PageHero,Breadcrumbs}.tsx`, `src/styles/pages.css`.
- Fonte original: `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Teste de `numericFacts` com os fatos reais das 8 notícias | só valores com dígito |
| E2 | Contrato: sem faixa de metadados nem resumo duplicado; "Em números" | passa |
| E3 | Navegador: nº de ocorrências da data e do resumo, trilha, bloco presente ou ausente | conforme a Spec |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `NewsArticle`, `NewsHero`, `newsCrumbs`, `numericFacts`, `Breadcrumbs` (último item pode ser link), `PageHero` (`size`), CSS.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.4.md`.
- Limitações/riscos: o botão "Ver publicações" do bloco lateral saiu; a categoria na sobrelinha segue a cor da sobrelinha (mata), não `--cerrado-texto`.
- Próximo passo: D3.5.
