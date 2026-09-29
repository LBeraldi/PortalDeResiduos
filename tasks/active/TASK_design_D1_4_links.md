# TASK — Trocar a navegação por botão por Link

> Pacote de design: `docs/design-refactor/`. Specs: CP-02. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

Há 48 `onClick={() => navigate(` e 10 `<Link `. Botões que navegam não abrem em nova aba, não mostram o destino e são anunciados como botão. `Link` já existe em `src/components/router.tsx` e renderiza `<a href>`.

## Objetivo

Todo elemento que só navega é um `<Link to>`; `navegacaoPorBotao` = 0.

## Não objetivos

- Mudar estilos além do necessário para o `<a>` herdar a aparência atual.
- Mudar destinos.

## Spec

- **Dado** qualquer cartão ou link interno, **quando** passo o mouse, **então** o navegador mostra a URL de destino.
- **Dado** um cartão, **quando** Ctrl/⌘ + clique, **então** abre em nova aba.
- **Dado** um cartão, **quando** Enter pelo teclado, **então** navega sem recarregar a página.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx`, `src/components/*.tsx`, `src/pages/*.tsx`
- Fonte original, se houver: —
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | `check-design-rules` navegacaoPorBotao | 0 (baixar teto de 48 para 0) |
| E2 | Rodar as 60 rotas do `validate-project` | sem regressão |
| E3 | Manual: 5 cartões de páginas diferentes | hover mostra URL; Ctrl+clique abre aba |

## Critérios de aceite

- [ ] Comportamento principal
- [ ] Regressão coberta por teste ou contrato (`tests/design-contract.test.mjs`)
- [ ] Acessibilidade e responsividade avaliadas (E7 e E8, 390 e 1440)
- [ ] `npm run check:quality` passou
- [ ] `npm run check:design` passou, com teto atualizado quando aplicável
- [ ] `docs/design-refactor/PROGRESS.md` atualizado

## Handoff

- Alterações:
- Evidências:
- Limitações/riscos:
- Próximo passo:
