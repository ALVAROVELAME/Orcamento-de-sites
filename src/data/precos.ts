export type PacoteId = 'cartao_3' | 'cartao_6' | 'institucional' | 'loja_pequena';

export type CategoriaSecao =
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

export type CategoriaSecaoPreco = CategoriaSecao;

export type ModeloSecaoId =
  | 'CapaModel1'
  | 'SobreModel1'
  | 'ServicosModel1'
  | 'ServicosModel2'
  | 'DepCarrossel'
  | 'DepGoogle'
  | 'DepTradicional'
  | 'FaqModel1'
  | 'BlogModel1'
  | 'FormularioModel1'
  | 'VideoModel1'
  | 'MapaModel1'
  | 'GaleriaModel1';

export type StatusLogoId = 'logo_pronto' | 'logo_imagem' | 'logo_criacao';
export type EstiloMarcaId = 'moderna' | 'classica_seria' | 'divertida' | 'luxuosa' | 'minimalista';
export type PaginaExtraId = 'sobre_nos' | 'privacidade' | 'termos_uso' | 'contato' | 'faq' | 'erro_404';
export type ExtraIntegracaoId = 'whatsapp' | 'analytics' | 'meta_pixel' | 'agendamento' | 'seo_avancado';
export type EcommerceExtraId = 'pagamentos' | 'frete' | 'catalogo' | 'carrinho';
export type FluxoPacote = 'padrao' | 'ecommerce';

export interface Pacote {
  id: PacoteId;
  nome: string;
  descricao: string;
  precoBase: number;
  limiteSecoes: number;
  limitePaginas: number;
  detalhes: readonly string[];
  fluxo: FluxoPacote;
  icone: string;
}

export interface SecaoNoSite {
  id: string;
  categoria: CategoriaSecao;
  modelo: ModeloSecaoId;
}

export interface InfoSite {
  nome: string;
  cores: [string, string, string];
  status_logo?: StatusLogoId | '';
  estilo_marca?: EstiloMarcaId[];
  paginas_extras?: PaginaExtraId[];
  extras_integracoes?: ExtraIntegracaoId[];
  ecommerce_extras?: EcommerceExtraId[];
  tem_hospedagem_dominio?: boolean;
}

export interface SelecaoPrecoProjeto {
  pacoteId: PacoteId;
  secoes?: Array<{ categoria: CategoriaSecao; modelo?: ModeloSecaoId }>;
  paginasExtras?: PaginaExtraId[];
  extrasIntegracoes?: ExtraIntegracaoId[];
  ecommerceExtras?: EcommerceExtraId[];
  temHospedagemDominio?: boolean;
  statusLogo?: StatusLogoId | '';
}

export interface Precificavel {
  preco?: number;
  incluidoNosPacotes?: readonly PacoteId[];
}

export interface OpcaoFormulario extends Precificavel {
  id: string;
  titulo: string;
  descricao?: string;
  destaque?: boolean;
}

export interface ModeloSecaoPreview extends Precificavel {
  id: ModeloSecaoId;
  nome: string;
  thumb: string;
}

export interface CategoriaSecaoConfig {
  id: CategoriaSecao;
  nome: string;
  descricao: string;
  precoBase?: number;
  modelos: readonly ModeloSecaoPreview[];
}

export const STATUS_LOGO_OPCOES = [
  { id: 'logo_pronto', titulo: 'Ja tenho o logo em alta qualidade', preco: 0 },
  { id: 'logo_imagem', titulo: 'Tenho apenas a imagem (PNG/JPG)', preco: 0 },
  { id: 'logo_criacao', titulo: 'Quero que criem o logo para mim', destaque: true, preco: 20 }
] as const satisfies readonly OpcaoFormulario[];

export const ESTILOS_MARCA_OPCOES = [
  { id: 'moderna', titulo: 'Moderna' },
  { id: 'classica_seria', titulo: 'Classica/Seria' },
  { id: 'divertida', titulo: 'Divertida' },
  { id: 'luxuosa', titulo: 'Luxuosa' },
  { id: 'minimalista', titulo: 'Minimalista' }
] as const satisfies readonly OpcaoFormulario[];

