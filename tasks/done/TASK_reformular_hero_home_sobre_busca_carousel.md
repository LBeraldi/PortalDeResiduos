# TASK — Reformular o Hero da Home, incorporar o conteúdo de “Sobre”, integrar a busca e remover a página “Sobre”

## Contexto

A aplicação possui atualmente:

- uma página/aba **Sobre**, com informações institucionais e históricas do projeto;
- um Hero na página inicial com fundo verde e o texto “Gestão de resíduos pede decisões públicas.”;
- um mecanismo de pesquisa já existente no site, atualmente acessível pelo ícone de busca no cabeçalho;
- identidade visual já consolidada, com tons de verde, fundo claro, tipografia editorial e linguagem institucional.

Foi fornecido também um componente de referência no estilo “Coming Soon”, contendo bloco centralizado, badge, título, texto auxiliar, campo de entrada + botão, background com gradiente/grid, logomarca Vercel e ícones de redes sociais.

**Esse componente deve ser usado como referência visual e estrutural, não como código a ser copiado cegamente.** A implementação final deve ser adaptada à arquitetura, componentes, estilos e identidade já existentes no projeto.

---

## Objetivo principal

Substituir **todo o bloco verde atual do Hero da Home** por uma nova apresentação institucional que:

1. incorpore, de forma resumida e elegante, o conteúdo atualmente existente na página **Sobre**;
2. utilize um **carousel textual automático** para evitar excesso de informação simultânea;
3. incorpore o **mecanismo de pesquisa já existente no site** em formato de campo de busca + botão;
4. elimine a necessidade da página/aba **Sobre** como página independente;
5. preserve a identidade visual do sistema e evite alterações desnecessárias no restante da interface.

---

## 1. Análise obrigatória antes de implementar

Antes de alterar qualquer código, identificar:

1. componente atual do Hero da Home;
2. rota e componente da página **Sobre**;
3. todo o conteúdo textual e visual existente na página Sobre;
4. onde o link “Sobre” é usado: header, menu mobile, footer, links internos e sitemap, se houver;
5. implementação atual da busca: componente, hook/context, rota, modal, função de pesquisa e parâmetros utilizados;
6. padrões visuais já existentes: cores, tipografia, espaçamentos, botões, inputs e responsividade;
7. se o projeto já utiliza shadcn/ui, Tailwind CSS, TypeScript, lucide-react e alguma biblioteca de carousel/animação.

**Não instalar ou substituir bibliotecas antes dessa análise.**

---

## 2. Novo Hero da Home

Substituir integralmente o conteúdo do atual bloco verde:

> “Gestão de resíduos pede decisões públicas.”

pelo novo Hero institucional.

### Direção visual

Usar o componente “Coming Soon” fornecido apenas como **referência de composição**:

- conteúdo central e bem hierarquizado;
- título em destaque;
- texto curto;
- elemento auxiliar no topo;
- campo de busca em destaque;
- fundo elegante com profundidade visual.

### Não utilizar no resultado final

Remover completamente qualquer referência a:

- Vercel;
- “Launching Fall 2026”;
- “Notify Me”;
- cadastro de e-mail;
- estado `submitted`;
- GitHub;
- X/Twitter;
- ícones de redes sociais;
- branding ou textos do componente original.

### Identidade

O novo componente deve seguir a identidade visual já existente no sistema:

- tons de verde atuais;
- fundo e contraste compatíveis com a Home;
- tipografia já utilizada;
- espaçamentos coerentes;
- sem introduzir uma aparência genérica de landing page SaaS.

**Não alterar o cabeçalho global.**

---

## 3. Conteúdo da página “Sobre” dentro do Hero

Todo o conteúdo relevante da página atual **Sobre** deverá ser analisado e condensado em pequenas mensagens para o Hero.

### Regra principal

Não copiar blocos longos de texto.

Transformar o conteúdo institucional em **3 a 5 slides curtos**, mantendo fielmente as informações já existentes no sistema.

