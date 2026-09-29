# TASK — Herói só com texto quando não há imagem do assunto

> Pacote de design: `02-spec-componentes.md` (CP-10.3), RC-4. Decisão: ADR-004 (a). Nível de autonomia: 2.

## Contexto

26 heróis usam imagem, e quase nenhuma mostra o assunto da página: o print do Recicla Match aparece em Produções, Educação Ambiental e Projeto Valoriza; o diagrama de logística reversa, em Disposição Legal e Como Separar; a capa preta de um panorama, em Materiais Compilados, Panoramas e Municípios Contemplados; o banner com logos de patrocinadores, em Cidades; uma ilustração abstrata de rede, em Apoio a Decisão. Algumas capas aparecem de novo no corpo da página. Imagens com texto embutido são cortadas por `object-fit: cover`.

## Objetivo

Herói com imagem só quando ela é o assunto da página (foto da notícia, diagrama em Logística Reversa, print em Recicla Match); nas demais, só texto. Nenhuma imagem de herói cortada.

## Não objetivos

- Buscar ou produzir imagens novas.
- Mudar imagens no corpo das páginas.

## Spec

- **Dado** qualquer página interna fora de notícias, Logística Reversa e Recicla Match, **então** o herói não tem imagem.
- **Dado** as imagens mantidas, **então** `object-fit: contain`, sem corte.
- **Dado** `/panoramas-da-gestao-de-residuos/` em 390, **então** altura ≤ 5.000 px (PG-02.3, pendente desde a D3.1).

## Dados e fontes de verdade

- Arquivos/componentes: wrappers de herói em `src/pages/{Production,Resource,Institutional,City}Pages.tsx` e `src/App.tsx`; `src/styles/components.css`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: `image` só em `NewsHero` e nos dois heróis de `LegacyPages` | passa |
| E2 | Navegador: 26 rotas com `.page-hero-figure` antes e depois | só notícia, Logística Reversa e Recicla Match |
| E3 | E7 de panoramas em 390 | ≤ 5.000 |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: wrappers de herói sem `image`, 26 chamadas, `.page-hero-figure img` com `contain`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.6.md`.
- Limitações/riscos: arquivos de imagem continuam em `public/uploads` (não apagados).
- Próximo passo: D3.7.
