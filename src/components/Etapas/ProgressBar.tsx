import type { Pacote } from '../../data/precos'; 

interface ProgressBarProps {
  etapaAtual: 1 | 2 | 3 | 4 | 5 | 6; 
  pacoteEscolhido: Pacote | null;
  listaPacotes: Pacote[];
  valorTotal: number;
  selecionarPacote: (pacote: Pacote) => void;
}

export function ProgressBar({ 
  etapaAtual, 
  pacoteEscolhido, 
  listaPacotes = [], 
  valorTotal = 0,       
  selecionarPacote
}: ProgressBarProps) {

  const ehEcommerce = pacoteEscolhido?.nome.toLowerCase().includes('loja') || 
                      pacoteEscolhido?.nome.toLowerCase().includes('e-commerce');
  const totalEtapas = ehEcommerce ? 6 : 5;

  const formatarMoeda = (valor: number) => {
    const numeroValido = typeof valor === 'number' ? valor : 0;
    return numeroValido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handlePacoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pacoteId = e.target.value;
    const pacoteEncontrado = listaPacotes.find(p => p.id === pacoteId);
    if (pacoteEncontrado && selecionarPacote) {
      selecionarPacote(pacoteEncontrado);
    }
  };

  // Mapeamento de larguras exatas baseadas na proporção (Sem estilos inline e sem variáveis não usadas)
  const obterClasseLargura = () => {
    if (totalEtapas === 5) {
      const larguras5: Record<number, string> = {
        1: 'w-1/5', // 20%
        2: 'w-2/5', // 40%
        3: 'w-3/5', // 60%
        4: 'w-4/5', // 80%
        5: 'w-full' // 100%
      };
      return larguras5[etapaAtual] || 'w-0';
    } else {
      const larguras6: Record<number, string> = {
        1: 'w-1/6', // 16.6%
        2: 'w-2/6', // 33.3%
        3: 'w-3/6', // 50%
        4: 'w-4/6', // 66.6%
        5: 'w-5/6', // 83.3%
        6: 'w-full' // 100%
      };
      return larguras6[etapaAtual] || 'w-0';
    }
  };

  return (
    <div 
      className="w-full bg-white/95 backdrop-blur-md sticky top-[72px] left-0 z-40 transition-all duration-300 shadow-lg shadow-slate-200/50 border-b border-slate-100"
      role="region"
      aria-label="Status do orçamento e progresso do formulário"
    >
      <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 gap-y-4 gap-x-4 md:flex md:flex-row md:justify-between md:items-center md:gap-8">
        
        {/* Contador de Etapas com destaque visual ampliado */}
        <div className="flex items-center justify-start md:min-w-[160px]">
          <span className="text-sm md:text-base font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 px-5 py-3 rounded-xl border border-indigo-200/60 whitespace-nowrap shadow-sm">
            Etapa {etapaAtual} de {totalEtapas}
          </span>
        </div>

        {/* Seletor de Plano com tipografia robusta */}
        <div className="flex items-center justify-end md:min-w-[260px]">
          {pacoteEscolhido && listaPacotes.length > 0 ? (
            <div className="relative w-full max-w-[240px] group">
              <label htmlFor="seletor-pacote-direta" className="sr-only">Trocar plano contratado</label>
              <select
                id="seletor-pacote-direta"
                value={pacoteEscolhido.id}
                onChange={handlePacoteChange}
                className="w-full bg-white border-2 border-slate-200 text-slate-800 py-3 pl-4 pr-10 rounded-xl text-base font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none cursor-pointer transition-all appearance-none text-left hover:border-indigo-300"
              >
                {listaPacotes.map((pacote) => (
                  <option key={pacote.id} value={pacote.id} className="font-bold text-base">
                    {pacote.nome}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <span className="text-base text-slate-400 font-medium italic">Selecione o plano...</span>
          )}
        </div>

        {/* Bloco do Investimento Estimado em tamanho grande */}
        <div className="col-span-2 md:col-span-1 flex flex-row items-center gap-3 justify-center text-center bg-slate-50 md:bg-transparent py-3 md:py-0 rounded-xl border border-slate-100 md:border-none">
          <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">
            Total Estimado:
          </span>
          <span className="text-2xl md:text-3xl font-black text-indigo-600 tracking-tight">
            {formatarMoeda(valorTotal)}
          </span>
        </div>
      </div>

      {/* Barra de Progresso - Sem nenhum atributo style/inline CSS */}
      <div className="w-full h-[4px] bg-slate-100 overflow-hidden" aria-hidden="true">
        <div 
          className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-700 ease-out ${obterClasseLargura()}`} 
        />
      </div>
    </div>
  );
}
