# TASK — Menu com Municípios e Documentos

> Pacote de design: `10-navegacao.md`. Decisão: ADR-006 (a). Nível de autonomia: 2. Depende da D2.5. Rótulos novos no menu (ver lista de aprovação).

## Contexto

O menu tem Início, Produções do Convênio, Cidades (desde a D2.5), Notícias e Contato. O acervo de documentos não está no menu, e a notícia aberta não marca "Notícias" como ativa. Com seis itens, o logo composto (442 px) e "Buscar" não cabem no container de 1.200 px.

## Objetivo

Menu da ADR-006: Início · Municípios (`/cidades/`) · Documentos (`/publicacoes/`) · Produções do Convênio · Notícias · Contato, sem estouro de largura em nenhuma largura.

## Não objetivos

- Mudar URLs: "Municípios" continua em `/cidades/` e "Documentos" em `/publicacoes/`.
- A página Documentos com filtros (D3.9).

## Spec

- **Dado** o menu, **então** os itens são, nesta ordem: Início, Municípios, Documentos, Produções do Convênio, Notícias, Contato.
- **Dado** `/cidades/`, uma ficha ou `/diretorios/`, **então** "Municípios" fica ativo; `/publicacoes/` ativa "Documentos"; uma notícia ativa "Notícias".
- **Dado** larguras de 320 a 1440, **então** nenhum item sai da tela nem quebra linha, e a parte fixa continua ≤ 72 px. Abaixo de 1280 px o logo mostra só a marca do projeto; até 1080 px o menu é o móvel.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx` (`NAV_LINKS`, `Header`), `src/styles/pages.css` (media queries do cabeçalho).

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: ordem, rótulos e destinos do menu | passa |
| E2 | Navegador em 320, 390, 901, 1024, 1081, 1180, 1280 e 1440: rolagem horizontal, itens fora da tela, altura da parte fixa | nenhum problema; ≤ 72 px |
| E3 | Item ativo em ficha, diretórios, publicações e notícia | conforme a Spec |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `NAV_LINKS` e `Header` (seções, `aria-current`), media queries do cabeçalho (1279/1080), `nowrap`, contratos.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.8.md`.
- Limitações/riscos: de 901 a 1080 px o menu agora é o móvel (antes em linha, com 4 itens); o título das páginas continua "Cidades".
- Próximo passo: D3.9.
