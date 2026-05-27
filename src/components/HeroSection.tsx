interface HeroSectionProps {
  whatsappLink: string;
}

export function HeroSection({ whatsappLink }: HeroSectionProps) {
  return (
    <header className="relative bg-slate-950 text-white pt-64 pb-48 w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200')] bg-cover bg-center opacity-15 pointer-events-none"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-full mb-6 uppercase tracking-wider scroll-animate">
          Modelo Demonstrativo
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-white scroll-animate">
          Serviços Fiscais Especializados para <br />
          <span className="text-teal-400">Pessoas Físicas e Empresas</span>
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto mb-10 scroll-animate">
          Garantimos a conformidade fiscal e a saúde financeira da sua organização através de soluções contábeis estratégicas e tecnologia integrada.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate">
          <a href={whatsappLink} className="bg-teal-500 text-slate-950 px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-teal-400 hover:scale-105 transition-all text-center shadow-lg">
            Fale Conosco
          </a>
          <a href="#servicos" className="border border-white/30 text-white px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-white/10 transition-all text-center">
            Explorar Serviços
          </a>
        </div>
      </div>
    </header>
  );
}