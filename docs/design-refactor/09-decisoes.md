# 09. Decisões

Formato: contexto, opções, recomendação, status. Decisões aceitas também vão para `docs/development/decision-log.md`.

## ADR-001. Unificar as listagens de municípios — ACEITA (a), 2026-09-29

**Contexto.** Os mesmos 79 municípios aparecem em `/cidades/` (cartões + faixa "Cobertura do território"), `/panoramas-da-gestao-de-residuos/` (cartões de 285 px) e `/diretorios/` (blocos verdes). No celular, a página de panoramas tem 24.921 px.
**Opções.** (a) As três rotas renderizam o mesmo `MunicipalityIndex`, cada uma com seu título. (b) `/diretorios/` e `/panoramas…/` redirecionam para `/cidades/`. (c) Manter as três como estão.
**Recomendação.** (a). Preserva todas as URLs e o card "Diretórios" da tarefa ativa, e remove a duplicação.
**Bloqueia.** D3.1.
**Decisão.** (a). `/cidades/`, `/diretorios/` e `/panoramas-da-gestao-de-residuos/` renderizam o mesmo `MunicipalityIndex`; as três URLs continuam.

## ADR-002. Links de redes sociais no rodapé — ACEITA (a), 2026-09-29

**Contexto.** O rodapé tem `href="#facebook"` e `href="#linkedin"`, sem destino.
**Opções.** (a) Remover até existirem URLs oficiais. (b) Informar as URLs oficiais agora.
**Recomendação.** (a), a menos que você informe as URLs.
**Bloqueia.** D1.6.
**Decisão.** (a). Remover `#facebook` e `#linkedin` do rodapé.

## ADR-003. Dependências de teste de navegador — PENDENTE (nível 4)

**Contexto.** O `decision-log.md` decidiu não adicionar runner agora. Medir foco, altura e acessibilidade (axe) de forma repetível pede Playwright.
**Opções.** (a) Adicionar `@playwright/test` e `@axe-core/playwright` como devDependencies e criar `tests/e2e/`. (b) Continuar medindo fora do repositório (E7) e registrar à mão.
**Recomendação.** (a) no fim da fase 1, quando houver comportamento para proteger.
**Bloqueia.** nada; E7 funciona sem ela.
**Status em 2026-09-29.** Continua pendente. Não instalar; medir com Playwright fora do projeto (`04-evals.md`).

## ADR-004. Imagens de herói e textos institucionais — ACEITA (a), 2026-09-29

**Contexto.** Produções e Valoriza usam um print do Recicla Match; Disposição Legal usa o diagrama de Logística Reversa; Panoramas e a ficha usam uma capa preta. A ficha precisa de um texto "Sobre o panorama" único.
**Opções.** (a) Herói só com texto até existirem imagens próprias; texto "Sobre o panorama" escrito a partir do conteúdo já publicado e aprovado por você. (b) Indicar imagens e texto.
**Recomendação.** (a).
**Bloqueia.** D3.2, D3.6.
**Decisão.** (a). Herói só com texto nas páginas sem imagem relacionada. O texto "Sobre o panorama" é escrito a partir do conteúdo já publicado e mostrado ao dono do projeto antes de publicar.

## ADR-005. Tamanho de arquivo no gerador — ACEITA (a), 2026-09-29

**Contexto.** `DocumentRow` mostra "PDF · 3,1 MB". O tamanho existe em `public/uploads` mas não nos catálogos.
**Opções.** (a) `generate-panorama-catalog.mjs` passa a gravar `sizeBytes` a partir de `fs.statSync`. (b) Não mostrar tamanho.
**Recomendação.** (a). Não edita `*.generated.ts` à mão; regenera com `npm run sync:data`.
**Bloqueia.** D2.4.
**Decisão.** (a). O gerador grava `sizeBytes`; regenerar com `npm run sync:data`.

## ADR-006. Nova navegação (menu, Documentos, Produções em uma página) — ACEITA (a), 2026-09-29

**Contexto.** Ver `10-navegacao.md`: 7 links quebrados, 75 documentos sem caminho, 7 páginas órfãs, acervo fora do menu.
**Opções.** (a) Menu com Municípios e Documentos; Documentos como lista única; Produções em uma página; rotas de Materiais Compilados e Municípios Contemplados passam a renderizar Documentos ou o índice filtrado. (b) Só consertar os links quebrados e ligar as órfãs, mantendo a estrutura.
**Recomendação.** (a). A (b) já entra na fase 1 (D1.10 e D1.11) e não depende desta decisão.
**Bloqueia.** D3.8 a D3.11.
**Decisão.** (a). Menu: Início · Municípios · Documentos · Produções do Convênio · Notícias · Contato. Documentos vira lista única com filtros; Produções do Convênio vira uma página só.

## ADR-007. Altura do índice de municípios no celular × ações por linha — PENDENTE

**Contexto.** A D3.10 pôs "Panorama · PDF" e "Plano" em cada linha do índice (NAV-1: documento a 2 cliques), com alvo de 44 × 44 px no celular (DS-13). Com 79 linhas de 44 px (3.476 px) mais as partes fixas da página (cabeçalho, herói, ferramentas, rodapé de 901 px: ~1.800 px), o piso fica em ~5.280 px. A PG-02.3 pede ≤ 5.000 px em 390. Medido depois de duas tentativas: `/cidades/` 5.894, `/diretorios/` 5.795, panoramas 6.340 (antes das ações: 4.443, 4.344 e 4.889).
**Opções.** (a) Aceitar ~5.900 px: NAV-1 tem prioridade (`10-navegacao.md` prevalece sobre `03-spec-paginas.md`). (b) No celular, ações só na ficha (volta a ~4.400 px, mas panorama e plano ficam a 3 cliques). (c) Compactar o rodapé no celular (links em duas colunas, ~−300 px; muda a estrutura mantida pela CP-09.2). (d) Alvos menores que 44 px (viola a DS-13).
**Estado atual do código.** (a).
**Recomendação.** (a); se a meta de altura for importante, (a) + (c).
**Bloqueia.** nada.

## ADR-008. Arquivos secundários dos planos de coleta seletiva a 3 cliques — PENDENTE

**Contexto.** E10 final (build de produção, 113 páginas): 105 documentos a 2 cliques e 59 a 3, 0 a 4 ou mais. Os 59 a 3 cliques são todos arquivos secundários dos 15 planos de coleta seletiva (cronograma operacional, mapas, anexo de minuta de lei), no Google Drive. O plano principal de cada município está a 2 cliques (Municípios › "Plano de coleta seletiva" na linha, D3.10). Os secundários ficam na ficha do município (Municípios › ficha › arquivo) e em Plano de Coleta Seletiva (Produções › página › arquivo). A NAV-1 pede exceção registrada.
**Opções.** (a) Aceitar a exceção: plano principal a 2 cliques, arquivos de apoio a 3, na ficha. (b) Listar os 74 arquivos na página Documentos, que deixa de ser a lista curta do acervo não municipal. (c) Pôr na linha do índice um link por arquivo (até 5 por município), o que pesa ainda mais a altura (ver ADR-007).
**Recomendação.** (a).
**Bloqueia.** nada.
