import { PortfolioPage } from './pages/PortfolioPage';

const PORTFOLIO_DATA = {
  heroImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
  socialImages: ["/post1.webp", "/post2.webp", "/post3.webp", "/post4.webp"],
  menuImages: ["/1.webp", "/2.webp", "/3.webp", "/4.webp"],
  printedImages: ["/panfleto1.webp", "/panfleto2.webp", "/panfleto3.webp"]
};

export default function App() {
  return (
    <PortfolioPage 
      heroImage={PORTFOLIO_DATA.heroImage}
      socialImages={PORTFOLIO_DATA.socialImages}
      menuImages={PORTFOLIO_DATA.menuImages}
      printedImages={PORTFOLIO_DATA.printedImages}
    />
  );
}