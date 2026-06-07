import type { Pacote } from '../Formulario';

interface ProgressBarProps {
  etapaAtual: 1 | 2 | 3;
  pacoteEscolhido: Pacote | null;
  voltarEtapa: () => void;
}

export function ProgressBar({ etapaAtual, pacoteEscolhido, voltarEtapa }: ProgressBarProps) {
  // Mapeamento de nomes para o modo Mobile simplificado
  const nomesEtapas = {
    1: 'Escolha do Pacote',
    2: 'Identidade Visual',
    3: 'Ajustes e Seções',
  };

  // Cálculo da porcentagem real para a barra de progresso fluida do mobile
  const porcentagemProgresso = etapaAtual === 1 ? 'w-1/3' : etapaAtual === 2 ? 'w-2/3' : 'w-full';

  return (
    <div 
      className="w-full bg-white shadow-md border-b border-slate-200/80 fixed top-[73px] left-0 z-40 transition-all duration-300"
      role="progressbar"
      aria-valuenow={etapaAtual}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-label={`Etapa ${etapaAtual} de 3: ${nomesEtapas[etapaAtual]}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row justify-between items-center gap-3.5 md:gap-4">
        
        {/* ================= VISUAL MOBILE-FIRST (Acessível e Limpo) ================= */}
        <div className="flex flex-col w-full md:hidden gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Etapa {etapaAtual} de 3
            </span>
            <span className="text-sm font-bold text-slate-700">
              {nomesEtapas[etapaAtual]}
            </span>
          </div>
          {/* Barra de progresso linear moderna */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-indigo-600 rounded-full ${porcentagemProgresso} transition-all duration-500 ease-out`} />
          </div>
        </div>

        {/* ================= VISUAL DESKTOP (`md:flex`) ================= */}
        <div className="hidden md:flex items-center justify-center gap-3 text-sm font-bold md:w-auto">
          <span 
            aria-current={etapaAtual === 1 ? 'step' : undefined}
            className={`px-3.5 py-1.5 rounded-full shadow-sm transition-all duration-300 ${etapaAtual >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}
          >
            1. Pacote
          </span>
          <div className={`w-12 h-1 rounded-full transition-colors duration-300 ${etapaAtual >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          
          <span 
            aria-current={etapaAtual === 2 ? 'step' : undefined}
            className={`px-3.5 py-1.5 rounded-full shadow-sm transition-all duration-300 ${etapaAtual >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}
          >
            2. Identidade
          </span>
          <div className={`w-12 h-1 rounded-full transition-colors duration-300 ${etapaAtual === 3 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
          
          <span 
            aria-current={etapaAtual === 3 ? 'step' : undefined}
            className={`px-3.5 py-1.5 rounded-full shadow-sm transition-all duration-300 ${etapaAtual === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}
          >
            3. Ajustes
          </span>
        </div>

        {/* ================= RESUMO DO PACOTE ESCOLHIDO ================= */}
        {etapaAtual > 1 && pacoteEscolhido && (
          <div className="flex w-full md:w-auto items-center justify-between bg-slate-50 border border-slate-200/60 p-3 md:px-4 md:py-2 rounded-xl gap-4 shadow-inner">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Plano Ativo</p>
                <p className="text-sm font-bold text-slate-800 line-clamp-1">{pacoteEscolhido.nome}</p>
              </div>
              <div className="h-7 w-px bg-slate-200"></div>
              <div className="text-xs text-indigo-600 bg-indigo-50/60 px-2 py-0.5 rounded-md font-bold whitespace-nowrap">
                {pacoteEscolhido.limiteSecoes} Seções
              </div>
            </div>
            
            {/* Botão com área de toque (touch target) aumentada no mobile */}
            <button 
              onClick={voltarEtapa} 
              className="text-xs bg-white border border-slate-200 py-2.5 px-3.5 md:py-1.5 md:px-3 rounded-lg hover:bg-slate-50 active:bg-slate-100 font-bold text-slate-600 shadow-sm transition-all shrink-0 focus:ring-2 focus:ring-indigo-500/20 outline-none min-h-[40px] md:min-h-0 flex items-center justify-center"
            >
              Alterar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}