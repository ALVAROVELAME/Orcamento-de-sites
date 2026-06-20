import { getWhatsappLink } from '../data/config';
import type { Pacote } from '../data/precos';
import type { InfoSite, SecaoNoSite } from '../components/Formulario';

interface ResumoFormularioWhatsapp {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote;
  site: SecaoNoSite[];
  valorTotal: number;
}

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

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
  const secoes = site.length > 0
    ? site.map((secao, index) => `${index + 1}. ${secao.categoria} - ${secao.modelo}`).join('\n')
    : 'Nenhuma secao selecionada';

  return [
    'Novo pedido de orcamento',
    '',
    `Projeto: ${infoSite.nome || 'Nao informado'}`,
    `Pacote: ${pacoteEscolhido.nome}`,
    `Total estimado: ${formatarMoeda(valorTotal)}`,
    `Logo: ${infoSite.status_logo || 'Nao informado'}`,
    `Hospedagem e dominio: ${formatarSimNao(infoSite.tem_hospedagem_dominio)}`,
    `Cores: ${(infoSite.cores || []).join(' | ')}`,
    `Estilo da marca: ${formatarArray(infoSite.estilo_marca)}`,
    `Paginas extras: ${formatarArray(infoSite.paginas_extras)}`,
    `Integracoes extras: ${formatarArray(infoSite.extras_integracoes)}`,
    `Extras e-commerce: ${formatarArray(infoSite.ecommerce_extras)}`,
    '',
    'Secoes selecionadas:',
    secoes,
  ].join('\n');
}

export function abrirWhatsAppFormulario(resumo: ResumoFormularioWhatsapp) {
  const mensagem = montarMensagemFormularioWhatsapp(resumo);
  const link = getWhatsappLink(mensagem);
  window.open(link, '_blank', 'noopener,noreferrer');
}
