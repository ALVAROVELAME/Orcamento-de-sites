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
    descricao: 'Apresenta sua empresa de forma clara e objetiva logo na abertura do site, com titulo principal, texto curto, imagem ou fundo simples e botao de contato. Usa uma estrutura limpa, responsiva e facil de entender, ideal para quem precisa de uma presenca profissional direta.'
  },
  {
    id: 'CapaModel2',
    nome: 'Capa Profissional Animada',
    descricao: 'Cria uma abertura mais moderna e visualmente trabalhada, combinando texto, imagem em destaque, botoes, fundo personalizado, formas decorativas e animacoes suaves. Exige mais composicao visual e melhora a primeira impressao do visitante, transmitindo mais profissionalismo e confianca.'
  },
  {
    id: 'CapaModel3',
    nome: 'Capa Premium de Conversao',
    descricao: 'Desenvolve uma abertura de alto impacto, com elementos estrategicos como cards de beneficios, numeros, selos de confianca, prova de valor, microinteracoes e animacoes mais elaboradas. Ideal para aumentar a percepcao de valor da marca e incentivar o visitante a pedir orcamento, chamar no WhatsApp ou comprar.'
  },

  {
    id: 'SobreModel1',
    nome: 'Sobre Classico',
    descricao: 'Mostra quem voce e, o que faz e por que sua empresa existe, de forma direta, clara e facil de entender.'
  },
  {
    id: 'SobreModel2',
    nome: 'Sobre com Blocos Visuais',
    descricao: 'Organiza sua apresentacao em blocos, icones ou cards para destacar diferenciais e deixar a leitura mais profissional.'
  },
  {
    id: 'SobreModel3',
    nome: 'Sobre Storytelling',
    descricao: 'Conta a historia da sua empresa de forma mais envolvente, usando uma sequencia visual para transmitir experiencia e autoridade.'
  },

  {
    id: 'ServicosModel1',
    nome: 'Servicos em Lista',
    descricao: 'Mostra seus servicos de forma simples e objetiva, ajudando o visitante a entender rapidamente o que voce oferece.'
  },
  {
    id: 'ServicosModel2',
    nome: 'Servicos em Cards',
    descricao: 'Apresenta seus servicos em cards com icones e beneficios, deixando a apresentacao mais clara, bonita e atrativa.'
  },
  {
    id: 'ServicosModel3',
    nome: 'Servicos em Vitrine',
    descricao: 'Cria uma vitrine mais comercial para destacar seus principais servicos e guiar o visitante para a acao.'
  },

  {
    id: 'CardapioModel1',
    nome: 'Cardapio em Lista',
    descricao: 'Mostra seus produtos em uma lista limpa, com nome, descricao e preco, facilitando a consulta rapida pelo cliente.'
  },
  {
    id: 'CardapioModel2',
    nome: 'Cardapio em Cards',
    descricao: 'Apresenta seus produtos em cards visuais com descricao, preco e destaque de contato, deixando o cardapio mais bonito e facil de vender.'
  },
  {
    id: 'CardapioModel3',
    nome: 'Cardapio Vitrine',
    descricao: 'Cria um cardapio com aparencia mais premium, separando produtos por categorias e valorizando promocoes ou itens especiais.'
  },

  {
    id: 'DepCarrossel',
    nome: 'Depoimentos Simples',
    descricao: 'Mostra comentarios de clientes de forma simples, ajudando a aumentar a confianca de quem visita o site.'
  },
  {
    id: 'DepGoogle',
    nome: 'Depoimentos em Cards Elegantes',
    descricao: 'Apresenta avaliacoes em cards mais elegantes, reforcando credibilidade com um visual mais organizado e profissional.'
  },
  {
    id: 'DepTradicional',
    nome: 'Depoimento Principal com Apoios',
    descricao: 'Cria mais destaque para a prova social, colocando um depoimento principal em evidencia e outros comentarios de apoio.'
  },

  {
    id: 'FaqModel1',
    nome: 'FAQ Limpo',
    descricao: 'Responde as duvidas mais comuns de forma clara, ajudando o visitante a tomar decisoes com mais seguranca.'
  },
  {
    id: 'FaqModel2',
    nome: 'FAQ em Blocos',
    descricao: 'Organiza as perguntas em blocos ou em formato abre-e-fecha, deixando a leitura mais limpa e profissional.'
  },
  {
    id: 'FaqModel3',
    nome: 'FAQ Organizado por Temas',
    descricao: 'Separa as duvidas por temas, facilitando a navegacao e ajudando o cliente a encontrar respostas com mais rapidez.'
  },

  {
    id: 'BlogModel1',
    nome: 'Blog Simples',
    descricao: 'Mostra seus conteudos, novidades ou artigos de forma simples, fortalecendo a presenca da marca no site.'
  },
  {
    id: 'BlogModel2',
    nome: 'Blog em Grade Visual',
    descricao: 'Organiza os conteudos em uma grade visual com titulos e resumos, deixando o blog mais atrativo e facil de navegar.'
  },
  {
    id: 'BlogModel3',
    nome: 'Blog com Destaque Editorial',
    descricao: 'Cria uma area editorial mais profissional, destacando um conteudo principal e apoiando com outros artigos menores.'
  },

  {
    id: 'FormularioModel1',
    nome: 'Contato Simples',
    descricao: 'Facilita o contato do visitante por WhatsApp ou formulario simples, tornando mais rapido pedir orcamento ou tirar duvidas.'
  },
  {
    id: 'FormularioModel2',
    nome: 'Contato com Area de Apoio',
    descricao: 'Acompanha o formulario com informacoes uteis, icones e orientacoes, deixando o contato mais claro e transmitindo mais confianca.'
  },
  {
    id: 'FormularioModel3',
    nome: 'Contato com Layout de Conversao',
    descricao: 'Cria uma area de contato mais persuasiva, com beneficios, mensagens de confianca e chamada forte para incentivar a conversao.'
  },

  {
    id: 'VideoModel1',
    nome: 'Video Simples',
    descricao: 'Mostra um video institucional, promocional ou demonstrativo de forma simples dentro do site.'
  },
  {
    id: 'VideoModel2',
    nome: 'Video com Texto de Apoio',
    descricao: 'Combina o video com um texto de apoio, ajudando o visitante a entender melhor sua proposta, servico ou produto.'
  },
  {
    id: 'VideoModel3',
    nome: 'Video com Secao de Destaques',
    descricao: 'Transforma o video em uma secao mais comercial, com beneficios, chamada para acao e destaques que ajudam na conversao.'
  },

  {
    id: 'GaleriaModel1',
    nome: 'Galeria em Grade',
    descricao: 'Mostra fotos de produtos, ambiente, projetos ou resultados em uma grade simples e organizada.'
  },
  {
    id: 'GaleriaModel2',
    nome: 'Galeria em Mosaico',
    descricao: 'Apresenta as imagens em um mosaico mais visual, criando uma experiencia mais bonita e valorizando melhor as fotos.'
  },
  {
    id: 'GaleriaModel3',
    nome: 'Galeria Portfolio',
    descricao: 'Cria uma galeria com aparencia de portfolio, destacando imagens importantes e transmitindo mais profissionalismo para a marca.'
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
