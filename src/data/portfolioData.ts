export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
}

export interface PortfolioData {
  heroImage: ResponsiveImage;
  extraImage: ResponsiveImage;
  socialImages: ResponsiveImage[];
  menuImages: ResponsiveImage[];
  printedImages: ResponsiveImage[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  heroImage: {
    src: "/images/principal-800w.webp",
    srcset: "/images/principal-800w.webp 800w",
    sizes: "100vw",
    alt: "Design de destaque"
  },
  extraImage: {
    src: "/images/extra.webp", // Certifique-se de ter este arquivo ou ajuste o nome
    srcset: "/images/extra.webp 800w",
    sizes: "100vw",
    alt: "Imagem extra do projeto"
  },
  socialImages: [
    { src: "/images/post1-800w.webp", srcset: "/images/post1-800w.webp 800w", sizes: "800px", alt: "Post social media 1" },
    { src: "/images/post2-800w.webp", srcset: "/images/post2-800w.webp 800w", sizes: "800px", alt: "Post social media 2" },
    { src: "/images/post3-800w.webp", srcset: "/images/post3-800w.webp 800w", sizes: "800px", alt: "Post social media 3" },
    { src: "/images/post4-800w.webp", srcset: "/images/post4-800w.webp 800w", sizes: "800px", alt: "Post social media 4" }
  ],
  menuImages: [
    { src: "/images/1-800w.webp", srcset: "/images/1-800w.webp 800w", sizes: "800px", alt: "Slide de menu 1" },
    { src: "/images/2-800w.webp", srcset: "/images/2-800w.webp 800w", sizes: "800px", alt: "Slide de menu 2" },
    { src: "/images/3-800w.webp", srcset: "/images/3-800w.webp 800w", sizes: "800px", alt: "Slide de menu 3" },
    { src: "/images/4-800w.webp", srcset: "/images/4-800w.webp 800w", sizes: "800px", alt: "Slide de menu 4" }
  ],
  printedImages: [
    { src: "/images/panfleto1-800w.webp", srcset: "/images/panfleto1-800w.webp 800w", sizes: "800px", alt: "Material impresso 1" },
    { src: "/images/panfleto2-800w.webp", srcset: "/images/panfleto2-800w.webp 800w", sizes: "800px", alt: "Material impresso 2" },
    { src: "/images/panfleto3-800w.webp", srcset: "/images/panfleto3-800w.webp 800w", sizes: "800px", alt: "Material impresso 3" }
  ]
};