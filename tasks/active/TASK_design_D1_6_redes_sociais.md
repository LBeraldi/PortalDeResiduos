# TASK — Remover links sociais sem destino do rodapé

> Pacote de design: `docs/design-refactor/`. Specs: CP-09.1. Nível de autonomia: ver `07-autonomia-progressiva.md`.

## Contexto

O rodapé tem `<a href="#facebook">` e `<a href="#linkedin">` com ícones genéricos. Não levam a lugar nenhum.

## Objetivo

Rodapé só com links que funcionam. **Depende da ADR-002.**

## Não objetivos

- Mudar o resto do rodapé.

## Spec

- **Dado** o rodapé, **quando** carrega, **então** não há `href` começando com `#facebook` ou `#linkedin`; o link de e-mail continua.

## Dados e fontes de verdade

- Arquivos/componentes: `src/App.tsx` (Footer), `src/styles.css` (`.socials`, se ficar vazio)
- Fonte original, se houver: Se a ADR-002 trouxer URLs oficiais, usá-las exatamente como informadas.
- Dados que não podem ser duplicados: catálogos `*.generated.ts`, `newsRecords`.

## Avaliações

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| E1 | Teste de contrato | `App.tsx` sem `href="#facebook"` e `href="#linkedin"` |

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
