interface HistorySectionProps {
  whatsappLink: string;
}

export function HistorySection({ whatsappLink }: HistorySectionProps) {
  return (
    <section className="py-24 w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="order-2 lg:order-1 scroll-animate">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Nossa Trajetória</span>
          <h2 className="text-3xl font-bold mb-6 tracking-tight text-slate-900">Nossa história conta com mais de 15 anos de experiência</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Ao longo de mais de uma década, ajudamos centenas de negócios a se estabelecerem no mercado, organizando suas finanças e estruturando o crescimento seguro dentro das leis fiscais brasileiras.
          </p>
          <a href={whatsappLink} className="bg-teal-500 text-slate-950 px-8 py-3 rounded-sm font-bold text-sm hover:bg-teal-400 transition-all inline-block">Fale Conosco</a>
        </div>
        <div className="order-1 lg:order-2 relative group overflow-hidden rounded-2xl shadow-lg scroll-animate">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800" alt="Equipe reunida trabalhando corporativo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>
    </section>
  );
}