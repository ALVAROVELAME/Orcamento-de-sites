import type { Pacote } from '../../../data/precos';
import { obterTotalSecoesComCapa } from '../../../data/precos';

interface PlanSelectionStepProps {
  titulo: string;
  descricao: string;
  descricaoExtra?: string;
  textoBotaoSelecionar: string;
  prefixoLimiteSecoes: string;
  sufixoLimiteSecoes: string;
  pacotes: Pacote[];
  onSelecionar: (pacote: Pacote) => void;
}

const formatarMoeda = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function PlanSelectionStep({
  titulo,
  descricao,
  descricaoExtra,
  textoBotaoSelecionar,
  prefixoLimiteSecoes,
  sufixoLimiteSecoes,
  pacotes,
  onSelecionar
}: PlanSelectionStepProps) {
  const gridClassName =
    pacotes.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3 lg:max-w-6xl lg:mx-auto' : 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <div className="w-full max-w-7xl px-4 py-8 md:py-20 flex flex-col items-center animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 text-center tracking-tight">
        {titulo}
      </h1>
      <p className="text-lg md:text-xl text-slate-700 mb-8 md:mb-12 text-center max-w-2xl font-medium">
        {descricao}
      </p>
      {descricaoExtra ? (
        <p className="-mt-4 mb-8 md:mb-12 text-base md:text-lg text-slate-600 text-center max-w-2xl font-medium leading-relaxed">
          {descricaoExtra}
        </p>
      ) : null}

      <div className={`grid grid-cols-1 gap-6 md:gap-8 w-full ${gridClassName}`}>
        {pacotes.map((pacote) => (
          <div
            key={pacote.id}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-4 bg-slate-50 w-14 h-14 flex items-center justify-center rounded-2xl">
                {pacote.icone}
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{pacote.nome}</h2>

              <p className="text-base text-slate-700 mb-6 font-medium leading-relaxed">{pacote.descricao}</p>

              <ul className="mb-8 space-y-3 md:space-y-4">
                {pacote.detalhes.map((detalhe, index) => (
                  <li key={`${pacote.id}-${index}`} className="flex items-center text-base text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {detalhe}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-black text-indigo-600 mb-2">{formatarMoeda(pacote.precoBase)}</p>

              <p className="text-sm text-slate-600 font-bold uppercase tracking-wider mb-6 leading-relaxed">
                {prefixoLimiteSecoes} {pacote.limiteSecoes} {sufixoLimiteSecoes} (+ capa garantida, total {obterTotalSecoesComCapa(pacote)})
              </p>

              <button
                type="button"
                onClick={() => onSelecionar(pacote)}
                className="w-full py-3.5 md:py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-base md:text-lg transition-colors shadow-lg shadow-slate-900/20"
              >
                {textoBotaoSelecionar}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
