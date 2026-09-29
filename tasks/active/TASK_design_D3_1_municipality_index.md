# TASK — Um índice de municípios nas três rotas

> Pacote de design: `02-spec-componentes.md` (CP-06) e `03-spec-paginas.md` (PG-02). Decisão: ADR-001 (a). Nível de autonomia: 1 → 2 (liberado para a execução contínua). Depende da D2.3.

## Contexto

Os mesmos 79 municípios aparecem em quatro interfaces: 79 cartões em `/cidades/` seguidos da faixa "Cobertura do território" com os mesmos nomes; 79 cartões de 285 px em `/panoramas-da-gestao-de-residuos/`; 79 blocos verdes em `/diretorios/`. No celular, `/cidades/` tem 10.860 px e a página de panoramas, 24.896 px (D2.7). Não há como filtrar os 15 municípios com plano de coleta seletiva.

## Objetivo

`MunicipalityIndex` (novo) nas três rotas, cada uma com seu herói e seu cabeçalho de seção atuais; URLs preservadas; altura em 390 ≤ 5.000 px.

## Não objetivos

- Ações diretas por linha, como "Panorama · PDF" e "Plano de coleta seletiva" (D3.10).
- Trocar imagens de herói (D3.6).

## Spec

- **Dado** qualquer das três rotas, **quando** carrega, **então** vejo o mesmo índice, alimentado por `cityRecords` e `selectiveCollectionPlans` (nenhuma lista digitada), com o cabeçalho de seção que a rota já tinha.
- **Dado** o campo "Buscar município", **quando** digito "bo", **então** restam Aparecida do Taboado, Bodoquena e Bonito (acentos ignorados, como hoje).
- **Dado** o filtro, **quando** escolho "Com plano de coleta seletiva", **então** restam 15; "Todos" volta a 79; as contagens são calculadas.
- **Dado** o índice A–Z, **então** só aparecem letras com município e cada uma leva à primeira linha daquela letra.
- **Dado** desktop, **então** é uma tabela com Município, Documentos disponíveis (selos "Panorama publicado" e, nos 15, "Plano de coleta seletiva") e "Abrir ficha". **Dado** celular, **então** cada município é uma linha com o selo abaixo do nome.
- **Dado** uma busca sem resultado, **então** leio "Nenhum município encontrado para “termo”." e há "Limpar busca", que devolve a lista e o foco ao campo.
- **Dado** `/cidades/`, **então** a faixa "Cobertura do território" não aparece mais.

## Dados e fontes de verdade

- Arquivos/componentes: `src/components/MunicipalityIndex.tsx` (novo), `src/pages/CityPages.tsx` (`CityDirectory`, `Directories`), `src/pages/ProductionPages.tsx` (`Panoramas`), `src/styles/components.css`.
- Fonte original: `cityRecords` (de `panoramas.generated.ts`), `selectiveCollectionPlans`.
- Dados que não podem ser duplicados: nomes e slugs de municípios.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: as três páginas usam `MunicipalityIndex`; `CityPages` não usa `TerritoryIndex`; o componente lê os catálogos | passa |
| E2 | Navegador: busca "bo", filtro, A–Z, estado vazio, "Limpar busca", teclado | conforme a Spec |
| E3 | E7: altura das três rotas em 390 | ≤ 5.000 px |
| E4 | `validate-project` | 60 rotas |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `MunicipalityIndex` (novo), `src/data/cities.ts` (novo), `CityDirectory`, `Directories` e `Panoramas` usando o índice, CSS, decision-log.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.1.md`.
- Limitações/riscos: índice em colunas, não tabela (desvio registrado); panoramas 5.263 px em 390 até a D3.6; `src/components/TerritoryIndex.tsx` e os estilos `.territory*`, `.city-directory*` e `.document-tile` ficaram sem uso (não apagados).
- Próximo passo: D3.2.
