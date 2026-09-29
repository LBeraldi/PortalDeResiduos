# TASK — Consertar os links quebrados de Materiais Compilados

> Pacote de design: `docs/design-refactor/10-navegacao.md`. Spec: NAV-4. Nível de autonomia: 2.

## Contexto

Em `src/pages/ProductionPages.tsx`, 7 destinos internos não existem no `siteMap`. Os quatro cartões de Materiais Compilados e o botão "Explorar panoramas" de Produções abrem "Esta página ainda não está disponível". Com isso, os 75 documentos dos planos de coleta seletiva e a cartilha de compostagem não têm nenhum caminho por clique.

## Objetivo

Todo destino interno do código existe; o caminho Produções › Materiais Compilados › (tema) › documento funciona.

## Não objetivos

- Reorganizar a navegação (fase 3, ADR-006).
- Criar rotas novas. Usar as que já existem no `siteMap`.

## Spec

- **Dado** Materiais Compilados, **quando** clico em "Panoramas da gestão de resíduos", **então** abre `/panoramas-da-gestao-de-residuos/` com os 79 PDFs.
- **Dado** Materiais Compilados, **quando** clico em "Plano de coleta seletiva", **então** abre `/plano-de-coleta-seletiva/` com os 15 municípios e seus documentos.
- **Dado** Materiais Compilados, **quando** clico em "Plano de compostagem", **então** abre `/plano-de-compostagem/` com a cartilha.
- **Dado** Materiais Compilados, **quando** clico em "Municípios contemplados", **então** abre `/municipios-contemplados/`.
- **Dado** Produções do Convênio, **quando** clico em "Explorar panoramas", **então** abre `/panoramas-da-gestao-de-residuos/`.
- **Dado** as páginas com `nested`, **quando** geram links, **então** usam rotas `/producoes-do-convenio/materiais-compilados/…` que existem no `siteMap`, ou as rotas curtas.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/ProductionPages.tsx` (ProductionHub, MaterialsCompiled, SelectiveCollection, Composting, Municipalities).
- Fonte original, se houver: `src/data/siteMap.ts`.
- Dados que não podem ser duplicados: `siteMap`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Copiar `tests/navigation-contract.test.mjs` para `tests/` e rodar `npm test` antes da mudança | Falha listando os 7 destinos (Red) |
| E2 | `npm test` depois da mudança | Passa |
| E3 | Manual: Produções › Materiais Compilados › cada cartão › abrir um documento | Nenhuma página de erro |
| E4 | `scripts/medir-cliques.mjs` | 0 páginas de erro alcançáveis; plano de coleta seletiva de Bonito a 4 cliques ou menos |

## Critérios de aceite

- [ ] Comportamento principal
- [ ] Regressão coberta por teste ou contrato (`tests/navigation-contract.test.mjs`)
- [ ] Acessibilidade e responsividade avaliadas
- [ ] `npm run check:quality` passou
- [ ] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações:
- Evidências:
- Limitações/riscos:
- Próximo passo: D1.11 (páginas órfãs)
