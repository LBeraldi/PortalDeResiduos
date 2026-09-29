# TASK — Cabeçalho com barra informativa fora da parte fixa, "Cidades" no menu e busca com rótulo

> Pacote de design: `docs/design-refactor/02-spec-componentes.md`. Specs: CP-01.3 a CP-01.5. Nível de autonomia: 2. Depende da D2.2. Texto público novo na barra superior (ver lista de aprovação no PROGRESS).

## Contexto

A barra superior repete o nome do projeto ("Projeto Resíduos Sólidos — Disposição Legal") que já está no logo e no herói, e faz parte do cabeçalho fixo: 110 px no desktop e 100 px no celular (baseline D1.7). O índice de municípios não está no menu. A busca é um ícone redondo sem rótulo e, no celular, só aparece depois de abrir o menu.

## Objetivo

Parte fixa ≤ 72 px; barra superior com o convênio; "Cidades" no menu; busca com rótulo "Buscar" no desktop e ícone de 44 px ao lado do menu no celular.

## Não objetivos

- O menu da ADR-006 (Municípios, Documentos): D3.8.
- Mudar a busca em si.

## Spec

- **Dado** qualquer página, **quando** rolo, **então** só o cabeçalho (logo, menu, busca) fica fixo, com ≤ 72 px; a barra superior rola junto com a página.
- **Dado** a barra superior, **quando** leio, **então** vejo "Convênio técnico-científico MPMS · UEMS" e, a partir de 900 px, "Mato Grosso do Sul" à direita.
- **Dado** o menu, **quando** leio, **então** vejo Início, Produções do Convênio, Cidades, Notícias, Contato, em sans 15 px/600; "Cidades" fica ativo em `/cidades/` e nas fichas.
- **Dado** desktop, **quando** vejo a busca, **então** o botão mostra "Buscar" e o nome acessível é "Buscar no portal".
- **Dado** 390 px, **quando** a página carrega, **então** o botão de busca (44 × 44) aparece ao lado do botão de menu, sem abrir o menu.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx` (Header, NAV_LINKS), `src/components/SiteSearch.tsx` (botão), `src/styles.css`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: barra fora do `<header>`, "Cidades" no menu, busca fora do `<nav>` | passa |
| E2 | E7: altura do cabeçalho fixo em 390 e 1440 | ≤ 72 px |
| E3 | 390: botões de busca e de menu visíveis, 44 × 44, dentro da tela | sim |
| E4 | Teclado: Tab chega a Buscar; Enter abre o painel; Esc fecha e devolve o foco | sim |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `src/App.tsx` (barra fora do `<header>`, "Cidades", busca fora do `<nav>`), `src/components/SiteSearch.tsx` (rótulo), `src/styles.css`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.5.md`.
- Limitações/riscos: no celular, a ordem de Tab (menu, busca) difere da ordem visual (busca, menu) nos dois botões vizinhos; escolhido para o menu aberto seguir o botão que o abre.
- Próximo passo: D2.6.
