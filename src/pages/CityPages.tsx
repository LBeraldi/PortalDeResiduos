import { PageHero } from '../components/PageHero'
import { TerritoryIndex } from '../components/TerritoryIndex'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Eyebrow'
import { ArrowRight, FileText, MapPin, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { panoramaRecords } from '../data/panoramas.generated'
import { Link } from '../components/router'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

export type CityRecord = {
  slug: string
  name: string
  file: string
  cover: string
  legacyPath?: string
}

export const cityRecords: CityRecord[] = panoramaRecords.map((panorama) => ({
  slug: panorama.slug,
  name: panorama.name,
  file: panorama.file,
  cover: panorama.cover,
  ...(panorama.slug === "corumba" ? { legacyPath: "/corumba/" } : {}),
}))

function Hero({ title, description, image }: { title: string; description: string; image?: string }) { return <PageHero eyebrow="Dados municipais" title={title} description={description} image={image} /> }

const cityCrumbs = (city?: string) => [
  { label: 'Início', href: '/' },
  city ? { label: 'Cidades', href: '/cidades/' } : { label: 'Cidades' },
  ...(city ? [{ label: city }] : []),
]

export function CityDirectory({ navigate }: { navigate: Navigate }) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const filteredCities = useMemo(() => cityRecords.filter((city) => city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)), [normalizedQuery])
  return <><Hero title="Cidades" description="Consulte os panoramas municipais e encontre referências para compreender a gestão de resíduos sólidos em Mato Grosso do Sul." image={`${ASSET}2021/07/JOB-090-Banner-Projeto-Resíduos-Sólidos-768x600.jpg`} /><Breadcrumbs items={cityCrumbs()} /><section className="section container city-directory"><div className="city-directory-heading"><div><Eyebrow>Mato Grosso do Sul</Eyebrow><h2>Escolha um <span>município.</span></h2><p>{cityRecords.length} municípios com panorama local identificado no acervo.</p></div><label className="search-field"><Search size={17} /><span className="sr-only">Buscar município</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar município" /></label></div><div className="city-directory-grid">{filteredCities.map((city) => <Link to={`/cidades/${city.slug}/`} className="city-directory-card" key={city.slug}><span className="city-directory-icon"><MapPin size={17} /></span><span><strong>{city.name}</strong><small>Panorama municipal disponível</small></span><ArrowRight size={16} /></Link>)}</div>{filteredCities.length === 0 && <p className="city-empty">Nenhum município encontrado. Tente outro termo.</p>}</section><section className="section container"><TerritoryIndex navigate={navigate} variant="strip" title="Cobertura do território" /></section></>
}

export function Directories({ navigate }: { navigate: Navigate }) {
  return <><Hero title="Diretórios" description="Acesse os pareceres e panoramas de gestão de resíduos sólidos de cada município de Mato Grosso do Sul." /><Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Diretórios' }]} /><section className="section container"><TerritoryIndex navigate={navigate} variant="full" title="Pareceres e panoramas por município" /></section></>
}

export function CityDetail({ path, navigate }: { path: string; navigate: Navigate }) {
  const slug = path === '/corumba/' ? 'corumba' : path.split('/').filter(Boolean).pop() ?? ''
  const city = cityRecords.find((item) => item.slug === slug)
  if (!city) return <UnknownCity path={path} navigate={navigate} />
  const documentHref = `${ASSET}2025/03/${city.file}`
  return <><Hero title={city.name} description={`Panorama municipal de ${city.name}: uma referência para conhecer o território, acompanhar a gestão e apoiar decisões locais.`} image={`${ASSET}2025/03/${city.cover}`} /><Breadcrumbs items={cityCrumbs(city.name)} /><section className="section container city-detail"><div className="city-detail-layout"><article className="prose"><Eyebrow>Leitura municipal</Eyebrow><h2>Um retrato local para orientar próximos passos.</h2><p>O panorama de {city.name} organiza informações da gestão de resíduos sólidos em uma publicação própria. Ele serve como ponto de partida para consultas, planejamento e diálogo entre município, instituições e comunidade.</p><p>Consulte o documento completo para acessar o conteúdo técnico produzido para o município.</p><div className="city-data-strip"><div><strong>01</strong><span>Panorama municipal</span></div><div><strong>PDF</strong><span>Documento para consulta</span></div><div><strong>MS</strong><span>Recorte territorial</span></div></div><a className="button button-dark" href={documentHref} target="_blank" rel="noreferrer">Abrir panorama de {city.name} <FileText size={16} /></a></article><aside className="city-document"><img src={`${ASSET}2025/03/${city.cover}`} alt={`Capa do panorama de ${city.name}`} /><div><Eyebrow>Documento disponível</Eyebrow><strong>Panorama de gestão de resíduos</strong><p>Abra o PDF em uma nova aba para ler ou baixar.</p><a className="text-link" href={documentHref} target="_blank" rel="noreferrer">Abrir PDF <ArrowRight size={15} /></a></div></aside></div></section><section className="city-next"><div className="container city-next-inner"><div><Eyebrow>Continue a consulta</Eyebrow><h2>Compare este município com outros panoramas.</h2></div><Link to="/cidades/" className="button button-primary">Voltar para cidades <ArrowRight size={16} /></Link></div></section></>
}

function UnknownCity({ path, navigate }: { path: string; navigate: Navigate }) {
  const rawSlug = path.split('/').filter(Boolean).pop() ?? 'município'
  const title = rawSlug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  return <><Hero title={title} description="Esta página municipal está registrada no mapa do portal, mas o panorama correspondente ainda não foi associado ao acervo local." /><Breadcrumbs items={cityCrumbs(title)} /><section className="section container city-empty-page"><div className="not-found-mark"><MapPin size={24} /></div><Eyebrow>Conteúdo em migração</Eyebrow><h2>O documento deste município ainda não está disponível.</h2><p>Consulte o diretório de cidades para acessar os panoramas já identificados.</p><Link to="/cidades/" className="button button-dark">Ver cidades disponíveis <ArrowRight size={16} /></Link></section></>
}
