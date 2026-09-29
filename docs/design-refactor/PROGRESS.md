# PROGRESS

Memória de trabalho entre sessões. O agente lê no início e atualiza no fim de cada sessão. Mais recente no topo.

## Estado

- Fase atual: 0
- Próxima tarefa: D0.1 (baseline). D1.10 concluída, aguardando review do PR.
- Decisões pendentes: ADR-003 (ADR-001, 002, 004, 005 e 006 aceitas com a opção (a) em 2026-09-29)
- Níveis promovidos: nenhum

## Métricas (atualizar a cada tarefa)

| Métrica | Baseline | Atual | Meta |
|---|---|---|---|
| font-size < 12 px | 32 | 32 | 0 |
| navegação por botão | 48 | 48 | 0 |
| hex fora de :root | 14 | 14 | 0 |
| altura / em 390 | 6.395 | 6.395 | ≤ 4.800 |
| altura panoramas em 390 | 24.921 | 24.921 | ≤ 5.000 |
| menu visível em 390 | não | não | sim |
| destinos internos quebrados | 7 | 0 | 0 |
| páginas de conteúdo órfãs | 7 | 7 | 0 |
| documentos sem caminho por clique | 75 URLs (74 coleta + cartilha) | 0 | 0 |
| páginas de erro alcançáveis por clique | 4 | 0 | 0 |
| cliques até plano de coleta de Bonito | sem caminho | 4 | ≤ 2 (fase 3) |

## Sessões

### 2026-09-29 — D1.10 links quebrados

- Feito: 7 destinos corrigidos em `ProductionPages.tsx`; `tests/navigation-contract.test.mjs` adicionado (Red com 7, depois Green).
- Gates: `check:quality` verde (4 testes; 60 rotas, 79 panoramas, 15 planos).
- E4: 0 páginas de erro (antes 4); 74/74 URLs de coleta seletiva alcançáveis (antes 0); plano de Bonito a 4 cliques. Eval em `evals/2026-09-29-D1.10.md`.
- Navegador em 390 e 1440 px: 35 cliques nas páginas da tarefa, 13 caíam em erro antes, 0 depois; teclado e console ok. E4 reexecutado no build de produção com os mesmos números.
- Achados para a equipe: URL repetida em Bonito (plano e anexo I iguais no Drive); "Municípios contemplados" de compostagem lista panoramas.
- Próximo: D0.1, depois D1.11.

### 2026-09-28 — navegação (sem código)

- Robô percorreu 109 páginas: 7 links quebrados, 75 documentos de coleta seletiva sem caminho, 7 páginas órfãs. Ver `10-navegacao.md`.

### 2026-09-28 — auditoria (sem código)

- Auditoria publicada: https://claude.ai/artifact/RNMQP4tTRSNprZRooeNW17
- Baseline medido na versão 75c3614; `check:quality` verde.
- Nenhum arquivo do repositório alterado.
