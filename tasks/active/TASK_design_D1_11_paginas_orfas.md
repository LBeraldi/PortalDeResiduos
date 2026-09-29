# TASK — Ligar as páginas de conteúdo órfãs

> Pacote de design: `docs/design-refactor/10-navegacao.md`. Spec: NAV-5. Nível de autonomia: 2. Depende da D1.10.

## Contexto

O robô de cliques (E10) depois da D1.10 ainda não alcança quatro páginas de conteúdo a partir da inicial: `/disposicao-legal/`, `/modelo-de-usinas-de-triagem-de-residuos/`, `/como-separar-corretamente-seu-lixo/` e `/diferenca-de-lixao-e-aterro-sanitario/`. Elas se linkam entre si, mas nenhuma página alcançável aponta para elas. As outras três órfãs do diagnóstico (Plano de Compostagem, Plano de Coleta Seletiva e Municípios Contemplados) ficaram alcançáveis com a D1.10.

## Objetivo

As quatro páginas ficam alcançáveis por clique, a no máximo 2 cliques da inicial (NAV-1), sem texto novo.

## Não objetivos

- Reorganizar Produções do Convênio em uma página (D3.11).
- Criar rotas ou mudar URLs.

## Spec

- **Dado** Produções do Convênio, **quando** carrega, **então** há links para as quatro páginas, com o título e a descrição que cada uma já publica no próprio herói.
- **Dado** Educação Ambiental, **quando** carrega, **então** há links para "Como Separar Corretamente Seu Lixo" e "Diferença de Lixão e Aterro Sanitário" (mesmo tema).
- **Dado** o robô de cliques, **quando** percorre o site, **então** nenhuma rota de conteúdo do `siteMap` fica sem caminho, exceto aliases e rotas legadas.

## Dados e fontes de verdade

- Arquivos/componentes: `src/pages/ProductionPages.tsx` (`ProductionHub`, `EnvironmentalEducation`, `LinkCard`), `src/styles.css`.
- Fonte original: títulos e descrições dos heróis em `src/pages/InstitutionalPages.tsx`; cabeçalho "Próximos caminhos / Explore as soluções desenvolvidas" já publicado em Disposição Legal.
- Dados que não podem ser duplicados: rotas do `siteMap`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Contrato em `tests/navigation-contract.test.mjs`: toda rota de conteúdo é destino de algum link | passa (guarda estática; não mede alcance) |
| E2 | E10 `scripts/medir-cliques.mjs` | as quatro alcançáveis, a ≤ 2 cliques; 0 páginas de erro |

## Critérios de aceite

- [x] Comportamento principal
- [x] Regressão coberta por teste ou contrato
- [x] Acessibilidade e responsividade avaliadas
- [x] `npm run check:quality` passou
- [x] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações: `ProductionHub` e `EnvironmentalEducation` com `LinkCard` para as quatro páginas; `.production-related` em `src/styles.css`; contrato NAV-5 em `tests/navigation-contract.test.mjs`.
- Evidências: `docs/design-refactor/evals/2026-09-29-D1.11.md` — E10 113 páginas, 0 órfãs de conteúdo, as quatro a 2 cliques.
- Limitações/riscos: o contrato estático não mede alcance; o E10 continua sendo a prova.
- Próximo passo: D2.1.
