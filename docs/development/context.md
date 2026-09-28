# Contexto do projeto

## Produto

O Portal Resíduos MS é um portal público de informação, dados, publicações e ferramentas sobre gestão de resíduos sólidos em Mato Grosso do Sul. A prioridade é conteúdo correto, navegação estável, acessibilidade e preservação dos links da migração do WordPress.

## Arquitetura atual

- Vite + React + TypeScript estrito.
- SPA com roteamento interno próprio em `src/components/router.tsx` e resolução de rotas em `src/data/siteMap.ts`.
- Páginas agrupadas em `src/pages/`; componentes compartilhados em `src/components/`.
- Catálogos derivados de SQL/uploads em `src/data/*.generated.ts`.
- Assets e documentos públicos em `public/uploads/`.
- Sem backend, banco de dados de runtime ou dependências de teste instaladas atualmente.

## Invariantes

- Uma URL pública não deve ser removida ou alterada sem alias ou decisão explícita.
- Um município deve ter uma única fonte de identidade e slug; telas devem consumir dados existentes.
- Dados gerados devem continuar reproduzíveis pelos scripts em `scripts/`.
- Conteúdo ausente deve ser sinalizado como pendente/legado; não preencher lacunas com suposições.
- Mudanças de UI devem manter navegação por teclado, foco visível, texto alternativo e respeito a movimento reduzido quando aplicável.
- A aplicação deve continuar compilando com `strict: true`.

## Limites do agente

O agente pode ler, editar e validar arquivos do workspace quando isso estiver dentro da tarefa. Deve pedir direção antes de instalar dependências, alterar serviços externos, publicar, apagar dados ou modificar o conteúdo legado original. A avaliação visual deve ser feita sempre que uma mudança alterar interação ou layout.

## Riscos conhecidos

- A aplicação concentra muitas rotas em `App.tsx`; alterações de navegação podem gerar regressões silenciosas.
- `public/uploads/` contém grande volume de conteúdo legado e não deve ser reorganizado casualmente.
- Não existe histórico Git funcional nesta cópia local; mudanças importantes devem ser descritas nas tarefas e no decision log.
