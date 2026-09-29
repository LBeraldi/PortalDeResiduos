# 10. Navegação e cliques

Pedido do dono do projeto (2026-09-28): o site exige cliques demais para chegar à informação. Este arquivo é a spec da nova navegação. Tem prioridade sobre `03-spec-paginas.md` onde os dois tratarem da mesma página.

## Diagnóstico (robô em 109 páginas, versão 75c3614)

- **7 destinos quebrados** em `src/pages/ProductionPages.tsx`: `/materiais-compilados/panoramas-da-gestao-de-residuos/`, `/materiais-compilados/plano-de-coleta-seletiva/`, `/materiais-compilados/plano-de-compostagem/`, `/materiais-compilados/municipios-contemplados/`, `/producoes-do-convenio/materiais-compilados/` e os dois `…/municipios-contemplados/` aninhados. Abrem "Esta página ainda não está disponível".
- **75 documentos de coleta seletiva (15 municípios) sem caminho por clique**: só em `/plano-de-coleta-seletiva/`, que nenhum link alcança. Só a busca chega.
- **7 páginas de conteúdo órfãs**: `/disposicao-legal/`, `/modelo-de-usinas-de-triagem-de-residuos/`, `/como-separar-corretamente-seu-lixo/`, `/diferenca-de-lixao-e-aterro-sanitario/`, `/plano-de-compostagem/`, `/plano-de-coleta-seletiva/`, `/municipios-contemplados/`.
- **Menu sem o acervo**: `NAV_LINKS` = Início, Produções do Convênio, Notícias, Contato.
- **Busca com lista copiada à mão** (`src/data/search.ts` `publicationEntries`), sem cartilhas, modelos e planos.

## Cliques da página inicial (menor caminho hoje → meta)

| Tarefa | Hoje | Meta |
|---|---|---|
| Panorama de um município | 3 | 2 (Municípios › "Panorama · PDF" na linha) |
| Plano de coleta seletiva de um município | sem caminho | 2 (Municípios › "Plano de coleta seletiva" na linha) |
| Cartilha de compostagem | sem caminho | 2 (Documentos › linha) |
| Panorama e Censo dos Catadores | 3 | 2 |
| Nota técnica catadores | 2 | 2 |
| Sistema GRS | 2 | 1 (botão no cartão da capa) |
| Modelo de estatuto | 2 | 2 |
| Notícia mais recente | 2 | 1 |
| Disposição Legal, Usinas, Como separar, Lixão e aterro | sem caminho | 2 (Produções › seção) |

## Regras

- **NAV-1.** Todo documento a no máximo 2 cliques da página inicial, contando o menu. Exceção só com registro em `09-decisoes.md`.
- **NAV-2.** Nenhuma página só de links para outras páginas. Página intermediária mostra conteúdo.
- **NAV-3.** Se o destino de um cartão é uma página cujo conteúdo principal é um arquivo ou sistema externo, o cartão oferece o arquivo direto; a página vira link secundário.
- **NAV-4.** Nenhum destino interno inexistente. Teste: `tests/navigation-contract.test.mjs` (hoje falha com os 7 destinos acima).
- **NAV-5.** Nenhuma página de conteúdo órfã (aliases legados e páginas de demonstração do WordPress ficam de fora).
- **NAV-6.** A busca leva ao destino final: município abre a ficha, documento abre o arquivo. O índice inclui todos os documentos de `src/data/documents.ts` e os 75 de coleta seletiva.

## Estrutura proposta

Menu: **Início · Municípios (`/cidades/`) · Documentos (`/publicacoes/`) · Produções do Convênio · Notícias · Contato**.

- **Municípios.** `MunicipalityIndex` (CP-06) com ações por linha: "Panorama · PDF" (arquivo) e, nos 15 com plano, "Plano de coleta seletiva" (`primaryDocumentUrl`); link "Ficha" para todos os documentos.
- **Documentos.** Lista única de `src/data/documents.ts` (novo, fonte única para a página e para a busca): título, tipo, formato, tamanho, URL, página de contexto opcional. Filtros por tipo com contagem. 11 documentos hoje: 2 notas técnicas, 4 artigos/revista, 1 estudo (Panorama e Censo), 2 cartilhas (cooperativas, compostagem), 2 modelos (DOCX, DOC).
- **Produções do Convênio.** Uma página com âncoras e uma seção por produção (Apoio à decisão, Projeto Valoriza, Educação ambiental, Disposição Legal, Usinas de triagem, Cooperativas), cada uma com a ação principal e o link para a página completa.
- **Redirecionamentos internos (sem mudar URL pública):** as rotas de Materiais Compilados e Municípios Contemplados renderizam Documentos ou o índice já filtrado. Depende da ADR-006.

## Evals

- **E10. Grafo de cliques.** `scripts/medir-cliques.mjs` (Playwright fora do repo até a ADR-003) gera o grafo; calcular por BFS a profundidade de cada arquivo. Metas: NAV-1 para todos os documentos da tabela; 0 páginas de erro alcançáveis; 0 órfãs.
- **E11.** `node --test tests/navigation-contract.test.mjs` verde.
