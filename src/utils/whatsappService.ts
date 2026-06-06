// Serviço para integração com WhatsApp
import type { DadosPersonalizacao } from '../data/personalizacaoConfig';

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  tipoSite: string;
  descricao: string;
  orcamento: string;
}

const SEU_NUMERO_WHATSAPP = "5511999999999"; // ATUALIZE AQUI com seu número

export function gerarMensagemWhatsApp(dados: FormData): string {
  return `
*Novo Orçamento de Site* 📱

*Nome:* ${dados.nome}
*Email:* ${dados.email}
*WhatsApp:* ${dados.whatsapp}

*Tipo de Site:* ${dados.tipoSite}
*Descrição do Projeto:* ${dados.descricao}
*Orçamento Aproximado:* ${dados.orcamento}

Enviado via Formulário de Orçamento
  `.trim();
}

export function gerarMensagemPersonalizacao(
  dados: DadosPersonalizacao,
  pacoteNome = '',
  secoesNomes: string[] = []
): string {
  const secoesTexto = secoesNomes.length
    ? secoesNomes.map(secao => `- ${secao}`).join('\n')
    : dados.secoes.map(secao => `- ${secao}`).join('\n');

  return `
*Nova Personalização de Site* 🎨

*Pacote:* ${pacoteNome || 'Não informado'}
*Empresa:* ${dados.nomeEmpresa}
*Descrição:* ${dados.descricaoEmpresa}

*Seções do Site (${secoesNomes.length || dados.secoes.length}):*
${secoesTexto}

*Cor Principal:* ${dados.corPrincipal}
*Observações:* ${dados.observacoes || 'Nenhuma'}
*Telefone/WhatsApp:* ${dados.telefonePrincipal}
*Email:* ${dados.emailPrincipal}

Enviado via Formulário de Personalização
  `.trim();
}

export function gerarLinkWhatsApp(dados: FormData): string {
  const mensagem = gerarMensagemWhatsApp(dados);
  const mensagemCodificada = encodeURIComponent(mensagem);
  return `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
}

export function getWhatsappLink(message: string = ""): string {
  const mensagemCodificada = encodeURIComponent(message);
  return `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
}
