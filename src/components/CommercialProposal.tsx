interface CommercialProposalProps {
  whatsappLink: string;
}

export function CommercialProposal({ whatsappLink }: CommercialProposalProps) {
  return (
    <section className="py-24 w-full bg-teal-50/30 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="relative group overflow-hidden rounded-2xl shadow-xl scroll-animate">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" alt="Desenvolvimento de Sites" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-bold bg-teal-600 px-4 py-2 rounded-sm text-sm">Desenvolvido por Álvaro Velame</span>
          </div>
        </div>
        <div className="scroll-animate">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Adquira esta estrutura</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900">Seu escritório contábil na internet com autoridade e elegância</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Este site foi arquitetado sob medida pelo desenvolvedor <strong>Álvaro Velame</strong> utilizando <strong>Vite + React e Tailwind CSS</strong>. Ele entrega uma performance absurdamente rápida, SEO otimizado para o Google e um layout totalmente adaptável para celulares e computadores.
          </p>
          <div className="space-y-3 mb-8 text-sm text-slate-600">
            <p className="flex items-center gap-2">✅ <span className="font-medium text-slate-900">Design Premium:</span> Inspirado em modelos corporativos de sucesso internacional.</p>
            <p className="flex items-center gap-2">✅ <span className="font-medium text-slate-900">Foco em Conversão:</span> Cliques direcionados direto para o seu WhatsApp corporativo.</p>
            <p className="flex items-center gap-2">✅ <span className="font-medium text-slate-900">Pronto para Usar:</span> Textos e seções estruturados para contabilidade nacional.</p>
          </div>
          <a href={whatsappLink} className="bg-slate-900 text-white px-8 py-3 rounded-sm font-bold text-sm hover:bg-teal-600 transition-all inline-block shadow-md">Garantir Este Site</a>
        </div>
      </div>
    </section>
  );
}