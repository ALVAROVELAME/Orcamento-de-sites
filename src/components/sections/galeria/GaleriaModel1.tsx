import { useState } from 'react';
import { 
  Maximize2, 
  MapPin, 
  Sparkles,
  X
} from 'lucide-react';

export function GaleriaModel1() {
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const fotos = [
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      title: "Maldivas",
      tag: "Tropical",
      gridClass: "col-span-2 row-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
      title: "Suíça",
      tag: "Aventura",
      gridClass: "col-span-1 row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
      title: "Itália",
      tag: "Romântico",
      gridClass: "col-span-1 row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80",
      title: "Canadá",
      tag: "Natureza",
      gridClass: "col-span-1 row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
      title: "Japão",
      tag: "Cultura",
      gridClass: "col-span-2 row-span-1"
    }
  ];

  return (
    <section className="w-full bg-white p-3 md:p-6 rounded-3xl antialiased text-stone-800 border border-stone-100 shadow-2xs relative">
      
      {/* Header */}
      <div className="mb-4 flex items-end justify-between gap-2 relative z-10">
        <div className="flex flex-col items-start gap-0.5">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 border border-sky-100 text-[9px] font-bold tracking-wider text-sky-600 uppercase">
            <Sparkles className="w-2.5 h-2.5 text-sky-500" />
            Álbum
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-stone-900 tracking-tight">
            Explore destinos <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">inesquecíveis</span>
          </h2>
        </div>
      </div>

      {/* Grid Bento Totalmente Blindado contra distorções */}
      <div className="grid grid-cols-3 gap-1.5 md:gap-3 auto-rows-[90px] sm:auto-rows-[140px] md:auto-rows-[180px] max-w-5xl mx-auto w-full">
        {fotos.map((foto, index) => (
          <div
            key={index}
            onClick={() => setActiveModalImage(foto.url)}
            className={`group relative rounded-xl overflow-hidden border border-stone-100/60 shadow-3xs cursor-pointer bg-stone-50 h-full w-full ${foto.gridClass}`}
          >
            {/* O SEGREDO ESTÁ AQUI: min-w-full e min-h-full bloqueiam qualquer espaço em branco na moldura */}
            <img
              src={foto.url}
              alt={foto.title}
              loading="lazy"
              className="absolute inset-0 block w-full h-full min-w-full min-h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Sombra interna para contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

            {/* Micro-Elementos da Interface */}
            <div className="absolute inset-0 p-2 md:p-3 flex flex-col justify-between z-10 select-none">
              
              {/* Topo do card */}
              <div className="flex justify-between items-start w-full">
                <span className="bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-black text-stone-800 tracking-wide shadow-3xs max-w-[85%] truncate">
                  {foto.tag}
                </span>
                
                <div className="h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shrink-0">
                  <Maximize2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                </div>
              </div>

              {/* Base do card */}
              <div className="flex items-end justify-between w-full">
                <div className="flex items-center gap-0.5 md:gap-1 text-white truncate max-w-full">
                  <MapPin className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-sky-400 shrink-0" />
                  <span className="text-[9px] md:text-xs font-bold tracking-wide drop-shadow-sm truncate">
                    {foto.title}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeModalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-4"
          onClick={() => setActiveModalImage(null)}
        >
          <button 
            type="button"
            onClick={() => setActiveModalImage(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors z-50"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={activeModalImage} 
              alt="Visualização ampliada" 
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

    </section>
  );
}