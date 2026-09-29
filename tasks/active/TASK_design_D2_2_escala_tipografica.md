# TASK — Aplicar a escala tipográfica da DS-05 e tirar a mono da navegação

> Pacote de design: `docs/design-refactor/01-spec-design-system.md`. Specs: DS-05 a DS-07. Nível de autonomia: 2. Depende da D2.1.

## Contexto

Depois da D1.7 nenhum texto fica abaixo de 12 px, mas descrições de cartão continuam em 12–13 px sans, botões e links-texto em 13 px, títulos de cartão em Spectral de 13 px, e o menu, os nomes de município do índice territorial, o "Buscar" do menu móvel e os rótulos do formulário estão em mono. Os tamanhos de h1 e h2 não seguem a DS-05.

## Objetivo

Cada texto no papel da DS-05: interface sans 15 px/600; apoio 14 px; registro mono 12–13 px só em sobrelinha, data, formato e número; h2 até 40 px e display até 64 px.

## Não objetivos

- Mudar cores, espaçamento ou layout.
- Mudar o texto de qualquer elemento.

## Spec

- **Dado** `:root`, **então** `--step-5` = `clamp(2.25rem, 5vw, 4rem)`, `--step-4` = `clamp(1.75rem, 3.4vw, 2.5rem)`, e existem `--step-ui` (0.9375rem), `--step-small` (0.875rem) e `--step-meta` (0.75rem).
- **Dado** um botão, link-texto ou item do menu, **então** a fonte é sans 15 px.
- **Dado** uma descrição ou metadado em sans, **então** a fonte é 14 px.
- **Dado** o menu, o índice territorial, o "Buscar" do menu móvel e os rótulos do contato, **então** nenhum usa mono.
- **Dado** `check-design-rules`, **então** `tamanhosDistintos` ≤ 8 e `fonteAbaixoDe12px` = 0.

## Dados e fontes de verdade

- Arquivos/componentes: `src/styles.css`.
- Fonte original: DS-05 em `01-spec-design-system.md`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato de tokens e de mono fora da navegação | passa |
| E2 | E7 isolado (antes e depois com `git stash`) nas 12 rotas | sem rolagem horizontal; alturas registradas |
| E3 | Screenshots de Produções (1440) e Cidades (390) | hierarquia preservada |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/styles.css` (tokens de escala, 78 declarações reclassificadas, mono fora da navegação), contrato em `tests/design-contract.test.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.2.md`.
- Limitações/riscos: listas longas crescem (`/cidades/` em 390: +355 px) até a D3.1.
- Próximo passo: D2.3.
