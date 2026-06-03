import { getWhatsappLink } from '../data/config';

export function Navbar() {
  const whatsappLink = getWhatsappLink("Olá! Quero fazer um pedido.");

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-red-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">🍔</div>
          <div className="text-2xl font-bold text-slate-900">SeuSite<span className="text-red-600">Hamburgueria</span></div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#menu" className="hidden md:block font-medium hover:text-red-600">Cardápio</a>
          <a href="#sobre" className="hidden md:block font-medium hover:text-red-600">Sobre</a>
          <a href={whatsappLink} target="_blank" className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all flex items-center gap-2">
            <span>📲</span> Pedir Agora
          </a>
        </div>
      </div>
    </nav>
  );
}