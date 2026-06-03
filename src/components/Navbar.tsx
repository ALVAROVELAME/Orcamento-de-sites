import { useState } from 'react';
import { getWhatsappLink } from '../data/config';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = getWhatsappLink("Olá! Quero fazer um pedido.");

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-red-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo — Tamanho padrão e fixo, sem quebras */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            🍔
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            ST<span className="text-red-600">Hamburgueria</span>
          </div>
        </div>

        {/* Links para Desktop — O botão "Pedir Agora" aparece apenas aqui */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#menu" className="font-medium hover:text-red-600 transition-colors">Cardápio</a>
          <a href="#sobre" className="font-medium hover:text-red-600 transition-colors">Sobre</a>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all flex items-center gap-2"
          >
            <span>📲</span> Pedir Agora
          </a>
        </div>

        {/* Botão apenas para abrir o Menu no Mobile — Sem o botão de pedido poluindo */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-700 hover:text-red-600 focus:outline-none rounded-xl hover:bg-slate-50"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Gaveta Mobile */}
      <div className={`md:hidden transition-all duration-300 ease-in-out border-t border-red-50 bg-white ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-3 shadow-inner">
          <a 
            href="#menu" 
            onClick={() => setIsOpen(false)}
            className="block font-medium py-2.5 px-3 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
          >
            🍔 Cardápio
          </a>
          <a 
            href="#sobre" 
            onClick={() => setIsOpen(false)}
            className="block font-medium py-2.5 px-3 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
          >
            ✨ Sobre Nós
          </a>
        </div>
      </div>
    </nav>
  );
}