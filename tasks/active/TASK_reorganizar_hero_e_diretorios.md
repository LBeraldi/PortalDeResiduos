# TASK — Reorganizar navegação do Hero e criar a área “Diretórios”

## Contexto

A aplicação já possui um Hero visualmente definido e aprovado. Atualmente, os cards do Hero são apenas informativos e não executam nenhuma ação de navegação.

Também já existem no sistema as áreas/abas:

- Projeto Valoriza
- Nota Técnica

Os links para essas duas áreas já existem em outros pontos da interface.

Além disso, existe atualmente uma seção com os municípios de Mato Grosso do Sul (“Onde o projeto atua”), em que cada município possui acesso aos respectivos pareceres/panoramas já cadastrados.

## Objetivo

Transformar os cards existentes do Hero em pontos principais de navegação da aplicação, aproveitando o layout atual e evitando alterações visuais desnecessárias.

O Hero deverá direcionar para:

1. Projeto Valoriza
2. Nota Técnica
3. Diretórios

As duas primeiras áreas já existem. A terceira deverá ser criada.

---

## 1. Hero

### Comportamento esperado

- Manter a composição visual atual dos cards o mais próxima possível do design existente.
- Não redesenhar o Hero.
- Não alterar desnecessariamente dimensões, tipografia, cores, espaçamentos, ilustrações ou identidade visual.
- Fazer apenas as adaptações de texto/identificação necessárias para que os três cards representem claramente:
  - Projeto Valoriza
  - Nota Técnica
  - Diretórios
- Tornar cada card clicável como um todo.
- Adicionar apenas feedbacks discretos de interação, como `cursor`, `hover` e `focus`, mantendo a linguagem visual existente.
- Garantir navegação por teclado e semântica adequada para acessibilidade.
- Utilizar o mecanismo de navegação interna já adotado pelo projeto, evitando reload completo da página.

### Destinos

- Card “Projeto Valoriza” → utilizar a rota/aba já existente de Projeto Valoriza.
- Card “Nota Técnica” → utilizar a rota/aba já existente de Nota Técnica.
- Card “Diretórios” → utilizar a nova rota/aba Diretórios.

### Importante

Antes de implementar, localizar as rotas, componentes e links já existentes no projeto. Não criar novas rotas para Projeto Valoriza ou Nota Técnica se elas já existirem.

---

## 2. Reposicionamento dos links existentes

Os acessos atuais a “Projeto Valoriza” e “Nota Técnica” deverão ser removidos dos locais onde hoje funcionam como atalhos principais, pois o Hero passará a assumir essa função.

Regras:

- Reutilizar as rotas existentes.
- Não duplicar navegação.
- Não remover funcionalidades internas dessas páginas.
- Não alterar conteúdo ou comportamento das áreas Projeto Valoriza e Nota Técnica.
- Remover somente os atalhos que se tornarem redundantes após a navegação pelo Hero.

---

## 3. Nova área “Diretórios”

Criar uma nova aba/rota chamada:

**Diretórios**

Essa área deverá concentrar os acessos aos pareceres/panoramas dos municípios que atualmente aparecem na seção “Onde o projeto atua”.

### Conteúdo

- Reaproveitar a lista de municípios já existente.
- Reaproveitar os links/destinos atualmente associados a cada município.
- Não cadastrar manualmente uma segunda lista caso já exista uma fonte de dados reutilizável.
- Sempre que possível, utilizar a mesma fonte de dados já usada pela seção atual.
- Preservar os destinos e comportamentos dos links existentes.

### Organização

A página deve apresentar os municípios de forma clara, legível e responsiva.

Pode reutilizar o padrão visual existente da listagem atual, adaptando-o apenas se necessário para funcionar como uma página própria.

Não realizar redesign amplo sem necessidade.

---

## 4. Seção atual “Onde o projeto atua”

Os links dos municípios que atualmente direcionam para pareceres/panoramas deverão ser transferidos para a nova área Diretórios.

Após a criação da nova área:

- evitar manter duas interfaces diferentes oferecendo exatamente a mesma listagem de links;
- avaliar a seção atual e remover ou simplificar os elementos que ficaram redundantes;
- preservar qualquer informação institucional que ainda seja útil;
- não excluir dados ou funcionalidades sem verificar se são utilizados em outro ponto do sistema.

---

## 5. Restrições

- Não redesenhar o Hero.
- Não alterar a identidade visual existente.
- Não recriar páginas que já existem.
- Não duplicar dados de municípios.
- Não duplicar rotas.
- Não alterar URLs existentes sem necessidade.
- Não alterar regras de negócio dos pareceres/panoramas.
- Não fazer refatorações não relacionadas à tarefa.
- Reutilizar componentes, estilos, dados e padrões já existentes sempre que possível.

---

## 6. Critérios de aceite

A tarefa será considerada concluída quando:

- [ ] O Hero continuar visualmente muito próximo do estado atual.
- [ ] Os três cards do Hero forem clicáveis.
- [ ] Projeto Valoriza direcionar para sua área já existente.
- [ ] Nota Técnica direcionar para sua área já existente.
- [ ] Diretórios possuir uma nova rota/aba funcional.
- [ ] A nova área Diretórios listar os municípios atualmente existentes no sistema.
- [ ] Os links dos municípios continuarem levando aos respectivos pareceres/panoramas corretos.
- [ ] A mesma fonte de dados seja reutilizada sempre que tecnicamente possível.
- [ ] Os antigos atalhos redundantes de Projeto Valoriza e Nota Técnica sejam removidos.
- [ ] A listagem de municípios não fique duplicada desnecessariamente.
- [ ] Navegação funcione em desktop e mobile.
- [ ] Cards possuam estados de hover/focus coerentes com o design.
- [ ] Nenhuma funcionalidade já existente seja quebrada.
- [ ] Build, lint e testes existentes continuem passando.

---

## 7. Fluxo recomendado para o agente

Antes de alterar código:

1. Localizar o componente atual do Hero.
2. Identificar onde estão definidos os links/rotas de Projeto Valoriza e Nota Técnica.
3. Identificar onde esses atalhos aparecem atualmente.
4. Localizar o componente e a fonte de dados da seção “Onde o projeto atua”.
5. Identificar como os municípios são relacionados aos respectivos pareceres/panoramas.
6. Verificar o padrão atual de rotas e navegação da aplicação.
7. Propor a menor alteração possível para cumprir a tarefa.
8. Implementar.
9. Validar navegação, responsividade e acessibilidade.
10. Rodar build, lint e testes disponíveis.

## Instrução final

Priorize reutilização e alterações mínimas. A intenção desta tarefa é reorganizar a navegação da aplicação, não redesenhar sua interface.
