# TASK — Ficha do município com os documentos reais

> Pacote de design: `03-spec-paginas.md` (PG-03). Decisões: ADR-004 (a), ADR-005 (a). Nível de autonomia: 1 → 2. Depende da D2.4. **Texto novo "Sobre o panorama" precisa de aprovação antes de publicar.**

## Contexto

As 79 fichas repetem o mesmo texto genérico ("Um retrato local para orientar próximos passos…"), mostram três caixas que parecem indicadores e não são ("01 / PDF / MS"), exibem a capa do panorama duas vezes (herói e lateral) e terminam num bloco "Compare este município com outros panoramas" que só volta para a lista. Os 15 municípios com plano de coleta seletiva não mostram o plano na ficha.

## Objetivo

A ficha lista os documentos reais do município com `DocumentRow` e explica o panorama uma vez, num bloco "Sobre o panorama".

## Não objetivos

- Ações diretas no índice de municípios (D3.10).
- Corrigir a URL repetida de Bonito na fonte (achado da D1.10; fica para a equipe).

## Spec

- **Dado** uma ficha, **quando** carrega, **então** o herói mostra só o nome e os selos "Panorama publicado" e, nos 15, "Plano de coleta seletiva"; sem imagem (a capa aparece uma vez, na linha do panorama).
- **Dado** a lista, **então** a primeira linha é o panorama (capa, "Panorama municipal", "PDF · <tamanho>", "Arquivo local", "Abrir PDF"); nos 15, seguem os documentos do plano, com o título e a descrição do catálogo, "Google Drive" e "Abrir no Drive".
- **Dado** a ficha, **então** não há "01 / PDF / MS", segunda capa nem "Compare este município com outros panoramas".
- **Dado** "Sobre o panorama", **então** o texto é o mesmo nas 79 fichas e não cita o município como se fosse específico.
- **Dado** um slug sem panorama, **então** a página avisa com `Alert` (tom `warning`) que o conteúdo está em migração, com o texto que já existe.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/CityPages.tsx` (`CityDetail`, `UnknownCity`), `src/components/PageHero.tsx` (`children` para os selos), `src/styles/pages.css`.
- Fonte original: `cityRecords` (com `sizeBytes`), `selectiveCollectionPlans`.
- Texto "Sobre o panorama": escrito a partir de trechos já publicados (Disposição Legal, Panoramas, destaques da inicial).

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: `DocumentRow`, selos, sem os blocos removidos, "Sobre o panorama" único | passa |
| E2 | Navegador: Bonito (1 + 5 linhas), Água Clara (1 linha), tamanho do PDF igual ao do catálogo, links abrem | conforme a Spec |
| E3 | 390 e 1440: sem rolagem horizontal, ação alcançável por teclado | sim |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [ ] Texto "Sobre o panorama" aprovado pelo dono do projeto (pendente)
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `CityDetail` e `UnknownCity` reescritos, `PageHero` com `children`, CSS da ficha.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.2.md`.
- Limitações/riscos: texto "Sobre o panorama" aguarda aprovação; URL repetida de Bonito vem da fonte.
- Próximo passo: D3.3.
