export const SITE_CONFIG = {
  contact: {
    phoneRaw: "557599331557",
    phoneFormatted: "(75) 9933-1557",
    email: "contato@seusitehamburgueria.com.br",
    address: "Shopping Barra, Av. Centenário, 2992 - Chame-Chame, Salvador - BA",
    // Link do mapa atualizado com o seu código de incorporação
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.44957861646!2d-38.52787962492284!3d-13.007017587311624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7160379108013cb%3A0x4bae66cbdb92151f!2sShopping%20Barra!5e0!3m2!1spt-BR!2sbr!4v1780445454148!5m2!1s0xpt-BR!2sbr"
  }
};

export const getWhatsappLink = (text?: string) => {
  const base = `https://wa.me/557599331557`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};