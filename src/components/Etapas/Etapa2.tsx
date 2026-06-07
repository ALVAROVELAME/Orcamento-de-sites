import type { FormEvent } from 'react';
import type { InfoSite } from '../Formulario';

interface Etapa2Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  avancarParaEtapa3: (e: FormEvent) => void;
  voltarEtapa: () => void;
}

export function Etapa2({ infoSite, setInfoSite, avancarParaEtapa3, voltarEtapa }: Etapa2Props) {
  return (
    <div className="w-full max-w-3xl px-4 py-20 animate-fade-in">
      <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Identidade Visual</h2>
        <p className="text-slate-500 font-medium mb-8">Defina o nome da marca e as cores base para o seu novo site.</p>
        
        <form onSubmit={avancarParaEtapa3} className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Site / Empresa</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Tech Soluções"
              value={infoSite.nome}
              onChange={(e) => setInfoSite({...infoSite, nome: e.target.value})}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-lg transition-all font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-4">Paleta de Cores</label>
            <div className="flex gap-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="relative group">
                      <input 
                      type="color" 
                      value={infoSite.cores[index]}
                      onChange={(e) => {
                        const novasCores = [...infoSite.cores] as [string, string, string];
                        novasCores[index] = e.target.value;
                        setInfoSite({...infoSite, cores: novasCores});
                      }}
                      aria-label={`Cor ${index + 1}`}
                      className="w-16 h-16 rounded-2xl cursor-pointer border-0 p-0 shadow-md transition-transform group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono font-bold uppercase">{infoSite.cores[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
            <button type="button" onClick={voltarEtapa} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors">
              Voltar
            </button>
            <button type="submit" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1">
              Abrir Construtor →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}