Cada slide deve conter preferencialmente:

- pequeno rótulo/contexto;
- título curto;
- 1 parágrafo de aproximadamente 1–3 linhas;
- opcionalmente um dado numérico relevante.

### Estrutura conceitual sugerida

Os slides podem representar temas como:

1. **O projeto** — objetivo e atuação;
2. **Trajetória** — início do projeto e evolução;
3. **Abrangência** — atuação nos municípios de Mato Grosso do Sul;
4. **Resultados** — principais impactos apresentados atualmente na página Sobre;
5. **Rede / cooperação** — atuação conjunta das instituições envolvidas.

Os textos finais devem ser derivados do conteúdo real da página existente.

**Não inventar dados, datas, números ou resultados.**

---

## 4. Carousel textual

Criar um carousel textual elegante dentro do Hero para alternar automaticamente entre os conteúdos resumidos da página Sobre.

### Comportamento

- troca automática;
- intervalo sugerido: **6 a 8 segundos**;
- transição discreta, preferencialmente `fade`, `crossfade` ou leve movimento vertical;
- não usar animações chamativas;
- permitir navegação manual;
- exibir indicador discreto de posição, como dots ou pequenos marcadores;
- pausar ou evitar troca inesperada enquanto o usuário estiver interagindo com o conteúdo, quando aplicável.

### Acessibilidade

- suportar teclado;
- respeitar `prefers-reduced-motion`;
- controles com `aria-label`;
- evitar que a mudança automática prejudique leitura por tecnologias assistivas.

### Implementação

Antes de instalar biblioteca de carousel, verificar se o projeto já possui uma solução.

Se não houver, preferir uma implementação simples com React + CSS/Tailwind caso seja suficiente.

Evitar adicionar uma dependência pesada apenas para alternar texto.

---

## 5. Tratamento dos mapas/imagens atualmente presentes na página Sobre

A página Sobre possui elementos visuais relacionados ao projeto, incluindo mapas.

A nova Home **não deve ficar sobrecarregada** tentando reproduzir integralmente toda a página Sobre dentro do Hero.

### Estratégia recomendada

Prioridade:

1. usar os dados e conceitos dos mapas no conteúdo textual do carousel;
2. se visualmente adequado, reutilizar **uma única composição gráfica discreta** como apoio ao Hero;
3. evitar colocar vários mapas pequenos lado a lado dentro do carousel;
4. não prejudicar legibilidade do texto.

### Possibilidades aceitáveis

O agente pode escolher, conforme a estrutura existente:

- mapa de MS em baixa opacidade no background;
- silhueta/mapa decorativo em uma das laterais;
- uma miniatura discreta em um slide específico;
- composição gráfica baseada em assets já existentes.

### Evitar

- mapas ilegíveis;
- screenshots comprimidos;
- muitos elementos concorrendo com o texto;
- redesenho completo dos mapas;
- criação de informações cartográficas inexistentes.

Se nenhuma solução ficar visualmente coerente, **é preferível não usar o mapa no Hero** e preservar somente suas informações no texto.

---

## 6. Integrar a pesquisa do site ao novo Hero

O campo de e-mail do componente de referência deverá ser substituído por um **campo de pesquisa do próprio sistema**.

### Importante

**Não criar um segundo mecanismo de pesquisa.**

O campo do novo Hero deve reutilizar a lógica de busca já existente.

Antes de implementar, localizar o mecanismo atual e reutilizar o que já existir: função, hook, context, endpoint, componente, estado ou rota de resultados.

### Comportamento esperado

Exemplo visual:

```text
[ Pesquisar no acervo...                         ] [ Pesquisar → ]
```

O usuário poderá:

- digitar sua consulta;
- pressionar Enter;
- clicar no botão;

e obter exatamente o mesmo comportamento/resultados da busca já existente.

### Placeholder

Utilizar texto institucional coerente, como:

> Pesquisar no acervo...

