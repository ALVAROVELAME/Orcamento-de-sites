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

export const CATALOGO_PACOTES_BASE: Record<PacoteId, PacoteBaseConfig> = {
  cartao_3: {
    id: 'cartao_3',
    nome: 'Cartao Digital 3 Secoes',
    descricao: 'Ideal para contatos rapidos, link da bio e divulgacao inicial.',
    limiteSecoes: 3,
    limitePaginas: 1,
    detalhes: ['Ate 3 secoes', 'Pagina unica (Link na Bio)', 'Botao WhatsApp', 'Otimizacao PageSpeed'],
    fluxo: 'padrao',
    icone: '🔗'
  },
  cartao_6: {
    id: 'cartao_6',
    nome: 'Cartao Digital 6 Secoes',
    descricao: 'Mais completo, ideal para quem quer uma apresentacao mais forte da marca.',
    limiteSecoes: 6,
    limitePaginas: 1,
    detalhes: ['Ate 6 secoes', 'Pagina unica', 'Mapa interativo', 'Integracao de depoimentos'],
    fluxo: 'padrao',
    icone: '🚀'
  },
  institucional: {
    id: 'institucional',
    nome: 'Site Institucional Basico',
    descricao: 'Presenca online profissional padrao.',
    limiteSecoes: 8,
    limitePaginas: 3,
    detalhes: ['Secoes na Home', 'Ate 3 paginas internas', 'Formulario avancado', 'Design exclusivo'],
    fluxo: 'padrao',
    icone: '🏢'
  },
  loja_pequena: {
    id: 'loja_pequena',
    habilitado: false,
    nome: 'Loja Virtual Pequena',
    descricao: 'Comece a vender seus produtos online.',
    limiteSecoes: 12,
    limitePaginas: 5,
    detalhes: ['Catalogo de produtos', 'Carrinho de compras', 'Integracao meios de pagamento', 'Painel de pedidos'],
    fluxo: 'ecommerce',
    icone: '🛒'
  }
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
  {
    id: 'termos_uso',
    titulo: 'Termos de Uso',
    descricao: 'Regras, direitos e diretrizes para o uso do seu site, servico ou e-commerce.'
  },
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
    id: 'meta_pixel',
    titulo: 'Pixel Meta',
    descricao: 'Essencial para rastrear conversoes, otimizar anuncios e criar publicos personalizados para campanhas no Facebook e Instagram.'
  },
  {
    id: 'agendamento',
    titulo: 'Sistema de Agendamento',
    descricao: 'Ferramenta integrada para que seus clientes marquem horarios, consultas ou reunioes diretamente pelo site.'
  },
  {
    id: 'seo_avancado',
    titulo: 'SEO Avancado',
    descricao: 'Configuracao tecnica de palavras-chave, meta tags e sitemap para melhorar o posicionamento do seu site no Google.'
  }
];

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
  { id: 'capa', nome: 'Capa', descricao: 'Bloco inicial com proposta principal, chamada de acao e destaque da marca.' },
  { id: 'sobre', nome: 'Sobre', descricao: 'Apresentacao da empresa, historia, diferenciais e posicionamento.' },
  { id: 'servicos', nome: 'Servicos', descricao: 'Listagem dos servicos, entregas ou beneficios oferecidos no site.' },
  { id: 'depoimentos', nome: 'Depoimentos', descricao: 'Prova social com avaliacoes, relatos de clientes e confianca.' },
  { id: 'faq', nome: 'FAQ', descricao: 'Perguntas frequentes para responder objecoes e orientar visitantes.' },
  { id: 'blog', nome: 'Blog', descricao: 'Area para artigos, conteudo organico e estrategia de SEO.' },
  { id: 'formulario', nome: 'Formulario', descricao: 'Bloco para captacao de leads, contato ou reservas.' },
  { id: 'video', nome: 'Video', descricao: 'Espaco para video institucional, demonstracao ou conteudo de destaque.' },
  { id: 'mapa', nome: 'Mapa', descricao: 'Localizacao fisica da empresa com mapa interativo.' },
  { id: 'galeria', nome: 'Galeria', descricao: 'Exibicao visual de fotos, projetos, ambiente ou produtos.' }
];

export const CATALOGO_TEXTOS_MODELOS: EntradaTextoModelo<ModeloSecaoId>[] = [
  { id: 'CapaModel1', nome: 'Capa com Destaque' },
  { id: 'SobreModel1', nome: 'Sobre a Empresa' },
  { id: 'ServicosModel1', nome: 'Servicos - Modelo 1' },
  { id: 'ServicosModel2', nome: 'Servicos - Modelo 2' },
  { id: 'DepCarrossel', nome: 'Carrossel de Avaliacoes' },
  { id: 'DepGoogle', nome: 'Avaliacoes do Google' },
  { id: 'DepTradicional', nome: 'Depoimento em Destaque' },
  { id: 'FaqModel1', nome: 'Perguntas Frequentes (FAQ)' },
  { id: 'BlogModel1', nome: 'Grid de Artigos do Blog' },
  { id: 'FormularioModel1', nome: 'Formulario de Contato/Reserva' },
  { id: 'VideoModel1', nome: 'Video Institucional' },
  { id: 'MapaModel1', nome: 'Localizacao' },
  { id: 'GaleriaModel1', nome: 'Galeria de Fotos' }
];

export const CATALOGO_RELACAO_CATEGORIAS: EntradaRelacaoCategoria<CategoriaSecao, ModeloSecaoId>[] = [
  { id: 'capa', modelos: ['CapaModel1'] },
  { id: 'sobre', modelos: ['SobreModel1'] },
  { id: 'servicos', modelos: ['ServicosModel1', 'ServicosModel2'] },
  { id: 'depoimentos', modelos: ['DepCarrossel', 'DepGoogle', 'DepTradicional'] },
  { id: 'faq', modelos: ['FaqModel1'] },
  { id: 'blog', modelos: ['BlogModel1'] },
  { id: 'formulario', modelos: ['FormularioModel1'] },
  { id: 'video', modelos: ['VideoModel1'] },
  { id: 'mapa', modelos: ['MapaModel1'] },
  { id: 'galeria', modelos: ['GaleriaModel1'] }
];
