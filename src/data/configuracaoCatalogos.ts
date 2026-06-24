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
    icone: '🛒'
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
  { id: 'capa', nome: 'Capa', descricao: 'Primeira impressao do site, com mensagem principal, destaque da marca e chamada para a acao.' },
  { id: 'sobre', nome: 'Sobre', descricao: 'Espaco para apresentar a empresa, contar sua historia e mostrar o que torna seu negocio diferente.' },
  { id: 'servicos', nome: 'Servicos', descricao: 'Secao para explicar de forma clara os servicos, produtos ou solucoes que voce oferece.' },
  { id: 'depoimentos', nome: 'Depoimentos', descricao: 'Bloco de prova social com avaliacoes e experiencias de clientes para gerar mais confianca.' },
  { id: 'faq', nome: 'FAQ', descricao: 'Perguntas frequentes que ajudam a tirar duvidas, reduzir objecoes e facilitar a decisao do cliente.' },
  { id: 'blog', nome: 'Blog', descricao: 'Area para publicar conteudos, fortalecer sua autoridade e atrair visitas pelo Google.' },
  { id: 'formulario', nome: 'Formulario', descricao: 'Secao voltada para captacao de contatos, pedidos de orcamento, reservas ou mensagens.' },
  { id: 'video', nome: 'Video', descricao: 'Espaco para destacar um video institucional, demonstrativo ou promocional da sua marca.' },
  { id: 'galeria', nome: 'Galeria', descricao: 'Exibicao visual de fotos para apresentar projetos, produtos, ambiente ou resultados do negocio.' }
];

export const CATALOGO_TEXTOS_MODELOS: EntradaTextoModelo<ModeloSecaoId>[] = [
  { id: 'CapaModel1', nome: 'Capa com Destaque' },
  { id: 'CapaModel2', nome: 'Capa com Chamada Central', descricao: 'Hero com foco em chamada principal, texto objetivo e acao direta para gerar mais cliques e contatos.' },
  { id: 'CapaModel3', nome: 'Capa com Beneficios', descricao: 'Estrutura de abertura que combina chamada principal com lista de beneficios para apresentar valor logo no primeiro bloco.' },
  { id: 'SobreModel1', nome: 'Sobre a Empresa' },
  { id: 'SobreModel2', nome: 'Sobre com Diferenciais', descricao: 'Apresenta a historia da empresa junto com pontos fortes, autoridade e motivos para o cliente confiar na marca.' },
  { id: 'SobreModel3', nome: 'Sobre em Linha do Tempo', descricao: 'Organiza a apresentacao da empresa em etapas ou marcos, ideal para contar evolucao, experiencia e conquistas.' },
  { id: 'ServicosModel1', nome: 'Servicos - Modelo 1' },
  { id: 'ServicosModel2', nome: 'Servicos - Modelo 2', descricao: 'Apresenta os servicos em um formato alternativo, com foco em leitura rapida e comparacao entre os destaques do negocio.' },
  { id: 'ServicosModel3', nome: 'Servicos - Modelo 3', descricao: 'Mostra os servicos em blocos mais detalhados, com espaco para reforcar beneficios, diferencas e chamadas para acao.' },
  { id: 'DepCarrossel', nome: 'Carrossel de Avaliacoes' },
  { id: 'DepGoogle', nome: 'Avaliacoes do Google', descricao: 'Exibe comentarios com visual inspirado nas avaliacoes publicas, reforcando credibilidade e prova social.' },
  { id: 'DepTradicional', nome: 'Depoimento em Destaque', descricao: 'Destaca um ou mais depoimentos em formato mais classico, valorizando a mensagem e a experiencia do cliente.' },
  { id: 'FaqModel1', nome: 'Perguntas Frequentes (FAQ)' },
  { id: 'FaqModel2', nome: 'FAQ em Blocos', descricao: 'Distribui perguntas e respostas em blocos mais destacados, facilitando a leitura e a escaneabilidade do conteudo.' },
  { id: 'FaqModel3', nome: 'FAQ com Categorias', descricao: 'Organiza duvidas frequentes em grupos de assunto, ideal para negocios com objecoes e perguntas recorrentes mais variadas.' },
  { id: 'BlogModel1', nome: 'Grid de Artigos do Blog' },
  { id: 'BlogModel2', nome: 'Blog em Lista Editorial', descricao: 'Modelo com visual mais limpo e editorial, priorizando leitura, titulos e hierarquia de informacao.' },
  { id: 'BlogModel3', nome: 'Blog com Artigo em Destaque', descricao: 'Estrutura que valoriza um conteudo principal no topo e apoia a navegacao para outros artigos relacionados.' },
  { id: 'FormularioModel1', nome: 'Formulario de Contato/Reserva' },
  { id: 'FormularioModel2', nome: 'Formulario Simplificado', descricao: 'Versao mais direta para captar mensagens e pedidos com poucos campos, favorecendo conversao rapida.' },
  { id: 'FormularioModel3', nome: 'Formulario com Contexto', descricao: 'Modelo com espaco para reforcar orientacoes, beneficios e confianca antes do envio das informacoes.' },
  { id: 'VideoModel1', nome: 'Video Institucional' },
  { id: 'VideoModel2', nome: 'Video com Texto Lateral', descricao: 'Combina o video com uma coluna de apoio para reforcar mensagem, diferenciais e chamada para acao.' },
  { id: 'VideoModel3', nome: 'Video com Beneficios', descricao: 'Destaca o conteudo em video junto com argumentos de venda, pontos fortes ou instrucoes para o visitante.' },
  { id: 'GaleriaModel1', nome: 'Galeria de Fotos' }
  ,{ id: 'GaleriaModel2', nome: 'Galeria em Mosaico', descricao: 'Distribui as imagens em um formato mais dinamico, ideal para destacar variedade visual e impacto estetico.' }
  ,{ id: 'GaleriaModel3', nome: 'Galeria com Destaques', descricao: 'Organiza a galeria com foco em imagens principais e apoio visual complementar para valorizar projetos ou produtos.' }
];

export const CATALOGO_RELACAO_CATEGORIAS: EntradaRelacaoCategoria<CategoriaSecao, ModeloSecaoId>[] = [
  { id: 'capa', modelos: ['CapaModel1', 'CapaModel2', 'CapaModel3'] },
  { id: 'sobre', modelos: ['SobreModel1', 'SobreModel2', 'SobreModel3'] },
  { id: 'servicos', modelos: ['ServicosModel1', 'ServicosModel2', 'ServicosModel3'] },
  { id: 'depoimentos', modelos: ['DepCarrossel', 'DepGoogle', 'DepTradicional'] },
  { id: 'faq', modelos: ['FaqModel1', 'FaqModel2', 'FaqModel3'] },
  { id: 'blog', modelos: ['BlogModel1', 'BlogModel2', 'BlogModel3'] },
  { id: 'formulario', modelos: ['FormularioModel1', 'FormularioModel2', 'FormularioModel3'] },
  { id: 'video', modelos: ['VideoModel1', 'VideoModel2', 'VideoModel3'] },
  { id: 'galeria', modelos: ['GaleriaModel1', 'GaleriaModel2', 'GaleriaModel3'] }
];
