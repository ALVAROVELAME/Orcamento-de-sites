import {
  ConstrutorSecoes,
  criarGrupoCategorias,
  criarGrupoModelos,
  criarGrupoOpcoes,
  criarGrupoRelacao,
} from './construtoresSecoes';
import {
  CATALOGO_PACOTES_BASE,
  CATALOGO_RELACAO_CATEGORIAS,
  CATALOGO_TEXTOS_CATEGORIAS,
  CATALOGO_TEXTOS_MODELOS,
  ESTILOS_MARCA_TEXTOS,
  EXTRAS_INTEGRACOES_TEXTOS,
  PAGINAS_EXTRAS_TEXTOS,
  STATUS_LOGO_TEXTOS
} from './configuracaoCatalogos';
import { CATALOGO_VISUAL_MODELOS } from './configuracaoVisualSecoes';
import { formatarMoedaBRL } from '../utils/formatadores';
import type {
  CategoriaSecao,
  CategoriaSecaoConfig,
  EcommerceExtraId,
  EstiloMarcaId,
  ExtraIntegracaoId,
  ModeloSecaoId,
  OpcaoFormulario,
  Pacote,
  PacoteId,
  PaginaExtraId,
  Precificavel,
  SelecaoPrecoProjeto,
  StatusLogoId
} from './tipos';

export type {
  CategoriaSecao,
  CategoriaSecaoConfig,
  CategoriaSecaoPreco,
  EcommerceExtraId,
  EstiloMarcaId,
  ExtraIntegracaoId,
  FluxoPacote,
  InfoSite,
  ModeloSecaoId,
  ModeloSecaoPreview,
  OpcaoFormulario,
  Pacote,
  PacoteId,
  PaginaExtraId,
  Precificavel,
  SecaoNoSite,
  SelecaoPrecoProjeto,
  StatusLogoId,
  TipoPreviewSecao
} from './tipos';

export interface MetaPrecoExibicao {
  texto: string;
  precoOriginal?: string;
}

const PRECOS_PACOTES_ATIVOS_BASE: Record<Exclude<PacoteId, 'loja_pequena'>, number> = {
  cartao_3: 200,
  cartao_6: 400,
  institucional: 700
};

// FUTURO: dados de e-commerce/loja pequena mantidos para atualizacao posterior.
const PRECOS_PACOTES_FUTUROS_BASE: Record<Extract<PacoteId, 'loja_pequena'>, number> = {
  loja_pequena: 4000
};

const PRECOS_PACOTES_BASE: Record<PacoteId, number> = {
  ...PRECOS_PACOTES_ATIVOS_BASE,
  ...PRECOS_PACOTES_FUTUROS_BASE
};

const STATUS_LOGO_PRECOS = [
  { id: 'logo_pronto', preco: 0 },
  { id: 'logo_imagem', preco: 0 },
  { id: 'logo_criacao', preco: 20, destaque: true }
] as const;

const ESTILOS_MARCA_PRECOS = [
  { id: 'moderna' },
  { id: 'classica_seria' },
  { id: 'divertida' },
  { id: 'luxuosa' },
  { id: 'minimalista' }
] as const;

const PAGINAS_EXTRAS_PRECOS = [
  { id: 'sobre_nos', preco: 150, incluidoNosPacotes: ['institucional', 'loja_pequena'] },
  { id: 'privacidade', preco: 100, incluidoNosPacotes: ['cartao_3', 'cartao_6', 'institucional', 'loja_pequena'] },
  // { id: 'termos_uso', preco: 100 }, // FUTURO: opcao guardada para reativacao posterior.
  { id: 'contato', preco: 170, incluidoNosPacotes: ['institucional', 'loja_pequena'] },
  { id: 'faq', preco: 150 },
  { id: 'erro_404', preco: 80 }
] as const;

const EXTRAS_INTEGRACOES_PRECOS = [
  { id: 'whatsapp', preco: 40, incluidoNosPacotes: ['cartao_3', 'institucional'] },
  { id: 'analytics', preco: 90 },
  { id: 'agendamento', preco: 150 },
  { id: 'seo_essencial', preco: 180 },
  { id: 'mapa', preco: 30, incluidoNosPacotes: ['cartao_6'] }
] as const;

