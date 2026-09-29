# TASK — Hover sem deslocamento, uma sombra e seções de 64 px

> Pacote de design: `docs/design-refactor/01-spec-design-system.md`. Specs: DS-08 a DS-12. Nível de autonomia: 2. Depende da D2.1.

## Contexto

Cartões sobem de 1 a 4 px e ganham sombra no hover, imagens dão zoom (até 550 ms), setas deslizam, o sublinhado do menu cresce em 220 ms. Há oito sombras diferentes, incluindo a de cartão, a do campo do herói e a sombra dupla do anel decorativo do herói. Seções usam até 96 px de respiro (`--section-y` = `clamp(3.5rem, 8vw, 6rem)` e várias cópias locais de `clamp(3rem, 7vw, 5.5rem)`), e há um gradiente decorativo sobre as imagens dos cartões de área.

## Objetivo

Hover de cartão só muda a borda e sublinha o título; uma sombra (`--shadow-overlay`), só em sobreposições; transições de até 180 ms, só de cor, fundo e borda; seções com 64 px no desktop e 48 px no celular.

## Não objetivos

- Mudar o layout dos cartões ou da página inicial (D3.3).
- Remover a imagem com legenda sobre foto do mosaico da inicial (D3.3); o degradê dela garante contraste e fica até lá.

## Spec

- **Dado** qualquer regra `:hover`, **então** não há `transform` nem `box-shadow`.
- **Dado** `box-shadow` no CSS, **então** só aparece `var(--shadow-overlay)`, em busca global, sugestões da busca do herói e menu móvel.
- **Dado** `transition`, **então** só `color`, `background`/`background-color` e `border-color`, com no máximo 0,18 s.
- **Dado** `:root`, **então** `--section-y` = `clamp(3rem, 6vw, 4rem)` e os blocos de seção usam o token.
- **Dado** o herói da inicial, **então** não há anel decorativo.

## Dados e fontes de verdade

- Arquivos/componentes: `src/styles.css`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contratos de hover, sombra, transição e `--section-y` | passam |
| E2 | Hover real em 5 cartões (1440): posição e sombra antes e depois do hover | posição igual, sem sombra, borda muda |
| E3 | E7 nas 12 rotas | alturas menores; sem rolagem horizontal |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/styles.css` (tokens `--section-y` e `--shadow-overlay`, hovers, transições, sombras, anel e degradê decorativos), contrato.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.6.md`.
- Limitações/riscos: o degradê do cartão com foto do Projeto Valoriza fica até a D3.3 (garante contraste do texto sobre a imagem).
- Próximo passo: D2.7.
