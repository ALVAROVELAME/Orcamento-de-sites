// Configurações do site de formulário de orçamento

export const SITE_CONFIG = {
  contact: {
    phoneRaw: "5511999999999",
    phoneFormatted: "(11) 99999-9999",
    email: "contato@orcamentoweb.com",
    whatsappNumber: "557599331557"
  }
};

// ⚠️ IMPORTANTE: ATUALIZE O NÚMERO ACIMA COM SEU NÚMERO DO WHATSAPP

export const getWhatsappLink = (text?: string) => {
  const base = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