// FUTURO: dados de e-commerce/loja pequena mantidos para atualizacao posterior.
const ECOMMERCE_EXTRAS_PRECOS = [
  { id: 'pagamentos', preco: 600, incluidoNosPacotes: ['loja_pequena'] },
  { id: 'frete', preco: 400 },
  { id: 'catalogo', preco: 700, incluidoNosPacotes: ['loja_pequena'] },
  { id: 'carrinho', preco: 350, incluidoNosPacotes: ['loja_pequena'] }
] as const;

const PRECOS_CATEGORIAS_SECOES = [
  { id: 'capa', precoBase: 0 },
  { id: 'cardapio_produtos', precoBase: 0},
  { id: 'sobre', precoBase: 0 },
  { id: 'servicos', precoBase: 0},
  { id: 'depoimentos', precoBase: 0 },
  { id: 'faq', precoBase: 0 },
  { id: 'blog', precoBase: 0 },
  { id: 'formulario', precoBase: 0},
  { id: 'video', precoBase: 0},
  { id: 'galeria', precoBase: 0 }
] as const;

const PRECOS_MODELOS_SECOES_ENTRADAS = [
  { id: 'CapaModel1', valor: 0, incluidoNosPacotes: ['cartao_3', 'cartao_6', 'institucional', 'loja_pequena'] },
  { id: 'CapaModel2', valor: 30 },
  { id: 'CapaModel3', valor: 60 },
  { id: 'SobreModel1', valor: 0 },
  { id: 'SobreModel2', valor: 30 },
  { id: 'SobreModel3', valor: 60 },
  { id: 'ServicosModel1', valor: 0 },
  { id: 'ServicosModel2', valor: 30 },
  { id: 'ServicosModel3', valor: 60 },
  { id: 'CardapioModel1', valor: 10 },
  { id: 'CardapioModel2', valor: 50 },
  { id: 'CardapioModel3', valor: 90 },
  { id: 'DepCarrossel', valor: 0, incluidoNosPacotes: ['cartao_6', 'institucional'] },
  { id: 'DepGoogle', valor: 30, incluidoNosPacotes: ['cartao_6', 'institucional'] },
  { id: 'DepTradicional', valor: 60},
  { id: 'FaqModel1', valor: 0 },
  { id: 'FaqModel2', valor: 30 },
  { id: 'FaqModel3', valor: 60 },
  { id: 'BlogModel1', valor: 30 },
  { id: 'BlogModel2', valor: 70 },
  { id: 'BlogModel3', valor: 120 },
  { id: 'FormularioModel1', valor: 10, incluidoNosPacotes: ['institucional'] },
  { id: 'FormularioModel2', valor: 50 },
  { id: 'FormularioModel3', valor: 90 },
  { id: 'VideoModel1', valor: 10 },
  { id: 'VideoModel2', valor: 40 },
  { id: 'VideoModel3', valor: 80 },
  { id: 'GaleriaModel1', valor: 10 },
  { id: 'GaleriaModel2', valor: 40 },
  { id: 'GaleriaModel3', valor: 80 }
] as const;

function criarMapaPorId<TId extends string, TEntrada extends { id: TId }, TValor>(
  entradas: readonly TEntrada[],
  selecionarValor: (entrada: TEntrada) => TValor
) {
  return entradas.reduce<Record<TId, TValor>>((acc, entrada) => {
    acc[entrada.id] = selecionarValor(entrada);
    return acc;
  }, {} as Record<TId, TValor>);
}

function criarIndicePorId<TId extends string, TEntrada extends { id: TId }>(entradas: readonly TEntrada[]) {
  return criarMapaPorId(entradas, (entrada) => entrada);
}

const STATUS_LOGO_CATALOGO = criarGrupoOpcoes<StatusLogoId, PacoteId>()
  .textos(STATUS_LOGO_TEXTOS)
  .precos([...STATUS_LOGO_PRECOS]);

const ESTILOS_MARCA_CATALOGO = criarGrupoOpcoes<EstiloMarcaId, PacoteId>()
  .textos(ESTILOS_MARCA_TEXTOS)
  .precos([...ESTILOS_MARCA_PRECOS]);

const PAGINAS_EXTRAS_CATALOGO = criarGrupoOpcoes<PaginaExtraId, PacoteId>()
  .textos(PAGINAS_EXTRAS_TEXTOS)
  .precos([...PAGINAS_EXTRAS_PRECOS]);

const EXTRAS_INTEGRACOES_CATALOGO = criarGrupoOpcoes<ExtraIntegracaoId, PacoteId>()
  .textos(EXTRAS_INTEGRACOES_TEXTOS)
  .precos([...EXTRAS_INTEGRACOES_PRECOS]);

