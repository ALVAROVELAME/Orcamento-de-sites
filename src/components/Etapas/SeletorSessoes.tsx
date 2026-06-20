import type { CategoriaSecao } from '../../data/precos';
import { BIBLIOTECA_SECOES } from './constants';

interface Props {
  selecionados: CategoriaSecao[];
  setSelecionados: React.Dispatch<React.SetStateAction<CategoriaSecao[]>>;
  limiteSecoes: number;
}

export function SeletorSessoes({ selecionados, setSelecionados, limiteSecoes }: Props) {
  const categorias = Object.keys(BIBLIOTECA_SECOES) as CategoriaSecao[];

  const handleToggle = (cat: CategoriaSecao) => {
    setSelecionados(prev => {
      if (prev.includes(cat)) {
        return prev.filter(item => item !== cat);
      } else {
        if (prev.length >= limiteSecoes) return prev;
        return [...prev, cat];
      }
    });
  };

  const obterEstiloCard = (index: number) => {
    const gradients = [
      'from-blue-600 to-cyan-500', 'from-purple-600 to-indigo-600',
      'from-pink-500 to-rose-500', 'from-emerald-500 to-teal-600',
      'from-orange-500 to-amber-500', 'from-violet-600 to-fuchsia-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="w-full">
      {/* 👇 AQUI FOI FEITA A ALTERAÇÃO: lg:grid-cols-4 e gap-5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categorias.map((cat, index) => {
          const isChecked = selecionados.includes(cat);
          const isDisabled = !isChecked && selecionados.length >= limiteSecoes;

          return (
            <div 
              key={cat}
              onClick={() => !isDisabled && handleToggle(cat)}
              className={`relative bg-white border-2 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isChecked ? 'border-indigo-600 shadow-lg ring-4 ring-indigo-50' : 
                isDisabled ? 'border-slate-200 opacity-50 cursor-not-allowed' : 'border-slate-200 hover:border-indigo-400 hover:shadow-md'
              }`}
            >
              <div className={`w-full h-32 md:h-36 bg-gradient-to-br ${obterEstiloCard(index)} flex items-center justify-center relative`}>
                <span className="text-5xl md:text-6xl drop-shadow-md">{BIBLIOTECA_SECOES[cat][0]?.thumb}</span>
                {isChecked && (
                  <div className="absolute top-3 right-3 bg-white text-indigo-600 p-1.5 rounded-full shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  readOnly 
                  aria-label={`Selecionar seção ${cat}`}
                  className="w-5 h-5 accent-indigo-600 pointer-events-none shrink-0" 
                />
                <span className="font-bold text-base text-slate-800 capitalize truncate">{cat}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
