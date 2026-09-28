# Sistema de desenvolvimento

Este diretório contém o sistema operacional do projeto para desenvolvimento orientado por especificação e avaliação.

## Como usar

1. Copie `tasks/templates/TASK_template.md` para `tasks/active/`.
2. Preencha a spec e os critérios de aceite antes de editar o código.
3. Defina cenários de avaliação com `docs/development/eval-template.md`.
4. Faça o ciclo TDD com IA no loop: falha explícita, implementação mínima, refatoração e avaliação.
5. Rode `npm run check:quality` antes do handoff.

## Mapa

- `context.md`: contexto estável, invariantes e limites da arquitetura.
- `quality-gates.md`: gates obrigatórios e seus significados.
- `spec-template.md`: contrato de comportamento para cada mudança.
- `eval-template.md`: cenários de avaliação, incluindo validação manual no navegador.
- `decision-log.md`: decisões que evitam que o contexto se perca entre sessões.

O projeto ainda não tem CI remoto configurado. Até isso existir, `npm run check:quality` é o gate local obrigatório.
