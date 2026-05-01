import React, { useState, useEffect } from 'react';

function App() {
  const whatsappLink = "https://wa.me/5575998825022";
  
  // Estado para o Slide Automático dos Cardápios
  const [currentMenuSlide, setCurrentMenuSlide] = useState(0);
  
  // Estado para o Lightbox (Galeria Ampliada)
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  const heroImage = "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000";
  
  const allGalleryImages = [
    heroImage,
    "/post1.png", "/post2.png", "/post3.png",
    "/1.png", "/2.png", "/3.png", "/4.png",
    "/panfleto1.png", "/panfleto2.png", "/panfleto3.png"
  ];

  const menuImages = ["/1.png", "/2.png", "/3.png", "/4.png"];

  // Efeito do slide automático para a seção de cardápios
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMenuSlide((prev) => (prev === menuImages.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(timer);
  }, [menuImages.length]);

  // Funções de Navegação da Moldura (Cardápios)
  const nextMenu = (e) => {
    e.stopPropagation();
    setCurrentMenuSlide((prev) => (prev === menuImages.length - 1 ? 0 : prev + 1));
  };

  const prevMenu = (e) => {
    e.stopPropagation();
    setCurrentMenuSlide((prev) => (prev === 0 ? menuImages.length - 1 : prev - 1));
  };

  // Funções de Navegação do Lightbox (Ampliado)
  const openLightbox = (imgUrl) => {
    const index = allGalleryImages.indexOf(imgUrl);
    setLightboxIndex(index !== -1 ? index : 0);
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === allGalleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? allGalleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-orange-100 font-sans scroll-smooth">
      
      <style>{`
        @keyframes custom-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 25px -5px rgba(37, 211, 102, 0.4); }
          50% { transform: scale(1.08); box-shadow: 0 20px 30px -5px rgba(37, 211, 102, 0.6); }
        }
        @keyframes soft-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shine-effect {
          0% { left: -100%; }
          20% { left: 125%; }
          100% { left: 125%; }
        }
        .animate-wpp-float { animation: custom-pulse 2s infinite ease-in-out; }
        .animate-soft-float { animation: soft-float 4s infinite ease-in-out; }
        .btn-shine-container { position: relative; overflow: hidden; }
        .btn-shine-container::after {
          content: ''; position: absolute; top: -50%; height: 200%; width: 50px;
          background: rgba(255, 255, 255, 0.3); transform: rotate(30deg);
          left: -100%; animation: shine-effect 4s infinite ease-in-out;
        }
      `}</style>

      {/* LIGHTBOX (IMAGEM AMPLIADA CORRIGIDA) */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Botão Fechar */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white z-[210] transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          {/* Seta Esquerda */}
          <button onClick={prevLightbox} className="absolute left-4 lg:left-8 p-4 text-white hover:text-orange-500 bg-white/5 hover:bg-white/10 rounded-full transition-all z-[210]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          {/* Container da Imagem com restrição de tamanho */}
          <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
            <img 
              src={allGalleryImages[lightboxIndex]} 
              alt="Visualização" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-auto" 
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/40 text-xs mt-6 font-bold tracking-widest uppercase">
              {lightboxIndex + 1} / {allGalleryImages.length}
            </p>
          </div>

          {/* Seta Direita */}
          <button onClick={nextLightbox} className="absolute right-4 lg:right-8 p-4 text-white hover:text-orange-500 bg-white/5 hover:bg-white/10 rounded-full transition-all z-[210]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}

      {/* WhatsApp Flutuante */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl animate-wpp-float">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Header */}
      <nav className="fixed top-0 w-full bg-[#FDFCFB]/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-slate-900 uppercase">Gerianderson.DSGN</div>
          <div className="space-x-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#trabalhos" className="hover:text-orange-500 transition-colors">Trabalhos</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-slate-900 border-b-2 border-orange-500">Orçamento</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-8 pt-48 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full mb-6 uppercase tracking-[0.2em]">Disponível para novos projetos</span>
          <h1 className="text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-slate-900">Design que <br /><span className="text-orange-500">comunica</span>.</h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-sm mb-10">Transformando ideias em artes de alto impacto.</p>
          <a href={whatsappLink} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-xl inline-block animate-soft-float btn-shine-container">Iniciar Projeto</a>
        </div>
        <div className="relative cursor-zoom-in" onClick={() => openLightbox(heroImage)}>
          <div className="bg-slate-200 aspect-video rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
            <img src={heroImage} alt="Design" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* TÓPICO 1: SOCIAL MEDIA */}
      <section id="trabalhos" className="py-24 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
            <div className="col-span-2 aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 p-2 cursor-zoom-in hover:shadow-2xl transition-all" onClick={() => openLightbox("/post1.png")}>
                <img src="/post1.png" alt="Post 1" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 p-2 cursor-zoom-in hover:shadow-2xl transition-all" onClick={() => openLightbox("/post2.png")}>
                <img src="/post2.png" alt="Post 2" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 p-2 cursor-zoom-in hover:shadow-2xl transition-all" onClick={() => openLightbox("/post3.png")}>
                <img src="/post3.png" alt="Post 3" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Social Media <br/><span className="text-orange-500 italic">Estratégico</span></h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Artes que geram desejo e autoridade. Clique para navegar na galeria.</p>
          </div>
        </div>
      </section>

      {/* TÓPICO 2: CARDÁPIOS (COM SETAS NA MOLDURA) */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 tracking-tight text-white">Cardápios <br/><span className="text-orange-500">Digitais</span></h2>
            <p className="text-slate-400 mb-10 leading-relaxed">Menus interativos focados na experiência do cliente.</p>
          </div>
          
          <div className="relative group">
            <div className="aspect-[4/3] bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl cursor-zoom-in" onClick={() => openLightbox(menuImages[currentMenuSlide])}>
                {menuImages.map((img, index) => (
                  <img key={index} src={img} alt={`Menu ${index}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentMenuSlide ? 'opacity-100' : 'opacity-0'}`} />
                ))}
            </div>

            <button 
              onClick={prevMenu}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-orange-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <button 
              onClick={nextMenu}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-orange-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
               {menuImages.map((_, i) => (
                 <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentMenuSlide ? 'bg-orange-500 w-4' : 'bg-white/30'}`} />
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* TÓPICO 3: MATERIAIS IMPRESSOS */}
      <section className="py-24 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-6 items-end">
             <div className="bg-white aspect-[2/3.5] rounded-2xl shadow-md overflow-hidden border border-slate-100 cursor-zoom-in hover:shadow-xl transition-all" onClick={() => openLightbox("/panfleto1.png")}>
               <img src="/panfleto1.png" alt="Panfleto 1" className="w-full h-full object-cover" />
             </div>
             <div className="bg-white aspect-[2/3.5] rounded-2xl shadow-md overflow-hidden border border-slate-100 cursor-zoom-in hover:shadow-xl transition-all" onClick={() => openLightbox("/panfleto2.png")}>
               <img src="/panfleto2.png" alt="Panfleto 2" className="w-full h-full object-cover" />
             </div>
             <div className="col-span-2 bg-white aspect-[21/9] rounded-2xl shadow-md overflow-hidden border border-slate-100 cursor-zoom-in hover:shadow-xl transition-all" onClick={() => openLightbox("/panfleto3.png")}>
               <img src="/panfleto3.png" alt="Panfleto 3" className="w-full h-full object-cover" />
             </div>
          </div>
          <div>
            <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">Materiais <br/><span className="text-orange-500">Impressos</span></h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Design de alto impacto para qualquer formato.</p>
            <div className="flex gap-4">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900">CMYK</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Padrão Gráfico</span>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900">300 DPI</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Alta Definição</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white text-center border-t border-slate-100">
        <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tighter">Vamos tirar sua ideia do papel?</h3>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl animate-soft-float btn-shine-container">
          Chamar no WhatsApp
        </a>
        <p className="mt-20 text-[9px] text-slate-300 uppercase tracking-[0.3em] font-bold">© 2026 Gerianderson Dsgn — Salinas da Margarida, BA</p>
      </footer>
    </div>
  );
}

export default App;