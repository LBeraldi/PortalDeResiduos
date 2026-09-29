# TASK — Fixar o H1 da página inicial e dar pausa ao carrossel

> Pacote de design: `docs/design-refactor/`. Specs: CP-03. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

O carrossel do herói troca o `<h1>` a cada 5 s (`setInterval(…, 5000)`) e não tem botão de pausa. A tarefa concluída `TASK_reformular_hero_home_sobre_busca_carousel.md` sugeria 6 a 8 s. A WCAG 2.2.2 pede pausa para movimento automático de mais de 5 s.

## Objetivo

H1 estável; os outros quatro slides viram destaques com pausa, anterior e próximo.

## Não objetivos

- Mudar textos dos slides.
- Mudar as cores do herói.

## Spec

- **Dado** a página inicial, **quando** carrega, **então** existe um único `<h1>`, com o texto "Informação para dar o destino certo.".
- **Dado** o carrossel rodando, **quando** passam 8 s, **então** o destaque troca; o H1 não muda.
- **Dado** o carrossel rodando, **quando** aciono "Pausar destaques", **então** para de trocar e o botão vira "Continuar".
- **Dado** `prefers-reduced-motion: reduce`, **quando** a página carrega, **então** nada troca sozinho.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/HomePage.tsx` (institutionalSlides e herói), `src/styles.css`
- Fonte original, se houver: Textos atuais de `institutionalSlides`. Não criar texto novo.
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Teste de contrato: contagem de `<h1` em HomePage.tsx | 1 |
| E2 | Teclado nos três controles | alcançáveis, com nome acessível |
| E3 | Movimento reduzido no DevTools | sem troca automática |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [x] Acessibilidade e responsividade avaliadas (E7 e E8, 390 e 1440)
- [x] `npm run check:quality` passou
- [x] `npm run check:design` passou, com teto atualizado quando aplicável
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/components/HomePage.tsx` (H1 fixo, destaques, pausa, 8 s), `src/styles.css` (herói em duas colunas no desktop, destaques empilhados em grid, fade de 180 ms), `tests/design-contract.test.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D1.3.md`.
- Limitações/riscos: altura de `/` em 390 px +129 px (6.436) até a D3.3; o layout do herói mudou para duas colunas no desktop (mockup da auditoria), além do que a tarefa pedia; novos rótulos de controle aguardam aprovação.
- Próximo passo: D1.4.
