# 05. Quality gates

Os gates do repositório continuam valendo e vêm primeiro. Este pacote soma dois.

| Ordem | Gate | Comando | Quando |
|---|---|---|---|
| 1 | Tipos, testes, dados, build | `npm run check:quality` | toda tarefa |
| 2 | Design | `npm run check:design` (E1 + E2–E5) | a partir da D0.2 |
| 3 | Navegador | E7 (métricas da tarefa) | toda tarefa de UI |
| 4 | Manual de interface | E8, conforme `docs/development/quality-gates.md` | toda tarefa de UI |
| 5 | Rubrica visual | E9 | tarefas das fases 2 e 3 |
| 6 | Review humano | PR com `templates/pr.md` | sempre |

## Regras

- Um gate vermelho bloqueia o handoff. Não desativar, não subir teto da catraca, não apagar teste.
- Se o gate falha por algo fora do escopo, registrar na tarefa: causa, impacto, workaround e próximo passo (critério de exceção do repo).
- Métrica da tarefa não melhorou: a tarefa não está pronta, mesmo com tudo verde.
- Métrica de outra tarefa piorou: corrigir antes de abrir o PR.
