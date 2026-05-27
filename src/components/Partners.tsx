export function Partners() {
  return (
    <section className="py-12 bg-white border-b border-slate-100 w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale scroll-animate">
        
        {/* Parceiro 1 */}
        <div className="text-lg font-bold tracking-tight text-slate-900">
          SeuSite<span className="text-teal-600 font-extrabold">Contabilidade</span>
        </div>

        {/* Parceiro 2 */}
        <div className="text-lg font-bold tracking-tight text-slate-900">
          SeuSite<span className="text-teal-600 font-extrabold">Finanças</span>
        </div>

        {/* Parceiro 3 */}
        <div className="text-lg font-bold tracking-tight text-slate-900">
          SeuSite<span className="text-teal-600 font-extrabold">Consultoria</span>
        </div>

        {/* Parceiro 4 */}
        <div className="text-lg font-bold tracking-tight text-slate-900">
          SeuSite<span className="text-teal-600 font-extrabold">Auditoria</span>
        </div>

      </div>
    </section>
  );
}