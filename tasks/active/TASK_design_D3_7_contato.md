# TASK — Formulário de contato com Field

> Pacote de design: `03-spec-paginas.md` (PG-06), `02-spec-componentes.md` (CP-08). Nível de autonomia: 2. Depende da D2.3. Texto alterado na confirmação (ver lista de aprovação).

## Contexto

Os campos do contato só têm borda inferior em `--line-strong` (1,60:1, abaixo do 3:1 da WCAG 1.4.11). Os rótulos só ficaram em sans a partir da D2.2. A confirmação diz "Abrimos seu aplicativo de e-mail", mas o site não tem como saber se o aplicativo abriu.

## Objetivo

Campos com `Field` (rótulo ligado, borda `--field-border`, 44 px, anel de foco) e confirmação "Mensagem montada", mantendo o texto de apoio com o e-mail.

## Não objetivos

- Trocar o envio por `mailto:` por um back-end.
- Mensagens de erro próprias (a validação continua a do navegador, com `required` e `type="email"`).

## Spec

- **Dado** o formulário, **então** "Seu nome", "Seu e-mail", "Assunto" e "Mensagem" são `<label for>` de campos com borda de 3,58:1 e altura ≥ 44 px.
- **Dado** o foco por teclado num campo, **então** há anel `--cerrado` de 2 px.
- **Dado** envio com campos vazios, **então** o navegador bloqueia e aponta o campo, como hoje.
- **Dado** envio completo, **então** a confirmação tem o título "Mensagem montada" e o texto de apoio atual.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx` (`Contact`), `src/styles/pages.css`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: 4 `Field` e o título novo | passa |
| E2 | Navegador: `getByLabel` nos 4 campos, borda calculada, altura, anel de foco, envio vazio e completo | conforme a Spec |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `Contact` com `Field`, título da confirmação, CSS do formulário.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.7.md`.
- Limitações/riscos: mensagens de validação continuam as do navegador (no idioma do navegador).
- Próximo passo: D3.8.
