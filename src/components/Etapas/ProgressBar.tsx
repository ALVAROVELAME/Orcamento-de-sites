import type { Pacote } from '../Formulario';

interface ProgressBarProps {
  etapaAtual: 1 | 2 | 3;
  pacoteEscolhido: Pacote | null;
  voltarEtapa: () => void;
}

export function ProgressBar({ etapaAtual, pacoteEscolhido, voltarEtapa }: ProgressBarProps) {
  return (
    /* Alterado para: fixed top-[73px] (ou a altura exata do seu nav), z-40 (logo abaixo do z-50 do nav) */
    <div className="w-full bg-white shadow-sm border-b border-slate-200 fixed top-[73px] left-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className={`px-3 py-1 rounded-full ${etapaAtual >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1. Pacote</span>
          <div className={`w-8 h-1 rounded ${etapaAtual >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          <span className={`px-3 py-1 rounded-full ${etapaAtual >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2. Identidade</span>
          <div className={`w-8 h-1 rounded ${etapaAtual === 3 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          <span className={`px-3 py-1 rounded-full ${etapaAtual === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>3. Personalização</span>
        </div>

        {etapaAtual > 1 && pacoteEscolhido && (
          <div className="flex items-center bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl gap-4">
            <div>
              <p className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-wider">Pacote</p>
              <p className="text-sm font-bold text-slate-800">{pacoteEscolhido.nome}</p>
            </div>
            <div className="h-8 w-px bg-indigo-200"></div>
            <div className="text-xs text-slate-600 font-semibold">
              <span className="block">{pacoteEscolhido.limiteSecoes} Seções</span>
            </div>
            <button onClick={voltarEtapa} className="ml-2 text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors font-bold text-slate-600">
              Alterar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}