import { PageHero } from '../components/PageHero'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ArrowRight, CalendarDays, ExternalLink, FileText, Link as LinkIcon, Newspaper } from 'lucide-react'
import { Link } from '../components/router'
import { sortByDate } from '../data/newsDate'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

type NewsRecord = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  facts: Array<{ label: string; value: string }>
  paragraphs: string[]
  source?: { label: string; href: string }
  links?: Array<{ label: string; href: string }>
}

export const newsRecords: NewsRecord[] = [
  {
    slug: 'sistema-estadual-de-logistica-reversa-de-embalagens-em-ms-tem-2-956-empresas-regulares',
    title: 'Sistema Estadual de Logística Reversa de Embalagens em MS tem 2.956 empresas regulares',
    date: '25 de outubro de 2021',
    category: 'Logística reversa',
    excerpt: 'Portarias do Imasul apresentam empresas, entidades gestoras e metas de logística reversa de embalagens em Mato Grosso do Sul.',
    image: `${ASSET}2021/10/logistica-reversa-ilust-1400x788.png`,
    facts: [{ label: 'Empresas regulares', value: '2.956' }, { label: 'Embalagens destinadas', value: '+16 mil t' }, { label: 'Sistema', value: 'Sisrev/MS' }],
    paragraphs: [
      'O Imasul publicou as Portarias 921, 922, 923 e 924, relacionadas ao Sisrev/MS, o Sistema de Logística Reversa de Embalagens de Mato Grosso do Sul. A Portaria nº 924/2021 traz a lista de 2.956 empresas ligadas a nove entidades gestoras que comprovaram as metas estabelecidas para o ano-base de 2019 por meio de seus relatórios anuais de desempenho.',
      'Ao todo, essas empresas destinaram à reciclagem mais de 16 mil toneladas de embalagens. A Portaria nº 922/2021 apresenta empresas cadastradas que ainda tinham pendências no sistema, enquanto a Portaria nº 923/2021 trata de empresas que deveriam se inscrever e comprovar o cumprimento da logística reversa.',
      'O não cumprimento das obrigações pode acarretar multa de R$ 5 mil a R$ 50 milhões, conforme o porte da empresa. O levantamento também registrou empresas com justificativas deferidas, justificativas indeferidas e entidades gestoras que não apresentaram comprovação integral das metas declaradas.',
      'A logística reversa consiste no retorno de materiais recicláveis ao ciclo produtivo e é um dos instrumentos da Política Nacional de Resíduos Sólidos. Em Mato Grosso do Sul, o sistema foi estruturado com a participação do Imasul, MPMS, TCE-MS, Semagro e setor produtivo.',
    ],
    links: [{ label: 'Diário Oficial — publicação original', href: 'https://www.spdo.ms.gov.br/diariodoe/Index/Download/DO10551_28_06_2021' }, { label: 'Acessar o Sisrev/MS', href: 'https://sisrev.imasul.ms.gov.br/acesso?destino=%2F' }],
  },
  {
    slug: 'uems-publica-edital-para-elaboracao-de-planos-de-coleta-seletiva-e-educacao-ambiental',
    title: 'UEMS publica Edital para Elaboração de Planos de Coleta Seletiva e Educação Ambiental',
    date: '25 de outubro de 2021',
    category: 'Convênio',
    excerpt: 'Edital da UEMS selecionou municípios para receber apoio técnico na elaboração de planos de coleta seletiva e educação ambiental.',
    image: `${ASSET}2021/10/uems.png`,
    facts: [{ label: 'Municípios previstos', value: '15' }, { label: 'Instrumentos', value: '2 planos' }, { label: 'Parceria', value: 'UEMS + MPMS' }],
    paragraphs: [
      'A Universidade Estadual de Mato Grosso do Sul publicou edital para beneficiar 15 prefeituras do Estado. A iniciativa consolida um trabalho conjunto entre MPMS e UEMS, com participação do Governo do Estado, UFMS, TCE-MS, Semagro e Imasul.',
      'As ações para elaboração dos Planos de Coleta Seletiva e dos Planos de Educação Ambiental seriam realizadas pela equipe de trabalho do projeto de pesquisa da UEMS, em consonância com o Termo de Convênio nº 1076/2020-UEMS/MPMS, no âmbito do Projeto Resíduos Sólidos: Disposição Legal.',
      'O apoio técnico aos municípios selecionados não envolvia repasse de recursos financeiros, materiais ou equipamentos. O objetivo principal era promover articulação e interação de ações direcionadas à proteção do meio ambiente.',
      'Entre os requisitos de elegibilidade estavam ser município sul-mato-grossense, possuir disposição final ambientalmente adequada, contar com plano municipal ou regional de resíduos dentro da vigência legal e comprovar estrutura técnico-administrativa mínima para acompanhar o projeto.',
    ],
    source: { label: 'Edital publicado pela UEMS', href: 'http://www.uems.br/editais_concursos/detalhes/c551639512896ac2184cfa5b340f33e1' },
  },
  {
    slug: 'promotor-de-justica-do-nucleo-ambiental-do-mpms-participa-do-lancamento-da-publicacao-da-obra-diretrizes-para-valoracao-de-danos-ambientais-no-cnmp',
    title: 'Promotor de Justiça do Núcleo Ambiental do MPMS participa do lançamento da publicação “Diretrizes para valoração de danos ambientais” no CNMP',
    date: '25 de outubro de 2021',
    category: 'Publicação técnica',
    excerpt: 'Luciano Furtado Loubet participou da apresentação das diretrizes do CNMP para valoração de danos ambientais.',
    image: `${ASSET}2021/10/Seminario-Residuos-Solidos-Imasul-9.jpg`,
    facts: [{ label: 'Instituição', value: 'CNMP' }, { label: 'Publicação', value: '7 capítulos' }, { label: 'Extensão', value: '+500 páginas' }],
    paragraphs: [
      'O Promotor de Justiça e Diretor do Núcleo Ambiental do MPMS, Luciano Furtado Loubet, participou virtualmente da apresentação das “Diretrizes para valoração de danos ambientais”, publicada pela Comissão do Meio Ambiente do Conselho Nacional do Ministério Público (CNMP).',
      'Durante o evento, o promotor e coordenador acadêmico da publicação destacou o trabalho de membros e servidores dos Ministérios Públicos Estaduais e Federais, além de técnicos de órgãos ambientais. A obra foi apresentada como uma primeira etapa de um trabalho que poderá ser complementado em outras temáticas.',
      'A iniciativa surgiu a partir de demandas dos colaboradores da Comissão do Meio Ambiente. Em 2020, um grupo de estudos foi criado e encerrou suas atividades com a elaboração do documento, voltado especialmente a membros e servidores do Ministério Público que atuam na defesa do meio ambiente.',
      'O material reúne métodos de valoração utilizados na atuação ministerial e busca compartilhar formas e estratégias para estudar e valorar o dano ambiental. Segundo o CNMP, a publicação pode contribuir para a defesa do direito ao meio ambiente saudável e equilibrado.',
    ],
  },
  {
    slug: 'em-5-anos-destinacao-adequada-de-residuos-solidos-aumentou-400-no-estado',
    title: 'Em 5 anos, destinação adequada de resíduos sólidos aumentou 400% no Estado',
    date: '25 de outubro de 2021',
    category: 'Resultados',
    excerpt: 'Levantamento apresentado em seminário mostrou a evolução da destinação adequada de resíduos sólidos nos municípios de Mato Grosso do Sul.',
    image: `${ASSET}2021/10/residuos.jpg`,
    facts: [{ label: 'Municípios adequados', value: '66 de 79' }, { label: 'Base comparativa', value: '16 em 2016' }, { label: 'Evolução', value: '4 vezes maior' }],
    paragraphs: [
      'Dos 79 municípios de Mato Grosso do Sul, 66 já dispunham de serviço adequado de destinação e disposição de resíduos sólidos. O número era quatro vezes maior do que o encontrado em 2016, quando apenas 16 municípios cumpriam as normas ambientais exigidas.',
      'O levantamento serviu de base para a elaboração do Projeto Resíduos Sólidos — Disposição Legal, resultado da parceria entre Semagro, Imasul, Tribunal de Contas do Estado e Ministério Público Estadual, com apoio da Assomasul, Assembleia Legislativa e universidades.',
      'Técnicos das instituições trabalharam na busca de soluções capazes de transformar a situação. O balanço foi apresentado durante o seminário “Desafios para Regionalização e Sustentabilidade dos Serviços de Resíduos Sólidos no Estado do Mato Grosso do Sul”, realizado no auditório do Imasul.',
      'O encontro também discutiu os desafios da regionalização e da sustentabilidade dos serviços, reunindo representantes estaduais, federais e especialistas do setor de limpeza pública e resíduos especiais.',
    ],
    source: { label: 'Matéria de referência da Semagro', href: 'https://www.semagro.ms.gov.br/wp-content/uploads/2021/09/residuos2.png' },
  },
  {
    slug: 'estado-de-ms-e-referencia-nacional-na-implantacao-de-logistica-reversa-de-embalagens-em-geral',
    title: 'Estado de MS é referência nacional na implantação de logística reversa de embalagens em geral',
    date: '16 de novembro de 2021',
    category: 'Logística reversa',
    excerpt: 'Instituições públicas e setor produtivo apresentaram resultados da implantação do Sistema de Logística Reversa de Embalagens em Geral em MS.',
    image: `${ASSET}2021/10/logistica-reversa-ilust.png`,
    facts: [{ label: 'Sistema', value: 'Sisrev/MS' }, { label: 'Articulação', value: 'MPMS + TCE-MS' }, { label: 'Tema', value: 'Embalagens' }],
    paragraphs: [
      'O MPMS, a Semagro e o TCE-MS realizaram uma live para apresentar os resultados da logística reversa de embalagens em geral em Mato Grosso do Sul. A implantação foi realizada pelo Projeto Resíduos Sólidos: Disposição Legal, articulado com o Imasul.',
      'Representantes das instituições destacaram que a implantação do sistema representa avanço ambiental e econômico, com potencial para gerar empregos e organizar um processo transparente que beneficia o Estado, as indústrias, o meio ambiente e a população.',
      'A iniciativa foi apresentada como exemplo de união de esforços entre instituições públicas e empresas que se preocupam com a destinação dos resíduos sólidos e com a qualidade de vida das próximas gerações.',
      'O Sisrev/MS foi desenvolvido como uma plataforma virtual customizada para atender às necessidades de Mato Grosso do Sul, apoiando o gerenciamento da logística reversa de embalagens em geral.',
    ],
  },
  {
    slug: 'porque-devemos-separar-e-descartar-corretamente-nossos-residuos',
    title: 'Por que devemos separar e descartar corretamente nossos resíduos?',
    date: '15 de dezembro de 2021',
    category: 'Educação ambiental',
    excerpt: 'A separação correta começa em casa e ajuda a evitar o desperdício de materiais recicláveis e o envio desnecessário aos aterros.',
    image: `${ASSET}2021/12/mpms-card-01-2.png`,
    facts: [{ label: 'Responsabilidade', value: 'Compartilhada' }, { label: 'Ação inicial', value: 'Separar em casa' }, { label: 'Destino', value: 'Cada resíduo' }],
    paragraphs: [
      'O mundo evolui e se desenvolve continuamente. Em 1950, éramos 2,5 bilhões de pessoas na Terra; hoje, somos 7,7 bilhões, e a expectativa da ONU é de 9,7 bilhões de pessoas até 2050. Com o crescimento da população e do consumo, também cresce a geração de resíduos.',
      'A responsabilidade pelo cuidado com os descartes é compartilhada entre todos os atores da cadeia. Como cidadãos, precisamos separar e descartar corretamente os resíduos que geramos. Segundo dados citados no conteúdo original, cada brasileiro gera em torno de 1,035 quilo de resíduos por dia.',
      'Cada tipo de resíduo tem um destino correto. Materiais com potencial de reciclagem devem ser separados para evitar que sejam desperdiçados e encaminhados aos aterros sanitários, que devem receber apenas materiais sem possibilidade de reaproveitamento.',
      'O primeiro passo é providenciar dois coletores: um para recicláveis e outro para não recicláveis. Depois, é preciso criar o hábito e incluir a cultura da reciclagem na rotina, observando as orientações da coleta e das organizações que recebem os materiais.',
    ],
    source: { label: 'Conteúdo publicado em A Crítica', href: 'https://www.acritica.net/editorias/geral/por-que-devemos-separar-e-descartar-corretamente-nossos-residuos/565885/' },
  },
  {
    slug: 'ms-tem-76-municipios-que-fazem-a-destinacao-adequada-de-residuos-solidos-urbanos-aponta-estudo-da-uniao',
    title: 'MS tem 76 municípios que fazem a destinação adequada de resíduos sólidos urbanos, aponta estudo da União',
    date: '20 de dezembro de 2025',
    category: 'Atualizações',
    excerpt: 'Mato Grosso do Sul figura entre os estados brasileiros mais avançados na destinação ambientalmente adequada dos resíduos sólidos urbanos.',
    image: `${ASSET}2025/12/Audiencia-Publica-Residuos-Solidos-7-1100x733.jpeg`,
    facts: [{ label: 'Municípios adequados', value: '76 de 79' }, { label: 'Percentual', value: '96,2%' }, { label: 'Contexto', value: 'Audiência pública' }],
    paragraphs: [
      'Mato Grosso do Sul figura entre os estados brasileiros mais avançados na destinação ambientalmente adequada dos resíduos sólidos urbanos. De acordo com levantamento apresentado durante a Audiência Pública sobre a Regionalização dos Serviços de Manejo de Resíduos Sólidos Urbanos, o Estado já conta com 76 dos 79 municípios, ou 96,2%, operando dentro dos parâmetros legais.',
      'O resultado reforça a importância da cooperação entre municípios, Estado, órgãos de controle, instituições de pesquisa e sociedade para consolidar soluções regionalizadas e sustentáveis para o manejo dos resíduos.',
    ],
    source: { label: 'Leia a publicação oficial da Semadesc', href: 'https://www.semadesc.ms.gov.br/ms-tem-76-municipios-que-fazem-a-destinacao-adequada-de-residuos-solidos-urbanos-aponta-estudo-da-uniao/' },
  },
  {
    slug: 'ms-lidera-inovacao-regulatoria-em-residuos-solidos-com-o-primeiro-selo-de-sustentabilidade-do-brasil',
    title: 'MS lidera inovação regulatória em resíduos sólidos com o primeiro Selo de Sustentabilidade do Brasil',
    date: '20 de dezembro de 2025',
    category: 'Atualizações',
    excerpt: 'A metodologia da AGEMS estabelece critérios técnicos, econômicos, sociais e ambientais para avaliar a sustentabilidade em resíduos sólidos.',
    image: `${ASSET}2025/12/cooperativa-reciclagem-maracaju3-e1756383239741-1400x788.jpeg`,
    facts: [{ label: 'Iniciativa', value: 'Selo de sustentabilidade' }, { label: 'Órgão', value: 'AGEMS' }, { label: 'Critérios', value: '4 dimensões' }],
    paragraphs: [
      'Mato Grosso do Sul deu um passo pioneiro no País ao implantar uma metodologia inédita para avaliação da Declaração de Sustentabilidade em Resíduos Sólidos. O trabalho, desenvolvido pela Agência Estadual de Regulação, estabelece critérios técnicos, econômicos, sociais e ambientais para a concessão do Selo de Sustentabilidade.',
      'A proposta busca reconhecer avanços, organizar indicadores e estimular uma visão integrada dos serviços de resíduos sólidos, aproximando regulação, planejamento público, proteção ambiental e qualidade de vida.',
    ],
    source: { label: 'Leia a publicação oficial da AGEMS', href: 'https://www.agems.ms.gov.br/ms-lidera-inovacao-regulatoria-em-residuos-solidos-com-o-primeiro-selo-de-sustentabilidade-do-brasil/' },
  },
]


