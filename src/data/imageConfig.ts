// =============================================
// CONTROLE DE IMAGENS RESPONSIVAS E PERFORMANCE
// =============================================

export interface OptimizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  description?: string;
  rating?: string;
  srcset?: string;
  sizes?: string;
}

// Interface para os Depoimentos
export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

// Lista centralizada de todas as imagens e dados do site
export const SITE_IMAGES = {
  hero: {
    src: "https://images.unsplash.com/photo-1565299623641-0f2f5c4e6b0f?q=80",
    alt: "Pizza com queijo derretendo - Hamburgueria",
    width: 2070,
    height: 1380,
  } as OptimizedImage,

  categories: [
    {
      src: "/images/SmashBurgerDuplo.webp",
      alt: "Smash Burger Duplo",
      width: 800,
      height: 600,
      description: "Dois blends de 100g grelhados no ponto certo, muito queijo cheddar derretido e molho artesanal.",
      rating: "5.0"
    },
    {
      src: "/images/CheddarBaconSupreme.webp",
      alt: "Cheddar & Bacon Supreme",
      width: 800,
      height: 600,
      description: "Blend de 150g extremamente suculento, coberto por uma avalanche de bacon crocante e creme de queijo.",
      rating: "4.9"
    },
    {
      src: "/images/BatataFritaEspecial.webp",
      alt: "Batata Frita Especial",
      width: 800,
      height: 600,
      description: "Batatas fritas super crocantes por fora e macias por dentro, com tempero especial da casa.",
      rating: "4.8"
    },
    {
      src: "/images/AneisDeCebolaCrocantes.webp",
      alt: "Anéis de Cebola Crocantes",
      width: 800,
      height: 600,
      description: "Anéis de cebola gigantes empanados com uma casca grossa e super crocante, fritos na hora.",
      rating: "4.7"
    },
  ] as OptimizedImage[],

  specials: [
    { src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80", alt: "Classic Smash Burger", width: 800, height: 600 },
    { src: "https://images.unsplash.com/photo-1553979459-d2229ddd8af2?q=80", alt: "Double Cheese Burger", width: 800, height: 600 },
    { src: "https://images.unsplash.com/photo-1627308595229-5e4c8c5c5c5c?q=80", alt: "Chicken BBQ", width: 800, height: 600 },
  ] as OptimizedImage[],

  chef: {
    src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80",
    alt: "Chef da Hamburgueria",
    width: 800,
    height: 800,
  } as OptimizedImage,

  gallery: [
    { src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80", alt: "Drinks", width: 800, height: 600 },
    { src: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80", alt: "Pizza", width: 800, height: 600 },
    { src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80", alt: "Frango Frito", width: 800, height: 600 },
    { src: "https://images.unsplash.com/photo-1565299623641-0f2f5c4e6b0f?q=80", alt: "Hambúrguer Premium", width: 800, height: 600 },
  ] as OptimizedImage[],

  // DADOS DOS DEPOIMENTOS
  testimonials: [
    {
      name: "Amanda Silva",
      role: "Guia Gastronômico",
      text: "O Smash Burger Duplo é simplesmente espetacular! O ponto da carne veio perfeito e o molho artesanal faz toda a diferença.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
    },
    {
      name: "Rodrigo Costa",
      role: "Cliente VIP",
      text: "Entrega super rápida e o hambúrguer chegou quente! O Cheddar & Bacon Supreme é uma avalanche de sabor.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
    },
    {
      name: "Juliana Mendes",
      role: "Chef de Cozinha",
      text: "As batatas especiais são sequinhas e super crocantes por fora. Dá para notar a qualidade dos ingredientes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    }
  ] as Testimonial[]
}; // <--- FECHAMENTO CORRETO DO SITE_IMAGES

/**
 * Função Otimizadora e Geradora de Atributos Responsivos
 */
export const getOptimizedImage = (image: OptimizedImage) => {
  const widths = [400, 800, 1200];

  if (image.src.startsWith('/')) {
    return {
      ...image,
      loading: "lazy" as const,
      decoding: "async" as const,
    };
  }

  if (image.src.includes('unsplash')) {
    const srcset = widths.map((w) => `${image.src}&w=${w} ${w}w`).join(', ');
    return {
      ...image,
      src: `${image.src}&w=800`,
      srcset: srcset,
      sizes: "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px",
      loading: "lazy" as const,
      decoding: "async" as const,
    };
  }

  return { ...image, loading: "lazy" as const, decoding: "async" as const };
};

export const preloadCriticalImages = () => {
  const hero = SITE_IMAGES.hero;
  if (!hero || !hero.src) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = hero.src.includes('unsplash') ? `${hero.src}&w=1200` : hero.src;
  document.head.appendChild(link);
};