ou outro equivalente compatível com a terminologia já adotada no sistema.

### Busca do header

A busca atual do cabeçalho pode continuar existindo se fizer sentido como acesso global.

**Não remover automaticamente o ícone atual apenas porque o Hero passará a possuir um campo de pesquisa.**

Avaliar redundância e manter o comportamento mais útil para navegação interna.

---

## 7. Remover a página/aba “Sobre”

Após o conteúdo relevante ter sido incorporado à Home:

- remover “Sobre” do menu principal;
- remover “Sobre” do menu mobile;
- remover referências redundantes em outros pontos da navegação;
- não deixar links internos quebrados.

### Rota antiga

**Não simplesmente apagar `/sobre` sem tratamento.**

Criar redirecionamento permanente ou equivalente da rota antiga:

```text
/sobre → /
```

Preferencialmente apontar para uma âncora específica do novo Hero caso isso faça sentido na arquitetura, por exemplo:

```text
/sobre → /#sobre-projeto
```

Isso preserva links antigos, favoritos, URLs já compartilhadas e indexação existente.

Se houver sitemap ou metadata específica da rota, atualizar de forma coerente.

---

## 8. Relação com o componente de referência

O arquivo de referência utiliza `Badge`, `Button`, `Input`, `ChevronRight`, shadcn/ui e lucide-react.

### Regra de integração

Antes de copiar qualquer dependência:

1. verificar se o projeto já possui componentes equivalentes;
2. reutilizar primitives existentes;
3. preservar o design system atual;
4. adicionar dependências somente se realmente necessárias.

### Não fazer

Não instalar shadcn/ui inteiro apenas para reproduzir este componente caso o projeto já tenha Button, Input, Badge ou utilities equivalentes.

O objetivo é **adaptar o padrão visual**, não introduzir um segundo design system.

Se o projeto já utiliza shadcn/ui, reutilizar a estrutura existente em vez de duplicar arquivos.

---

## 9. Responsividade

O novo Hero deve funcionar corretamente em:

- desktop;
- notebook;
- tablet;
- mobile.

### Desktop

- manter área visual ampla;
- centralizar e hierarquizar o conteúdo;
- campo de busca pode permanecer horizontal.

### Mobile

- reduzir tamanhos tipográficos de forma consistente;
- permitir que campo + botão se organizem verticalmente se necessário;
- garantir que nenhum slide corte texto;
- evitar altura excessiva;
- manter controles do carousel acessíveis.

**Não utilizar `min-h-svh` automaticamente se isso deixar a Home excessivamente alta.** Adaptar a altura ao layout atual.

---

## 10. Preservação do projeto existente

Não realizar refatorações fora do escopo.

Não alterar páginas de produções, Projeto Valoriza, Nota Técnica, Diretórios, pareceres, banco de dados, regras de negócio, autenticação ou componentes globais não relacionados, exceto quando tecnicamente necessário para atualizar links da rota Sobre.

---

## 11. Critérios de aceite

A tarefa será considerada concluída quando:

- [ ] O antigo Hero verde tiver sido substituído.
- [ ] O novo Hero seguir a identidade visual atual do sistema.
- [ ] Nenhum branding da Vercel ou rede social do componente de referência permanecer.
- [ ] O conteúdo da página Sobre tiver sido resumido de forma fiel.
- [ ] O conteúdo estiver dividido em 3–5 slides objetivos.
- [ ] O carousel alternar automaticamente com transição discreta.
- [ ] Houver navegação manual no carousel.
- [ ] `prefers-reduced-motion` for respeitado.
- [ ] A busca existente do sistema estiver integrada ao Hero.
- [ ] Enter e botão executarem a pesquisa corretamente.
- [ ] Nenhuma segunda lógica de busca tiver sido criada.
- [ ] A página “Sobre” tiver sido removida da navegação principal.
- [ ] A rota antiga `/sobre` redirecionar adequadamente para a Home.
- [ ] Links internos antigos para Sobre não estiverem quebrados.
- [ ] A solução estiver responsiva.
- [ ] A implementação não introduzir dependências desnecessárias.
- [ ] Build continuar funcionando.
- [ ] Lint continuar funcionando.
- [ ] Testes existentes continuarem passando.