/*
const ECOMMERCE_EXTRAS_CATALOGO = criarGrupoOpcoes<EcommerceExtraId, PacoteId>()
  .textos(ECOMMERCE_EXTRAS_TEXTOS)
  .precos([...ECOMMERCE_EXTRAS_PRECOS]);
*/

const CATEGORIAS_SECOES_CATALOGO = criarGrupoCategorias<CategoriaSecao>()
  .textos(CATALOGO_TEXTOS_CATEGORIAS)
  .precos([...PRECOS_CATEGORIAS_SECOES]);

const MODELOS_SECOES_CATALOGO = criarGrupoModelos<ModeloSecaoId, PacoteId>()
  .textos(CATALOGO_TEXTOS_MODELOS)
  .precos([...PRECOS_MODELOS_SECOES_ENTRADAS])
  .visual(CATALOGO_VISUAL_MODELOS);

const RELACAO_SECOES_CATALOGO = criarGrupoRelacao<CategoriaSecao, ModeloSecaoId>()
  .relacao(CATALOGO_RELACAO_CATEGORIAS);

export const CATALOGO_SECOES: Record<CategoriaSecao, CategoriaSecaoConfig> =
  new ConstrutorSecoes<CategoriaSecao, ModeloSecaoId, PacoteId>({
    categorias: CATEGORIAS_SECOES_CATALOGO,
    modelos: MODELOS_SECOES_CATALOGO,
    relacao: RELACAO_SECOES_CATALOGO
  }).construir();

export const LISTA_CATEGORIAS_SECOES = Object.keys(CATALOGO_SECOES) as CategoriaSecao[];

export const STATUS_LOGO_OPCOES = STATUS_LOGO_CATALOGO.construir() satisfies readonly OpcaoFormulario[];
export const ESTILOS_MARCA_OPCOES = ESTILOS_MARCA_CATALOGO.construir() satisfies readonly OpcaoFormulario[];
export const PAGINAS_EXTRAS_OPCOES = PAGINAS_EXTRAS_CATALOGO.construir() satisfies readonly OpcaoFormulario[];
export const EXTRAS_INTEGRACOES_OPCOES = EXTRAS_INTEGRACOES_CATALOGO.construir() satisfies readonly OpcaoFormulario[];
export const ECOMMERCE_EXTRAS_OPCOES = [] as readonly OpcaoFormulario[];

const CATALOGO_PACOTES = criarMapaPorId(
  Object.values(CATALOGO_PACOTES_BASE),
  (pacoteBase) => ({
    ...pacoteBase,
    precoBase: PRECOS_PACOTES_BASE[pacoteBase.id]
  }) satisfies Pacote
);

export const CATALOGO_PRECOS = {
  pacotes: CATALOGO_PACOTES,
  secoes: criarMapaPorId(PRECOS_CATEGORIAS_SECOES, (entrada) => entrada.precoBase),
  paginasExtras: criarMapaPorId(PAGINAS_EXTRAS_PRECOS, (entrada) => entrada.preco),
  extrasIntegracoes: criarMapaPorId(EXTRAS_INTEGRACOES_PRECOS, (entrada) => entrada.preco),
  ecommerceExtras: criarMapaPorId(ECOMMERCE_EXTRAS_PRECOS, (entrada) => entrada.preco),
  modelosSecoes: criarMapaPorId(PRECOS_MODELOS_SECOES_ENTRADAS, (entrada) => entrada.valor),
  adicionais: {
    secaoExtra: 50,
    hospedagemDominio: 180
  }
} as const;

export const PACOTES: Pacote[] = Object.values(CATALOGO_PRECOS.pacotes).map((pacote) => ({
  ...pacote
})).filter((pacote) => pacote.id !== 'loja_pequena');

export const PRECO_SECAO_ADICIONAL = CATALOGO_PRECOS.adicionais.secaoExtra;
export const PRECOS_SECOES = CATALOGO_PRECOS.secoes;
export const PRECOS_MODELOS_SECOES = CATALOGO_PRECOS.modelosSecoes;
export const PRECOS_PAGINAS_EXTRAS = CATALOGO_PRECOS.paginasExtras;
export const PRECOS_EXTRAS_INTEGRACOES = CATALOGO_PRECOS.extrasIntegracoes;
export const PRECOS_ECOMMERCE_EXTRAS = CATALOGO_PRECOS.ecommerceExtras;
export const PRECO_HOSPEDAGEM_DOMINIO = CATALOGO_PRECOS.adicionais.hospedagemDominio;

