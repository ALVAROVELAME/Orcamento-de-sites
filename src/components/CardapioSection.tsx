import { SITE_IMAGES, getOptimizedImage } from '../data/imageConfig';

export function CardapioSection() {
  // CORRIGIDO: Agora passa apenas o 'item' para a função, evitando o erro de compilação do TS
  const menuCategories = SITE_IMAGES.categories.map(item => {
    const optimizedResult = getOptimizedImage(item);
    return {
      ...item, 
      src: optimizedResult.src, 
      loading: optimizedResult.loading,
      decoding: optimizedResult.decoding
    };
  });

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 flex flex-col items-center">
          
          {/* CATEGORIA com flechas vermelhas geométricas */}
          <div className="flex items-center justify-center gap-4 mb-4 w-full max-w-sm">
            {/* Flecha Esquerda Vermelha */}
            <div className="w-20 md:w-24 flex items-center text-[#e32828]">
              <svg 
                viewBox="0 0 400 120" 
                className="w-full h-auto scale-x-[-1]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="25" y1="60" x2="320" y2="60" />
                <path d="M 45,60 Q 25,48 30,36 Q 40,48 61,60 Z" />
                <path d="M 61,60 Q 41,48 46,36 Q 56,48 77,60 Z" />
                <path d="M 77,60 Q 57,48 62,36 Q 72,48 93,60 Z" />
                <path d="M 93,60 Q 73,48 78,36 Q 88,48 109,60 Z" />
                <path d="M 109,60 Q 89,48 94,36 Q 104,48 125,60 Z" />
                <path d="M 45,60 Q 25,72 30,84 Q 40,72 61,60 Z" />
                <path d="M 61,60 Q 41,72 46,84 Q 56,72 77,60 Z" />
                <path d="M 77,60 Q 57,72 62,84 Q 72,72 93,60 Z" />
                <path d="M 93,60 Q 73,72 78,84 Q 88,72 109,60 Z" />
                <path d="M 109,60 Q 89,72 94,84 Q 104,72 125,60 Z" />
                <path d="M 320,60 Q 330,45 370,60 Q 330,75 320,60 Z" />
              </svg>
            </div>
            
            <span className="text-xs font-sans font-extrabold tracking-[0.25em] text-[#e32828] uppercase whitespace-nowrap">
              CATEGORIAS
            </span>
            
            {/* Flecha Direita Vermelha */}
            <div className="w-20 md:w-24 flex items-center text-[#e32828]">
              <svg 
                viewBox="0 0 400 120" 
                className="w-full h-auto" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="25" y1="60" x2="320" y2="60" />
                <path d="M 45,60 Q 25,48 30,36 Q 40,48 61,60 Z" />
                <path d="M 61,60 Q 41,48 46,36 Q 56,48 77,60 Z" />
                <path d="M 77,60 Q 57,48 62,36 Q 72,48 93,60 Z" />
                <path d="M 93,60 Q 73,48 78,36 Q 88,48 109,60 Z" />
                <path d="M 109,60 Q 89,48 94,36 Q 104,48 125,60 Z" />
                <path d="M 45,60 Q 25,72 30,84 Q 40,72 61,60 Z" />
                <path d="M 61,60 Q 41,72 46,84 Q 56,72 77,60 Z" />
                <path d="M 77,60 Q 57,72 62,84 Q 72,72 93,60 Z" />
                <path d="M 93,60 Q 73,72 78,84 Q 88,72 109,60 Z" />
                <path d="M 109,60 Q 89,72 94,84 Q 104,72 125,60 Z" />
                <path d="M 320,60 Q 330,45 370,60 Q 330,75 320,60 Z" />
              </svg>
            </div>
          </div>

          {/* Título Serifado */}
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 tracking-tight">
            Escolha Sua Melhor Opção
          </h2>
        </div>

        {/* Grid de Itens do Cardápio */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCategories.map((item, i) => (
            <div key={i} className="bg-white border border-neutral-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
              
              {/* Imagem do Cardápio */}
              <div className="h-52 w-full overflow-hidden bg-neutral-100">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  loading={item.loading}
                  decoding={item.decoding}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              {/* Bloco de Conteúdo */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                
                {/* Linha de Avaliação e Avatares */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-50">
                  <div className="flex items-center gap-2">
                    <div className="w-[3px] h-6 bg-[#e32828]" />
                    <div className="flex -space-x-2 overflow-hidden">
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" alt="cliente" />
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="cliente" />
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" alt="cliente" />
                    </div>
                  </div>
                  
                  {/* Nota */}
                  <div className="flex items-center gap-1 text-sm font-bold text-neutral-800">
                    <span className="text-amber-500 text-base">★</span> {item.rating}
                  </div>
                </div>

                {/* Título e Descrição */}
                <div className="mb-5">
                  <h3 className="font-serif font-bold text-lg text-neutral-900 mb-1 leading-snug">
                    {item.alt}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Botão Pedir Agora - Configurado para o formulário local */}
                <a 
                  href="#pedido" 
                  className="text-[#e32828] font-sans font-bold text-xs tracking-wider uppercase hover:text-red-700 transition-colors inline-flex items-center gap-1 w-fit"
                >
                  <span>Pedir Agora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5 transform translate-y-[-0.5px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}