# 00. Contexto

## O que é

O Portal Resíduos MS é o site do Projeto Resíduos Sólidos — Disposição Legal, convênio técnico-científico entre MPMS e UEMS (com o CESAM). É uma biblioteca pública: panoramas da gestão de resíduos dos 79 municípios de Mato Grosso do Sul, planos municipais de coleta seletiva (15 municípios), notas técnicas, publicações, notícias e o Projeto Valoriza.

Stack: Vite + React 19 + TypeScript strict, SPA com roteador próprio. Conteúdo migrado do WordPress (`BD/`, `public/uploads/`).

## Quem usa

- Gestores e técnicos municipais procurando o panorama ou o plano do seu município.
- Promotores e servidores do MPMS consultando a situação de um município.
- Pesquisadores e estudantes buscando publicações.
- Cooperativas e catadores (Projeto Valoriza, cartilhas).

Uso frequente em celular. A tarefa mais comum é "achar o documento de um município".

## O que preservar

- Paleta (`--paper`, `--mata`, `--mata-deep`, `--cerrado` e derivados) e as três famílias tipográficas.
- Sobrelinha mono com traço (`Eyebrow`) e títulos Spectral com a segunda parte em itálico.
- Herói verde da página inicial com a busca do acervo.
- Busca global (`SiteSearch`) e seus atalhos de teclado.
- Link "Pular para o conteúdo", foco no `main` a cada rota, respeito a `prefers-reduced-motion`.
- Todas as URLs de `src/data/siteMap.ts` e os aliases legados.
- A tarefa ativa `tasks/active/TASK_reorganizar_hero_e_diretorios.md`: os três cards do herói levam a Projeto Valoriza, Nota Técnica e Diretórios. Nada deste pacote contradiz isso.

## Mapa de arquivos

| Área | Arquivo |
|---|---|
| Cabeçalho, rodapé, contato, rotas | `src/App.tsx` |
| Roteador e `<Link>` | `src/components/router.tsx` |
| Rotas, títulos | `src/data/siteMap.ts` |
| Página inicial | `src/components/HomePage.tsx` |
| Busca global | `src/components/SiteSearch.tsx` |
| Herói interno, trilha, sobrelinha | `src/components/PageHero.tsx`, `Breadcrumbs.tsx`, `Eyebrow.tsx` |
| Índice territorial | `src/components/TerritoryIndex.tsx` |
| Cidades, ficha, diretórios | `src/pages/CityPages.tsx` |
| Produções, panoramas | `src/pages/ProductionPages.tsx` |
| Notícias | `src/pages/NewsPages.tsx` |
| Publicações, Valoriza | `src/pages/ResourcePages.tsx` |
| Estilos e tokens | `src/styles.css` importa as camadas de `src/styles/`: `tokens.css` (`:root`), `base.css`, `components.css`, `pages.css` (D2.8) |
| Catálogos gerados (não editar) | `src/data/panoramas.generated.ts`, `selective-collection-plans.generated.ts` |
| Geradores | `scripts/generate-*.mjs` |

## Referências

- Auditoria completa com mockups: https://claude.ai/artifact/RNMQP4tTRSNprZRooeNW17
- Processo do repositório: `AGENTS.md`, `docs/development/`.
