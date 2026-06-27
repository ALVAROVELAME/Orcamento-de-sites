import { useState } from 'react';
import { scrollParaElemento, scrollParaTopo } from '../utils/scroll';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToFormulario = () => {
    scrollParaElemento('formulario');
    setIsOpen(false);
  };

  const scrollToTop = () => {
    scrollParaTopo();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Voltar para a pagina principal">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            📝
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Orçamento<span className="text-blue-600">Web</span>
          </div>
        </a>

        {/* Links para Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
          >Início</button>
          <button
            onClick={scrollToFormulario}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <span>📝</span> Solicitar Orçamento
          </button>
        </div>

        {/* Botão Menu Mobile */}
        <div className="flex items-center md:hidden">
          {isOpen ? (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-700 hover:text-blue-600 focus:outline-none rounded-xl hover:bg-slate-50"
              aria-label="Fechar menu"
              aria-expanded="true"
              aria-controls="menu-mobile-principal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 text-slate-700 hover:text-blue-600 focus:outline-none rounded-xl hover:bg-slate-50"
              aria-label="Abrir menu"
              aria-expanded="false"
              aria-controls="menu-mobile-principal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Menu Gaveta Mobile */}
      <div
        id="menu-mobile-principal"
        className={`md:hidden transition-all duration-300 ease-in-out border-t border-red-50 bg-white ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 shadow-inner">
          <button
            type="button"
            onClick={() => { setIsOpen(false); scrollToTop(); }}
            className="block w-full text-left font-medium py-2.5 px-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
          >
            🏠 Início
          </button>
          <button
            type="button"
            onClick={() => { setIsOpen(false); scrollToFormulario(); }}
            className="block w-full text-left font-medium py-2.5 px-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
          >
            📝 Orçamento
          </button>
        </div>
      </div>
    </nav>
  );
}
