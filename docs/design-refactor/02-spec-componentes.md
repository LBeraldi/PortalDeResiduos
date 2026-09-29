# 02. Spec de componentes

Cada componente lista critérios verificáveis (CP-xx). Componentes novos vão em `src/components/`.

## CP-01. Header (App.tsx)

1. Em 390 px, o botão de menu fica inteiro dentro da viewport (`getBoundingClientRect().right <= 390`).
2. Abaixo de 900 px, o logo mostra só a marca do projeto: mesmo `logo.png`, com `object-fit: cover; object-position: left` e largura fixa. Sem arquivo novo.
3. A barra superior mostra "Convênio técnico-científico MPMS · UEMS" e fica fora da parte fixa. Parte fixa ≤ 72 px.
4. Itens do menu em sans 15 px/600: Início, Produções do Convênio, Cidades, Notícias, Contato.
5. Botão de busca com rótulo visível "Buscar" no desktop; ícone de 44 px no celular com `aria-label="Buscar no portal"`.
6. Menu móvel: `aria-expanded`, `aria-controls`, Esc fecha e devolve o foco ao botão.

## CP-02. Link vs botão

1. Todo destino de navegação usa `<Link to>`. Baseline: 48 `onClick={() => navigate(` e 10 `<Link `. Meta: 0 `navigate(` em `onClick` de elementos que só navegam.
2. Um cartão inteiro clicável é um `<Link>` com o título como texto acessível; nada interativo dentro dele.

## CP-03. HeroCarousel (HomePage.tsx)

1. Um único `<h1>` na página, fixo: "Informação para dar o destino certo." (texto do primeiro slide atual).
2. Os outros quatro slides viram destaques em `<section aria-roledescription="carrossel" aria-label="Destaques">`, com `<h2>` ou `<p>`, nunca `<h1>`.
3. Intervalo de 8 s (a tarefa concluída pedia 6 a 8 s). Botões anterior, pausar/continuar e próximo, com `aria-label`.
4. Pausa em hover e foco (já existe). Com movimento reduzido, não troca sozinho.
5. Região do texto com `aria-live="off"` enquanto roda e `"polite"` quando pausado.

## CP-04. HeroSearch

1. Foco visível: `:focus-within` no formulário com `outline: 2px solid var(--cerrado-claro)`.
2. Sugestões com `key` única (hoje `key={`-`}`).
3. `role="combobox"`, `aria-expanded`, `aria-activedescendant` coerentes com a lista.

## CP-05. SiteSearch (manter)

1. Esconder o botão nativo de limpar do `input[type=search]` (`::-webkit-search-cancel-button { display:none }`) para não duplicar o "Fechar".

## CP-06. MunicipalityIndex (novo; substitui 4 listagens)

1. Fonte: `cityRecords` (panoramas) + `selectiveCollectionPlans`. Nenhuma lista digitada.
2. Campo "Buscar município" no topo, normalizando acentos (lógica atual de `CityDirectory`).
3. Filtro segmentado: "Todos (79)" e "Com plano de coleta seletiva (15)"; contagens calculadas.
4. Índice A–Z só com letras que têm município, levando à âncora da letra.
5. Desktop: tabela com Município, Documentos disponíveis (selos), ação "Abrir ficha". Celular: lista de linhas de 52 px, selo abaixo do nome.
6. Estado vazio: "Nenhum município encontrado para “termo”." e botão "Limpar busca".
7. Props `eyebrow`, `title`, `description` para cada rota usar o próprio cabeçalho.

## CP-07. DocumentRow (novo)

1. Miniatura 52 × 64 (capa do panorama quando existe; senão ícone de arquivo).
2. Título do documento, metadados em mono: tipo, formato e tamanho (quando local), origem ("Arquivo local" ou "Google Drive").
3. Ação à direita: "Abrir PDF" ou "Abrir no Drive", `<a href target="_blank" rel="noopener">` com ícone de link externo e texto "(abre em nova aba)" visualmente oculto.
4. Tamanho vem do gerador (ADR-005). Sem tamanho, não mostra.

## CP-08. Badge, Alert, Field (novos)

- Badge: variantes `doc`, `positive`, `warning`, `outline`. Mono 12 px, raio 3 px.
- Alert: `warning`, `success`, `error`, com ícone, título e texto; borda esquerda de 3 px.
- Field: rótulo sans 14 px/600 acima do campo, borda `--field-border`, altura 44 px, mensagem de erro por campo ligada por `aria-describedby`.

## CP-09. Footer

1. Remover `#facebook` e `#linkedin` até existirem URLs oficiais (ADR-002). Manter o e-mail.
2. Mantém estrutura, cor e fio cerrado.

## CP-10. PageHero e Breadcrumbs

1. Trilha acima do `<h1>` em todas as páginas internas.
2. Tom `mata` só na página inicial. Internas em papel.
3. Prop `image` só com imagem aprovada para a página (ADR-004); sem ela, o herói fica só com texto.
