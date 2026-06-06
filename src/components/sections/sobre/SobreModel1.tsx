import { 
  Compass, 
  MapPin, 
  Globe, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function SobreModel1() {
  const destaques = [
    {
      icon: <Compass className="w-5 h-5 text-sky-600" />,
      title: "Roteiros Sob Medida",
      desc: "Viagens planejadas exclusivamente para o seu estilo, ritmo e orçamento."
    },
    {
      icon: <Globe className="w-5 h-5 text-sky-600" />,
      title: "Suporte Global 24/7",
      desc: "Assistência completa em tempo real para qualquer imprevisto em qualquer fuso."
    }
  ];

  return (
    <section className="w-full bg-white p-6 md:p-10 rounded-3xl antialiased text-stone-800 border border-stone-100 shadow-sm relative overflow-hidden">
      
      {/* Luz ambiente sutil ao fundo (Blob decorativo simulando o mar/céu) */}
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Lado Esquerdo: Texto Institucional */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[11px] font-semibold tracking-wider text-sky-600 uppercase">
            <MapPin className="w-3 h-3 text-sky-500" />
            Quem Somos
          </div>
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Criamos pontes entre você e os destinos mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">extraordinários</span> do mundo
          </h2>
          
          <p className="text-xs md:text-sm text-stone-500 font-medium leading-relaxed max-w-xl">
            Desde 2018, transformamos simples viagens em jornadas inesquecíveis. Não vendemos apenas passagens ou hospedagens; desenhamos experiências autênticas, imersões culturais e momentos que ficam guardados para sempre na memória.
          </p>

          {/* Mini-Grid de Destaques Rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4 pt-6 border-t border-stone-100">
            {destaques.map((item, index) => (
              <div key={index} className="group flex flex-col gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-50 border border-stone-200/60 text-stone-600 group-hover:bg-sky-50 group-hover:border-sky-200 group-hover:text-sky-600 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-stone-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Direito: Quadro de Estatísticas / Visual Premium Bento */}
        <div className="lg:col-span-5 w-full bg-stone-50/50 rounded-2xl p-4 border border-stone-100/80 backdrop-blur-sm grid grid-cols-2 gap-3">
          
          {/* Card Destinos */}
          <div className="bg-white p-5 rounded-xl border border-stone-100 shadow-xs flex flex-col justify-between h-28 group hover:border-sky-200 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-black text-stone-900 group-hover:text-sky-600 transition-colors">+50</span>
            <div>
              <p className="text-xs font-bold text-stone-800">Países Catalogados</p>
              <p className="text-[10px] text-stone-400 font-medium">Do exótico ao clássico.</p>
            </div>
          </div>

          {/* Card Viajantes */}
          <div className="bg-white p-5 rounded-xl border border-stone-100 shadow-xs flex flex-col justify-between h-28 group hover:border-sky-200 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-black text-stone-900 group-hover:text-sky-600 transition-colors">12k</span>
            <div>
              <p className="text-xs font-bold text-stone-800">Clientes Felizes</p>
              <p className="text-[10px] text-stone-400 font-medium">Histórias compartilhadas.</p>
            </div>
          </div>

          {/* Card Grande Call to Action Integrado */}
          <div className="col-span-2 bg-gradient-to-br from-sky-900 to-stone-950 p-5 rounded-xl text-white flex items-center justify-between group cursor-pointer hover:shadow-lg hover:shadow-sky-950/20 transition-all duration-300">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sky-400 text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" /> Comece a planejar
              </div>
              <p className="text-sm font-bold tracking-tight">Pronto para o próximo carimbo?</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 group-hover:bg-sky-500 text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}