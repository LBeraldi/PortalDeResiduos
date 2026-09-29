# TASK — Criar a linha de documento e gravar o tamanho dos arquivos no catálogo

> Pacote de design: `docs/design-refactor/02-spec-componentes.md`. Spec: CP-07, RC-1. Decisão: ADR-005 (a). Nível de autonomia: 2. Depende da D2.3.

## Contexto

Cada página mostra documentos de um jeito (`DocumentTile`, `file-card`, `city-document`, lista de coleta seletiva) e nenhuma diz o tamanho do arquivo nem a origem. O tamanho existe em `public/uploads`, mas não nos catálogos. A RC-1 pede tipo, formato, tamanho e origem, sem nada digitado à mão.

## Objetivo

`generate-panorama-catalog.mjs` grava `sizeBytes` de cada panorama; `DocumentRow` mostra miniatura, título, metadados (tipo, formato, tamanho quando local, origem) e a ação de abrir.

## Não objetivos

- Trocar as listas das páginas (D3.1, D3.2, D3.5, D3.9).
- Medir arquivos do Google Drive (sem tamanho, a linha não mostra tamanho).

## Spec

- **Dado** `npm run sync:data`, **quando** roda, **então** cada um dos 79 registros de `panoramas.generated.ts` tem `sizeBytes` igual ao `fs.statSync` do PDF em `public/uploads/2025/03/`.
- **Dado** 3.250.585 bytes, **quando** formato, **então** leio "3,1 MB"; abaixo de 1 MB, "KB" sem casa decimal.
- **Dado** um documento local, **quando** a linha aparece, **então** mostra "Arquivo local" e o tamanho; do Drive, "Google Drive" e nenhum tamanho.
- **Dado** a ação, **quando** foco ou clico, **então** é `<a target="_blank" rel="noopener">` com "Abrir PDF" ou "Abrir no Drive", ícone de link externo e "(abre em nova aba)" só para leitor de tela.

## Dados e fontes de verdade

- Arquivos/componentes: `scripts/generate-panorama-catalog.mjs`, `src/data/panoramas.generated.ts` (regenerado, nunca editado), `src/data/fileSize.ts` (novo), `src/components/DocumentRow.tsx` (novo), `src/styles.css`.
- Fonte original: `public/uploads/2025/03/*.pdf`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: `sizeBytes` do catálogo igual ao tamanho real dos 79 PDFs | passa |
| E2 | Teste de `formatSize` | "3,1 MB", "820 KB" |
| E3 | Contrato do componente (link externo, texto oculto, origem) | passa |
| E4 | Navegador | na primeira página que usar o componente (D3.2) |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas (no uso)
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `scripts/generate-panorama-catalog.mjs` (`sizeBytes`), `src/data/panoramas.generated.ts` (regenerado), `src/data/fileSize.ts` e `src/components/DocumentRow.tsx` (novos), `.document-row` em `src/styles.css`, contratos.
- Evidências: `docs/design-refactor/evals/2026-09-29-D2.4.md`.
- Limitações/riscos: documentos do Drive ficam sem tamanho; publicações locais ganham tamanho na D3.9.
- Próximo passo: D2.5.
