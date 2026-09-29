# TASK — Deixar o botão de menu visível no celular

> Pacote de design: `docs/design-refactor/`. Specs: CP-01.1, CP-01.2, CP-01.6. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

Em 390 px, `.brand img` (logo composto de 853×85 px, `height:38px`) mede 381 px e empurra `.menu-toggle` para x = 433, fora da tela. Sem ele, o menu não abre por toque.

## Objetivo

Em qualquer largura entre 320 e 900 px, o botão de menu aparece inteiro e abre o menu.

## Não objetivos

- Mudar os itens do menu ou a barra superior (fase 2).
- Criar arquivo de logo novo.

## Spec

- **Dado** a página em 390 px, **quando** ela carrega, **então** o botão de menu está inteiro na viewport (`right <= 390`) e tem 44 × 44 px.
- **Dado** a página em 320 px, **quando** ela carrega, **então** logo e botão cabem sem rolagem horizontal.
- **Dado** o menu fechado, **quando** toco no botão, **então** o menu abre, `aria-expanded="true"`, e Esc fecha devolvendo o foco ao botão.
- **Dado** largura ≥ 901 px, **quando** a página carrega, **então** o logo composto completo continua como hoje.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx` (Header), `src/styles.css` (`.brand`, `.menu-toggle`, media ≤ 900 px)
- Fonte original, se houver: Logo: `/uploads/2020/03/logo.png`. A marca do projeto ocupa os ~400 px iniciais da imagem.
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | 390 px, medir `.menu-toggle` | right ≤ 390, largura e altura ≥ 44 |
| E2 | 320 px | sem overflow horizontal |
| E3 | Teclado: Tab até o botão, Enter, Esc | abre, fecha, foco volta |

## Critérios de aceite

- [ ] Comportamento principal
- [ ] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [ ] Acessibilidade e responsividade avaliadas (E7 e E8, 390 e 1440)
- [ ] `npm run check:quality` passou
- [ ] `npm run check:design` passou, com teto atualizado quando aplicável
- [ ] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações:
- Evidências:
- Limitações/riscos:
- Próximo passo:
