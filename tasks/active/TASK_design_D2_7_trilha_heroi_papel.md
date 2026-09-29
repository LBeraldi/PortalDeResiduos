# TASK — Trilha acima do título e herói em papel nas páginas internas

> Pacote de design: `docs/design-refactor/02-spec-componentes.md`. Specs: CP-10.1, CP-10.2. Nível de autonomia: 2. Depende da D2.2.

## Contexto

Em todas as páginas internas a trilha (`Breadcrumbs`) aparece depois do herói, então quem chega a uma página lê título, descrição e imagem antes de saber onde está. Notícias, páginas institucionais e legadas usam herói verde (`tone="mata"`), que a identidade reserva para a inicial e o rodapé. Contato e a listagem genérica de produções não têm trilha.

## Objetivo

Trilha acima do `<h1>` em toda página interna; herói em papel em todas, menos na inicial.

## Não objetivos

- Trocar ou tirar imagens de herói (D3.6, ADR-004).
- Mudar os itens das trilhas.

## Spec

- **Dado** uma página interna, **quando** carrega, **então** a trilha vem antes do `<h1>` na ordem do documento e visualmente acima dele.
- **Dado** notícias, institucionais e legadas, **quando** carregam, **então** o herói é papel.
- **Dado** Contato, **quando** carrega, **então** tem trilha "Início / Contato".
- **Dado** uma trilha, **então** o último item tem `aria-current="page"`, como hoje.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/PageHero.tsx`, `src/components/Breadcrumbs.tsx`, `src/App.tsx`, `src/pages/*.tsx`, `src/styles.css`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: nenhum `<Breadcrumbs` solto nas páginas; nenhum `tone="mata"` | passa |
| E2 | Navegador em 12 rotas: a trilha vem antes do `h1` (`compareDocumentPosition`) e o herói tem fundo papel | todas |
| E3 | Screenshots de notícia e institucional, 390 e 1440 | trilha no topo, herói claro |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `PageHero` (`crumbs`, sem `tone`), `Breadcrumbs` (`className`), seis wrappers de herói, 27 páginas, trilha no Contato e em Projetos, CSS.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.7.md`.
- Limitações/riscos: notícia repete o título na trilha até a D3.4.
- Próximo passo: D2.8.
