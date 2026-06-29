import type {
  CategoriaSecao,
  EcommerceExtraId,
  EstiloMarcaId,
  ExtraIntegracaoId,
  FluxoPacote,
  ModeloSecaoId,
  PacoteId,
  PaginaExtraId,
  StatusLogoId
} from './tipos';
import type {
  EntradaRelacaoCategoria,
  EntradaTextoCategoria,
  EntradaTextoModelo,
  EntradaTextoOpcao
} from './construtoresSecoes';

export interface PacoteBaseConfig {
  id: PacoteId;
  nome: string;
  descricao: string;
  limiteSecoes: number;
  limitePaginas: number;
  detalhes: readonly string[];
  fluxo: FluxoPacote;
  icone: string;
  habilitado?: boolean;
}

const CATALOGO_PACOTES_ATIVOS_BASE: Record<Exclude<PacoteId, 'loja_pequena'>, PacoteBaseConfig> = {
  cartao_3: {
    id: 'cartao_3',
    nome: 'Cartao Digital Essencial',
    descricao: 'Entre no ar com uma pagina direta para apresentar seu negocio e gerar contatos rapido.',
    limiteSecoes: 3,
    limitePaginas: 1,
    detalhes: ['Pagina unica para divulgar seu negocio', 'WhatsApp incluido para captar contatos', 'Politica de privacidade incluida', 'Ideal para comecar a vender online'],
    fluxo: 'padrao',
    icone: 'badge-check'
  },
  cartao_6: {
    id: 'cartao_6',
    nome: 'Cartao Digital Completo',
    descricao: 'Tenha uma pagina mais forte para apresentar sua marca, destacar servicos e aumentar a confianca do cliente.',
    limiteSecoes: 6,
    limitePaginas: 1,
    detalhes: ['Mais espaco para vender seus servicos', 'Mapa incluido para facilitar o contato', 'Depoimentos para gerar confianca', 'Politica de privacidade incluida'],
    fluxo: 'padrao',
    icone: 'gem'
  },
  institucional: {
    id: 'institucional',
    nome: 'Site Institucional Profissional',
    descricao: 'Uma estrutura profissional para empresas que precisam vender melhor, passar autoridade e organizar mais informacoes.',
    limiteSecoes: 8,
    limitePaginas: 3,
    detalhes: ['Ate 3 paginas internas incluidas', 'Sobre Nos e Contato ja incluidos', 'WhatsApp e politica de privacidade incluidos', 'Ideal para vender com mais autoridade'],
    fluxo: 'padrao',
    icone: 'building-2'
  }
};

// FUTURO: dados de e-commerce/loja pequena mantidos para atualizacao posterior.
const CATALOGO_PACOTES_FUTUROS_BASE: Record<Extract<PacoteId, 'loja_pequena'>, PacoteBaseConfig> = {
  loja_pequena: {
    id: 'loja_pequena',
    habilitado: false,
    nome: 'Loja Virtual Pequena',
    descricao: 'Comece a vender seus produtos online.',
    limiteSecoes: 12,
    limitePaginas: 5,
    detalhes: ['Catalogo de produtos', 'Carrinho de compras', 'Integracao meios de pagamento', 'Painel de pedidos'],
    fluxo: 'ecommerce',
    icone: 'store'
  }
};

export const CATALOGO_PACOTES_BASE: Record<PacoteId, PacoteBaseConfig> = {
  ...CATALOGO_PACOTES_ATIVOS_BASE,
  ...CATALOGO_PACOTES_FUTUROS_BASE
};

export const STATUS_LOGO_TEXTOS: EntradaTextoOpcao<StatusLogoId>[] = [
  { id: 'logo_pronto', titulo: 'Ja tenho o logo em alta qualidade' },
  { id: 'logo_imagem', titulo: 'Tenho apenas a imagem (PNG/JPG)' },
  { id: 'logo_criacao', titulo: 'Quero que criem o logo para mim' }
];

export const ESTILOS_MARCA_TEXTOS: EntradaTextoOpcao<EstiloMarcaId>[] = [
  { id: 'moderna', titulo: 'Moderna' },
  { id: 'classica_seria', titulo: 'Classica/Seria' },
  { id: 'divertida', titulo: 'Divertida' },
  { id: 'luxuosa', titulo: 'Luxuosa' },
  { id: 'minimalista', titulo: 'Minimalista' }
];

