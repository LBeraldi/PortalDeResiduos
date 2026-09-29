# TASK — Produções do Convênio em uma página, com ações diretas

> Pacote de design: `10-navegacao.md` (NAV-2, NAV-3, NAV-5). Decisão: ADR-006 (a). Nível de autonomia: 1 → 2. Depende da D3.1 e da D3.9.

## Contexto

Produções do Convênio é uma grade de cartões que só leva a outras páginas; para abrir o sistema GRS, a cartilha ou o censo é preciso passar por uma página intermediária. Materiais Compilados (quatro cartões de link) e Municípios Contemplados (lista que repete o índice) são páginas só de links (NAV-2).

## Objetivo

Produções numa página com âncoras e uma seção por produção (Apoio a decisão, Materiais compilados, Projeto Valoriza, Educação ambiental, Disposição Legal, Usinas de triagem, Cooperativas), cada uma com a ação principal direta e o link para a página completa. Materiais Compilados e Municípios Contemplados mostram o índice de municípios; na coleta seletiva, já filtrado. Nenhuma URL muda.

## Não objetivos

- Texto novo: títulos, descrições e rótulos de ação reaproveitam os já publicados.
- Remover rotas.

## Spec

- **Dado** Produções, **então** há um índice de âncoras e sete seções com `id`; cada seção tem título, descrição e ações.
- **Dado** uma seção cujo destino principal é um arquivo ou sistema externo, **então** a ação abre o arquivo ou sistema direto, em nova aba (GRS, Panorama e Censo, cartilha de compostagem, cartilha para cooperativas), e há um link para a página completa (NAV-3).
- **Dado** Materiais Compilados, **então** o índice de municípios com o cabeçalho que a página já tinha.
- **Dado** Municípios Contemplados de coleta seletiva, **então** o índice com o filtro "Com plano de coleta seletiva" já ativo; de compostagem, com "Todos".
- **Dado** o robô de cliques, **então** nenhuma página de erro, nenhuma órfã de conteúdo e os documentos da tabela do `10-navegacao.md` a ≤ 2 cliques.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/ProductionPages.tsx` (`ProductionHub`, `MaterialsCompiled`, `Municipalities`), `src/components/MunicipalityIndex.tsx` (`filtroInicial`), `src/styles/pages.css`.
- Fonte original: textos atuais das páginas de cada produção; `documents.ts`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: âncoras e sete seções; ações externas lidas de `documents.ts`; índice nas duas rotas | passa |
| E2 | Navegador: âncoras levam à seção; ações externas em nova aba, HTTP 200 nos PDFs | sim |
| E3 | E10 final: profundidade dos documentos da tabela do `10-navegacao.md`; erro; órfãs | NAV-1 |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `ProductionHub` (âncoras e seções), `MaterialsCompiled` e `Municipalities` com o índice, `filtroInicial`, CSS, ADR-008.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.11.md` (inclui o E10 final).
- Limitações/riscos: 59 arquivos secundários dos planos a 3 cliques (ADR-008); estilos de `.production-card`, `.production-link-card` e `.production-band` ficaram sem uso.
- Próximo passo: review do dono do projeto.
