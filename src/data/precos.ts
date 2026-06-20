// src/data/precos.ts

export type CategoriaSecaoPreco =
  | 'capa'
  | 'sobre'
  | 'servicos'
  | 'depoimentos'
  | 'faq'
  | 'blog'
  | 'formulario'
  | 'video'
  | 'mapa'
  | 'galeria';

export interface Pacote {
  id: string;
  nome: string;
  descricao: string;
  precoBase: number;
  limiteSecoes: number;
  limitePaginas: number;
  detalhes: readonly string[];
}

export interface SelecaoPrecoProjeto {
  pacoteId: string;
  secoes?: Array<{ categoria: CategoriaSecaoPreco; modelo?: string }>;
  paginasExtras?: string[];
  extrasIntegracoes?: string[];
  ecommerceExtras?: string[];
  temHospedagemDominio?: boolean;
}

export const CATALOGO_PRECOS = {
  pacotes: {
    cartao_3: {
      id: 'cartao_3',
      nome: 'Cartão Digital 3 Seções',
      descricao: 'Ideal para contatos rápidos e links úteis.',
      precoBase: 200,
      limiteSecoes: 3,
      limitePaginas: 1,
      detalhes: ['Até 3 seções', 'Página única (Link na Bio)', 'Botão WhatsApp', 'Otimização PageSpeed']
    },
    cartao_6: {
      id: 'cartao_6',
      nome: 'Cartão Digital 6 Seções',
      descricao: 'Mais completo, perfeito para portfólio inicial.',
      precoBase: 400,
      limiteSecoes: 6,
      limitePaginas: 1,
      detalhes: ['Até 6 seções', 'Página única', 'Mapa interativo', 'Integração de depoimentos']
    },
    institucional: {
      id: 'institucional',
      nome: 'Site Institucional Básico',
      descricao: 'Presença online profissional padrão.',
      precoBase: 1200,
      limiteSecoes: 8,
      limitePaginas: 3,
      detalhes: ['Seções na Home', 'Até 3 páginas internas', 'Formulário avançado', 'Design exclusivo']
    },
    loja_pequena: {
      id: 'loja_pequena',
      nome: 'Loja Virtual Pequena',
      descricao: 'Comece a vender seus produtos online.',
      precoBase: 4000,
      limiteSecoes: 12,
      limitePaginas: 5,
      detalhes: ['Catálogo de produtos', 'Carrinho de compras', 'Integração meios de pagamento', 'Painel de pedidos']
    }
  },
  secoes: {
    capa: 0,
    sobre: 100,
    servicos: 150,
    depoimentos: 90,
    faq: 70,
    blog: 160,
    formulario: 110,
    video: 120,
    mapa: 60,
    galeria: 140
  },
  paginasExtras: {
    sobre_nos: 250,
    privacidade: 120,
    termos_uso: 120,
    contato: 180,
    faq: 140,
    erro_404: 90
  },
  extrasIntegracoes: {
    whatsapp: 80,
    analytics: 150,
    meta_pixel: 150,
    agendamento: 250,
    seo_avancado: 300
  },
  ecommerceExtras: {
    pagamentos: 600,
    frete: 400,
    catalogo: 700,
    carrinho: 350
  },
  modelosSecoes: {
    CapaModel1: 250,
    SobreModel1: 100,
    ServicosModel1: 150,
    ServicosModel2: 190,
    DepCarrossel: 90,
    DepGoogle: 120,
    DepTradicional: 95,
    FaqModel1: 70,
    BlogModel1: 160,
    FormularioModel1: 110,
    VideoModel1: 120,
    MapaModel1: 60,
    GaleriaModel1: 140
  },
  adicionais: {
    secaoExtra: 50,
    hospedagemDominio: 180
  }
} as const;

export const PACOTES: Pacote[] = Object.values(CATALOGO_PRECOS.pacotes).map((pacote) => ({
  ...pacote
}));

export const PRECO_SECAO_ADICIONAL = CATALOGO_PRECOS.adicionais.secaoExtra;
export const PRECOS_SECOES = CATALOGO_PRECOS.secoes;
export const PRECOS_MODELOS_SECOES = CATALOGO_PRECOS.modelosSecoes;
export const PRECOS_PAGINAS_EXTRAS = CATALOGO_PRECOS.paginasExtras;
export const PRECOS_EXTRAS_INTEGRACOES = CATALOGO_PRECOS.extrasIntegracoes;
export const PRECOS_ECOMMERCE_EXTRAS = CATALOGO_PRECOS.ecommerceExtras;
export const PRECO_HOSPEDAGEM_DOMINIO = CATALOGO_PRECOS.adicionais.hospedagemDominio;

export function obterPacotePorId(pacoteId: string) {
  return CATALOGO_PRECOS.pacotes[pacoteId as keyof typeof CATALOGO_PRECOS.pacotes] ?? null;
}

export function calcularValorProjeto({
  pacoteId,
  secoes = [],
  paginasExtras = [],
  extrasIntegracoes = [],
  ecommerceExtras = [],
  temHospedagemDominio = true
}: SelecaoPrecoProjeto): number {
  const pacote = obterPacotePorId(pacoteId);
  if (!pacote) return 0;

  const valorSecoes = secoes.reduce((total, secao) => {
    const precoModelo = secao.modelo ? PRECOS_MODELOS_SECOES[secao.modelo as keyof typeof PRECOS_MODELOS_SECOES] : undefined;
    const precoCategoria = PRECOS_SECOES[secao.categoria];
    return total + (precoModelo ?? precoCategoria ?? 0);
  }, 0);

  const valorPaginasExtras = paginasExtras.reduce((total, pagina) => {
    return total + (PRECOS_PAGINAS_EXTRAS[pagina as keyof typeof PRECOS_PAGINAS_EXTRAS] ?? 0);
  }, 0);

  const valorExtrasIntegracoes = extrasIntegracoes.reduce((total, extra) => {
    return total + (PRECOS_EXTRAS_INTEGRACOES[extra as keyof typeof PRECOS_EXTRAS_INTEGRACOES] ?? 0);
  }, 0);

  const valorEcommerceExtras = ecommerceExtras.reduce((total, extra) => {
    return total + (PRECOS_ECOMMERCE_EXTRAS[extra as keyof typeof PRECOS_ECOMMERCE_EXTRAS] ?? 0);
  }, 0);

  const valorHospedagemDominio = temHospedagemDominio ? 0 : PRECO_HOSPEDAGEM_DOMINIO;

  return pacote.precoBase + valorSecoes + valorPaginasExtras + valorExtrasIntegracoes + valorEcommerceExtras + valorHospedagemDominio;
}
