# Sincronização dos dados do portal

## O que está conectado

O catálogo de panoramas é gerado por `scripts/generate-panorama-catalog.mjs`. Ele lê os anexos `application/pdf` do dump `BD/u195698278_HZYqx.sql`, cruza os arquivos existentes em `public/uploads/2025/03` e gera `src/data/panoramas.generated.ts`.

As páginas de panoramas, cidades, municípios contemplados, busca e índice territorial usam esse catálogo único. Atualmente ele apresenta 79 municípios e valida 79 PDFs e 79 capas locais.

## Atualizar após receber um novo dump

Substitua o arquivo SQL pelo novo dump e execute:

```bash
npm run sync:data
npm run build
```

O catálogo será regenerado e a aplicação passará a usar os novos arquivos presentes em `public/uploads/2025/03`.

## Atualização automática em produção

Um arquivo `.sql` é um snapshot; o navegador não consegue consultar o MySQL diretamente. Portanto, mudanças feitas no banco online só serão refletidas automaticamente quando o projeto tiver uma fonte online, como uma API protegida ou uma conexão server-side com o banco WordPress.

Para essa etapa, serão necessários host, porta, banco, usuário, senha e uma definição de hospedagem para a API. As credenciais não devem ser colocadas no React nem enviadas ao navegador. O catálogo gerado permanece como fonte local reprodutível até essa conexão ser configurada.

## Limite atual da migração

Os arquivos e metadados dos panoramas já são derivados do dump. Alguns textos editoriais, indicadores e descrições de outras áreas ainda estão escritos nos componentes React; para torná-los dinâmicos também é preciso extrair `wp_posts`, `postmeta` e o conteúdo do Elementor para modelos de conteúdo correspondentes.
