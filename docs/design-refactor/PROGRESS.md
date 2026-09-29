# PROGRESS

Memória de trabalho entre sessões. O agente lê no início e atualiza no fim de cada sessão. Mais recente no topo.

## Estado

- Fase atual: 3
- Próxima tarefa: D3.5. Concluídas: D0.1, D0.2, D1.1–D1.11, D2.1–D2.8, D3.1–D3.4. Review do código ao fim de todas as fases (pedido do dono do projeto em 2026-09-29).
- Decisões pendentes: ADR-003 (ADR-001, 002, 004, 005 e 006 aceitas com a opção (a) em 2026-09-29)
- Níveis promovidos: nenhum

## Métricas (atualizar a cada tarefa)

| Métrica | Baseline | Atual | Meta |
|---|---|---|---|
| font-size < 12 px | 32 | 0 | 0 |
| navegação por botão | 48 | 0 | 0 |
| hex fora de :root | 14 | 0 | 0 |
| altura / em 390 | 6.395 | 4.773 | ≤ 4.800 |
| altura panoramas em 390 | 24.921 | 5.263 (meta na D3.6) | ≤ 5.000 |
| menu visível em 390 | não | sim | sim |
| destinos internos quebrados | 7 | 0 | 0 |
| páginas de conteúdo órfãs | 7 | 0 | 0 |
| documentos sem caminho por clique | 75 URLs (74 coleta + cartilha) | 0 | 0 |
| páginas de erro alcançáveis por clique | 4 | 0 | 0 |
| cliques até plano de coleta de Bonito | sem caminho | 4 | ≤ 2 (fase 3) |

## Textos públicos para aprovação

Texto novo ou alterado visível ao público. Nada disso vai ao ar sem aprovação (regra do `AGENTS.md` e de `06-tdd-loop.md`).

| Tarefa | Onde | Texto | Origem |
|---|---|---|---|
| D1.3 | Controles dos destaques da inicial | "Pausar destaques", "Continuar destaques", "Destaque anterior", "Próximo destaque", "Mostrar destaque N: …", "N de 4", rótulo "Destaques" (leitor de tela) | spec CP-03 |
| D2.5 | Barra superior | "Convênio técnico-científico MPMS · UEMS" · "Mato Grosso do Sul" | spec CP-01.3 e mockup |
| D2.5 | Cabeçalho | botão "Buscar"; item de menu "Cidades" | spec CP-01.4 e CP-01.5 |
| D2.7 | Contato | trilha "Início / Contato" (rótulos existentes) | spec CP-10.1 |
| D3.1 | Índice de municípios | "Todos", "Com plano de coleta seletiva", "N de 79 municípios para “termo”", "Nenhum município encontrado para “termo”.", "Limpar busca", selo "Plano de coleta seletiva" | spec CP-06 e mockup |
| D3.2 | Ficha do município | **"Sobre o panorama"**: "Diagnóstico da gestão, do gerenciamento e da disposição final dos resíduos sólidos no município, parte do levantamento feito para os 79 municípios de Mato Grosso do Sul." (ADR-004: aprovar antes de publicar); "Documentos deste município"; "N documentos"; "Panorama de gestão de resíduos de <Município>" | texto já publicado em Disposição Legal |
| D3.3 | Página inicial | "Abrir diretórios municipais", "Abrir Projeto Valoriza", "Abrir Nota Técnica"; título "Nota Técnica" (era "Notas Técnicas"); "Abrir sistema GRS" | rótulos já existentes (leitor de tela e Apoio a Decisão) |
| D3.4 | Notícia | "Em foco" → "Em números" | spec PG-04.3 |

## Sessões

### 2026-09-29 — D3.4 notícia

- Data e categoria na sobrelinha, resumo uma vez, trilha sem o título, "Em números" só com números (RC-3), título na escala de h2.

### 2026-09-29 — D3.3 página inicial

- Três atalhos iguais (Diretórios, Valoriza, Nota Técnica); áreas só texto com Logística Reversa e GRS direto; notícias compactas. `/`: 1440 2.394 (meta 3.200), 390 4.773 (meta 4.800; folga de 27 px). Regressão temporária da D1.3 resolvida.

### 2026-09-29 — D3.2 ficha do município

- Ficha com `DocumentRow` (panorama com tamanho + arquivos do plano nos 15), selos no herói, sem imagem nem blocos falsos; "Sobre o panorama" com texto único **pendente de aprovação** (ADR-004).

### 2026-09-29 — D3.1 índice de municípios

- `MunicipalityIndex` nas três rotas; índice remissivo em colunas (desvio da CP-06.5 registrado no decision-log). `/cidades/` 390: 10.860 → 4.497; panoramas 390: 24.896 → 5.263 (a meta fecha na D3.6).

### 2026-09-29 — D2.8 CSS em camadas (fim da fase 2)

- `src/styles/` com `tokens`, `base`, `components` e `pages`; CSS gerado idêntico byte a byte. Scripts e contratos seguem os `@import` (o `check-design-rules` passaria em silêncio sem isso).
- Fase 2 concluída. Próximo: D3.1.

### 2026-09-29 — D2.7 trilha e herói em papel

- Trilha dentro do herói, acima da sobrelinha, em todas as internas (Contato ganhou trilha); herói sempre em papel (`tone` removido).

### 2026-09-29 — D2.6 hover, sombra e seções

- Hover sem deslocamento nem sombra (borda + título sublinhado); uma sombra (`--shadow-overlay`) só em sobreposições; transições só de cor e borda (≤ 180 ms); `--section-y` 48–64 px; anel decorativo do herói removido. `/` em 1440: 3.523.

### 2026-09-29 — D2.5 cabeçalho

- Barra superior com o convênio, fora da parte fixa; parte fixa 57/69 px (antes 100/110); "Cidades" no menu; "Buscar" com rótulo no desktop e ícone de 44 px ao lado do menu no celular. Textos da barra na lista de aprovação.

### 2026-09-29 — D2.4 DocumentRow

- Gerador grava `sizeBytes` (ADR-005); catálogo regenerado com `npm run sync:data`. `formatSize` e `DocumentRow` criados; primeiro uso na D3.2.

### 2026-09-29 — D2.3 Badge, Alert, Field

- Três componentes novos, só com tokens; ainda sem uso (entram na D2.4, D3.2 e D3.7).

### 2026-09-29 — D2.2 escala tipográfica

- Papéis da DS-05 aplicados: interface 15 px, apoio 14 px, registro mono 12–13 px; mono fora do menu e dos links do índice. h1 e h2 na escala da spec. `/` em 390 foi a 6.512 (+78) e `/cidades/` a 10.896; metas com D3.3 e D3.1.

### 2026-09-29 — D2.1 tokens

- Tokens DS-02 em `:root`; aliases fora; `hexForaDoRoot` 14 → 0; `check-contrast` lê `:root`. Foco: `--cerrado-claro` sobre mata e `--cerrado` em papel (o painel de busca tinha anel quase invisível).

### 2026-09-29 — D1.11 páginas órfãs (fim da fase 1)

- Produções e Educação Ambiental ligam Disposição Legal, Usinas, Como separar e Lixão e aterro, com textos já publicados. E10: 113 páginas alcançáveis, 0 de erro, 0 órfãs de conteúdo; as quatro a 2 cliques.
- Fase 1 concluída (D1.1–D1.11). Próximo: D2.1.

### 2026-09-29 — D1.9 × nativo da busca

- Tarefa escrita a partir do template. `::-webkit-search-cancel-button` escondido no painel de busca global; Esc mantido.

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
