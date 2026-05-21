import { useEffect } from 'react';

export function Lightbox({ index, images, onClose, onNext, onPrev }: any) {
  
  // Adiciona navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
      onClick={onClose}
    >
      {/* Botão Fechar */}
      <button 
        className="absolute top-6 right-6 text-white/50 hover:text-white z-[210] transition-colors" 
        onClick={onClose}
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Botão Anterior */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }} 
        className="absolute left-8 p-4 text-white hover:text-orange-500 bg-white/5 rounded-full z-[210] transition-all"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Imagem Central */}
      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <img 
          src={images[index]} 
          alt="Visualização" 
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Botão Próximo */}
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        className="absolute right-8 p-4 text-white hover:text-orange-500 bg-white/5 rounded-full z-[210] transition-all"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}