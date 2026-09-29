# TASK — Esconder o botão nativo de limpar da busca global

> Pacote de design: `docs/design-refactor/`. Spec: CP-05. Nível de autonomia: 2.

## Contexto

O campo da busca global (`SiteSearch`) é `type="search"`. No Chrome, Edge e Safari o navegador desenha um "×" de limpar dentro do campo, ao lado do botão "Fechar busca" do painel. São dois "×" lado a lado com funções diferentes (limpar texto e fechar o painel).

## Objetivo

Um único "×" no painel: o botão "Fechar busca".

## Não objetivos

- Mudar o comportamento da busca, os atalhos ou o painel.
- Mexer na busca do herói da página inicial.

## Spec

- **Dado** o painel de busca aberto com texto digitado, **quando** olho o campo, **então** não há "×" nativo; o botão "Fechar busca" continua.
- **Dado** o painel aberto, **quando** aperto Esc, **então** o painel fecha como hoje.

## Dados e fontes de verdade

- Arquivos/componentes: `src/styles.css` (`.search-input`).
- Fonte original, se houver: —
- Dados que não podem ser duplicados: —

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: regra `::-webkit-search-cancel-button` em `.search-input` | passa |
| E2 | Navegador: estilo calculado do pseudo-elemento com texto digitado; Esc | `display: none`; painel fecha |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` e `npm run check:design` passaram
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/styles.css` (`.search-input::-webkit-search-cancel-button`), contrato em `tests/design-contract.test.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D1.9.md`.
- Limitações/riscos: Firefox não desenha o × nativo; nada muda lá.
- Próximo passo: D1.11.
