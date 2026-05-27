interface CtaBannerProps {
  whatsappLink: string;
}

export function CtaBanner({ whatsappLink }: CtaBannerProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 my-24 w-full">
      <div className="relative bg-slate-950 rounded-xl overflow-hidden text-white p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl scroll-animate">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Entre em contato hoje para uma consultoria gratuita</h3>
          <p className="text-slate-400 text-sm">Fale diretamente com um consultor especialista e descubra como otimizar a carga tributária do seu negócio.</p>
        </div>
        <a href={whatsappLink} className="relative z-10 bg-white text-slate-950 px-8 py-4 rounded-sm font-bold text-sm hover:bg-teal-400 hover:text-slate-950 transition-all whitespace-nowrap shadow-lg hover:scale-105 transform">Agendar Avaliação</a>
      </div>
    </section>
  );
}