import { PageHero } from '../components/PageHero'
import { MunicipalityIndex } from '../components/MunicipalityIndex'
import type { Crumb } from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Eyebrow'
import { ArrowRight, FileText, MapPin } from 'lucide-react'
import { Link } from '../components/router'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

import { cityRecords } from '../data/cities'

export { cityRecords, type CityRecord } from '../data/cities'

function Hero({ title, description, image, crumbs }: { title: string; description: string; image?: string; crumbs?: Crumb[] }) { return <PageHero eyebrow="Dados municipais" title={title} description={description} image={image} crumbs={crumbs} /> }

const cityCrumbs = (city?: string) => [
  { label: 'Início', href: '/' },
  city ? { label: 'Cidades', href: '/cidades/' } : { label: 'Cidades' },
  ...(city ? [{ label: city }] : []),
]

export function CityDirectory({ navigate: _navigate }: { navigate: Navigate }) {
  return <><Hero title="Cidades" description="Consulte os panoramas municipais e encontre referências para compreender a gestão de resíduos sólidos em Mato Grosso do Sul." image={`${ASSET}2021/07/JOB-090-Banner-Projeto-Resíduos-Sólidos-768x600.jpg`} crumbs={cityCrumbs()} /><MunicipalityIndex eyebrow="Mato Grosso do Sul" title={<>Escolha um <span>município.</span></>} description={`${cityRecords.length} municípios com panorama local identificado no acervo.`} /></>
}

export function Directories({ navigate: _navigate }: { navigate: Navigate }) {
  return <><Hero title="Diretórios" description="Acesse os pareceres e panoramas de gestão de resíduos sólidos de cada município de Mato Grosso do Sul." crumbs={[{ label: 'Início', href: '/' }, { label: 'Diretórios' }]} /><MunicipalityIndex title="Pareceres e panoramas por município" /></>
}

export function CityDetail({ path, navigate }: { path: string; navigate: Navigate }) {
  const slug = path === '/corumba/' ? 'corumba' : path.split('/').filter(Boolean).pop() ?? ''
  const city = cityRecords.find((item) => item.slug === slug)
  if (!city) return <UnknownCity path={path} navigate={navigate} />
  const documentHref = `${ASSET}2025/03/${city.file}`
  return <><Hero title={city.name} description={`Panorama municipal de ${city.name}: uma referência para conhecer o território, acompanhar a gestão e apoiar decisões locais.`} image={`${ASSET}2025/03/${city.cover}`} crumbs={cityCrumbs(city.name)} /><section className="section container city-detail"><div className="city-detail-layout"><article className="prose"><Eyebrow>Leitura municipal</Eyebrow><h2>Um retrato local para orientar próximos passos.</h2><p>O panorama de {city.name} organiza informações da gestão de resíduos sólidos em uma publicação própria. Ele serve como ponto de partida para consultas, planejamento e diálogo entre município, instituições e comunidade.</p><p>Consulte o documento completo para acessar o conteúdo técnico produzido para o município.</p><div className="city-data-strip"><div><strong>01</strong><span>Panorama municipal</span></div><div><strong>PDF</strong><span>Documento para consulta</span></div><div><strong>MS</strong><span>Recorte territorial</span></div></div><a className="button button-dark" href={documentHref} target="_blank" rel="noreferrer">Abrir panorama de {city.name} <FileText size={16} /></a></article><aside className="city-document"><img src={`${ASSET}2025/03/${city.cover}`} alt={`Capa do panorama de ${city.name}`} /><div><Eyebrow>Documento disponível</Eyebrow><strong>Panorama de gestão de resíduos</strong><p>Abra o PDF em uma nova aba para ler ou baixar.</p><a className="text-link" href={documentHref} target="_blank" rel="noreferrer">Abrir PDF <ArrowRight size={15} /></a></div></aside></div></section><section className="city-next"><div className="container city-next-inner"><div><Eyebrow>Continue a consulta</Eyebrow><h2>Compare este município com outros panoramas.</h2></div><Link to="/cidades/" className="button button-primary">Voltar para cidades <ArrowRight size={16} /></Link></div></section></>
}

function UnknownCity({ path, navigate }: { path: string; navigate: Navigate }) {
  const rawSlug = path.split('/').filter(Boolean).pop() ?? 'município'
  const title = rawSlug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  return <><Hero title={title} description="Esta página municipal está registrada no mapa do portal, mas o panorama correspondente ainda não foi associado ao acervo local." crumbs={cityCrumbs(title)} /><section className="section container city-empty-page"><div className="not-found-mark"><MapPin size={24} /></div><Eyebrow>Conteúdo em migração</Eyebrow><h2>O documento deste município ainda não está disponível.</h2><p>Consulte o diretório de cidades para acessar os panoramas já identificados.</p><Link to="/cidades/" className="button button-dark">Ver cidades disponíveis <ArrowRight size={16} /></Link></section></>
}
