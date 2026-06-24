import { getWhatsappLink } from '../data/config';
import {
  ECOMMERCE_EXTRAS_OPCOES,
  EXTRAS_INTEGRACOES_OPCOES,
  PAGINAS_EXTRAS_OPCOES,
  STATUS_LOGO_OPCOES,
  mapearTitulosEstiloMarca,
  obterCategoriaSecaoConfig,
  obterModeloSecaoConfig,
  obterRotuloPreco,
  type EcommerceExtraId,
  type ExtraIntegracaoId,
  type InfoSite,
  type Pacote,
  type PaginaExtraId,
  type SecaoNoSite,
  type StatusLogoId
} from '../data/precos';

interface ResumoFormularioWhatsapp {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote;
  site: SecaoNoSite[];
  valorTotal: number;
}

const formatarMoeda = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatarSimNao = (valor?: boolean) => (valor ? 'Sim' : 'Nao');

function criarLinhaLista(titulo: string, rotulo?: string | null) {
  return rotulo ? `- ${titulo} (${rotulo})` : `- ${titulo}`;
}

function criarBloco(titulo: string, linhas: string[]) {
  return [`*${titulo}*`, ...linhas, ''];
}

function formatarListaSimples(itens?: string[], fallback = 'Nenhum selecionado') {
  if (!itens || itens.length === 0) return [`- ${fallback}`];
  return itens.map((item) => `- ${item}`);
}

function formatarStatusLogo(status?: StatusLogoId | '') {
  if (!status) return '- Nao informado';

  const opcao = STATUS_LOGO_OPCOES.find((item) => item.id === status);
  if (!opcao) return `- ${status}`;

  return criarLinhaLista(opcao.titulo, obterRotuloPreco(opcao));
}

function formatarPaginasExtras(ids: readonly PaginaExtraId[] | undefined, pacoteEscolhido: Pacote) {
  if (!ids || ids.length === 0) return ['- Nenhuma selecionada'];

  return ids.map((id) => {
    const opcao = PAGINAS_EXTRAS_OPCOES.find((item) => item.id === id);
    if (!opcao) return `- ${id}`;
    return criarLinhaLista(opcao.titulo, obterRotuloPreco(opcao, pacoteEscolhido));
  });
}

function formatarExtrasIntegracoes(ids: readonly ExtraIntegracaoId[] | undefined, pacoteEscolhido: Pacote) {
  if (!ids || ids.length === 0) return ['- Nenhuma selecionada'];

  return ids.map((id) => {
    const opcao = EXTRAS_INTEGRACOES_OPCOES.find((item) => item.id === id);
    if (!opcao) return `- ${id}`;
    return criarLinhaLista(opcao.titulo, obterRotuloPreco(opcao, pacoteEscolhido));
  });
}

function formatarExtrasEcommerce(ids: readonly EcommerceExtraId[] | undefined, pacoteEscolhido: Pacote) {
  if (!ids || ids.length === 0) return ['- Nenhum selecionado'];

  return ids.map((id) => {
    const opcao = ECOMMERCE_EXTRAS_OPCOES.find((item) => item.id === id);
    if (!opcao) return `- ${id}`;
    return criarLinhaLista(opcao.titulo, obterRotuloPreco(opcao, pacoteEscolhido));
  });
}

function formatarSecoes(site: SecaoNoSite[], pacoteEscolhido: Pacote) {
  if (site.length === 0) return ['- Nenhuma secao selecionada'];

  return site.map((secao, index) => {
    const categoria = obterCategoriaSecaoConfig(secao.categoria);
    const modelo = obterModeloSecaoConfig(secao.modelo);
    const titulo = `${index + 1}. ${categoria.nome} - ${modelo?.nome ?? secao.modelo}`;
    return criarLinhaLista(titulo, obterRotuloPreco(modelo ?? undefined, pacoteEscolhido));
  });
}

export function montarMensagemFormularioWhatsapp({
  infoSite,
  pacoteEscolhido,
  site,
  valorTotal
}: ResumoFormularioWhatsapp) {
  const estilosMarca = mapearTitulosEstiloMarca(infoSite.estilo_marca);

  const linhas = [
    '*NOVO PEDIDO DE ORCAMENTO*',
    '',
    ...criarBloco('RESUMO DO PROJETO', [
      `- Projeto: ${infoSite.nome || 'Nao informado'}`,
      `- Pacote escolhido: ${pacoteEscolhido.nome}`,
      `- Descricao do pacote: ${pacoteEscolhido.descricao}`,
      `- Preco base do pacote: ${formatarMoeda(pacoteEscolhido.precoBase)}`,
      `- Total estimado do projeto: ${formatarMoeda(valorTotal)}`
    ]),
    ...criarBloco('IDENTIDADE VISUAL', [
      `- Status do logo: ${formatarStatusLogo(infoSite.status_logo).replace(/^- /, '')}`,
      `- Hospedagem e dominio: ${formatarSimNao(infoSite.tem_hospedagem_dominio)}`,
      // Paleta de cores desativada temporariamente.
      // `- Cores escolhidas: ${formatarCores(infoSite.cores)}`,
      `- Quantidade de estilos de marca: ${estilosMarca.length}`
    ]),
    ...criarBloco('ESTILO DA MARCA', formatarListaSimples(estilosMarca, 'Nenhum estilo informado')),
    ...criarBloco('SECOES DO SITE', [
      `- Quantidade de secoes escolhidas: ${site.length}`,
      ...formatarSecoes(site, pacoteEscolhido)
    ]),
    ...criarBloco('PAGINAS EXTRAS', [
      `- Quantidade selecionada: ${(infoSite.paginas_extras || []).length}`,
      ...formatarPaginasExtras(infoSite.paginas_extras, pacoteEscolhido)
    ]),
    ...criarBloco('EXTRAS E INTEGRACOES', [
      `- Quantidade selecionada: ${(infoSite.extras_integracoes || []).length}`,
      ...formatarExtrasIntegracoes(infoSite.extras_integracoes, pacoteEscolhido)
    ]),
    ...criarBloco('EXTRAS DE E-COMMERCE', [
      `- Quantidade selecionada: ${(infoSite.ecommerce_extras || []).length}`,
      ...formatarExtrasEcommerce(infoSite.ecommerce_extras, pacoteEscolhido)
    ])
  ];

  return linhas.join('\n').trim();
}

export function abrirWhatsAppFormulario(resumo: ResumoFormularioWhatsapp) {
  const mensagem = montarMensagemFormularioWhatsapp(resumo);
  const link = getWhatsappLink(mensagem);
  window.open(link, '_blank', 'noopener,noreferrer');
}
