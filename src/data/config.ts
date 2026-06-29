// Configurações do site de formulário de orçamento

export const SITE_CONFIG = {
  contact: {
    phoneRaw: "+557599331557",
    phoneFormatted: "(75) 99331-557",
    whatsappNumber: "557599331557"
  }
};

// ⚠️ IMPORTANTE: ATUALIZE O NÚMERO ACIMA COM SEU NÚMERO DO WHATSAPP

export const getWhatsappLink = (text?: string) => {
  const base = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
