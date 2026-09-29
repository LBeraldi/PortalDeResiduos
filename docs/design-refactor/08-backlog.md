# 08. Backlog

Ordem obrigatória por fase. Dentro da fase, respeitar "Depende de". As tarefas D1.x já estão escritas em `tasks/active/`.

## Fase 0. Preparação

| ID | Tarefa | Depende de | Nível | Eval |
|---|---|---|---|---|
| D0.1 | Medir o baseline de `04-evals.md` na versão atual e registrar em `evals/` | — | 2 | E1–E7 |
| D0.2 | Adicionar `scripts/check-*.mjs`, script `check:design` no `package.json` e incluí-lo em `check:quality`; registrar no `decision-log.md` | D0.1 | 1 | gate verde |

## Fase 1. Correções sem mudar o layout

Pode ir ao ar sozinha. Cada tarefa em um PR.

| ID | Tarefa | Depende de | Spec | Arquivo |
|---|---|---|---|---|
| D1.1 | Botão de menu visível no celular e logo recortado | D0.2 | CP-01.1–2, CP-01.6 | `TASK_design_D1_1_menu_celular.md` |
| D1.2 | Foco visível na busca do herói e chave única nas sugestões | D0.2 | CP-04 | `TASK_design_D1_2_foco_busca_heroi.md` |
| D1.3 | H1 fixo, carrossel com pausa e 8 s | D0.2 | CP-03 | `TASK_design_D1_3_carrossel.md` |
| D1.4 | Trocar navegação por botão por `<Link>` | D0.2 | CP-02 | `TASK_design_D1_4_links.md` |
| D1.5 | Notícias por data (capa e arquivo) | D0.2 | PG-01.4, PG-04.1 | `TASK_design_D1_5_noticias_por_data.md` |
| D1.6 | Remover links sociais sem destino | ADR-002 | CP-09.1 | `TASK_design_D1_6_redes_sociais.md` |
| D1.7 | Fonte mínima 12 px e contraste do rótulo sobre mata | D0.2 | DS-02, DS-06 | `TASK_design_D1_7_fonte_minima_contraste.md` |
| D1.8 | Título da aba em ficha e notícia | D0.2 | PG-G.2 | escrever a partir do template |
| D1.9 | Esconder o X nativo da busca global | D0.2 | CP-05 | escrever a partir do template |
| D1.10 | Consertar os 7 destinos quebrados de Materiais Compilados | — (pode ser a primeira) | NAV-4 | `TASK_design_D1_10_links_quebrados.md` |
| D1.11 | Ligar as 7 páginas órfãs a partir de Produções e das páginas relacionadas | D1.10 | NAV-5 | escrever a partir do template |

## Fase 2. Tokens e componentes

| ID | Tarefa | Depende de | Spec |
|---|---|---|---|
| D2.1 | Tokens novos, remoção dos aliases, `check-contrast` lendo `:root` | Fase 1 | DS-01–04 |
| D2.2 | Escala tipográfica de 8 valores; mono fora da navegação | D2.1 | DS-05–07 |
| D2.3 | Badge, Alert e Field | D2.1 | CP-08 |
| D2.4 | DocumentRow | D2.3, ADR-005 | CP-07 |
| D2.5 | Cabeçalho novo (barra informativa, parte fixa ≤ 72 px, "Cidades" e "Buscar") | D2.2 | CP-01.3–5 |
| D2.6 | Hover sem deslocamento, uma sombra, seções de 64 px | D2.1 | DS-08–12 |
| D2.7 | Trilha acima do H1 e herói em papel nas internas | D2.2 | CP-10.1–2 |
| D2.8 | Dividir `styles.css` em camadas (tokens, base, componentes, páginas) sem mudar a saída | D2.1–D2.7 | — |

## Fase 3. Reorganização

| ID | Tarefa | Depende de | Spec |
|---|---|---|---|
| D3.1 | `MunicipalityIndex` nas três rotas | ADR-001, D2.3 | CP-06, PG-02 |
| D3.2 | Ficha do município com documentos reais | D2.4, ADR-004 | PG-03 |
| D3.3 | Página inicial: três atalhos iguais, altura-alvo | D1.3, tarefa ativa do herói | PG-01 |
| D3.4 | Notícia: data e resumo uma vez, "Em números" só com números | D2.2 | PG-04 |
| D3.5 | Publicações como lista de documentos; miniaturas 4:3 | D2.4 | PG-05 |
| D3.6 | Imagens de herói conforme ADR-004 | ADR-004 | CP-10.3 |
| D3.7 | Formulário de contato com Field | D2.3 | PG-06 |
| D3.8 | Menu: Municípios e Documentos | ADR-006, D2.5 | 10-navegacao |
| D3.9 | `src/data/documents.ts` + página Documentos com filtros; busca lê a mesma lista | ADR-006, D2.4 | NAV-1, NAV-6 |
| D3.10 | Ações por linha no índice de municípios (Panorama, Plano) | D3.1 | NAV-1, NAV-3 |
| D3.11 | Produções do Convênio em uma página, com ações diretas | ADR-006 | NAV-2, NAV-3, NAV-5 |
