// Documentos do acervo que não são de um município (panoramas e planos ficam em
// cities.ts e selective-collection-plans.generated.ts). Fonte única para as
// páginas e para a busca. Títulos e descrições são os já publicados no portal.

export type DocumentType = 'Nota técnica' | 'Artigo' | 'Revista' | 'Estudo' | 'Cartilha' | 'Modelo editável'

export type PortalDocument = {
  title: string
  type: DocumentType
  format: 'PDF' | 'DOCX' | 'DOC'
  /** Arquivo em public/uploads; o tamanho vem de document-sizes.generated.ts. */
  href: string
  description: string
  cover?: string
  /** Página do portal que contextualiza o documento, quando existe. */
  context?: string
}

const U = '/uploads/'

export const documents: PortalDocument[] = [
  { title: 'Nota Técnica — Catadores de materiais recicláveis', type: 'Nota técnica', format: 'PDF', href: `${U}2025/12/NOTA_TECNICA_-_Catadores__revisada.pdf`, cover: `${U}2025/12/NOTA_TECNICA_-_Catadores__revisada-pdf.jpg`, description: 'Referências para reconhecimento, inclusão e fortalecimento da cadeia da reciclagem.', context: '/nota-tecnica/' },
  { title: 'Nota técnica sobre taxa de RSU', type: 'Nota técnica', format: 'PDF', href: `${U}2021/11/Nota-tecnica-Taxa-RSU-FINAL-1.pdf`, cover: `${U}2021/11/Nota-tecnica-Taxa-RSU-FINAL-1-pdf.jpg`, description: 'Referência para discussão de custos e financiamento dos serviços.', context: '/publicacoes/' },
  { title: 'Panorama e Censo dos Catadores', type: 'Estudo', format: 'PDF', href: `${U}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final.pdf`, cover: `${U}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final-pdf.jpg`, description: 'Dados e referências para reconhecer o trabalho dos catadores em Mato Grosso do Sul.', context: '/panorama-e-censo-dos-catadores/' },
  { title: 'Revista IBRAPARC', type: 'Revista', format: 'PDF', href: `${U}2025/12/Revista-IBRAPARC.pdf`, cover: `${U}2025/12/Revista-IBRAPARC-pdf.jpg`, description: 'Publicação recente sobre gestão e políticas públicas de resíduos sólidos.', context: '/publicacoes/' },
  { title: 'Cadeia de Reciclagem', type: 'Artigo', format: 'PDF', href: `${U}2025/12/artigo_Cadeia-de-Reciclagem.pdf`, cover: `${U}2025/12/artigo_Cadeia-de-Reciclagem-pdf.jpg`, description: 'Discussões e referências para compreender a cadeia da reciclagem em MS.', context: '/publicacoes/' },
  { title: 'Artigo sobre resíduos sólidos', type: 'Artigo', format: 'PDF', href: `${U}2021/11/artigo2-1.pdf`, cover: `${U}2021/11/artigo2-1-pdf.jpg`, description: 'Material técnico produzido no âmbito do projeto.', context: '/publicacoes/' },
  { title: 'Resíduos sólidos e destinação legal', type: 'Artigo', format: 'PDF', href: `${U}2021/11/Artigo-RSDL-1.pdf`, cover: `${U}2021/11/Artigo-RSDL-1-pdf.jpg`, description: 'Análise sobre a destinação ambientalmente adequada dos rejeitos.', context: '/publicacoes/' },
  { title: 'Cartilha para cooperativas', type: 'Cartilha', format: 'PDF', href: `${U}2022/08/cartilha_compressed.pdf`, cover: `${U}2022/08/cartilha_compressed-pdf.jpg`, description: 'Material de apoio para organização e fortalecimento das cooperativas de catadores.', context: '/cooperativas/' },
  { title: 'Cartilha de compostagem acelerada', type: 'Cartilha', format: 'PDF', href: `${U}2025/03/Cartilha_compostagem_acelerada.pdf`, cover: `${U}2025/03/Cartilha_compostagem_acelerada-pdf.jpg`, description: 'Material introdutório para consulta e compartilhamento.', context: '/plano-de-compostagem/' },
  { title: 'Modelo de Estatuto e Ata', type: 'Modelo editável', format: 'DOCX', href: `${U}2023/02/Modelo-Estatuto-de-Ata-oficial.docx`, description: 'Documento editável para apoiar a formalização e a organização da cooperativa.', context: '/cooperativas/' },
  { title: 'Estatuto de Cooperativa', type: 'Modelo editável', format: 'DOC', href: `${U}2023/02/Estatudo-de-Cooperativa-oficial.doc`, description: 'Referência de estatuto para consulta e adaptação conforme a realidade local.', context: '/cooperativas/' },
]
