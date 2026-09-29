# 01. Spec do design system

Cada requisito tem um ID (DS-xx) citado pelas tarefas e pelos evals.

## Cor

### DS-01. Tokens mantidos

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f5f3ec` | fundo da página |
| `--paper-raised` | `#fbfaf5` | cartões, campos, tabelas |
| `--paper-sunk` | `#ece9de` | cabeçalho de tabela, selo neutro |
| `--ink` | `#1a231e` | texto principal |
| `--ink-soft` | `#55605a` | texto de apoio (5,90:1 no papel) |
| `--ink-faint` | `#636a61` | metadados (5,02:1 no papel) |
| `--mata` | `#1b4b3a` | ação, link, marca (8,95:1 no papel) |
| `--mata-deep` | `#12352a` | herói da inicial, rodapé |
| `--cerrado` | `#b0742e` | anel de foco, fio do rodapé. **Nunca texto.** |
| `--line` | `#e0dccd` | divisórias |
| `--line-strong` | `#cec8b4` | borda de cartão (decorativa) |
| `--on-mata` | `#edf0e9` | texto sobre mata |
| `--on-mata-soft` | `#a9c0b0` | texto de apoio sobre mata (6,92:1) |

### DS-02. Tokens novos

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--cerrado-claro` | `#d4a15f` | rótulo e foco sobre `--mata-deep` | 5,78:1 |
| `--cerrado-texto` | `#8a5a1f` | texto cerrado sobre papel (categoria de notícia) | 5,31 no paper, 5,64 no raised |
| `--field-border` | `#8a8470` | borda de campo de formulário | 3,58:1 no raised (WCAG 1.4.11) |
| `--positive` / `--positive-bg` | `#256b3f` / `#e4efe6` | selo "disponível", sucesso | 5,47:1 |
| `--warning` / `--warning-bg` | `#8a5a1f` / `#f6ecdc` | "Em migração" | 5,04:1 |
| `--negative` / `--negative-bg` | `#a13f22` / `#f6e4de` | erro de formulário | 5,25:1 |

Informação neutra usa `--mata` sobre `--paper-sunk`. Não criar azul.

### DS-03. Aliases que saem

`--green`, `--deep`, `--mint` (aponta para cerrado), `--soft`, `--white`, `--adequado`, `--rejeito`. Substituir cada uso pelo token de nome correto, em uma tarefa só (D2.1), com diff revisado.

### DS-04. Foco

`:focus-visible { outline: 2px solid var(--cerrado); outline-offset: 3px }` sobre papel (3,51:1). Dentro de superfícies `--mata-deep`, `--cerrado-claro`. Nenhum `outline: 0` sem substituto visível no mesmo elemento ou no contêiner (`:focus-within`).

## Tipografia

### DS-05. Papéis

| Papel | Família | Tamanho | Peso / entrelinha |
|---|---|---|---|
| display | Spectral | `clamp(2.25rem, 5vw, 4rem)` | 600 / 1,04 |
| h2 | Spectral | `clamp(1.75rem, 3.4vw, 2.5rem)` | 600 / 1,08 |
| h3 | Spectral | 1.25–1.5rem | 600 / 1,25 |
| corpo | Plex Sans | 1.0625rem (17 px), máx. 68ch | 400 / 1,7 |
| interface | Plex Sans | 0.9375rem (15 px) | 600 |
| apoio | Plex Sans | 0.875rem (14 px) | 400 |
| registro | Plex Mono | 0.75–0.8125rem, caixa alta, 0,08em | 500 |
| número | Plex Mono tabular | 1.75–2.5rem | 500 |

### DS-06. Mínimo

Nenhuma declaração `font-size` abaixo de `0.75rem`. Baseline: 32 declarações abaixo disso, com 8 valores de `0.5625rem` a `0.72rem`.

### DS-07. Escala

No máximo 8 valores fixos de `font-size` distintos, fora de `clamp()` e `var()` (baseline: 13 fixos, 25 contando os `clamp()`).

## Espaço, forma e movimento

- **DS-08.** Escala: 4, 8, 12, 16, 24, 32, 48, 64, 96 px. `--section-y` = 64 px desktop, 48 px celular.
- **DS-09.** Raio: `--radius: 3px` em botão, campo e selo; 999px só para chips. Cartões sem raio.
- **DS-10.** Sombra: uma (`--shadow-overlay`), só em busca e menu móvel.
- **DS-11.** Hover de cartão: muda `border-color` e sublinha o título. Sem `transform`, sem `box-shadow`, sem zoom de imagem.
- **DS-12.** Transição até 180 ms, só cor e borda. Com `prefers-reduced-motion: reduce`, nenhuma animação automática.
- **DS-13.** Alvo mínimo de 44 × 44 px no celular para botões e links isolados.
