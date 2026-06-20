import { getWhatsappLink } from '../data/config';
import {
  mapearTitulosEstiloMarca,
  mapearTitulosExtrasEcommerce,
  mapearTitulosExtrasIntegracoes,
  mapearTitulosPaginasExtras,
  obterCategoriaSecaoConfig,
  obterModeloSecaoConfig,
  obterTituloStatusLogo,
  type InfoSite,
  type Pacote,
  type SecaoNoSite
} from '../data/precos';

interface ResumoFormularioWhatsapp {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote;
  site: SecaoNoSite[];
  valorTotal: number;
}

const formatarMoeda = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatarSimNao = (valor?: boolean) => (valor ? 'Sim' : 'Nao');

const formatarArray = (itens?: string[]) => {
  if (!itens || itens.length === 0) return 'Nao informado';
  return itens.join(', ');
};

export function montarMensagemFormularioWhatsapp({
  infoSite,
  pacoteEscolhido,
  site,
  valorTotal
}: ResumoFormularioWhatsapp) {
  const secoes =
    site.length > 0
      ? site
          .map((secao, index) => {
            const categoria = obterCategoriaSecaoConfig(secao.categoria);
            const modelo = obterModeloSecaoConfig(secao.modelo);
            return `${index + 1}. ${categoria.nome} - ${modelo?.nome ?? secao.modelo}`;
          })
          .join('\n')
      : 'Nenhuma secao selecionada';

  return [
    'Novo pedido de orcamento',
    '',
    `Projeto: ${infoSite.nome || 'Nao informado'}`,
    `Pacote: ${pacoteEscolhido.nome}`,
    `Total estimado: ${formatarMoeda(valorTotal)}`,
    `Logo: ${obterTituloStatusLogo(infoSite.status_logo)}`,
    `Hospedagem e dominio: ${formatarSimNao(infoSite.tem_hospedagem_dominio)}`,
    `Cores: ${(infoSite.cores || []).join(' | ')}`,
    `Estilo da marca: ${formatarArray(mapearTitulosEstiloMarca(infoSite.estilo_marca))}`,
    `Paginas extras: ${formatarArray(mapearTitulosPaginasExtras(infoSite.paginas_extras))}`,
    `Integracoes extras: ${formatarArray(mapearTitulosExtrasIntegracoes(infoSite.extras_integracoes))}`,
    `Extras e-commerce: ${formatarArray(mapearTitulosExtrasEcommerce(infoSite.ecommerce_extras))}`,
    '',
    'Secoes selecionadas:',
    secoes
  ].join('\n');
}

export function abrirWhatsAppFormulario(resumo: ResumoFormularioWhatsapp) {
  const mensagem = montarMensagemFormularioWhatsapp(resumo);
  const link = getWhatsappLink(mensagem);
  window.open(link, '_blank', 'noopener,noreferrer');
}
