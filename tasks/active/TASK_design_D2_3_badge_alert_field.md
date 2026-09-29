# TASK — Criar os componentes Badge, Alert e Field

> Pacote de design: `docs/design-refactor/02-spec-componentes.md`. Spec: CP-08. Nível de autonomia: 1 → 2 (liberado pelo dono do projeto para a execução contínua). Depende da D2.1 (tokens de estado).

## Contexto

Selos, avisos e campos de formulário são desenhados à mão em cada página (`.doc-type`, `.legacy-callout`, `.guide-aside`, `.contact-form label`), com aparências diferentes para a mesma função. A D2.4 (DocumentRow), a D3.2 (ficha), a D3.5 (publicações) e a D3.7 (contato) precisam de uma versão única.

## Objetivo

Três componentes em `src/components/`, só com tokens, prontos para as tarefas seguintes.

## Não objetivos

- Trocar os usos atuais nas páginas (isso acontece nas tarefas que usam cada componente).

## Spec

- **Badge:** variantes `doc`, `positive`, `warning`, `outline`; mono 12 px, raio 3 px, altura 24 px; cor por token (`--paper-sunk`/`--ink`, `--positive(-bg)`, `--warning(-bg)`, borda `--line-strong`).
- **Alert:** tons `warning`, `success`, `error`; ícone decorativo (`aria-hidden`), título e texto; borda esquerda de 3 px na cor do tom; `error` tem `role="alert"`.
- **Field:** rótulo sans 14 px/600 acima do campo, ligado por `htmlFor`; borda `--field-border`, altura 44 px, raio 3 px; `input` ou `textarea`; dica ou erro por campo ligados por `aria-describedby`; com erro, `aria-invalid="true"` e borda `--negative`.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/Badge.tsx`, `Alert.tsx`, `Field.tsx` (novos), `src/styles.css`.
- Fonte original: CP-08; tokens da D2.1.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: arquivos, variantes, ligações de acessibilidade e classes com tokens | passa |
| E2 | `check:quality` (tipos) e `check:design` (sem hex novo) | verdes |
| E3 | Navegador | adiado para as tarefas que usam cada componente (D2.4, D3.2, D3.7); registrado no eval de cada uma |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas (no uso)
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/components/Badge.tsx`, `Alert.tsx`, `Field.tsx` (novos), estilos `.badge`, `.alert`, `.field` em `src/styles.css`, contrato.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.3.md`.
- Limitações/riscos: avaliação no navegador depende do primeiro uso de cada componente.
- Próximo passo: D2.4.
