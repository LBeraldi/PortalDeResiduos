# Contrato de desenvolvimento do Portal Resíduos MS

Este arquivo orienta qualquer pessoa ou agente que altere o projeto. O objetivo é manter mudanças pequenas, verificáveis e rastreáveis.

## Fonte de verdade

- Requisito e critérios de aceite: `tasks/active/`.
- Contexto arquitetural e invariantes: `docs/development/context.md`.
- Rotas públicas: `src/data/siteMap.ts` e `docs/route-inventory.md`.
- Dados derivados: scripts em `scripts/` e arquivos `src/data/*.generated.ts`.
- Conteúdo legado original: `BD/` e `public/uploads/`; tratar como fonte de migração, não como código da aplicação.

Quando houver conflito, registrar a decisão em `docs/development/decision-log.md` antes de codificar. Não inventar conteúdo, números, URLs ou relações entre municípios.

## Fluxo padrão: spec → eval → implementação → gate

1. Ler o contexto aplicável e transformar o pedido em uma spec usando `docs/development/spec-template.md`.
2. Definir antes da implementação pelo menos um cenário de avaliação em `docs/development/eval-template.md`.
3. Implementar a menor mudança que satisfaz a spec.
4. Escrever ou atualizar testes de contrato/regressão junto com o código.
5. Executar `npm run check:quality`.
6. Atualizar a tarefa, registrar limitações e só então considerar o trabalho concluído.

Uma mudança não está pronta apenas porque compila: ela precisa demonstrar comportamento esperado, preservar rotas e passar os quality gates.

## TDD com IA no loop

Para cada comportamento novo, a IA deve trabalhar neste ciclo:

1. **Red:** registrar um teste ou cenário que falha e explicita o comportamento.
2. **Green:** implementar o menor código possível para passar.
3. **Refactor:** simplificar sem alterar o contrato.
4. **Eval:** verificar o fluxo no navegador quando houver mudança de interface, navegação, acessibilidade ou responsividade.
5. **Review:** relatar arquivos alterados, evidências, riscos e o que não foi validado.

Se não for viável automatizar uma parte, convertê-la em um cenário manual reproduzível, nunca em uma afirmação vaga como “parece funcionar”.

## Autonomia progressiva

- **Nível 0 — esclarecer:** pedir decisão quando houver ambiguidade que mude o produto.
- **Nível 1 — propor:** apresentar spec, riscos e plano quando a mudança for ampla.
- **Nível 2 — executar:** editar arquivos locais e rodar verificações reversíveis dentro do escopo aprovado.
- **Nível 3 — consolidar:** atualizar documentação, testes e dados derivados após os gates passarem.
- **Nível 4 — pedir autorização:** antes de publicar, apagar dados, instalar dependências, alterar serviços externos ou fazer migração irreversível.

Por padrão, o projeto opera nos níveis 2 e 3. Aumentar autonomia exige evidência, não apenas confiança.

## Regras de segurança e qualidade

- Preservar URLs existentes; aliases legados devem ser explícitos.
- Reutilizar fontes de dados e componentes antes de criar duplicatas.
- Não editar manualmente arquivos `*.generated.ts`; corrigir a fonte ou o gerador.
- Não misturar redesign, migração de conteúdo e correção de comportamento na mesma tarefa sem registrar o motivo.
- A saída de cada gate deve ser anexada à tarefa ou resumida no handoff.

<!-- Colar ao final do AGENTS.md existente. Não substitui nenhuma seção acima. -->

## Refinamento de design (docs/design-refactor/)

O portal passa por um refinamento visual e de UX **evolutivo**: a identidade "Dossiê público" (papel, mata, cerrado; Spectral, IBM Plex Sans e IBM Plex Mono) fica. Mudam só coisas com justificativa de UX, legibilidade, acessibilidade, consistência ou hierarquia.

### Leitura obrigatória por tipo de tarefa

| Tarefa toca… | Ler antes |
|---|---|
| qualquer UI | `docs/design-refactor/00-contexto.md`, `PROGRESS.md` |
| cor, fonte, espaço, `styles.css` | `01-spec-design-system.md` |
| componente em `src/components/` | `02-spec-componentes.md` |
| página em `src/pages/` ou `HomePage.tsx` | `03-spec-paginas.md` |
| fechamento de tarefa | `04-evals.md`, `05-quality-gates.md` |

Não carregar os demais arquivos sem necessidade.

### Regras de design

1. Cor só por token de `:root` em `src/styles.css`. Nenhum hex novo fora de `:root`.
2. Nenhum texto abaixo de 12 px (`0.75rem`).
3. Navegar para outra página é `<Link to>` de `src/components/router.tsx`. `<button>` só para ação na própria página (abrir busca, pausar carrossel, enviar formulário).
4. Sem gradiente decorativo, glassmorphism, sombra em cartão, deslocamento ou zoom no hover. Uma sombra, só para sobreposições.
5. Mono (IBM Plex Mono) só para sobrelinha, data, formato de arquivo e número. Navegação, botões e rótulos de formulário em sans.
6. Imagem de herói só quando mostra o assunto da página. Na dúvida, sem imagem.
7. Toda lista de municípios vem do mesmo componente e dos catálogos gerados (ver ADR-001).
8. Número em destaque só se for dado com fonte (regra RC-3).

### Contrato da sessão de design

- Começar lendo `PROGRESS.md` e terminar atualizando-o.
- Uma tarefa por vez, na ordem de `08-backlog.md`. Não misturar fases.
- Rodar `npm run check:quality` e, depois da D0.2, `npm run check:design`.
- Registrar o eval da tarefa em `docs/design-refactor/evals/AAAA-MM-DD-<tarefa>.md`.
- Decisão pendente em `09-decisoes.md` bloqueia a tarefa que depende dela. Perguntar, não decidir.
