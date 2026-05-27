import { useState, useEffect } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Navbar } from '../components/Navbar';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp';
import { GlobalEffects } from '../components/GlobalEffects';
import { fetchPortfolioData } from '../data/portfolioData';

// Importação da configuração global de contato
import { getWhatsappLink } from '../data/config';

// Importação dos novos componentes isolados
import { DeveloperBanner } from '../components/DeveloperBanner';
import { HeroSection } from '../components/HeroSection';
import { Partners } from '../components/Partners';
import { CommercialProposal } from '../components/CommercialProposal';
import { AboutUs } from '../components/AboutUs';
import { ServicesSection } from '../components/ServicesSection';
import { HistorySection } from '../components/HistorySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { FaqSection } from '../components/FaqSection';
import { CtaBanner } from '../components/CtaBanner';
import { Footer } from '../components/Footer';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    async function load() {
      const result = await fetchPortfolioData();
      setData(result);
    }
    load();
  }, []);

  // Hook isolado para controlar as animações após os dados estarem prontos no DOM
  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.scroll-animate');
      animatedElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [data]);

  // Consumindo o link do WhatsApp de forma global e centralizada
  const whatsappLink = getWhatsappLink();

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 selection:bg-teal-100 font-sans scroll-smooth overflow-x-hidden w-full">
      {/* Estilos CSS Controlados para Scroll Animation de Alta Performance */}
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <GlobalEffects />
      
      {lightboxState && (
        <Lightbox 
          index={lightboxState.index} 
          images={lightboxState.images} 
          onClose={() => setLightboxState(null)} 
          onNext={() => setLightboxState(prev => prev ? {...prev, index: (prev.index + 1) % prev.images.length} : null)} 
          onPrev={() => setLightboxState(prev => prev ? {...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length} : null)}
          setIndex={(newIndex: number) => setLightboxState(prev => prev ? { ...prev, index: newIndex } : null)}
        />
      )}
      
      <FloatingWhatsapp />
      <Navbar />

      {/* BANNER DE VENDA DO DESENVOLVEDOR */}
      <DeveloperBanner whatsappLink={whatsappLink} />

      <main>
        {/* HERO SECTION */}
        <HeroSection whatsappLink={whatsappLink} />

        {/* LOGOS / PARCEIROS */}
        <Partners />

        {/* PROPOSTA COMERCIAL */}
        <CommercialProposal whatsappLink={whatsappLink} />

        {/* QUEM SOMOS */}
        <div className="scroll-animate">
          <AboutUs whatsappLink={whatsappLink} />
        </div>

        {/* CARDS DE SERVIÇOS */}
        <ServicesSection whatsappLink={whatsappLink} />

        {/* TRAJETÓRIA */}
        <HistorySection whatsappLink={whatsappLink} />

        {/* DEPOIMENTOS */}
        <TestimonialsSection />

        {/* POSTS RECENTES */}
        <BlogSection />

        {/* PERGUNTAS FREQUENTES */}
        <FaqSection />

        {/* BANNER INFERIOR DE CONSULTA GRATUITA */}
        <CtaBanner whatsappLink={whatsappLink} />
      </main>

      {/* RODAPÉ CORPORATIVO */}
      <Footer whatsappLink={whatsappLink} />
    </div>
  );
}