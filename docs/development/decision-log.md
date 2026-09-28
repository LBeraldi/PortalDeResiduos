# Registro de decisões

## 2026-09-21 — Fundação de desenvolvimento

- **Decisão:** adotar spec → eval → implementação → quality gate como fluxo padrão.
- **Motivo:** o projeto já tem tarefas com critérios de aceite, mas não tinha um contrato comum nem validação de dados/rotas.
- **Consequência:** toda mudança deve ter critérios verificáveis; mudanças de UI exigem avaliação manual no navegador.
- **Decisão:** não introduzir framework de testes ou lint nesta etapa.
- **Motivo:** manter a fundação sem instalar dependências e sem ampliar o escopo; os gates iniciais usam TypeScript, Node test runner, validadores locais e Vite.
- **Próximo passo:** adicionar testes de comportamento de componentes quando houver uma necessidade concreta que justifique um runner de DOM.