export const PAGINAS_EXTRAS_TEXTOS: EntradaTextoOpcao<PaginaExtraId>[] = [
  {
    id: 'sobre_nos',
    titulo: 'Pagina Sobre Nos',
    descricao: 'Uma pagina dedicada a contar a historia da sua empresa, sua missao, visao, valores e apresentar a equipe.'
  },
  {
    id: 'privacidade',
    titulo: 'Politica de Privacidade',
    descricao: 'Pagina essencial para adequacao a LGPD, explicando como os dados dos visitantes sao coletados e tratados.'
  },
  /*
  {
    id: 'termos_uso',
    titulo: 'Termos de Uso',
    descricao: 'Regras, direitos e diretrizes para o uso do seu site, servico ou e-commerce.'
  },
  */
  {
    id: 'contato',
    titulo: 'Pagina de Contato Completa',
    descricao: 'Pagina separada com formulario de contato, mapa de localizacao do Google Maps e links diretos para redes sociais e WhatsApp.'
  },
  {
    id: 'faq',
    titulo: 'Pagina de Duvidas (FAQ)',
    descricao: 'Uma pagina inteira dedicada a responder as perguntas mais frequentes dos seus clientes, ajudando a quebrar objecoes.'
  },
  {
    id: 'erro_404',
    titulo: 'Pagina 404 Personalizada',
    descricao: 'Pagina de erro com o design da sua marca e botoes de retorno, para nao perder o visitante que acessou um link quebrado.'
  }
];

export const EXTRAS_INTEGRACOES_TEXTOS: EntradaTextoOpcao<ExtraIntegracaoId>[] = [
  {
    id: 'whatsapp',
    titulo: 'Botao WhatsApp Flutuante',
    descricao: 'Um botao flutuante para que seus visitantes iniciem conversas direto no seu WhatsApp.'
  },
  {
    id: 'analytics',
    titulo: 'Google Analytics',
    descricao: 'Integracao completa para monitorar o comportamento dos visitantes, saber de onde vem e quais paginas acessam.'
  },
  {
    id: 'agendamento',
    titulo: 'Sistema de Agendamento',
    descricao: 'Ferramenta integrada para que seus clientes marquem horarios, consultas ou reunioes diretamente pelo site.'
  },
  {
    id: 'seo_essencial',
    titulo: 'SEO essencial',
    descricao: 'Configuracao basica de titulos, descricoes e estrutura tecnica inicial para ajudar seu site a ser encontrado no Google.'
  },
  {
    id: 'mapa',
    titulo: 'Mapa de Localizacao',
    descricao: 'Bloco com mapa interativo para mostrar onde sua empresa esta e facilitar o trajeto dos clientes.'
  }
];

// FUTURO: dados de e-commerce/loja pequena mantidos para atualizacao posterior.
export const ECOMMERCE_EXTRAS_TEXTOS: EntradaTextoOpcao<EcommerceExtraId>[] = [
  {
    id: 'pagamentos',
    titulo: 'Meios de Pagamento',
    descricao: 'Integracao com gateways como Mercado Pago, Pagar.me ou Stripe para processar cartoes, Pix e boletos de forma segura.'
  },
  {
    id: 'frete',
    titulo: 'Calculo de Frete (Correios/Melhor Envio)',
    descricao: 'Automacao para calculo de frete em tempo real baseada no CEP do cliente e peso ou dimensoes dos produtos.'
  },
  {
    id: 'catalogo',
    titulo: 'Gestao de Catalogo',
    descricao: 'Painel para cadastro de produtos, controle de variacoes e gestao de estoque.'
  },
  {
    id: 'carrinho',
    titulo: 'Carrinho de Compras Abandonado',
    descricao: 'Sistema que envia lembretes automaticos para clientes que iniciaram a compra mas nao finalizaram.'
  }
];

