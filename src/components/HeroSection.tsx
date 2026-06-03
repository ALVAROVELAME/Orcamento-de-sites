import { useState, useEffect } from 'react';
import { getWhatsappLink } from '../data/config';

const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", 
    title: "A Melhor Comida & Uma Maravilhosa",
    subtitle: "Experiência Gastronômica"
  },
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop", 
    title: "Mais Sabor & Hambúrgueres",
    subtitle: "Artesanais Incomparáveis"
  },
  {
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2065&auto=format&fit=crop", 
    title: "Sabor Premium & Momentos",
    subtitle: "Inesquecíveis para Você"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const whatsappLink = getWhatsappLink("Olá! Quero fazer um pedido!");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    /* Adicionado 'group' para controlar a visibilidade das setas pelo mouse na capa */
    <header className="group relative w-full h-screen flex items-center justify-center text-white overflow-hidden bg-neutral-950">
      
      {/* 1. Imagens de Fundo com Transição Suave */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${slide.src})` }}
        />
      ))}

      {/* Máscara escura de fundo */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 2. Conteúdos Animados Individuais por Slide */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 z-20 text-center px-4 max-w-6xl mx-auto flex flex-col items-center justify-center h-full mt-12 transition-all duration-700 ${
              isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            
            {/* SETAS E FRASE: Vem de Cima e sai por Cima */}
            <div className={`flex items-center justify-center gap-6 mb-5 w-full max-w-xl transition-all duration-1000 ease-out transform-gpu ${
              isActive ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
            }`}>
              {/* Seta Esquerda */}
              <div className="w-24 md:w-36 flex items-center justify-end">
                <svg viewBox="0 0 400 120" className="w-full h-auto text-white scale-x-[-1]" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
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
              
              {/* TRADUZIDO: "MORE FLAVOUR" alterado para "MAIS SABOR" */}
              <span className="text-[13px] md:text-sm font-sans font-extrabold tracking-[0.25em] text-white uppercase whitespace-nowrap">
                MAIS SABOR
              </span>
              
              {/* Seta Direita */}
              <div className="w-24 md:w-36 flex items-center justify-start">
                <svg viewBox="0 0 400 120" className="w-full h-auto text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
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

            {/* HEADER COM TÍTULOS CRUZADOS */}
            <h1 className="text-white tracking-tight leading-[1.15] max-w-5xl select-none w-full overflow-hidden">
              <span className={`block font-serif font-semibold text-[26px] sm:text-[40px] md:text-[52px] lg:text-[58px] mb-1 transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) transform-gpu ${
                isActive ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'
              }`}>
                {slide.title}
              </span>
              
              <span className={`block font-serif font-normal text-[32px] sm:text-[54px] md:text-[72px] lg:text-[84px] transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) delay-100 transform-gpu ${
                isActive ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
              }`}>
                {slide.subtitle}
              </span>
            </h1>

            {/* TEXTOS DE APOIO */}
            <div className={`mt-8 mb-8 space-y-1.5 transition-all duration-1000 delay-200 transform-gpu ${
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              <p className="text-sm md:text-base font-sans text-white/85 tracking-wide">
                Criando delícias premium desde 1980
              </p>
              <p className="text-sm md:text-base font-sans font-medium text-white tracking-wide">
                Reserve online ou ligue <span className="underline decoration-red-500/40 cursor-pointer hover:text-red-400 transition-colors">(75) 9933-1557</span>
              </p>
            </div>

            {/* BOTÃO COMPRAR */}
            <a 
              href={whatsappLink}
              className={`bg-[#e32828] hover:bg-red-700 text-white px-9 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-1000 ease-out transform-gpu shadow-lg ${
                isActive ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-24 opacity-0'
              }`}
            >
              Explore o Menu
            </a>
          </div>
        );
      })}

      {/* 3. Controles das Setas Laterais — Agora controladas pelo Hover geral da capa (group) e muito mais brancas */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 z-30 backdrop-blur-xs opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button 
        onClick={nextSlide} 
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 z-30 backdrop-blur-xs opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </header>
  );
}