import { PageHero } from '../components/PageHero'
import { MunicipalityIndex } from '../components/MunicipalityIndex'
import type { Crumb } from '../components/Breadcrumbs'
import { Eyebrow } from '../components/Eyebrow'
import { ArrowRight } from 'lucide-react'
import { Alert } from '../components/Alert'
import { Badge } from '../components/Badge'
import { DocumentRow } from '../components/DocumentRow'
import { selectiveCollectionPlans } from '../data/selective-collection-plans.generated'
import { Link } from '../components/router'

const ASSET = '/uploads/'
type Navigate = (to: string) => void

import { cityRecords } from '../data/cities'

export { cityRecords, type CityRecord } from '../data/cities'

function Hero({ title, description, crumbs }: { title: string; description: string; crumbs?: Crumb[] }) { return <PageHero eyebrow="Dados municipais" title={title} description={description} crumbs={crumbs} /> }

const cityCrumbs = (city?: string) => [
  { label: 'Início', href: '/' },
  city ? { label: 'Cidades', href: '/cidades/' } : { label: 'Cidades' },
  ...(city ? [{ label: city }] : []),
]

export function CityDirectory({ navigate: _navigate }: { navigate: Navigate }) {
  return <><Hero title="Cidades" description="Consulte os panoramas municipais e encontre referências para compreender a gestão de resíduos sólidos em Mato Grosso do Sul." crumbs={cityCrumbs()} /><MunicipalityIndex eyebrow="Mato Grosso do Sul" title={<>Escolha um <span>município.</span></>} description={`${cityRecords.length} municípios com panorama local identificado no acervo.`} /></>
}

export function Directories({ navigate: _navigate }: { navigate: Navigate }) {
  return <><Hero title="Diretórios" description="Acesse os pareceres e panoramas de gestão de resíduos sólidos de cada município de Mato Grosso do Sul." crumbs={[{ label: 'Início', href: '/' }, { label: 'Diretórios' }]} /><MunicipalityIndex title="Pareceres e panoramas por município" /></>
}

// Texto único para as 79 fichas, escrito a partir do conteúdo já publicado em Disposição Legal
// e em Panoramas. Pendente de aprovação do dono do projeto antes de publicar (ADR-004).
const SOBRE_O_PANORAMA = 'Diagnóstico da gestão, do gerenciamento e da disposição final dos resíduos sólidos no município, parte do levantamento feito para os 79 municípios de Mato Grosso do Sul.'

export function CityDetail({ path, navigate }: { path: string; navigate: Navigate }) {
  const slug = path === '/corumba/' ? 'corumba' : path.split('/').filter(Boolean).pop() ?? ''
  const city = cityRecords.find((item) => item.slug === slug)
  if (!city) return <UnknownCity path={path} navigate={navigate} />
  const plano = selectiveCollectionPlans.find((plan) => plan.slug === city.slug)
  const total = 1 + (plano?.documents.length ?? 0)
  return <>
    <PageHero eyebrow="Dados municipais" title={city.name} crumbs={cityCrumbs(city.name)}>
      <span className="page-hero-badges"><Badge variant="positive">Panorama publicado</Badge>{plano && <Badge variant="doc">Plano de coleta seletiva</Badge>}</span>
    </PageHero>
    <section className="section container city-detail">
      <div className="city-detail-layout">
        <div>
          <h2 className="city-documents-title">Documentos deste município</h2>
          <p className="city-documents-count">{total} {total === 1 ? 'documento' : 'documentos'}</p>
          <div className="city-documents">
            <DocumentRow title={`Panorama de gestão de resíduos de ${city.name}`} type="Panorama municipal" href={`${ASSET}2025/03/${city.file}`} format="PDF" sizeBytes={city.sizeBytes} origin="local" cover={`${ASSET}2025/03/${city.cover}`} />
            {plano?.documents.map((documento) => <DocumentRow key={documento.title + documento.description + documento.url} title={documento.description ? `${documento.title} — ${documento.description}` : documento.title} type="Plano de coleta seletiva" href={documento.url} origin="drive" />)}
          </div>
        </div>
        <aside className="city-about">
          <Eyebrow>Sobre o panorama</Eyebrow>
          <p>{SOBRE_O_PANORAMA}</p>
          <Eyebrow>Continue a consulta</Eyebrow>
          <div className="city-about-links">
            <Link to="/cidades/" className="text-link">Voltar para cidades <ArrowRight size={15} /></Link>
            {plano && <Link to="/plano-de-coleta-seletiva/" className="text-link">Plano de Coleta Seletiva <ArrowRight size={15} /></Link>}
          </div>
        </aside>
      </div>
    </section>
  </>
}

function UnknownCity({ path }: { path: string; navigate: Navigate }) {
  const rawSlug = path.split('/').filter(Boolean).pop() ?? 'município'
  const title = rawSlug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  return <><Hero title={title} description="Esta página municipal está registrada no mapa do portal, mas o panorama correspondente ainda não foi associado ao acervo local." crumbs={cityCrumbs(title)} /><section className="section container city-missing"><Alert tone="warning" title="Conteúdo em migração">O documento deste município ainda não está disponível. Consulte o diretório de cidades para acessar os panoramas já identificados.</Alert><Link to="/cidades/" className="button button-dark">Ver cidades disponíveis <ArrowRight size={16} /></Link></section></>
}
