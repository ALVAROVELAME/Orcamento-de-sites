export type PriceCategory = 'base' | 'modular' | 'addon';

export interface PricingBasePackage {
  id: string;
  title: string;
  price: number;
  category: 'base';
  summary: string;
  sectionsIncluded: number;
  prazoDias: number;
  features: string[];
}

export interface PricingModularComponent {
  id: string;
  title: string;
  price: number;
  category: 'modular';
  description: string;
}

export interface PricingAddonService {
  id: string;
  title: string;
  price: number;
  category: 'addon';
  description: string;
}

export type PricingItem = PricingBasePackage | PricingModularComponent | PricingAddonService;

export const BASE_PACKAGES: PricingBasePackage[] = [
  {
    id: 'cartao-digital-essencial',
    title: 'Cartão Digital Essencial',
    price: 200,
    category: 'base',
    summary: 'Plano fechado ideal para presença digital rápida e simples.',
    sectionsIncluded: 3,
    prazoDias: 4,
    features: [
      'Botão WhatsApp flutuante simples',
      'Formulário de contato simples',
      'Otimização de velocidade',
      'SEO básico'
    ]
  },
  {
    id: 'cartao-digital-pro',
    title: 'Cartão Digital Pro',
    price: 400,
    category: 'base',
    summary: 'Plano avançado com recursos inteligentes e SEO estendido.',
    sectionsIncluded: 6,
    prazoDias: 4,
    features: [
      'Botão WhatsApp flutuante com mensagem dinâmica',
      'Formulário inteligente (validação e gestão de leads)',
      'Otimização de velocidade',
      'SEO avançado (Schema.org)'
    ]
  },
  {
    id: 'site-institucional-home',
    title: 'Site Institucional (Home Page)',
    price: 1200,
    category: 'base',
    summary: 'Site institucional com design exclusivo e foco em conversão.',
    sectionsIncluded: 1,
    prazoDias: 0,
    features: [
      'Setup base',
      'Design exclusivo focado em conversão',
      'Painel de leads',
      'SEO completo',
      'Performance de elite',
      'Suporte de lançamento'
    ]
  },
  {
    id: 'loja-virtual-ecommerce',
    title: 'Loja Virtual (E-commerce)',
    price: 4000,
    category: 'base',
    summary: 'E-commerce completo com gestão, pagamento e infraestrutura faturamento.',
    sectionsIncluded: 0,
    prazoDias: 0,
    features: [
      'Setup base',
      'Gateway de pagamento',
      'Gestão de estoque',
      'Segurança avançada',
      'Painel administrativo',
      'SEO de produto',
      'Infraestrutura completa de faturamento'
    ]
  }
];

export const MODULAR_COMPONENTS: PricingModularComponent[] = [
  {
    id: 'sobre-nos',
    title: 'Sobre Nós / A Empresa',
    price: 80,
    category: 'modular',
    description: 'Seção para apresentar a empresa com texto e valores.'
  },
  {
    id: 'grid-servicos',
    title: 'Grid de Serviços',
    price: 100,
    category: 'modular',
    description: 'Seção de serviços em cards para mostrar ofertas principais.'
  },
  {
    id: 'galeria-fotos',
    title: 'Galeria de Fotos / Portfólio',
    price: 120,
    category: 'modular',
    description: 'Portfólio visual com imagens de trabalhos e resultados.'
  },
  {
    id: 'tabela-precos',
    title: 'Tabela de Preços',
    price: 100,
    category: 'modular',
    description: 'Seção de comparativo de planos e preços.'
  },
  {
    id: 'depoimentos',
    title: 'Depoimentos (Testimonials)',
    price: 100,
    category: 'modular',
    description: 'Área de provas sociais com depoimentos de clientes.'
  },
  {
    id: 'logos-parceiros',
    title: 'Logos de Parceiros/Clientes',
    price: 70,
    category: 'modular',
    description: 'Seção para exibir marcas e logos de parceiros.'
  },
  {
    id: 'numeros-estatisticas',
    title: 'Números / Estatísticas',
    price: 80,
    category: 'modular',
    description: 'Seção com indicadores e métricas de impacto.'
  },
  {
    id: 'faq',
    title: 'FAQ (Perguntas Frequentes)',
    price: 100,
    category: 'modular',
    description: 'Seção de perguntas e respostas para reduzir dúvidas.'
  },
  {
    id: 'blog-artigos',
    title: 'Seção de Blog / Artigos',
    price: 150,
    category: 'modular',
    description: 'Área para posts e conteúdo editorial atualizado.'
  },
  {
    id: 'formulario-simples',
    title: 'Formulário Simples',
    price: 150,
    category: 'modular',
    description: 'Formulário básico de contato para geração de leads.'
  },
  {
    id: 'formulario-inteligente',
    title: 'Formulário Inteligente (Avançado)',
    price: 300,
    category: 'modular',
    description: 'Formulário com validação inteligente e captura de leads.'
  },
  {
    id: 'captura-newsletter',
    title: 'Captura de Lead / Newsletter',
    price: 80,
    category: 'modular',
    description: 'Seção de captura para newsletter e listas de email.'
  },
  {
    id: 'mapa-integrado',
    title: 'Mapa Integrado (Google Maps)',
    price: 100,
    category: 'modular',
    description: 'Mapa interativo integrado com localização da empresa.'
  },
  {
    id: 'footer-completo',
    title: 'Rodapé (Footer) Completo',
    price: 80,
    category: 'modular',
    description: 'Rodapé completo com links, contato e informações legais.'
  }
];

export const ADDON_SERVICES: PricingAddonService[] = [
  {
    id: 'whatsapp-simples',
    title: 'Botão WhatsApp Flutuante Simples',
    price: 50,
    category: 'addon',
    description: 'Botão de acesso rápido ao WhatsApp com design simples.'
  },
  {
    id: 'whatsapp-dinamico',
    title: 'Botão WhatsApp Flutuante Dinâmico',
    price: 100,
    category: 'addon',
    description: 'Botão com mensagem dinâmica e chamadas personalizadas.'
  },
  {
    id: 'seo-on-page',
    title: 'SEO On-Page (Página extra)',
    price: 100,
    category: 'addon',
    description: 'Otimização on-page para páginas adicionais.'
  },
  {
    id: 'pagina-extra',
    title: 'Página Extra (Landing Page extra)',
    price: 300,
    category: 'addon',
    description: 'Landing page adicional para campanhas ou ofertas específicas.'
  },
  {
    id: 'integracao-dados',
    title: 'Integração de Dados (Google Sheets API)',
    price: 250,
    category: 'addon',
    description: 'Integração de dados com Google Sheets ou APIs externas.'
  }
];

const PRICE_LOOKUP: Record<string, PricingItem> = [
  ...BASE_PACKAGES,
  ...MODULAR_COMPONENTS,
  ...ADDON_SERVICES
].reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, PricingItem>);

export function calculateTotalEstimate(basePackageId: string, selectedIds: string[]): number {
  const basePackage = BASE_PACKAGES.find(pkg => pkg.id === basePackageId);
  if (!basePackage) {
    throw new Error(`Pacote base não encontrado: ${basePackageId}`);
  }

  const uniqueIds = Array.from(new Set(selectedIds));
  const totalExtras = uniqueIds.reduce((sum, id) => {
    const item = PRICE_LOOKUP[id];
    if (!item) return sum;
    if (item.category === 'base') return sum; // ignorar pacotes base na seleção de extras
    return sum + item.price;
  }, 0);

  return basePackage.price + totalExtras;
}