const MODELOS_SECOES_POR_ID = criarIndicePorId(
  LISTA_CATEGORIAS_SECOES.flatMap((categoria) => CATALOGO_SECOES[categoria].modelos)
);
const STATUS_LOGO_POR_ID = criarIndicePorId(STATUS_LOGO_OPCOES);
const PAGINAS_EXTRAS_POR_ID = criarIndicePorId(PAGINAS_EXTRAS_OPCOES);
const EXTRAS_INTEGRACOES_POR_ID = criarIndicePorId(EXTRAS_INTEGRACOES_OPCOES);

export function obterPacotePorId(pacoteId: PacoteId | string) {
  const pacote = CATALOGO_PRECOS.pacotes[pacoteId as keyof typeof CATALOGO_PRECOS.pacotes] ?? null;
  if (!pacote || pacote.id === 'loja_pequena') return null;
  return pacote;
}

export function obterCategoriaSecaoConfig(categoria: CategoriaSecao) {
  return CATALOGO_SECOES[categoria];
}

export function obterModeloSecaoConfig(modeloId: ModeloSecaoId) {
  return MODELOS_SECOES_POR_ID[modeloId] ?? null;
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

export function obterPrecoSecaoSelecionada(
  categoria: CategoriaSecao,
  modeloId?: ModeloSecaoId,
  pacote?: Pacote | null
) {
  const precoCategoria = PRECOS_SECOES[categoria] ?? 0;

  if (!modeloId) {
    return precoCategoria;
  }

  const modelo = obterModeloSecaoConfig(modeloId);
  if (itemEstaIncluidoNoPacote(modelo ?? undefined, pacote)) return 0;

  return precoCategoria + obterPrecoExibicao(modelo ?? undefined, pacote);
}

function obterPrecoOriginalRiscado(item: Precificavel | undefined) {
  if (!item || typeof item.preco !== 'number' || item.preco <= 0) return undefined;
  return formatarMoedaBRL(item.preco);
}

export function obterRotuloPreco(item: Precificavel | undefined, pacote?: Pacote | null) {
  if (itemEstaIncluidoNoPacote(item, pacote)) return 'Incluido no pacote';
  if (!item || typeof item.preco !== 'number') return null;
  if (item.preco === 0) return 'Sem custos';
  if (item.preco < 0) return null;
  return `+ ${formatarMoedaBRL(item.preco)}`;
}

export function obterRotuloPrecoSecaoModelo(
  categoria: CategoriaSecao,
  modeloId: ModeloSecaoId,
  pacote?: Pacote | null
) {
  const modelo = obterModeloSecaoConfig(modeloId);
  if (itemEstaIncluidoNoPacote(modelo ?? undefined, pacote)) return 'Incluido no pacote';

  const preco = obterPrecoSecaoSelecionada(categoria, modeloId, pacote);
  if (preco === 0) return 'Sem custos';
  if (preco < 0) return null;
  return `+ ${formatarMoedaBRL(preco)}`;
}

export function obterMetaPreco(item: Precificavel | undefined, pacote?: Pacote | null): MetaPrecoExibicao | null {
  const texto = obterRotuloPreco(item, pacote);
  if (!texto) return null;

  return {
    texto,
    precoOriginal: itemEstaIncluidoNoPacote(item, pacote) ? obterPrecoOriginalRiscado(item) : undefined
  };
}

export function obterMetaPrecoSecaoModelo(
  categoria: CategoriaSecao,
  modeloId: ModeloSecaoId,
  pacote?: Pacote | null
): MetaPrecoExibicao | null {
  const texto = obterRotuloPrecoSecaoModelo(categoria, modeloId, pacote);
  const modelo = obterModeloSecaoConfig(modeloId);
  if (!texto || !modelo) return null;

  const precoOriginal = itemEstaIncluidoNoPacote(modelo, pacote)
    ? formatarMoedaBRL((PRECOS_SECOES[categoria] ?? 0) + (modelo.preco ?? 0))
    : undefined;

  return {
    texto,
    precoOriginal
  };
}

export function obterRotuloFaixaPrecoCategoria(categoria: CategoriaSecao, pacote?: Pacote | null) {
  const categoriaConfig = obterCategoriaSecaoConfig(categoria);
  if (categoriaConfig.modelos.length === 0) return null;

  if (pacote && categoriaConfig.modelos.every((modelo) => itemEstaIncluidoNoPacote(modelo, pacote))) {
    return 'Incluido no pacote';
  }

  const precos = categoriaConfig.modelos.map((modelo) => obterPrecoSecaoSelecionada(categoria, modelo.id, pacote));
  const menorPreco = Math.min(...precos);
  const maiorPreco = Math.max(...precos);

  if (maiorPreco === 0) return 'Sem custos';

  if (categoriaConfig.modelos.length === 1 || menorPreco === maiorPreco) {
    return `A partir de ${formatarMoedaBRL(menorPreco)}`;
  }

  return `A partir de ${formatarMoedaBRL(menorPreco)} ate ${formatarMoedaBRL(maiorPreco)}`;
}

export function obterMetaFaixaPrecoCategoria(categoria: CategoriaSecao, pacote?: Pacote | null): MetaPrecoExibicao | null {
  const texto = obterRotuloFaixaPrecoCategoria(categoria, pacote);
  if (!texto) return null;

  const categoriaConfig = obterCategoriaSecaoConfig(categoria);
  const todosIncluidos = pacote && categoriaConfig.modelos.every((modelo) => itemEstaIncluidoNoPacote(modelo, pacote));

  if (!todosIncluidos) {
    return { texto };
  }

  const precosOriginais = categoriaConfig.modelos
    .map((modelo) => modelo.preco)
    .filter((preco): preco is number => typeof preco === 'number' && preco > 0);

  if (precosOriginais.length === 0) {
    return { texto };
  }

  const menorPreco = Math.min(...precosOriginais);
  const maiorPreco = Math.max(...precosOriginais);
  const precoOriginal =
    menorPreco === maiorPreco ? formatarMoedaBRL(menorPreco) : `${formatarMoedaBRL(menorPreco)} - ${formatarMoedaBRL(maiorPreco)}`;

  return {
    texto,
    precoOriginal
  };
}

function criarMapaTitulos<T extends { id: string; titulo: string }>(opcoes: readonly T[]) {
  return criarMapaPorId(opcoes, (opcao) => opcao.titulo);
}

const MAPA_STATUS_LOGO = criarMapaTitulos(STATUS_LOGO_OPCOES);
const MAPA_ESTILOS_MARCA = criarMapaTitulos(ESTILOS_MARCA_OPCOES);
const MAPA_PAGINAS_EXTRAS = criarMapaTitulos(PAGINAS_EXTRAS_OPCOES);
const MAPA_EXTRAS_INTEGRACOES = criarMapaTitulos(EXTRAS_INTEGRACOES_OPCOES);

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
  // Loja virtual desativada temporariamente.
  void ids;
  return [];
}

