interface ServicesSectionProps {
  whatsappLink: string;
}

export function ServicesSection({ whatsappLink }: ServicesSectionProps) {
  return (
    <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100 w-full" id="servicos">
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-16 scroll-animate">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Nossos Serviços</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Soluções Eficientes para Todo Tipo de Empresa</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-md shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-animate">
            <div className="w-10 h-10 bg-slate-100 text-teal-600 rounded flex items-center justify-center mb-6 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">📄</div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Demonstrações Financeiras</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Estruturação de balanços patrimoniais, DRE e relatórios consolidados para tomada de decisões seguras.</p>
            <a href={whatsappLink} className="text-slate-900 font-semibold text-sm hover:text-teal-600 flex items-center gap-1">Ler Mais →</a>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-8 rounded-md shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-animate">
            <div className="w-10 h-10 bg-slate-100 text-teal-600 rounded flex items-center justify-center mb-6 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">💰</div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Planejamento Tributário</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Análise técnica detalhada focada em reduzir legalmente a carga de impostos da sua empresa.</p>
            <a href={whatsappLink} className="text-slate-900 font-semibold text-sm hover:text-teal-600 flex items-center gap-1">Ler Mais →</a>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-8 rounded-md shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-animate">
            <div className="w-10 h-10 bg-slate-100 text-teal-600 rounded flex items-center justify-center mb-6 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">📊</div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Rotinas Contábeis</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Escrituração digital completa, conciliação bancária rigorosa e assessoria contínua para o dia a dia.</p>
            <a href={whatsappLink} className="text-slate-900 font-semibold text-sm hover:text-teal-600 flex items-center gap-1">Ler Mais →</a>
          </div>
        </div>
      </div>
    </section>
  );
}