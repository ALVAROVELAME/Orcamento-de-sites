// Configuração do formulário
export const NUMERO_WHATSAPP = "5511999999999"; // ATUALIZE COM SEU NÚMERO

export const TIPOS_SITE = [
  { id: 'ecommerce', label: 'E-commerce / Loja Online' },
  { id: 'blog', label: 'Blog / Notícias' },
  { id: 'portfolio', label: 'Portfólio / Trabalhos' },
  { id: 'empresarial', label: 'Site Empresarial' },
  { id: 'landing', label: 'Landing Page' },
  { id: 'outro', label: 'Outro' }
];

export const OPCOES_ORCAMENTO = [
  { id: 'ate-500', label: 'Até R$ 500' },
  { id: '500-1000', label: 'R$ 500 - R$ 1.000' },
  { id: '1000-3000', label: 'R$ 1.000 - R$ 3.000' },
  { id: '3000-5000', label: 'R$ 3.000 - R$ 5.000' },
  { id: 'acima-5000', label: 'Acima de R$ 5.000' }
];

export function getWhatsappLink(message: string = ""): string {
  const mensagemCodificada = encodeURIComponent(message);
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
}
