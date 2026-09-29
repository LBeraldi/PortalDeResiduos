# TASK — Página Documentos com filtros e busca lendo a mesma lista

> Pacote de design: `10-navegacao.md` (NAV-1, NAV-6). Decisão: ADR-006 (a). Nível de autonomia: 1 → 2. Depende da D2.4 e da D3.5. Texto público novo no cabeçalho da página (ver lista de aprovação).

## Contexto

"Documentos" entrou no menu (D3.8) apontando para `/publicacoes/`, que mostra só 5 dos 11 documentos. Cartilha de compostagem, Panorama e Censo, Nota Técnica sobre catadores e modelos ficam em páginas diferentes. A busca global tem uma lista de publicações copiada à mão, sem cartilhas, modelos nem os 75 documentos de coleta seletiva.

## Objetivo

Uma página Documentos com os 11 documentos de `documents.ts`, filtro por tipo com contagem e busca na lista. A busca global indexa os mesmos 11 e os 75 de coleta seletiva, e resultado de documento abre o arquivo.

## Não objetivos

- Mudar URLs: a página continua em `/publicacoes/` (e `/documentos/`).
- Mudar os títulos e descrições dos documentos.

## Spec

- **Dado** `/publicacoes/`, **então** o título é "Documentos", a trilha "Início / Documentos", e a lista tem os 11 documentos como `DocumentRow`.
- **Dado** o filtro, **então** as opções e contagens são calculadas: Todos 11, Notas técnicas 2, Artigos e revista 4, Estudos 1, Cartilhas 2, Modelos editáveis 2.
- **Dado** a busca da página, **quando** digito "compostagem", **então** resta a Cartilha de compostagem acelerada; sem resultado, aparece "Nenhum documento encontrado para “termo”." com "Limpar busca".
- **Dado** a busca global, **quando** digito "cartilha", **então** aparecem as duas cartilhas, que abrem o PDF; "bonito" traz o município e os documentos do plano.
- **Dado** `src/data/search.ts`, **então** não há lista de documentos digitada.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/ResourcePages.tsx` (`PublicationsPage`), `src/data/search.ts`, `src/components/SiteSearch.tsx` (rótulo do tipo), `src/data/siteMap.ts` (título de `/publicacoes/`), `src/styles/pages.css`.
- Fonte original: `documents.ts`, `document-sizes.generated.ts`, `selective-collection-plans.generated.ts`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato: página com 11 e filtros; busca sem lista digitada, lendo `documents` e os planos | passa |
| E2 | Navegador: contagens, filtro, busca da página, estado vazio | conforme a Spec |
| E3 | Busca global: "cartilha", "estatuto", "bonito" | resultados que abrem o arquivo ou a ficha |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `PublicationsPage` (lista, filtro, busca), `search.ts` (documentos e planos), título no `siteMap`, dica do `SiteSearch`, CSS.
- Evidências: `docs/design-refactor/evals/2026-09-29-D3.9.md`.
- Limitações/riscos: sem ano de publicação; o documento repetido de Bonito aparece uma vez na busca.
- Próximo passo: D3.10.
