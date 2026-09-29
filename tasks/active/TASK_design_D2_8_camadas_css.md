# TASK — Dividir o styles.css em camadas sem mudar a saída

> Pacote de design: `docs/design-refactor/08-backlog.md`. Nível de autonomia: 2. Depende da D2.1 a D2.7.

## Contexto

`src/styles.css` tem ~1.280 linhas num arquivo só, com tokens, base, componentes e blocos de página misturados. A fase 3 mexe em várias páginas; um arquivo único aumenta conflitos e dificulta achar a regra certa.

## Objetivo

Quatro camadas em `src/styles/` (`tokens.css`, `base.css`, `components.css`, `pages.css`), importadas em ordem por `src/styles.css`, com CSS gerado idêntico. Scripts de verificação e contratos leem todas as camadas.

## Não objetivos

- Mudar qualquer regra, ordem ou valor.

## Spec

- **Dado** `npm run build` antes e depois, **quando** comparo o CSS gerado, **então** é idêntico byte a byte.
- **Dado** `check-design-rules` e `check-contrast`, **quando** rodam, **então** seguem os `@import` de `src/styles.css` e medem as mesmas métricas de antes.
- **Dado** `tests/design-contract.test.mjs`, **quando** roda, **então** lê o CSS resolvido.

## Dados e fontes de verdade

- Arquivos/componentes: `src/styles.css`, `src/styles/*.css` (novos), `scripts/check-design-rules.mjs`, `scripts/check-contrast.mjs`, `tests/design-contract.test.mjs`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | `cmp` do CSS gerado antes e depois | idêntico |
| E2 | Contrato: `check-design-rules` enxerga o CSS (tamanhos distintos > 0) e `check-contrast` passa | passa |
| E3 | Métricas do `check:design` antes e depois | iguais |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: camadas em `src/styles/`, `src/styles.css` com `@import`, leitura resolvida nos scripts e nos contratos, mapa do `00-contexto.md`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.8.md` — CSS gerado idêntico.
- Limitações/riscos: a regra 1 do adendo do `AGENTS.md` ainda diz "`:root` em `src/styles.css`"; o `:root` agora está em `src/styles/tokens.css`. Não editei o `AGENTS.md` sem pedido.
- Próximo passo: D3.1.
