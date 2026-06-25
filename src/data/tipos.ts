import type { CategoriaConstruida } from './construtoresSecoes';

export type PacoteId = 'cartao_3' | 'cartao_6' | 'institucional' | 'loja_pequena';

export type CategoriaSecao =
  | 'capa'
  | 'sobre'
  | 'servicos'
  | 'cardapio_produtos'
  | 'depoimentos'
  | 'faq'
  | 'blog'
  | 'formulario'
  | 'video'
  | 'galeria';

export type CategoriaSecaoPreco = CategoriaSecao;
export type TipoPreviewSecao = 'componente' | 'imagem' | 'texto';

export type ModeloSecaoId =
  | 'CapaModel1'
  | 'CapaModel2'
  | 'CapaModel3'
  | 'SobreModel1'
  | 'SobreModel2'
  | 'SobreModel3'
  | 'ServicosModel1'
  | 'ServicosModel2'
  | 'ServicosModel3'
  | 'CardapioModel1'
  | 'CardapioModel2'
  | 'CardapioModel3'
  | 'DepCarrossel'
  | 'DepGoogle'
  | 'DepTradicional'
  | 'FaqModel1'
  | 'FaqModel2'
  | 'FaqModel3'
  | 'BlogModel1'
  | 'BlogModel2'
  | 'BlogModel3'
  | 'FormularioModel1'
  | 'FormularioModel2'
  | 'FormularioModel3'
  | 'VideoModel1'
  | 'VideoModel2'
  | 'VideoModel3'
  | 'GaleriaModel1'
  | 'GaleriaModel2'
  | 'GaleriaModel3';

export type StatusLogoId = 'logo_pronto' | 'logo_imagem' | 'logo_criacao';
export type EstiloMarcaId = 'moderna' | 'classica_seria' | 'divertida' | 'luxuosa' | 'minimalista';
export type PaginaExtraId = 'sobre_nos' | 'privacidade' | 'termos_uso' | 'contato' | 'faq' | 'erro_404';
export type ExtraIntegracaoId = 'whatsapp' | 'analytics' | 'agendamento' | 'seo_essencial' | 'mapa';
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
  descricao?: string;
  thumb: string;
  tipoPreview?: TipoPreviewSecao;
  previewImagemSrc?: string;
  previewImagemAlt?: string;
}

export type CategoriaSecaoConfig = CategoriaConstruida<CategoriaSecao, ModeloSecaoId, PacoteId>;
