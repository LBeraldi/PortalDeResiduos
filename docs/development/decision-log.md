# Registro de decisões

## 2026-09-21 — Fundação de desenvolvimento

- **Decisão:** adotar spec → eval → implementação → quality gate como fluxo padrão.
- **Motivo:** o projeto já tem tarefas com critérios de aceite, mas não tinha um contrato comum nem validação de dados/rotas.
- **Consequência:** toda mudança deve ter critérios verificáveis; mudanças de UI exigem avaliação manual no navegador.
- **Decisão:** não introduzir framework de testes ou lint nesta etapa.
- **Motivo:** manter a fundação sem instalar dependências e sem ampliar o escopo; os gates iniciais usam TypeScript, Node test runner, validadores locais e Vite.
- **Próximo passo:** adicionar testes de comportamento de componentes quando houver uma necessidade concreta que justifique um runner de DOM.

## 2026-09-29 — Refinamento de design (ADRs de `docs/design-refactor/09-decisoes.md`)

- **ADR-001 (aceita, opção a):** `/cidades/`, `/diretorios/` e `/panoramas-da-gestao-de-residuos/` usam o mesmo `MunicipalityIndex`; as três URLs continuam.
- **ADR-002 (aceita, opção a):** remover os links `#facebook` e `#linkedin` do rodapé até existirem URLs oficiais.
- **ADR-003 (pendente, nível 4):** Playwright e axe não entram como devDependencies; medições de navegador rodam fora do projeto.
- **ADR-004 (aceita, opção a):** herói só com texto nas páginas sem imagem relacionada; o texto "Sobre o panorama" é escrito a partir do conteúdo já publicado e aprovado pelo dono do projeto antes de publicar.
- **ADR-005 (aceita, opção a):** o gerador de catálogos grava `sizeBytes`; os arquivos são regenerados com `npm run sync:data`, nunca editados à mão.
- **ADR-006 (aceita, opção a):** menu Início · Municípios · Documentos · Produções do Convênio · Notícias · Contato; Documentos vira lista única com filtros; Produções do Convênio vira uma página só; nenhuma URL pública é removida.
- **Motivo:** decisões tomadas pelo dono do projeto em 2026-09-29 a partir da auditoria https://claude.ai/artifact/RNMQP4tTRSNprZRooeNW17.

## 2026-09-29 — Gate de design (D0.2)

- **Decisão:** criar `npm run check:design` (`scripts/check-contrast.mjs` e `scripts/check-design-rules.mjs`, sem dependências) e incluí-lo em `check:quality`, antes do build.
- **Motivo:** proteger os tokens de cor, a fonte mínima de 12 px, o uso de hex fora de `:root` e a navegação por `<Link>` durante o refinamento de design.
- **Consequência:** `check-design-rules.mjs` funciona como catraca. Cada tarefa que melhora uma métrica baixa o teto no mesmo commit; subir um teto exige ADR.

## 2026-09-29 — Execução contínua das fases de design

- **Decisão:** o dono do projeto pediu a execução de todas as fases (D0 a D3) na ordem do backlog, com review do código ao final, em vez de um PR revisado por vez.
- **Como fica:** uma branch e um commit por tarefa, empilhados. Texto público novo ou alterado usa o texto já proposto nas specs e na auditoria aprovada e fica listado em `docs/design-refactor/PROGRESS.md` para aprovação antes de publicar (inclui "Sobre o panorama", ADR-004). Nenhum arquivo é apagado; arquivos que ficarem sem uso são listados no handoff. Dependências continuam proibidas (ADR-003 pendente).

