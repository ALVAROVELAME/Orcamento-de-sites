// src/data/portfolioData.ts

export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
}

/**
 * Classe inteligente:
 * - Se for link externo (começa com http), usa o link diretamente.
 * - Se for local, prefixa com /images/ e tenta montar o srcset otimizado.
 */
class ImageItem implements ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;

  constructor(
    pathOrName: string, 
    alt: string, 
    sizes: string = "(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  ) {
    const isExternal = pathOrName.startsWith('http');

    if (isExternal) {
      // Para links externos, usamos o link como src e o srcset vazio ou igual ao src
      this.src = pathOrName;
      this.srcset = `${pathOrName} 1x`; // Navegador usa o link diretamente
      this.sizes = "100vw";
    } else {
      // Para arquivos locais, mantemos a lógica das 3 versões
      this.src = `/images/${pathOrName}.webp`;
      this.srcset = `/images/${pathOrName}-400w.webp 400w, ` +
                    `/images/${pathOrName}-800w.webp 800w`;
      this.sizes = sizes;
    }
    
    this.alt = alt;
  }
}

export interface PortfolioData {
  heroImage: ResponsiveImage;
  extraImage: ResponsiveImage;
  socialImages: ResponsiveImage[];
  menuImages: ResponsiveImage[];
  printedImages: ResponsiveImage[];
}

export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  return {
    heroImage: new ImageItem("principal", "Design de destaque", "100vw"),
    extraImage: new ImageItem("extra", "Imagem extra do projeto"),
    
    socialImages: [
      new ImageItem("post1", "Post social media 1"),
      new ImageItem("post2", "Post social media 2"),
      new ImageItem("post3", "Post social media 3"),
      new ImageItem("post4", "Post social media 4")
    ],
    
    menuImages: [
      new ImageItem("1", "Slide de menu 1"),
      new ImageItem("2", "Slide de menu 2"),
      new ImageItem("3", "Slide de menu 3"),
      new ImageItem("4", "Slide de menu 4")
    ],
    
    printedImages: [
      new ImageItem("panfleto1", "Material impresso 1"),
      new ImageItem("panfleto2", "Material impresso 2"),
      new ImageItem("panfleto3", "Material impresso 3"),
    ]
  };
};