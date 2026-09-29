# TASK — Página inicial com três atalhos iguais e altura-alvo

> Pacote de design: `03-spec-paginas.md` (PG-01), `10-navegacao.md` (Sistema GRS a 1 clique). Nível de autonomia: 1 → 2. Depende da D1.3 e da tarefa ativa `TASK_reorganizar_hero_e_diretorios.md` (três cards do herói para Projeto Valoriza, Nota Técnica e Diretórios).

## Contexto

Depois da D2.7 a inicial tem 3.523 px em 1440 e 6.612 px em 390 (com imagens carregadas). O mosaico abaixo do herói mistura três anatomias: um número com carimbo "MS" decorativo, uma foto com texto embutido cortada e um título em mono. "Áreas para começar" usa fotos sem função informativa (RC-4). As notícias repetem o resumo, e a data fica sobre a imagem. A faixa de Logística Reversa ocupa 578 px no celular para um link. O Sistema GRS fica a 2 cliques.

## Objetivo

Três atalhos com a mesma anatomia; áreas em cartões só de texto; notícias mais curtas; ≤ 3.200 px em 1440 e ≤ 4.800 px em 390; Sistema GRS a 1 clique.

## Não objetivos

- Mudar o herói (D1.3) ou a busca.
- Criar texto novo além de rótulos de link derivados dos que já existem.

## Spec

- **Dado** a inicial, **então** abaixo do herói há três atalhos com sobrelinha, título ou número, frase e link: "Pareceres / 79 / municípios com parecer ou panorama publicado." → `/diretorios/`; "Inclusão socioprodutiva / Projeto Valoriza / Cadeia da reciclagem mais justa." → `/projeto-valoriza/`; "Documento técnico / Nota Técnica / Reconhecimento dos catadores recicláveis." → `/nota-tecnica/`. Cada atalho é um `<Link>` inteiro, sem nada interativo dentro.
- **Dado** a inicial, **então** não há carimbo "MS", título em mono nem imagem com texto embutido.
- **Dado** "Áreas para começar", **então** quatro cartões só de texto (Apoio a decisão, Cooperativas, Publicações, Logística Reversa) com os textos atuais; Apoio a decisão tem "Abrir sistema GRS" direto (externo, nova aba).
- **Dado** as notícias, **então** cada cartão tem imagem, categoria e data numa linha, e título; as três mais recentes (D1.5).
- **Dado** 1440 e 390, **então** altura ≤ 3.200 e ≤ 4.800.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/HomePage.tsx`, `src/styles/pages.css`.
- Fonte: textos atuais da inicial; `territoryStats.withPanorama`; `newsByDate`; URL do GRS já publicada em Apoio a Decisão.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: três atalhos e destinos, sem carimbo, GRS na inicial | passa |
| E2 | E7: altura de `/` em 1440 e 390 | ≤ 3.200 e ≤ 4.800 |
| E3 | Teclado nos atalhos e nas áreas; Enter navega | sim |
| E4 | Rubrica visual (E9), antes e depois | nenhum critério cai |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `HomePage.tsx` (atalhos, áreas, notícias; resumo e faixa removidos), CSS da inicial, contratos D1.7 e D3.3.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.3.md`.
- Limitações/riscos: folga de 27 px na meta do celular; o resumo "Um acervo para agir" e a faixa de Logística Reversa saíram (texto público removido, a aprovar).
- Próximo passo: D3.4.