export const PAGINAS_EXTRAS_OPCOES = [
  {
    id: 'sobre_nos',
    titulo: 'Pagina Sobre Nos',
    descricao: 'Uma pagina dedicada a contar a historia da sua empresa, sua missao, visao, valores e apresentar a equipe.',
    preco: 250
  },
  {
    id: 'privacidade',
    titulo: 'Politica de Privacidade',
    descricao: 'Pagina essencial para adequacao a LGPD, explicando como os dados dos visitantes sao coletados e tratados.',
    preco: 120,
    incluidoNosPacotes: ['cartao_3', 'cartao_6', 'institucional', 'loja_pequena']
  },
  {
    id: 'termos_uso',
    titulo: 'Termos de Uso',
    descricao: 'Regras, direitos e diretrizes para o uso do seu site, servico ou e-commerce.',
    preco: 120
  },
  {
    id: 'contato',
    titulo: 'Pagina de Contato Completa',
    descricao: 'Pagina separada com formulario de contato, mapa de localizacao do Google Maps e links diretos para redes sociais e WhatsApp.',
    preco: 180
  },
  {
    id: 'faq',
    titulo: 'Pagina de Duvidas (FAQ)',
    descricao: 'Uma pagina inteira dedicada a responder as perguntas mais frequentes dos seus clientes, ajudando a quebrar objecoes.',
    preco: 140
  },
  {
    id: 'erro_404',
    titulo: 'Pagina 404 Personalizada',
    descricao: 'Pagina de erro com o design da sua marca e botoes de retorno, para nao perder o visitante que acessou um link quebrado.',
    preco: 90
  }
] as const satisfies readonly OpcaoFormulario[];

export const EXTRAS_INTEGRACOES_OPCOES = [
  {
    id: 'whatsapp',
    titulo: 'Botao WhatsApp Flutuante',
    descricao: 'Um botao flutuante para que seus visitantes iniciem conversas direto no seu WhatsApp.',
    preco: 80,
    incluidoNosPacotes: ['cartao_3', 'institucional']
  },
  {
    id: 'analytics',
    titulo: 'Google Analytics',
    descricao: 'Integracao completa para monitorar o comportamento dos visitantes, saber de onde vem e quais paginas acessam.',
    preco: 150
  },
  {
    id: 'meta_pixel',
    titulo: 'Pixel Meta',
    descricao: 'Essencial para rastrear conversoes, otimizar anuncios e criar publicos personalizados para campanhas no Facebook e Instagram.',
    preco: 150
  },
  {
    id: 'agendamento',
    titulo: 'Sistema de Agendamento',
    descricao: 'Ferramenta integrada para que seus clientes marquem horarios, consultas ou reunioes diretamente pelo site.',
    preco: 250
  },
  {
    id: 'seo_avancado',
    titulo: 'SEO Avancado',
    descricao: 'Configuracao tecnica de palavras-chave, meta tags e sitemap para melhorar o posicionamento do seu site no Google.',
    preco: 300
  }
] as const satisfies readonly OpcaoFormulario[];

export const ECOMMERCE_EXTRAS_OPCOES = [
  {
    id: 'pagamentos',
    titulo: 'Meios de Pagamento',
    descricao: 'Integracao com gateways como Mercado Pago, Pagar.me ou Stripe para processar cartoes, Pix e boletos de forma segura.',
    preco: 600,
    incluidoNosPacotes: ['loja_pequena']
  },
  {
    id: 'frete',
    titulo: 'Calculo de Frete (Correios/Melhor Envio)',
    descricao: 'Automacao para calculo de frete em tempo real baseada no CEP do cliente e peso ou dimensoes dos produtos.',
    preco: 400
  },
  {
    id: 'catalogo',
    titulo: 'Gestao de Catalogo',
    descricao: 'Painel para cadastro de produtos, controle de variacoes e gestao de estoque.',
    preco: 700,
    incluidoNosPacotes: ['loja_pequena']
  },
  {
    id: 'carrinho',
    titulo: 'Carrinho de Compras Abandonado',
    descricao: 'Sistema que envia lembretes automaticos para clientes que iniciaram a compra mas nao finalizaram.',
    preco: 350,
    incluidoNosPacotes: ['loja_pequena']
  }
] as const satisfies readonly OpcaoFormulario[];

