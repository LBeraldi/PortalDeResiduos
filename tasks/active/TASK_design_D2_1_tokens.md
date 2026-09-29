# TASK — Completar os tokens de cor e tirar os aliases legados

> Pacote de design: `docs/design-refactor/01-spec-design-system.md`. Specs: DS-01 a DS-04. Nível de autonomia: 2 (diff revisado no review final).

## Contexto

`:root` em `src/styles.css` tem os tokens da identidade, mas faltam os de estado e contraste da DS-02; `--adequado` e `--rejeito` têm nomes de domínio e tons antigos; `--green`, `--deep`, `--mint`, `--soft` e `--white` são aliases legados (hoje sem uso). Há 14 hex fora de `:root` (12 `#fff` para texto forte sobre mata e hovers, 2 `#000` numa máscara). O anel de foco usa `--on-mata` sobre mata e também no painel de busca, que é papel. Quatro campos têm `outline: 0/none`, e só dois têm substituto visível.

## Objetivo

Toda cor vem de um token de `:root`; nenhum hex fora dele; foco com o contraste da DS-04 em papel e em mata; `check-contrast` lê os valores de `:root`.

## Não objetivos

- Mudar a paleta da identidade (DS-01 fica como está).
- Remover sombras ou gradientes (D2.6).

## Spec

- **Dado** `:root`, **quando** leio, **então** existem `--cerrado-texto`, `--field-border`, `--positive`/`--positive-bg`, `--warning`/`--warning-bg`, `--negative`/`--negative-bg` com os valores da DS-02, e `--on-mata-strong` para o branco de títulos sobre mata.
- **Dado** `styles.css`, **quando** procuro `--green`, `--deep`, `--mint`, `--soft`, `--white`, `--adequado` ou `--rejeito`, **então** não encontro.
- **Dado** `check-design-rules`, **quando** roda, **então** `hexForaDoRoot` = 0.
- **Dado** foco por teclado em superfície mata (herói da inicial, rodapé, faixas verdes), **quando** o anel aparece, **então** usa `--cerrado-claro`; em papel (inclusive o painel de busca), `--cerrado`.
- **Dado** a busca de municípios e o painel de busca global, **quando** o campo recebe foco, **então** o contêiner mostra anel visível.
- **Dado** `check-contrast`, **quando** roda, **então** lê cada par pelo nome do token em `:root`.

## Dados e fontes de verdade

- Arquivos/componentes: `src/styles.css`, `scripts/check-contrast.mjs`, `scripts/check-design-rules.mjs`.
- Fonte original: `docs/design-refactor/01-spec-design-system.md`.
- Dados que não podem ser duplicados: valores de cor (só em `:root`).

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato de tokens e aliases | passa |
| E2 | `check-design-rules`: teto `hexForaDoRoot` 14 → 0 | passa |
| E3 | `check-contrast` lendo `:root` | 20/20 OK |
| E4 | Diff de pixels das 12 rotas, antes e depois | só mudam as cores de positivo/negativo em Lixão e Aterro |
| E5 | Teclado: anel no rodapé, na busca de municípios e no painel de busca | cor e visibilidade conforme a Spec |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/styles.css` (tokens, aliases, `#fff`, anéis de foco, substitutos de `outline: 0`), `scripts/check-contrast.mjs` (lê `:root`), teto `hexForaDoRoot` = 0.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.1.md`.
- Limitações/riscos: `rgba(...)` de linhas e sombras continuam literais (fora da regra de hex); sombras saem na D2.6.
- Próximo passo: D2.2.
