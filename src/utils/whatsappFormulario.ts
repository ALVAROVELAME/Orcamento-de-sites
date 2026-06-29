import { getWhatsappLink } from '../data/config';
import {
  mapearTitulosEstiloMarca,
  obterCategoriaSecaoConfig,
  obterMetaPreco,
  obterMetaPrecoSecaoModelo,
  obterModeloSecaoConfig,
  obterOpcaoExtraIntegracao,
  obterOpcaoPaginaExtra,
  obterOpcaoStatusLogo,
  PRECO_HOSPEDAGEM_DOMINIO,
  type InfoSite,
  type Pacote,
  type SecaoNoSite,
  type StatusLogoId
} from '../data/precos';
import { formatarMoedaBRL } from './formatadores';

interface ResumoFormularioWhatsapp {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote;
  site: SecaoNoSite[];
  valorTotal: number;
}

function criarLinhaLista(titulo: string, rotulo?: string | null) {
  return rotulo ? `- ${titulo} (${rotulo})` : `- ${titulo}`;
}

function formatarMetaPreco(rotulo?: { texto: string; precoOriginal?: string } | null) {
  if (!rotulo) return null;
  if (!rotulo.precoOriginal) return rotulo.texto;
  return `${rotulo.texto} | ~${rotulo.precoOriginal}~`;
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

  const opcao = obterOpcaoStatusLogo(status);
  if (!opcao) return `- ${status}`;

  return criarLinhaLista(opcao.titulo, formatarMetaPreco(obterMetaPreco(opcao)));
}

function formatarHospedagemDominio(temHospedagemDominio?: boolean) {
  if (temHospedagemDominio) return 'Ja tenho hospedagem e dominio';
  return `Incluir hospedagem e dominio (+ ${formatarMoedaBRL(PRECO_HOSPEDAGEM_DOMINIO)})`;
}

function formatarOpcoesComPreco<TId extends string>(
  ids: readonly TId[] | undefined,
  pacoteEscolhido: Pacote,
  fallback: string,
  obterOpcao: (id: TId) => { titulo: string; preco?: number; incluidoNosPacotes?: readonly Pacote['id'][] } | undefined
) {
  if (!ids || ids.length === 0) return [`- ${fallback}`];

  return ids.map((id) => {
    const opcao = obterOpcao(id);
    if (!opcao) return `- ${id}`;
    return criarLinhaLista(opcao.titulo, formatarMetaPreco(obterMetaPreco(opcao, pacoteEscolhido)));
  });
}

function formatarSecoes(site: SecaoNoSite[], pacoteEscolhido: Pacote) {
  if (site.length === 0) return ['- Nenhuma secao selecionada'];

  return site.map((secao, index) => {
    const categoria = obterCategoriaSecaoConfig(secao.categoria);
    const modelo = obterModeloSecaoConfig(secao.modelo);
    const titulo = `${index + 1}. ${categoria.nome} - ${modelo?.nome ?? secao.modelo}`;
    return criarLinhaLista(
      titulo,
      formatarMetaPreco(obterMetaPrecoSecaoModelo(secao.categoria, secao.modelo, pacoteEscolhido))
    );
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
      `- Preco base do pacote: ${formatarMoedaBRL(pacoteEscolhido.precoBase)}`,
      `- Total estimado do projeto: ${formatarMoedaBRL(valorTotal)}`
    ]),
    ...criarBloco('IDENTIDADE VISUAL', [
      `- Status do logo: ${formatarStatusLogo(infoSite.status_logo).replace(/^- /, '')}`,
      `- Hospedagem e dominio: ${formatarHospedagemDominio(infoSite.tem_hospedagem_dominio)}`,
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
      ...formatarOpcoesComPreco(infoSite.paginas_extras, pacoteEscolhido, 'Nenhuma selecionada', obterOpcaoPaginaExtra)
    ]),
    ...criarBloco('EXTRAS E INTEGRACOES', [
      `- Quantidade selecionada: ${(infoSite.extras_integracoes || []).length}`,
      ...formatarOpcoesComPreco(infoSite.extras_integracoes, pacoteEscolhido, 'Nenhuma selecionada', obterOpcaoExtraIntegracao)
    ])
  ];

  return linhas.join('\n').trim();
}

export function abrirWhatsAppFormulario(resumo: ResumoFormularioWhatsapp) {
  const mensagem = montarMensagemFormularioWhatsapp(resumo);
  const link = getWhatsappLink(mensagem);
  window.open(link, '_blank', 'noopener,noreferrer');
}