---

## 12. Validação recomendada

Após implementar:

1. testar cada slide manualmente;
2. aguardar o ciclo automático completo do carousel;
3. testar `prefers-reduced-motion`;
4. testar pesquisa via Enter;
5. testar pesquisa via botão;
6. comparar os resultados com a busca original;
7. acessar `/sobre` diretamente e verificar redirecionamento;
8. verificar menu desktop;
9. verificar menu mobile;
10. revisar layout em resoluções mobile e desktop;
11. rodar build;
12. rodar lint;
13. rodar testes disponíveis.

---

## 13. Princípio de implementação

Esta tarefa é principalmente uma **reorganização de conteúdo e experiência de navegação**, não um redesign completo da aplicação.

Priorizar:

- reutilização;
- alterações mínimas;
- fidelidade ao conteúdo existente;
- consistência visual;
- legibilidade;
- acessibilidade;
- reaproveitamento da busca existente;
- preservação de rotas e funcionalidades atuais.


## Referencia de componente fornecido 


You are given a task to integrate an existing React component in the codebase

The codebase should support:

shadcn project structure

Tailwind CSS

Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:

coming-soon-4.tsx
"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

function VercelLogo() {
  return (
    <svg
      viewBox="0 0 76 65"
      className="size-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
}

export default function ComingSoonBlock() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted via-background to-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] [background-size:64px_64px] opacity-[0.15]"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        <div className="flex items-center gap-2 text-foreground">
          <VercelLogo />
          <span className="text-lg font-semibold tracking-tight">Vercel</span>
        </div>

        <Badge variant="secondary" className="mt-8">
          Launching Fall 2026
        </Badge>
        <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Something worth the wait is on its way
        </h1>
        <p className="mt-5 max-w-md text-lg text-pretty text-muted-foreground">
          We are building a calmer way to run your team. Leave your email and be
          the first through the door.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm font-medium text-foreground">
            You are on the list. We will be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mt-8 flex w-full max-w-md items-center gap-2"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-11"
            />
            <Button type="submit" size="lg" className="h-11 shrink-0">
              Notify Me
              <ChevronRight
                className="size-4"
                data-icon="inline-end"
                aria-hidden="true"
              />
            </Button>
          </form>
        )}

        <div className="mt-10 flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Northwind on X">
            <XMark aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Northwind On GitHub"
          >
            <GithubMark aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Brand marks are inlined rather than imported from an icon library: the rest
// of this file uses lucide-react, which keeps this block self-contained
// without dragging a whole icon package install into a consumer's project
// just for a handful of glyphs.
type MarkProps = React.ComponentProps<"svg"> & { size?: number | string };

function GithubMark({ size = 24, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
    </svg>
  );
}

function XMark({ size = 24, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z" />
    </svg>
  );
}


demo.tsx
import ComingSoonBlock from "@/components/ui/coming-soon-4";

export default function ComingSoon4Demo() {
  return <ComingSoonBlock />;
}


Copy-paste these files for dependencies:

shadcn/badge
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }


shadcn/button
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }


shadcn/input
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }


Install NPM dependencies:

lucide-react, class-variance-authority, @radix-ui/react-slot

Implementation Guidelines

Analyze the component structure and identify all required dependencies

Review the component's argumens and state

Identify any required context providers or hooks and install them

Questions to Ask

What data/props will be passed to this component?

Are there any specific state management requirements?

Are there any required assets (images, icons, etc.)?

What is the expected responsive behavior?

What is the best place to use this component in the app?

Steps to integrate
0. Copy paste all the code above in the correct directories

Install external dependencies

Fill image assets with Unsplash stock images you know exist

Use lucide-react icons for svgs or logos if component requires them