export function obterOpcaoStatusLogo(id: StatusLogoId | '') {
  if (!id) return undefined;
  return STATUS_LOGO_POR_ID[id];
}

export function obterOpcaoPaginaExtra(id: PaginaExtraId) {
  return PAGINAS_EXTRAS_POR_ID[id];
}

export function obterOpcaoExtraIntegracao(id: ExtraIntegracaoId) {
  return EXTRAS_INTEGRACOES_POR_ID[id];
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
    return total + obterPrecoSecaoSelecionada(secao.categoria, secao.modelo, pacote);
  }, 0);

  const valorPaginasExtras = paginasExtras.reduce((total, pagina) => {
    return total + obterPrecoExibicao(obterOpcaoPaginaExtra(pagina), pacote);
  }, 0);

  const valorExtrasIntegracoes = extrasIntegracoes.reduce((total, extra) => {
    return total + obterPrecoExibicao(obterOpcaoExtraIntegracao(extra), pacote);
  }, 0);

  void ecommerceExtras;
  const valorEcommerceExtras = 0;
  /*
  const valorEcommerceExtras = ecommerceExtras.reduce((total, extra) => {
    return total + obterPrecoExibicao(obterOpcaoExtraEcommerce(extra), pacote);
  }, 0);
  */

  const valorHospedagemDominio = temHospedagemDominio ? 0 : PRECO_HOSPEDAGEM_DOMINIO;
  const valorLogo = obterPrecoExibicao(obterOpcaoStatusLogo(statusLogo), pacote);

  return pacote.precoBase + valorSecoes + valorPaginasExtras + valorExtrasIntegracoes + valorEcommerceExtras + valorHospedagemDominio + valorLogo;
}
