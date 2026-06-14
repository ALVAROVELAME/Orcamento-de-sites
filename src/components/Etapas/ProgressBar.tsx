import type { Pacote } from '../../data/precos'; 

interface ProgressBarProps {
  etapaAtual: 1 | 2 | 3;
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

  // Formatação segura para Real (R$)
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

  // Calcula a largura da linha de progresso na base da barra
  const percentualProgresso = (etapaAtual / 3) * 100;

  return (
    <div 
      className="w-full bg-white/90 backdrop-blur-lg fixed top-[73px] left-0 z-40 transition-all duration-300 shadow-sm shadow-slate-200/50"
      role="region"
      aria-label="Status do orçamento e progresso do formulário"
    >
      {/* Grid responsivo mantido com padding levemente maior (py-4) para dar respiro aos textos maiores */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-y-3.5 gap-x-2 md:flex md:flex-row md:justify-between md:items-center md:gap-4 items-center">
        
        {/* ================= BLOCADOS NA ESQUERDA (MOBILE: COLUNA 1, LINHA 1) ================= */}
        <div className="flex items-center justify-start md:min-w-[120px]">
          {/* Aumentado de text-xs para text-sm no mobile */}
          <span className="text-sm md:text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-100/60 whitespace-nowrap shadow-sm shadow-indigo-100/20">
            Etapa {etapaAtual} / 3
          </span>
        </div>

        {/* ================= DIREITA (MOBILE: COLUNA 2, LINHA 1) ================= */}
        <div className="flex items-center justify-end md:min-w-[180px]">
          {pacoteEscolhido && listaPacotes.length > 0 ? (
            <div className="relative w-full max-w-[170px] sm:max-w-[190px] group">
              <label htmlFor="seletor-pacote-direta" className="sr-only">Trocar plano contratado</label>
              
              {/* Aumentado de text-xs para text-sm no mobile e padding vertical ajustado para py-2.5 */}
              <select
                id="seletor-pacote-direta"
                value={pacoteEscolhido.id}
                onChange={handlePacoteChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-3 pr-8 rounded-xl text-sm md:text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none cursor-pointer transition-all appearance-none text-center hover:bg-slate-100 hover:border-slate-300"
              >
                {listaPacotes.map((pacote) => (
                  <option key={pacote.id} value={pacote.id} className="text-slate-800 font-medium">
                    {pacote.emoji} &nbsp; {pacote.nome}
                  </option>
                ))}
              </select>
              
              {/* Setinha customizada minimalista */}
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : pacoteEscolhido ? (
            <span className="text-sm font-bold text-slate-700 text-center w-full block bg-slate-50 border border-slate-100 py-2.5 px-3 rounded-xl max-w-[170px]">
              {pacoteEscolhido.nome}
            </span>
          ) : (
            <span className="text-sm text-slate-400 font-medium italic text-center w-full block py-2.5">
              Selecione...
            </span>
          )}
        </div>

        {/* ================= INVESTIMENTO (MOBILE: OCUPA AS 2 COLUNAS ABAIXO, LINHA 2) ================= */}
        <div 
          className="col-span-2 md:col-span-1 flex flex-row items-center gap-2 justify-center text-center bg-slate-50 md:bg-transparent py-2 md:py-0 rounded-xl md:rounded-none border border-slate-100 md:border-none"
          aria-live="polite" 
          aria-atomic="true"
        >
          {/* Aumentado de text-[11px] para text-xs estável no mobile */}
          <span className="text-xs md:text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Investimento Estimado:
          </span>
          {/* Aumentado de text-base para text-lg no mobile */}
          <span className="text-lg md:text-xl font-black text-indigo-600 tracking-tight transition-all duration-300 transform scale-100 hover:scale-102">
            {formatarMoeda(valorTotal)}
          </span>
        </div>

      </div>

      {/* ================= BARRA DE PROGRESSO DE ALTA PRECISÃO ================= */}
      <div className="w-full h-[3px] bg-slate-100/70 overflow-hidden" aria-hidden="true">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          style={{ width: `${percentualProgresso}%` }}
        />
      </div>
    </div>
  );
}