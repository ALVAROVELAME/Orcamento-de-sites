export const SITE_CONFIG = {
  contact: {
    // Número bruto apenas com números para o link do WhatsApp (com o 9 extra incluído)
    phoneRaw: "557599331557",
    // Número formatado para exibição visual nas telas
    phoneFormatted: "(75) 9933-1557",
    email: "contato@seusitecontabilidade.com.br",
    address: "📍 Atendimento Digital e Presencial"
  },
  developer: {
    name: "Álvaro Velame",
    // Caso queira usar um número diferente para o desenvolvedor, mude aqui
    whatsappLink: "https://wa.me/557599331557" 
  }
};

// Helper simples para gerar o link do WhatsApp de forma limpa
export const getWhatsappLink = (text?: string) => {
  const base = `https://wa.me/${SITE_CONFIG.contact.phoneRaw}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};