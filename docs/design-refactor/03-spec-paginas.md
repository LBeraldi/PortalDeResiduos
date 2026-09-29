# 03. Spec de páginas

Critérios PG-xx. "Altura" é `document.documentElement.scrollHeight` medido com Playwright.

## PG-G. Todas as páginas

1. Sem rolagem horizontal em 390, 768 e 1440 px.
2. `document.title` com o nome real da página. Ficha: "<Município> · Portal Resíduos MS"; notícia: "<título> · Portal Resíduos MS" (hoje "Município ·" e "Notícia ·").
3. Um `<h1>` por página.
4. Console sem erros nem avisos do React.

## PG-01. Início (`/`)

1. H1 fixo e carrossel conforme CP-03.
2. Três atalhos com a mesma anatomia (sobrelinha, título ou número, frase, link), destinos da tarefa ativa: Diretórios, Projeto Valoriza, Nota Técnica.
3. Sem carimbo "MS", sem título em mono, sem imagem com texto embutido recortada.
4. Notícias: as três mais recentes por data. Hoje aparecem as de 25/10/2021; devem aparecer as duas de 20/12/2025 e a de 15/12/2021.
5. Altura: ≤ 3.200 px em 1440 e ≤ 4.800 px em 390 (baseline 4.020 e 6.395).

## PG-02. Índice de municípios (`/cidades/`, `/diretorios/`, `/panoramas-da-gestao-de-residuos/`)

1. As três rotas renderizam `MunicipalityIndex` (depende de ADR-001).
2. A faixa "Cobertura do território" sai de `/cidades/`.
3. Altura em 390 px ≤ 5.000 px (baseline: panoramas 24.921, cidades 10.530).
4. As URLs continuam respondendo; `validate-project.mjs` continua com 60 rotas.

## PG-03. Ficha (`/cidades/<slug>/`)

1. Lista os documentos reais do município com `DocumentRow`: panorama e, quando houver, os documentos do plano de coleta seletiva.
2. Remove as caixas "01 / PDF / MS", a segunda cópia da capa e o bloco "Compare este município…".
3. Bloco "Sobre o panorama" com texto único aprovado (ADR-004), não repetido por município como se fosse específico.
4. Selos no topo: "Panorama publicado" e, se aplicável, "Plano de coleta seletiva".

## PG-04. Notícias (`/noticias/`, `/noticias/<slug>/`)

1. Arquivo do mais recente para o mais antigo.
2. Artigo: data uma vez, junto da categoria; resumo uma vez (linha fina).
3. "Em números" só com fatos cujo valor contém dígito; se nenhum, o bloco não aparece.
4. Herói em papel; imagem depois do título.

## PG-05. Produções e publicações

1. Miniaturas em moldura 4:3, fundo papel, `object-fit: contain`.
2. Publicações como lista de `DocumentRow` (tipo, ano, formato, tamanho quando local).
3. Imagem do herói só se aprovada (ADR-004).

## PG-06. Contato (`/contact/`)

1. Campos com `Field` (CP-08).
2. Título da confirmação sem afirmar que o aplicativo abriu: "Mensagem montada". O texto de apoio atual (com o e-mail) fica.

## PG-07. 404

Manter.