/** Ordem de leitura do portal: da mais recente para a mais antiga (capa e arquivo). */
export const newsByDate = sortByDate(newsRecords)

function NewsHero({ title, excerpt, image, date }: Pick<NewsRecord, "title" | "excerpt" | "image" | "date">) { return <PageHero tone="mata" eyebrow={date} title={title} description={excerpt} image={image} /> }

const newsCrumbs = (title?: string) => [
  { label: 'Início', href: '/' },
  title ? { label: 'Notícias', href: '/noticias/' } : { label: 'Notícias' },
  ...(title ? [{ label: title }] : []),
]

export function NewsArchive({ navigate }: { navigate: Navigate }) {
  return <><PageHero tone="mata" eyebrow="Arquivo editorial" title={<>Notícias que ajudam a <span>entender o território.</span></>} description="Resultados, decisões públicas, educação ambiental e os movimentos que transformam a gestão de resíduos sólidos em Mato Grosso do Sul." /><Breadcrumbs items={newsCrumbs()} /><section className="section container news-archive"><div className="news-archive-heading"><div><span className="archive-count">{newsByDate.length} artigos publicados</span><h2>Informação para acompanhar.</h2></div><p>Consulte o conteúdo original organizado por data e tema.</p></div><div className="news-archive-grid">{newsByDate.map((item) => <Link to={`/noticias/${item.slug}/`} className="news-archive-card" key={item.slug}><div className="news-archive-image"><img src={item.image} alt="" /><span>{item.category}</span></div><div className="news-archive-copy"><div className="news-card-meta"><CalendarDays size={14} /> {item.date}</div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-link">Ler notícia <ArrowRight size={15} /></span></div></Link>)}</div></section></>
}

export function NewsArticle({ path, navigate }: { path: string; navigate: Navigate }) {
  const slug = path.split('/').filter(Boolean).pop() ?? ''
  const item = newsRecords.find((record) => record.slug === slug)
  if (!item) return <ArticleFallback navigate={navigate} />
  return <><NewsHero {...item} /><Breadcrumbs items={newsCrumbs(item.title)} /><section className="section container news-story"><article className="news-story-main"><div className="news-story-meta"><span>{item.category}</span><span>{item.date}</span></div><div className="news-story-lead">{item.excerpt}</div>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{item.source && <a className="news-source" href={item.source.href} target="_blank" rel="noreferrer"><LinkIcon size={16} /><span><small>Fonte original</small><strong>{item.source.label}</strong></span><ExternalLink size={15} /></a>}{item.links && <div className="news-links"><div className="eyebrow"><span className="eyebrow-line" /> Links citados no artigo</div>{item.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer"><FileText size={15} /> {link.label} <ExternalLink size={14} /></a>)}</div>}<Link to="/noticias/" className="text-link"><ArrowRight size={15} className="back-arrow" /> Voltar para notícias</Link></article><aside className="news-story-aside"><div className="news-aside-label"><Newspaper size={18} /> Em foco</div>{item.facts.map((fact) => <div className="news-fact" key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}<Link to="/publicacoes/" className="button button-primary">Ver publicações <ArrowRight size={15} /></Link></aside></section></>
}

function ArticleFallback({ navigate }: { navigate: Navigate }) {
  return <section className="section container city-empty-page"><div className="not-found-mark"><Newspaper size={24} /></div><div className="eyebrow"><span className="eyebrow-line" /> Notícia em migração</div><h2>Este artigo ainda não foi associado ao conteúdo local.</h2><p>Volte ao arquivo de notícias para consultar as publicações disponíveis.</p><Link to="/noticias/" className="button button-dark">Ver notícias <ArrowRight size={16} /></Link></section>
}
