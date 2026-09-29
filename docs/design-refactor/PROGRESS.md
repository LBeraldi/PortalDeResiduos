# PROGRESS

Memória de trabalho entre sessões. O agente lê no início e atualiza no fim de cada sessão. Mais recente no topo.

## Estado

- Fase atual: 1
- Próxima tarefa: D1.9. Concluídas: D0.1, D0.2, D1.10, D1.1–D1.8. Review do código ao fim de todas as fases (pedido do dono do projeto em 2026-09-29).
- Decisões pendentes: ADR-003 (ADR-001, 002, 004, 005 e 006 aceitas com a opção (a) em 2026-09-29)
- Níveis promovidos: nenhum

## Métricas (atualizar a cada tarefa)

| Métrica | Baseline | Atual | Meta |
|---|---|---|---|
| font-size < 12 px | 32 | 0 | 0 |
| navegação por botão | 48 | 0 | 0 |
| hex fora de :root | 14 | 14 | 0 |
| altura / em 390 | 6.395 | 6.434 (D1.3: temporário) | ≤ 4.800 |
| altura panoramas em 390 | 24.921 | 24.904 | ≤ 5.000 |
| menu visível em 390 | não | sim | sim |
| destinos internos quebrados | 7 | 0 | 0 |
| páginas de conteúdo órfãs | 7 | 7 | 0 |
| documentos sem caminho por clique | 75 URLs (74 coleta + cartilha) | 0 | 0 |
| páginas de erro alcançáveis por clique | 4 | 0 | 0 |
| cliques até plano de coleta de Bonito | sem caminho | 4 | ≤ 2 (fase 3) |

## Sessões

### 2026-09-29 — D1.8 título da aba

- Tarefa escrita a partir do template. Ficha e notícia usam o nome real no título (`pageTitle` em `App.tsx`, com `cityRecords` e `newsRecords`).

### 2026-09-29 — D1.7 fonte mínima e contraste

- 32 `font-size` abaixo de 12 px → 0.75rem; texto cerrado sobre mata → `--cerrado-claro`. Tetos: fonte 32 → 0, tamanhos 13 → 5. Texto calculado abaixo de 12 px: 0 nas 12 rotas.

### 2026-09-29 — D1.6 redes sociais

- `#facebook` e `#linkedin` removidos do rodapé (ADR-002); e-mail mantido.

### 2026-09-29 — D1.5 notícias por data

- `sortByDate` em `src/data/newsDate.ts`; capa mostra as duas de 20/12/2025 e a de 15/12/2021; arquivo do mais novo para o mais antigo.

### 2026-09-29 — D1.4 navegação por Link

- 48 botões de navegação → `<Link>`; âncora interna e `ResourceCard` também. `navegacaoPorBotao` 48 → 0 (teto baixado).
- Regressão visual por diff de pixels: sem mudança visível. Eval em `evals/2026-09-29-D1.4.md`.

### 2026-09-29 — D1.3 H1 fixo e destaques

- H1 fixo; destaques com `<h2>`, 8 s, pausa, `aria-live` só quando pausado; movimento reduzido parado. Herói em duas colunas no desktop.
- Altura de `/`: 1440 3.999 → 3.839; 390 6.307 → 6.436 (+129, regressão temporária conhecida, a conferir na D3.3).
- Textos de interface novos na lista de aprovação (ver eval).

### 2026-09-29 — D1.2 foco na busca do herói

- `:focus-within` com `--cerrado-claro` (novo token em `:root`); chave única nas sugestões. Avisos de chave 3 → 0. Eval em `evals/2026-09-29-D1.2.md`.

### 2026-09-29 — D1.1 menu no celular

- Botão de menu 44 × 44 dentro da tela de 320 a 900 px; logo recortado na marca do projeto; Esc fecha e devolve o foco.
- E7: `menu 446 → 380` em 390 px, nada mais mudou. Eval em `evals/2026-09-29-D1.1.md`.

### 2026-09-29 — D0.2 gate de design

- `check:design` criado e incluído em `check:quality`; `tests/design-contract.test.mjs` criado (Red → Green).
- Próximo: D1.1.

### 2026-09-29 — D0.1 baseline

- Remedido na versão com D1.10: tetos do `check-design-rules` iguais ao baseline; contraste 20/20; alturas, menu (x = 446 em 390 px) e cabeçalho fixo (99/109 px) em `evals/2026-09-29-D0.1.md`.
- Próximo: D0.2.

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