export const CATALOGO_TEXTOS_CATEGORIAS: EntradaTextoCategoria<CategoriaSecao>[] = [
  {
    id: 'capa',
    nome: 'Capa',
    descricao: 'Abertura principal do site, feita para apresentar sua empresa com impacto, destacar sua mensagem mais importante e levar o visitante para contato, orcamento ou compra.'
  },
  {
    id: 'cardapio_produtos',
    nome: 'Cardapio de Produtos',
    descricao: 'Mostra produtos, servicos, precos ou promocoes de forma visual e organizada, ideal para vender sem precisar de uma loja virtual completa.'
  },
  {
    id: 'sobre',
    nome: 'Sobre a Empresa',
    descricao: 'Apresenta sua historia, valores e diferenciais para aproximar o cliente da marca e aumentar a confianca no seu negocio.'
  },
  {
    id: 'servicos',
    nome: 'Servicos',
    descricao: 'Explica o que sua empresa oferece de forma clara, ajudando o cliente a entender seus servicos e escolher a melhor solucao.'
  },
  {
    id: 'depoimentos',
    nome: 'Depoimentos',
    descricao: 'Exibe avaliacoes e experiencias de clientes para reforcar credibilidade, provar qualidade e aumentar a seguranca de quem esta visitando.'
  },
  {
    id: 'faq',
    nome: 'Perguntas Frequentes',
    descricao: 'Responde duvidas comuns antes do contato, reduz objeccoes e ajuda o cliente a decidir com mais rapidez e confianca.'
  },
  {
    id: 'blog',
    nome: 'Blog',
    descricao: 'Publica conteudos para educar clientes, fortalecer autoridade da marca e atrair novas visitas pelo Google de forma organica.'
  },
  {
    id: 'formulario',
    nome: 'Formulario de Contato',
    descricao: 'Facilita o envio de mensagens, pedidos de orcamento, reservas ou solicitacoes, organizando melhor o atendimento ao cliente.'
  },
  {
    id: 'video',
    nome: 'Video',
    descricao: 'Destaca um video institucional, demonstrativo ou promocional para apresentar sua empresa de forma mais envolvente e convincente.'
  },
  {
    id: 'galeria',
    nome: 'Galeria',
    descricao: 'Mostra fotos de produtos, projetos, ambiente ou resultados para valorizar visualmente o negocio e despertar mais interesse.'
  }
];

