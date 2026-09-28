# Quality gates

Os gates são cumulativos. Uma falha bloqueia o handoff até ser corrigida ou explicitamente registrada como risco aceito.

| Gate | Comando | O que protege |
| --- | --- | --- |
| Tipos | `npm run check:types` | Contratos TypeScript e imports válidos |
| Testes de contrato | `npm test` | Invariantes críticas de rotas, dados e estrutura |
| Dados | `npm run check:data` | Catálogos gerados e arquivos de origem presentes |
| Build | `npm run build` | Integração real do bundle de produção |
| Completo | `npm run check:quality` | Execução de todos os gates acima |

## Gate manual de interface

Quando a tarefa muda UI, o handoff também deve registrar uma avaliação no navegador para desktop e mobile: rota inicial, fluxo principal, teclado/foco, console sem erros e comportamento em `prefers-reduced-motion` quando houver animação.

## Critério de exceção

Não desabilitar um gate para “fazer passar”. Se uma limitação for inevitável, registrar: causa, impacto, escopo, workaround e próximo passo na tarefa ativa.
