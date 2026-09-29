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
