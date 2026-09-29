# TASK — Ações diretas na linha do município

> Pacote de design: `10-navegacao.md` (NAV-1, NAV-3). Depende da D3.1. Nível de autonomia: 2. Rótulos novos (ver lista de aprovação).

## Contexto

No índice de municípios (D3.1) o nome leva à ficha, e o panorama e o plano ficam a um clique a mais: Municípios › ficha › arquivo, ou seja, 3 cliques da inicial. NAV-1 pede 2 cliques para "Panorama de um município" e "Plano de coleta seletiva de um município".

## Objetivo

Cada linha do índice abre o panorama (PDF) e, nos 15 municípios com plano, o plano principal (`primaryDocumentUrl`), sem passar pela ficha. O nome continua levando à ficha.

## Não objetivos

- Mudar a ficha (D3.2).

## Spec

- **Dado** uma linha, **então** há "Panorama · PDF" (no celular, "PDF") que abre o PDF do município em nova aba; nos 15, também "Plano de coleta seletiva" (no celular, "Plano") que abre o plano principal.
- **Dado** um leitor de tela, **então** o nome acessível de cada ação contém o texto visível, o município e "(abre em nova aba)".
- **Dado** o celular, **então** as ações têm alvo de 44 × 44 px (DS-13).
- **Dado** o robô de cliques, **então** o panorama de qualquer município e o plano de Bonito ficam a 2 cliques da inicial.
- **Dado** 390 px, **então** medir a altura de `/cidades/` contra a PG-02.3 (≤ 5.000). O `10-navegacao.md` tem prioridade sobre o `03-spec-paginas.md`; se as duas não couberem, registrar.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/MunicipalityIndex.tsx`, `src/styles/components.css`.
- Fonte original: `cityRecords` (`file`), `selectiveCollectionPlans` (`primaryDocumentUrl`).

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: ações por linha a partir dos catálogos | passa |
| E2 | Navegador: 79 ações de panorama (HTTP 200), 15 de plano, alvos no celular, nomes acessíveis | conforme a Spec |
| E3 | E10: profundidade dos panoramas e do plano de Bonito | 2 |
| E4 | E7: altura das três rotas em 390 | registrar contra 5.000 |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: ações por linha em `MunicipalityIndex`, CSS (2 colunas no desktop, 1 no celular), ADR-007.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.10.md`.
- Limitações/riscos: altura em 390 acima da PG-02.3 (ADR-007 pendente).
- Próximo passo: D3.11.