export const CATALOGO_SECOES: Record<CategoriaSecao, CategoriaSecaoConfig> = {
  capa: {
    id: 'capa',
    nome: 'Capa',
    descricao: 'Bloco inicial com proposta principal, chamada de acao e destaque da marca.',
    precoBase: 0,
    modelos: [{ id: 'CapaModel1', nome: 'Capa com Destaque', thumb: '🖼️', preco: 0, incluidoNosPacotes: ['cartao_3', 'cartao_6', 'institucional', 'loja_pequena'] }]
  },
  sobre: {
    id: 'sobre',
    nome: 'Sobre',
    descricao: 'Apresentacao da empresa, historia, diferenciais e posicionamento.',
    precoBase: 100,
    modelos: [{ id: 'SobreModel1', nome: 'Sobre a Empresa', thumb: '🏢', preco: 0 }]
  },
  servicos: {
    id: 'servicos',
    nome: 'Servicos',
    descricao: 'Listagem dos servicos, entregas ou beneficios oferecidos no site.',
    precoBase: 150,
    modelos: [
      { id: 'ServicosModel1', nome: 'Servicos - Modelo 1', thumb: '⚙️', preco: 150 },
      { id: 'ServicosModel2', nome: 'Servicos - Modelo 2', thumb: '⚙️', preco: 190 }
    ]
  },
  depoimentos: {
    id: 'depoimentos',
    nome: 'Depoimentos',
    descricao: 'Prova social com avaliacoes, relatos de clientes e confianca.',
    precoBase: 90,
    modelos: [
      { id: 'DepCarrossel', nome: 'Carrossel de Avaliacoes', thumb: '🎠', preco: 0, incluidoNosPacotes: ['cartao_6'] },
      { id: 'DepGoogle', nome: 'Avaliacoes do Google', thumb: '🗺️', preco: 120, incluidoNosPacotes: ['cartao_6'] },
      { id: 'DepTradicional', nome: 'Depoimento em Destaque', thumb: '💬', preco: 95, incluidoNosPacotes: ['cartao_6'] }
    ]
  },
  faq: {
    id: 'faq',
    nome: 'FAQ',
    descricao: 'Perguntas frequentes para responder objecoes e orientar visitantes.',
    precoBase: 70,
    modelos: [{ id: 'FaqModel1', nome: 'Perguntas Frequentes (FAQ)', thumb: '❓', preco: 70 }]
  },
  blog: {
    id: 'blog',
    nome: 'Blog',
    descricao: 'Area para artigos, conteudo organico e estrategia de SEO.',
    precoBase: 160,
    modelos: [{ id: 'BlogModel1', nome: 'Grid de Artigos do Blog', thumb: '📝', preco: 160 }]
  },
  formulario: {
    id: 'formulario',
    nome: 'Formulario',
    descricao: 'Bloco para captacao de leads, contato ou reservas.',
    precoBase: 110,
    modelos: [{ id: 'FormularioModel1', nome: 'Formulario de Contato/Reserva', thumb: '✉️', preco: 110, incluidoNosPacotes: ['institucional'] }]
  },
  video: {
    id: 'video',
    nome: 'Video',
    descricao: 'Espaco para video institucional, demonstracao ou conteudo de destaque.',
    precoBase: 120,
    modelos: [{ id: 'VideoModel1', nome: 'Video Institucional', thumb: '▶️', preco: 120 }]
  },
  mapa: {
    id: 'mapa',
    nome: 'Mapa',
    descricao: 'Localizacao fisica da empresa com mapa interativo.',
    precoBase: 60,
    modelos: [{ id: 'MapaModel1', nome: 'Localizacao', thumb: '📍', preco: 60, incluidoNosPacotes: ['cartao_6'] }]
  },
  galeria: {
    id: 'galeria',
    nome: 'Galeria',
    descricao: 'Exibicao visual de fotos, projetos, ambiente ou produtos.',
    precoBase: 140,
    modelos: [{ id: 'GaleriaModel1', nome: 'Galeria de Fotos', thumb: '📸', preco: 140 }]
  }
};

export const LISTA_CATEGORIAS_SECOES = Object.keys(CATALOGO_SECOES) as CategoriaSecao[];

