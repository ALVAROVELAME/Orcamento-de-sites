import { PortfolioPage } from './pages/PortfolioPage';

const PORTFOLIO_DATA = {
  heroImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
  socialImages: ["/post1.png", "/post2.png", "/post3.png", "/post4.png"],
  menuImages: ["/1.png", "/2.png", "/3.png", "/4.png"],
  printedImages: ["/panfleto1.png", "/panfleto2.png", "/panfleto3.png"]
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