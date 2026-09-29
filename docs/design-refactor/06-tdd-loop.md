# 06. TDD com IA no loop, aplicado a design

O ciclo é o do `AGENTS.md` (Red, Green, Refactor, Eval, Review). Aqui está o que cada passo significa numa tarefa de design.

## 1. Preparar (humano aprova)

- Ler `PROGRESS.md` e a tarefa em `tasks/active/`.
- Rodar a parte do E7 que a tarefa afeta e anotar o "antes".
- Se a tarefa depende de ADR pendente: parar e perguntar.

## 2. Red

- Adicionar em `tests/design-contract.test.mjs` a asserção que expressa o critério (ver exemplos em `04-evals.md`).
- Se a tarefa baixa um número da catraca, baixar o teto em `scripts/check-design-rules.mjs` para a meta da tarefa.
- Rodar `npm test` / `npm run check:design` e confirmar que falha **pelo motivo esperado**.

## 3. Green

- A menor mudança que passa. Uma tarefa não mexe em arquivo fora do "Arquivos/componentes" dela sem registrar o motivo.
- Cor sempre por token; nada de hex novo.

## 4. Refactor

- Remover duplicação criada, sem mudar comportamento. Rodar os testes de novo.

## 5. Eval

- `npm run check:quality` e `npm run check:design`.
- E7 nas rotas da tarefa em 390 e 1440; comparar com o "antes".
- E8: teclado, foco, leitor de tela básico (nomes acessíveis), movimento reduzido, console.
- Screenshots antes/depois anexados ao eval da tarefa.

## 6. Review (humano)

- PR com `templates/pr.md`. O agente não faz merge.
- Atualizar `PROGRESS.md` e mover a tarefa para `tasks/done/` só depois da aprovação.

## Pontos de parada obrigatórios

- Antes de instalar qualquer dependência.
- Antes de mudar texto institucional ou criar texto novo visível ao público.
- Quando a métrica não melhora depois de duas tentativas: parar, relatar o que foi tentado.
- Quando uma URL precisaria mudar.