export const FORMULARIO_CONFIG = {
  etapa1: {
    titulo: 'Escolha o plano ideal',
    descricao: 'Selecione o pacote que melhor atende ao seu projeto para liberarmos as secoes no construtor.',
    textoBotaoSelecionar: 'Selecionar',
    prefixoLimiteSecoes: 'Limite:',
    sufixoLimiteSecoes: 'secoes basicas'
  },
  etapa2: {
    titulo: 'Identidade Visual',
    descricao: 'Defina o nome da marca, as cores base e as preferencias visuais do seu novo site.',
    campoNome: {
      rotulo: 'Nome do Site / Empresa',
      placeholder: 'Ex: Tech Solucoes'
    },
    hospedagemDominio: {
      titulo: 'Hospedagem e Dominio *',
      descricao: 'Informe se voce ja possui hospedagem e dominio. Caso nao tenha, adicionaremos esse item no orcamento.',
      opcoes: [
        { id: 'tem', titulo: 'Ja tenho hospedagem e dominio' },
        { id: 'nao_tem', titulo: 'Nao tenho, quero incluir no orcamento' }
      ]
    },
    logotipo: {
      titulo: 'Sobre o Logotipo *',
      opcoes: STATUS_LOGO_OPCOES,
      idQueLiberaDetalhes: 'logo_criacao'
    },
    criacaoLogo: {
      titulo: 'Como voce quer que a marca seja percebida?',
      opcoes: ESTILOS_MARCA_OPCOES
    },
    paletaCores: {
      titulo: 'Escolha sua Paleta de Cores:',
      quantidade: 3,
      corPadrao: '#ffffff'
    }
  },
  etapa3: {
    selecaoInicial: {
      titulo: 'Selecione as secoes desejadas',
      descricao: 'Escolha os blocos de conteudo que farao parte da estrutura do seu site. Clique para ver uma previa de cada categoria.',
      contadorSelecionadas: 'selecionadas'
    },
    escolhaModelos: {
      prefixoTitulo: 'Defina o estilo para:'
    },
    resumo: {
      titulo: 'Estrutura Final do Site',
      prefixoProjeto: 'Projeto customizado para:',
      textoBotaoRemover: 'Remover',
      textoVisualizacaoIndisponivel: 'Visualizacao nao disponivel.'
    },
    avisoLimite: {
      titulo: 'Limite do pacote atingido',
      descricao: 'Seu pacote permite apenas {limite} secoes contando a capa garantida. Para adicionar mais opcoes, voce precisara alterar o plano escolhido.'
    },
    avisoSecoesRestantes: {
      titulo: 'Voce ainda pode usar mais secoes'
    },
    textoPreviewIndisponivel: 'Previa indisponivel',
    textoModeloIndisponivel: 'Modelo indisponivel'
  },
  etapa4: {
    titulo: 'Paginas Adicionais',
    descricao: 'Selecione quais paginas extras voce deseja incluir no seu projeto. Clique no + para ler os detalhes de cada uma.',
    contadorSelecionadas: 'selecionadas',
    textoProximo: 'Proximo passo',
    opcoes: PAGINAS_EXTRAS_OPCOES
  },
  etapa5: {
    titulo: 'Extras e Integracoes',
    descricao: 'Selecione funcionalidades adicionais para potencializar o seu site.',
    opcoes: EXTRAS_INTEGRACOES_OPCOES,
    textoProximoPadrao: 'Concluir Projeto',
    textoProximoEcommerce: 'Proximo Passo'
  },
  etapa6: {
    titulo: 'Configuracoes de E-commerce',
    descricao: 'Personalize as funcionalidades da sua loja virtual para vender online.',
    opcoes: ECOMMERCE_EXTRAS_OPCOES,
    textoProximo: 'Finalizar e Enviar Projeto'
  }
} as const;

export const INFO_SITE_INICIAL: InfoSite = {
  nome: '',
  cores: ['#2563eb', '#1e40af', '#ffffff'],
  status_logo: '',
  estilo_marca: [],
  paginas_extras: [],
  extras_integracoes: [],
  ecommerce_extras: [],
  tem_hospedagem_dominio: true
};

