import { ArrowRight, ExternalLink, Link2, Recycle, ShieldCheck } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Eyebrow'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

export function ReverseLogistics({ navigate }: { navigate: Navigate }) {
  return <>
    <PageHero tone="mata" eyebrow="Sistema estadual" title={<>Logística <span>Reversa</span></>} description="Um caminho para que embalagens e outros resíduos retornem ao setor empresarial e tenham uma destinação ambientalmente adequada." image={`${ASSET}2021/10/logistica-reversa-ilust.png`} />
    <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio', href: '/producoes-do-convenio/' }, { label: 'Logística Reversa' }]} />
    <section className="section container legacy-layout">
      <article className="prose">
        <Eyebrow>Responsabilidade compartilhada</Eyebrow>
        <h2>O descarte é parte de uma cadeia maior.</h2>
        <p>A logística reversa organiza a responsabilidade pelo retorno dos produtos e embalagens após o consumo. Ela conecta consumidores, municípios, comerciantes, fabricantes e entidades gestoras em torno de uma destinação correta.</p>
        <p>Em Mato Grosso do Sul, o Sistema Estadual de Logística Reversa de Embalagens — Sisrev — reúne informações e procedimentos para acompanhar a regularidade das empresas e apoiar a implementação dessa política.</p>
        <div className="legacy-callout"><ShieldCheck size={22} /><div><strong>O que muda na prática?</strong><span>Separar corretamente, entregar nos pontos indicados e acompanhar as orientações do sistema ajuda a manter materiais em circulação e reduz o envio de rejeitos aos aterros.</span></div></div>
        <div className="legacy-actions">
          <a className="button button-primary" href="https://sisrev.imasul.ms.gov.br/acesso?destino=%2F" target="_blank" rel="noreferrer">Acessar o Sisrev <ExternalLink size={15} /></a>
          <button className="text-link" onClick={() => navigate('/noticias/sistema-estadual-de-logistica-reversa-de-embalagens-em-ms-tem-2-956-empresas-regulares')}>Ler notícia relacionada <ArrowRight size={15} /></button>
        </div>
      </article>
      <aside className="legacy-card">
        <Link2 size={23} />
        <Eyebrow>Referência do projeto</Eyebrow>
        <h3>Uma ponte entre quem produz e quem cuida.</h3>
        <p>Consulte também os materiais compilados e as publicações do portal para aprofundar o entendimento sobre gestão e destinação de resíduos.</p>
        <button className="text-link" onClick={() => navigate('/publicacoes/')}>Abrir publicações <ArrowRight size={15} /></button>
      </aside>
    </section>
  </>
}

export function ReciclaMatch({ navigate }: { navigate: Navigate }) {
  return <>
    <PageHero tone="mata" eyebrow="Conexões para reciclar" title={<>Recicla <span>Match</span></>} description="Uma ideia do projeto para aproximar cooperativas, organizações e parceiros da cadeia da reciclagem." image={`${ASSET}2021/07/recicla-2048x1001.png`} />
    <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produções do Convênio', href: '/producoes-do-convenio/' }, { label: 'Recicla Match' }]} />
    <section className="section container legacy-layout">
      <article className="prose">
        <Eyebrow>Uma frente de inovação</Eyebrow>
        <h2>Reciclagem também acontece quando as pessoas certas se encontram.</h2>
        <p>O endereço Recicla Match aparece nos conteúdos originais do portal como uma frente de conexão da cadeia da reciclagem. Como a aplicação publicada não veio identificada no banco de dados nem nos uploads recebidos, esta tela preserva a rota e explica seu contexto sem criar uma integração inexistente.</p>
        <p>Enquanto a plataforma original é localizada ou disponibilizada novamente, os materiais do projeto continuam acessíveis pelas áreas de cooperativas, catadores e produções do convênio.</p>
        <div className="legacy-callout"><Recycle size={22} /><div><strong>Conteúdo preservado</strong><span>A rota está pronta para receber o endereço da aplicação ou novos materiais quando forem fornecidos.</span></div></div>
        <div className="legacy-actions">
          <button className="button button-primary" onClick={() => navigate('/cooperativas/')}>Ver materiais para cooperativas <ArrowRight size={15} /></button>
          <button className="text-link" onClick={() => navigate('/panorama-e-censo-dos-catadores/')}>Conhecer o censo dos catadores <ArrowRight size={15} /></button>
        </div>
      </article>
      <aside className="legacy-card">
        <Recycle size={23} />
        <Eyebrow>Cadeia da reciclagem</Eyebrow>
        <h3>Valorizar o trabalho que recupera materiais.</h3>
        <p>Conheça o Projeto Valoriza, iniciativa que reúne dados, referências e ações para fortalecer a inclusão socioprodutiva dos catadores.</p>
        <button className="text-link" onClick={() => navigate('/projeto-valoriza/')}>Abrir Projeto Valoriza <ArrowRight size={15} /></button>
      </aside>
    </section>
  </>
}

export function LegacyNotice({ title, description, navigate }: { title: string; description: string; navigate: Navigate }) {
  return <section className="legacy-notice section container" aria-labelledby="legacy-notice-title">
    <div className="legacy-notice-mark"><Link2 size={22} /></div>
    <Eyebrow>Rota legada</Eyebrow>
    <h1 id="legacy-notice-title">{title}</h1>
    <p>{description}</p>
    <div className="legacy-actions">
      <button className="button button-dark" onClick={() => navigate('/')}>Voltar ao início <ArrowRight size={16} /></button>
      <button className="text-link" onClick={() => navigate('/producoes-do-convenio/')}>Explorar produções <ArrowRight size={15} /></button>
    </div>
  </section>
}
