// IMPORTAÇÃO CONSOLIDADA: Buscando os dados estruturados do arquivo central de preços
import { PACOTES } from '../../data/precos'; 
import type { Pacote } from '../../data/precos';

interface Etapa1Props {
  avancarParaEtapa2: (pacote: Pacote) => void;
}

export function Etapa1({ avancarParaEtapa2 }: Etapa1Props) {
  
  // Função auxiliar para formatar a moeda localmente nos cards
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="w-full max-w-7xl px-4 py-8 md:py-20 flex flex-col items-center animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 text-center tracking-tight">
        Escolha o plano ideal
      </h1>
      <p className="text-base md:text-lg text-slate-500 mb-8 md:mb-12 text-center max-w-2xl font-medium">
        Selecione o pacote que melhor atende ao seu projeto para liberarmos as seções no construtor.
      </p>
      
      {/* Grid responsiva contendo os 4 planos oficiais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
        {PACOTES.map((pacote) => (
          <div 
            key={pacote.id} 
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Topo do Card: Informações principais */}
            <div>
              <div className="text-4xl mb-4 bg-slate-50 w-14 h-14 flex items-center justify-center rounded-2xl">
                {pacote.emoji}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                {pacote.nome}
              </h3>
              
              <p className="text-sm text-slate-500 mb-6 font-medium">
                {pacote.descricao}
              </p>

              {/* Lista Dinâmica de Detalhes e Benefícios do Plano */}
              <ul className="mb-8 space-y-3 md:space-y-4">
                {pacote.detalhes?.map((detalhe, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-600 font-medium">
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

            {/* Rodapé do Card: Preços e Ação */}
            <div>
              <p className="text-3xl md:text-4xl font-black text-indigo-600 mb-2">
                {formatarMoeda(pacote.precoBase)}
              </p>
              
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                Limite: {pacote.limiteSecoes} seções básicas
              </p>
              
              <button 
                type="button"
                onClick={() => avancarParaEtapa2(pacote)}
                className="w-full py-3.5 md:py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-base md:text-lg transition-colors shadow-lg shadow-slate-900/20"
              >
                Selecionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}