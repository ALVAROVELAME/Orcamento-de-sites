import { 
  UtensilsCrossed, 
  Bike, 
  Sparkles, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export function ServicosModel2() {
  const diferenciais = [
    {
      icon: <UtensilsCrossed className="w-5 h-5 text-orange-600" />,
      title: "Blend Artesanal",
      desc: "Carnes nobres selecionadas, moldadas diariamente e grelhadas no fogo alto para reter toda a suculência."
    },
    {
      icon: <Bike className="w-5 h-5 text-orange-600" />,
      title: "Delivery Rápido",
      desc: "Logística inteligente e embalagens térmicas herméticas que mantêm o ponto perfeito do seu burger."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-orange-600" />,
      title: "Molhos Autorais",
      desc: "Receitas secretas desenvolvidas pelo nosso chef para criar uma harmonização inesquecível de sabores."
    },
    {
      icon: <Clock className="w-5 h-5 text-orange-600" />,
      title: "Cozinha Express",
      desc: "Processos de alta performance para garantir que seu pedido seja preparado e enviado em tempo recorde."
    }
  ];

  return (
    <section className="w-full bg-white p-6 md:p-10 rounded-3xl antialiased text-stone-800 border border-stone-100 shadow-sm relative overflow-hidden">
      
      {/* Detalhe de luz ambiente sutil ao fundo (Blob decorativo moderno) */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Alinhado e Sofisticado */}
      <div className="mb-10 flex flex-col items-start gap-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[11px] font-semibold tracking-wider text-orange-600 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Diferenciais
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
          A receita por trás da nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">perfeição</span>
        </h2>
      </div>

      {/* Grid Minimalista Avançado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-100 rounded-2xl overflow-hidden border border-stone-100">
        {diferenciais.map((item, index) => (
          <div 
            key={index}
            className="group relative bg-white p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-stone-50/60 cursor-pointer"
          >
            {/* Efeito de preenchimento gradiente sutil no hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              {/* Ícone Minimalista */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-50 border border-stone-200/60 text-stone-700 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:border-orange-200 group-hover:shadow-sm group-hover:text-orange-600">
                {item.icon}
              </div>

              {/* Título */}
              <h3 className="text-base font-bold text-stone-900 mt-4 tracking-tight group-hover:text-orange-600 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Descrição com melhor legibilidade e fluidez */}
              <p className="text-xs text-stone-500 font-medium leading-relaxed mt-2.5 max-w-sm">
                {item.desc}
              </p>
            </div>

            {/* Ícone de ação elegante tipo "SaaS" que surge no hover */}
            <div className="relative z-10 flex justify-end mt-6">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}