export const CATALOGO_TEXTOS_MODELOS: EntradaTextoModelo<ModeloSecaoId>[] = [
  {
    id: 'CapaModel1',
    nome: 'Capa Essencial de Apresentacao',
    descricao: 'Apresenta sua empresa de forma clara na abertura do site, com título, texto curto, imagem e botão de contato. Estrutura limpa, responsiva e direta.'
  },
  {
    id: 'CapaModel2',
    nome: 'Capa Profissional Animada',
    descricao: 'Abertura moderna com texto, imagem em destaque, botões, fundo personalizado, formas decorativas e animações suaves. Transmite profissionalismo e confiança.'
  },
  {
    id: 'CapaModel3',
    nome: 'Capa Premium de Conversao',
    descricao: 'Abertura de alto impacto com cards de benefícios, selos de confiança, microinterações e animações elaboradas. Ideal para incentivar orçamentos, WhatsApp ou compras.'
  },

  {
    id: 'SobreModel1',
    nome: 'Sobre Classico',
    descricao: 'Mostra quem você é, o que faz e por que sua empresa existe, de forma direta e fácil de entender.'
  },
  {
    id: 'SobreModel2',
    nome: 'Sobre com Blocos Visuais',
    descricao: 'Organiza sua apresentação em blocos, ícones ou cards para destacar diferenciais com visual mais profissional.'
  },
  {
    id: 'SobreModel3',
    nome: 'Sobre Storytelling',
    descricao: 'Conta a história da sua empresa de forma envolvente, usando sequência visual para transmitir experiência e autoridade.'
  },

  {
    id: 'ServicosModel1',
    nome: 'Servicos em Lista',
    descricao: 'Mostra seus serviços de forma simples e objetiva, ajudando o visitante a entender rapidamente o que você oferece.'
  },
  {
    id: 'ServicosModel2',
    nome: 'Servicos em Cards',
    descricao: 'Apresenta serviços em cards com ícones e benefícios, tornando a apresentação mais clara e atrativa.'
  },
  {
    id: 'ServicosModel3',
    nome: 'Servicos em Vitrine',
    descricao: 'Vitrine comercial para destacar seus principais serviços e guiar o visitante para a ação.'
  },

  {
    id: 'CardapioModel1',
    nome: 'Cardapio em Lista',
    descricao: 'Lista limpa com nome, descrição e preço, facilitando a consulta rápida pelo cliente.'
  },
  {
    id: 'CardapioModel2',
    nome: 'Cardapio em Cards',
    descricao: 'Produtos em cards visuais com descrição, preço e destaque de contato. Mais bonito e fácil de vender.'
  },
  {
    id: 'CardapioModel3',
    nome: 'Cardapio Vitrine',
    descricao: 'Cardápio premium com produtos por categorias e destaque para promoções ou itens especiais.'
  },

  {
    id: 'DepCarrossel',
    nome: 'Depoimentos Simples',
    descricao: 'Exibe comentários de clientes de forma simples, aumentando a confiança de quem visita o site.'
  },
  {
    id: 'DepGoogle',
    nome: 'Depoimentos em Cards Elegantes',
    descricao: 'Avaliações em cards organizados e elegantes, reforçando credibilidade com visual profissional.'
  },
  {
    id: 'DepTradicional',
    nome: 'Depoimento Principal com Apoios',
    descricao: 'Um depoimento principal em evidência com outros comentários de apoio, criando mais impacto na prova social.'
  },

  {
    id: 'FaqModel1',
    nome: 'FAQ Limpo',
    descricao: 'Responde as dúvidas mais comuns de forma clara, ajudando o visitante a decidir com mais segurança.'
  },
  {
    id: 'FaqModel2',
    nome: 'FAQ em Blocos',
    descricao: 'Perguntas em formato abre-e-fecha, deixando a leitura mais limpa e a navegação mais fácil.'
  },
  {
    id: 'FaqModel3',
    nome: 'FAQ Organizado por Temas',
    descricao: 'Dúvidas separadas por temas, facilitando que o cliente encontre respostas com mais rapidez.'
  },

  {
    id: 'BlogModel1',
    nome: 'Blog Simples',
    descricao: 'Exibe conteúdos, novidades ou artigos de forma simples, fortalecendo a presença da marca.'
  },
  {
    id: 'BlogModel2',
    nome: 'Blog em Grade Visual',
    descricao: 'Conteúdos em grade com títulos e resumos, tornando o blog mais atrativo e fácil de navegar.'
  },
  {
    id: 'BlogModel3',
    nome: 'Blog com Destaque Editorial',
    descricao: 'Um conteúdo principal em destaque apoiado por artigos menores, com aparência editorial profissional.'
  },

  {
    id: 'FormularioModel1',
    nome: 'Contato Simples',
    descricao: 'Facilita o contato por WhatsApp ou formulário simples para pedir orçamento ou tirar dúvidas rapidamente.'
  },
  {
    id: 'FormularioModel2',
    nome: 'Contato com Area de Apoio',
    descricao: 'Formulário acompanhado de informações, ícones e orientações que transmitem mais clareza e confiança.'
  },
  {
    id: 'FormularioModel3',
    nome: 'Contato com Layout de Conversao',
    descricao: 'Área de contato persuasiva com benefícios, mensagens de confiança e chamada forte para conversão.'
  },

  {
    id: 'VideoModel1',
    nome: 'Video Simples',
    descricao: 'Exibe um vídeo institucional, promocional ou demonstrativo de forma simples dentro do site.'
  },
  {
    id: 'VideoModel2',
    nome: 'Video com Texto de Apoio',
    descricao: 'Vídeo combinado com texto de apoio para ajudar o visitante a entender melhor sua proposta.'
  },
  {
    id: 'VideoModel3',
    nome: 'Video com Secao de Destaques',
    descricao: 'Vídeo em seção comercial com benefícios e chamada para ação que auxiliam na conversão.'
  },

  {
    id: 'GaleriaModel1',
    nome: 'Galeria em Grade',
    descricao: 'Fotos de produtos, ambiente ou projetos em grade simples e organizada.'
  },
  {
    id: 'GaleriaModel2',
    nome: 'Galeria em Mosaico',
    descricao: 'Imagens em mosaico visual, criando uma experiência mais bonita e valorizando melhor as fotos.'
  },
  {
    id: 'GaleriaModel3',
    nome: 'Galeria Portfolio',
    descricao: 'Galeria com aparência de portfólio, destacando imagens importantes e transmitindo profissionalismo.'
  }
];

export const CATALOGO_RELACAO_CATEGORIAS: EntradaRelacaoCategoria<CategoriaSecao, ModeloSecaoId>[] = [
  { id: 'capa', modelos: ['CapaModel1', 'CapaModel2', 'CapaModel3'] },
  { id: 'cardapio_produtos', modelos: ['CardapioModel1', 'CardapioModel2', 'CardapioModel3'] },
  { id: 'sobre', modelos: ['SobreModel1', 'SobreModel2', 'SobreModel3'] },
  { id: 'servicos', modelos: ['ServicosModel1', 'ServicosModel2', 'ServicosModel3'] },
  { id: 'depoimentos', modelos: ['DepCarrossel', 'DepGoogle', 'DepTradicional'] },
  { id: 'faq', modelos: ['FaqModel1', 'FaqModel2', 'FaqModel3'] },
  { id: 'blog', modelos: ['BlogModel1', 'BlogModel2', 'BlogModel3'] },
  { id: 'formulario', modelos: ['FormularioModel1', 'FormularioModel2', 'FormularioModel3'] },
  { id: 'video', modelos: ['VideoModel1', 'VideoModel2', 'VideoModel3'] },
  { id: 'galeria', modelos: ['GaleriaModel1', 'GaleriaModel2', 'GaleriaModel3'] }
];
