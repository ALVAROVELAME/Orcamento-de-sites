import type { Pacote } from '../Formulario';

interface ProgressBarProps {
  etapaAtual: 1 | 2 | 3;
  pacoteEscolhido: Pacote | null;
  voltarEtapa: () => void;
}

export function ProgressBar({ etapaAtual, pacoteEscolhido, voltarEtapa }: ProgressBarProps) {
  return (
    <div className="w-full bg-white shadow-sm border-b border-slate-200 fixed top-[73px] left-0 z-40">
      {/* Redução de py-4 para py-3 no mobile */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        
        {/* Passos mais compactos no mobile */}
        <div className="flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-bold w-full md:w-auto">
          <span className={`px-2.5 py-1 md:px-3 md:py-1 rounded-full whitespace-nowrap ${etapaAtual >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1. Pacote</span>
          <div className={`w-3 md:w-8 h-1 rounded ${etapaAtual >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          <span className={`px-2.5 py-1 md:px-3 md:py-1 rounded-full whitespace-nowrap ${etapaAtual >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2. Identidade</span>
          <div className={`w-3 md:w-8 h-1 rounded ${etapaAtual === 3 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          <span className={`px-2.5 py-1 md:px-3 md:py-1 rounded-full whitespace-nowrap ${etapaAtual === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>3. Ajustes</span>
        </div>

        {/* Resumo do pacote ocupando 100% da tela no mobile para toque fácil */}
        {etapaAtual > 1 && pacoteEscolhido && (
          <div className="flex w-full md:w-auto items-center justify-between bg-indigo-50 border border-indigo-100 px-3 py-2 md:px-4 md:py-2 rounded-xl gap-2 md:gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[9px] md:text-[10px] text-indigo-600 font-extrabold uppercase tracking-wider">Pacote</p>
                <p className="text-xs md:text-sm font-bold text-slate-800 line-clamp-1">{pacoteEscolhido.nome}</p>
              </div>
              <div className="h-6 md:h-8 w-px bg-indigo-200"></div>
              <div className="text-[10px] md:text-xs text-slate-600 font-semibold whitespace-nowrap">
                {pacoteEscolhido.limiteSecoes} Seções
              </div>
            </div>
            <button onClick={voltarEtapa} className="text-[10px] md:text-xs bg-white border border-slate-200 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg hover:bg-slate-50 transition-colors font-bold text-slate-600 shadow-sm shrink-0">
              Alterar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}