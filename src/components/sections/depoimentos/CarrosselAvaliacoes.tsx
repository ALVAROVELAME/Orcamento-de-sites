import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const avaliacoes = [
  { id: 1, nome: "Laura Mendes", cargo: "Head de Produto • Nubank", texto: "A plataforma revolucionou nossa forma de trabalhar. O suporte é extremamente ágil e o time realmente se importa com nossos resultados." },
  { id: 2, nome: "Rafael Costa", cargo: "CTO • ScaleFlow", texto: "Escalabilidade absurda e estabilidade impecável. Superou todas as expectativas desde o primeiro mês de uso." },
  { id: 3, nome: "Beatriz Albuquerque", cargo: "Diretora de Operações • Venti", texto: "Interface limpa, intuitiva e extremamente eficiente. Nossa produtividade aumentou significativamente." },
  { id: 4, nome: "Thiago Nakamura", cargo: "CEO • Lumina Tech", texto: "Melhor decisão tecnológica que tomamos este ano. O ROI foi visível já nas primeiras semanas." },
  { id: 5, nome: "Camila Ferreira", cargo: "Gerente de Growth • Aurora", texto: "O nível de personalização e a qualidade do suporte são incomparáveis no mercado." },
  { id: 6, nome: "Pedro Henrique Lima", cargo: "VP de Tecnologia • Forge", texto: "Finalmente uma ferramenta que realmente entrega o que promete. Recomendo sem hesitar." },
];

export function CarrosselAvaliacoes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2; // mantemos 2 no desktop

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (avaliacoes.length - itemsPerView + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (avaliacoes.length - itemsPerView + 1)) % (avaliacoes.length - itemsPerView + 1));
  };

  const currentGroup = avaliacoes.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-slate-200 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-600">Depoimentos reais</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Empresas que já transformaram sua operação com nossa plataforma
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {currentGroup.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white p-7 md:p-10 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
                  >
                    <div className="text-7xl md:text-8xl text-indigo-100 font-serif leading-none mb-4 md:mb-6 group-hover:text-indigo-50 transition-colors">
                      “
                    </div>

                    <p className="text-base md:text-lg leading-relaxed text-slate-700 mb-8 md:mb-10 flex-1 italic">
                      {item.texto}
                    </p>

                    <div className="flex items-center gap-4 md:gap-5 mt-auto">
                      <img
                        src={`https://i.pravatar.cc/120?u=${item.id}`}
                        alt={item.nome}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover ring-4 ring-white shadow-md"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm md:text-base">{item.nome}</h4>
                        <p className="text-sm text-indigo-700 font-medium">{item.cargo}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegação */}
          <div className="flex items-center justify-center gap-4 mt-10 md:mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all active:scale-95"
            >
              ←
            </button>
            
            <div className="flex gap-3">
              {Array.from({ length: avaliacoes.length - itemsPerView + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === i ? 'bg-indigo-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all active:scale-95"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
