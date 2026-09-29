# 07. Autonomia progressiva

Usa os níveis do `AGENTS.md` (0 esclarecer, 1 propor, 2 executar, 3 consolidar, 4 pedir autorização). A tabela diz o nível inicial por tipo de tarefa.

| Tipo de tarefa | Nível inicial | Exemplos |
|---|---|---|
| Medir, sem alterar código | 2 | D0.1 |
| Correção de acessibilidade local, 1 a 2 arquivos | 2 | D1.2, D1.5, D1.7 |
| Troca mecânica em muitos arquivos | 1 (propor lista, depois 2) | D1.4 (Link), D2.1 (aliases) |
| Mudança de gate ou `package.json` | 1 | D0.2 |
| Componente novo | 1 | D2.3 a D2.5 |
| Reorganizar página ou juntar rotas | 1, com ADR respondida | D3.1, D3.2 |
| Texto público novo ou alterado | 0 | "Sobre o panorama", rótulos novos |
| Dependência nova, apagar arquivo, mudar URL | 4 | ADR-003 |

## Promoção

- Três tarefas seguidas de um tipo aprovadas sem retrabalho de gate: aquele tipo sobe um nível (máximo 3). Registrar em `PROGRESS.md`.
- Nível 4 nunca é promovido.

## Rebaixamento

- Gate contornado, métrica piorada sem aviso ou texto inventado: o tipo volta para o nível 1 e o fato vai para `PROGRESS.md`.