export const CATALOGO_PRECOS = {
  pacotes: {
    cartao_3: {
      id: 'cartao_3',
      nome: 'Cartao Digital 3 Secoes',
      descricao: 'Ideal para contatos rapidos e links uteis.',
      precoBase: 200,
      limiteSecoes: 3,
      limitePaginas: 1,
      detalhes: ['Ate 3 secoes', 'Pagina unica (Link na Bio)', 'Botao WhatsApp', 'Otimizacao PageSpeed'],
      fluxo: 'padrao',
      icone: '🔗'
    },
    cartao_6: {
      id: 'cartao_6',
      nome: 'Cartao Digital 6 Secoes',
      descricao: 'Mais completo, perfeito para portfolio inicial.',
      precoBase: 400,
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
      precoBase: 1200,
      limiteSecoes: 8,
      limitePaginas: 3,
      detalhes: ['Secoes na Home', 'Ate 3 paginas internas', 'Formulario avancado', 'Design exclusivo'],
      fluxo: 'padrao',
      icone: '🏢'
    },
    loja_pequena: {
      id: 'loja_pequena',
      nome: 'Loja Virtual Pequena',
      descricao: 'Comece a vender seus produtos online.',
      precoBase: 4000,
      limiteSecoes: 12,
      limitePaginas: 5,
      detalhes: ['Catalogo de produtos', 'Carrinho de compras', 'Integracao meios de pagamento', 'Painel de pedidos'],
      fluxo: 'ecommerce',
      icone: '🛒'
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
    CapaModel1: 0,
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

export function obterPacotePorId(pacoteId: PacoteId | string) {
  return CATALOGO_PRECOS.pacotes[pacoteId as keyof typeof CATALOGO_PRECOS.pacotes] ?? null;
}

export function obterCategoriaSecaoConfig(categoria: CategoriaSecao) {
  return CATALOGO_SECOES[categoria];
}

export function obterModeloSecaoConfig(modeloId: ModeloSecaoId) {
  return LISTA_CATEGORIAS_SECOES.flatMap((categoria) => CATALOGO_SECOES[categoria].modelos).find((modelo) => modelo.id === modeloId) ?? null;
}

export function ehPacoteEcommerce(pacote?: Pacote | null) {
  return pacote?.fluxo === 'ecommerce';
}

export function obterTotalSecoesComCapa(pacote?: Pacote | null) {
  if (!pacote) return 1;
  return pacote.limiteSecoes + 1;
}

export function obterQuantidadeSecoesSelecionaveis(pacote?: Pacote | null) {
  return pacote?.limiteSecoes ?? 0;
}

export function itemEstaIncluidoNoPacote(item: Precificavel | undefined, pacote?: Pacote | null) {
  if (!item || !pacote) return false;
  return item.incluidoNosPacotes?.includes(pacote.id) ?? false;
}

export function obterPrecoExibicao(item: Precificavel | undefined, pacote?: Pacote | null) {
  if (!item) return 0;
  if (itemEstaIncluidoNoPacote(item, pacote)) return 0;
  return item.preco ?? 0;
}

export function obterRotuloPreco(item: Precificavel | undefined, pacote?: Pacote | null) {
  if (itemEstaIncluidoNoPacote(item, pacote)) return 'Incluido no pacote';
  if (!item || typeof item.preco !== 'number') return null;
  if (item.preco === 0) return 'Sem custos';
  if (item.preco < 0) return null;
  return `+ ${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}

export function obterRotuloFaixaPrecoCategoria(categoria: CategoriaSecao, pacote?: Pacote | null) {
  const categoriaConfig = obterCategoriaSecaoConfig(categoria);
  if (categoriaConfig.modelos.length === 0) return null;

  if (pacote && categoriaConfig.modelos.every((modelo) => itemEstaIncluidoNoPacote(modelo, pacote))) {
    return 'Incluido no pacote';
  }

  const precos = categoriaConfig.modelos.map((modelo) => obterPrecoExibicao(modelo, pacote));
  const menorPreco = Math.min(...precos);
  const maiorPreco = Math.max(...precos);

  if (maiorPreco === 0) return 'Sem custos';

  const formatarMoeda = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  if (categoriaConfig.modelos.length === 1 || menorPreco === maiorPreco) {
    return `A partir de ${formatarMoeda(menorPreco)}`;
  }

  return `A partir de ${formatarMoeda(menorPreco)} ate ${formatarMoeda(maiorPreco)}`;
}

function criarMapaTitulos<T extends { id: string; titulo: string }>(opcoes: readonly T[]) {
  return opcoes.reduce<Record<string, string>>((acc, opcao) => {
    acc[opcao.id] = opcao.titulo;
    return acc;
  }, {});
}

const MAPA_STATUS_LOGO = criarMapaTitulos(STATUS_LOGO_OPCOES);
const MAPA_ESTILOS_MARCA = criarMapaTitulos(ESTILOS_MARCA_OPCOES);
const MAPA_PAGINAS_EXTRAS = criarMapaTitulos(PAGINAS_EXTRAS_OPCOES);
const MAPA_EXTRAS_INTEGRACOES = criarMapaTitulos(EXTRAS_INTEGRACOES_OPCOES);
const MAPA_ECOMMERCE_EXTRAS = criarMapaTitulos(ECOMMERCE_EXTRAS_OPCOES);

export function obterTituloStatusLogo(status?: StatusLogoId | '') {
  if (!status) return 'Nao informado';
  return MAPA_STATUS_LOGO[status] ?? status;
}

export function mapearTitulosEstiloMarca(ids?: readonly EstiloMarcaId[]) {
  return (ids ?? []).map((id) => MAPA_ESTILOS_MARCA[id] ?? id);
}

export function mapearTitulosPaginasExtras(ids?: readonly PaginaExtraId[]) {
  return (ids ?? []).map((id) => MAPA_PAGINAS_EXTRAS[id] ?? id);
}

export function mapearTitulosExtrasIntegracoes(ids?: readonly ExtraIntegracaoId[]) {
  return (ids ?? []).map((id) => MAPA_EXTRAS_INTEGRACOES[id] ?? id);
}

export function mapearTitulosExtrasEcommerce(ids?: readonly EcommerceExtraId[]) {
  return (ids ?? []).map((id) => MAPA_ECOMMERCE_EXTRAS[id] ?? id);
}

function obterOpcaoStatusLogo(id: StatusLogoId | '') {
  return STATUS_LOGO_OPCOES.find((opcao) => opcao.id === id);
}

function obterOpcaoPaginaExtra(id: PaginaExtraId) {
  return PAGINAS_EXTRAS_OPCOES.find((opcao) => opcao.id === id);
}

function obterOpcaoExtraIntegracao(id: ExtraIntegracaoId) {
  return EXTRAS_INTEGRACOES_OPCOES.find((opcao) => opcao.id === id);
}

function obterOpcaoExtraEcommerce(id: EcommerceExtraId) {
  return ECOMMERCE_EXTRAS_OPCOES.find((opcao) => opcao.id === id);
}

export function calcularValorProjeto({
  pacoteId,
  secoes = [],
  paginasExtras = [],
  extrasIntegracoes = [],
  ecommerceExtras = [],
  temHospedagemDominio = true,
  statusLogo = ''
}: SelecaoPrecoProjeto): number {
  const pacote = obterPacotePorId(pacoteId);
  if (!pacote) return 0;

  const valorSecoes = secoes.reduce((total, secao) => {
    const modelo = secao.modelo ? obterModeloSecaoConfig(secao.modelo) : null;
    const precoModelo = obterPrecoExibicao(modelo ?? undefined, pacote);
    const precoCategoria = PRECOS_SECOES[secao.categoria];
    return total + (modelo ? precoModelo : precoCategoria ?? 0);
  }, 0);

  const valorPaginasExtras = paginasExtras.reduce((total, pagina) => {
    return total + obterPrecoExibicao(obterOpcaoPaginaExtra(pagina), pacote);
  }, 0);

  const valorExtrasIntegracoes = extrasIntegracoes.reduce((total, extra) => {
    return total + obterPrecoExibicao(obterOpcaoExtraIntegracao(extra), pacote);
  }, 0);

  const valorEcommerceExtras = ecommerceExtras.reduce((total, extra) => {
    return total + obterPrecoExibicao(obterOpcaoExtraEcommerce(extra), pacote);
  }, 0);

  const valorHospedagemDominio = temHospedagemDominio ? 0 : PRECO_HOSPEDAGEM_DOMINIO;
  const valorLogo = obterPrecoExibicao(obterOpcaoStatusLogo(statusLogo), pacote);

  return pacote.precoBase + valorSecoes + valorPaginasExtras + valorExtrasIntegracoes + valorEcommerceExtras + valorHospedagemDominio + valorLogo;
}
