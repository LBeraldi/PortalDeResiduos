# Inventário de rotas — Portal Resíduos MS

Inventário inicial produzido a partir do dump do WordPress e do pacote de uploads. A fundação está sendo implementada separadamente do conteúdo detalhado para que nenhuma subpágina seja perdida durante a migração.

## Resumo da fonte

- 46 páginas publicadas no WordPress.
- 8 notícias publicadas.
- 232 anexos registrados no banco.
- 1.402 arquivos disponíveis em `public/uploads`.
- Página inicial definida como `/home/` no WordPress.
- Estrutura original de permalink: `/%year%/%monthnum%/%day%/%postname%/`.

## Rotas institucionais e principais

| Rota | Conteúdo | Status |
| --- | --- | --- |
| `/` e `/home/` | Home | Base criada; alias preservado |
| `/sobre/` | Sobre | Base criada |
| `/noticias/` | Arquivo de notícias | Base criada |
| `/contact/` | Contato | Base criada |
| `/cidades/` | Diretório municipal | Base criada |
| `/publicacoes/` | Biblioteca | Base criada |
| `/projeto-valoriza/` | Projeto Valoriza | Base criada |
| `/disposicao-legal/` | Disposição Legal | Conteúdo pendente |
| `/como-separar-corretamente-seu-lixo/` | Educação sobre separação | Conteúdo pendente |
| `/diferenca-de-lixao-e-aterro-sanitario/` | Conteúdo educativo | Conteúdo pendente |
| `/modelo-de-usinas-de-triagem-de-residuos/` | Modelo de usinas | Conteúdo pendente |
| `/nota-tecnica/` | Nota técnica | Conteúdo pendente |

## Produções e subpáginas

- `/producoes-do-convenio/`
- `/apoio-a-decisao/`
  - `/apoio-a-decisao/guia-do-usuario-do-grs/`
- `/recicla-match/` — link legado identificado no conteúdo.
- `/logistica-reversa/` — link legado identificado no conteúdo.
- `/materiais-compilados/`
  - `/panoramas-da-gestao-de-residuos/`
  - `/plano-de-coleta-seletiva/`
  - `/plano-de-compostagem/`
  - `/municipios-contemplados/`
- `/educacao-ambiental/`
  - `/planos-de-educacao-ambiental/`
- `/panorama-e-censo-dos-catadores/`

## Municípios

### Páginas municipais principais

- `/cidades/campo-grande/`
- `/cidades/dourados/`
- `/cidades/corumba/`
- `/cidades/tres-lagoas/`
- `/cidades/ponta-pora/`
- `/corumba/` — alias legado encontrado no conteúdo.

### Municípios do Plano de Coleta Seletiva

- Bonito
- Costa Rica
- Miranda
- Rio Brilhante
- Bataguassu
- Nova Alvorada do Sul
- Amambai
- Mundo Novo
- Coxim
- Porto Murtinho
- Japorã
- Chapadão do Sul
- Alcinópolis
- Glória de Dourados
- Sidrolândia

Cada município será transformado em uma tela própria na Fase 5, usando um componente orientado a dados.

## Notícias

As 8 notícias publicadas estão registradas na fundação em `src/data/siteMap.ts`. As telas individuais receberão o conteúdo integral, imagem, data e metadados na Fase 6.

## Recursos identificados

- PDFs locais de publicações, panoramas, cartilhas e notas técnicas.
- Arquivos DOC e DOCX de ata e estatuto de cooperativas.
- Links externos para Google Drive.
- Embed do Power BI no Projeto Valoriza.
- Aplicação externa em Streamlit no Apoio a Decisão.
- Google Maps em Campo Grande.
- Links acadêmicos e normativos externos.

## Pendências registradas

1. Corrigir slugs inconsistentes entre hierarquia do WordPress e links do conteúdo.
2. Decidir o destino de páginas legadas como `/booking/`, `/pagina-exemplo/`, `/recicla-match/` e `/logistica-reversa/`.
3. Associar cada página aos documentos locais ou externos corretos.
4. Importar integralmente os conteúdos HTML das 46 páginas e 8 notícias.
5. Validar todos os links externos antes da publicação.

## Fase 4 implementada

A hierarquia de Produções do Convênio agora possui telas navegáveis para:

- /producoes-do-convenio/
- /materiais-compilados/
- panoramas da gestão de resíduos
- plano de coleta seletiva
- plano de compostagem
- municípios contemplados
- educação ambiental e seus planos
- panorama e censo dos catadores

Os caminhos curtos e os permalinks hierárquicos encontrados no WordPress foram preservados quando identificados. Os materiais locais são servidos diretamente de public/uploads.

## Fase 5 implementada

O diretório de cidades agora usa um componente orientado a dados em CityPages.tsx. As fichas individuais foram associadas aos panoramas municipais locais para Água Clara, Alcinópolis, Amambai, Bataguassu, Bonito, Campo Grande, Chapadão do Sul, Corumbá, Costa Rica, Coxim, Dourados, Glória de Dourados, Japorã, Miranda, Mundo Novo, Nova Alvorada do Sul, Ponta Porã, Porto Murtinho, Rio Brilhante, Sidrolândia e Três Lagoas.

O alias legado /corumba/ aponta para a mesma ficha de Corumbá. Municípios não associados a um documento recebem uma tela de migração orientada, sem apresentar dados inventados.

## Fase 6 implementada

O arquivo editorial foi migrado para NewsPages.tsx com os oito artigos publicados, seus títulos, datas, slugs, resumos, fatos de destaque, imagens locais e fontes externas identificadas no dump SQL. As rotas /noticias/<slug>/ e os permalinks antigos com data agora utilizam páginas individuais orientadas a dados.

## Fase final — fechamento e compatibilidade

- As rotas `/recicla-match/` e `/logistica-reversa/` receberam telas próprias, usando os assets locais e os links oficiais identificados no conteúdo original.
- `/booking/` e `/pagina-exemplo/` foram preservadas como rotas compatíveis, com aviso explícito de conteúdo legado e caminhos para as áreas atuais.
- `/documentos/` permanece como alias funcional da biblioteca de publicações.
- O título e a descrição do documento agora acompanham a rota navegada.
- Build final validado com `npm run build`.

### Observação de migração

A aplicação original do Recicla Match não foi localizada no banco ou no pacote de uploads recebido. A tela mantém o contexto da rota e está preparada para receber o endereço original quando ele for disponibilizado.
