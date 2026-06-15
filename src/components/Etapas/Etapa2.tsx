import type { FormEvent } from 'react';
import type { InfoSite } from '../Formulario';
import { BotoesNavegacao } from './BotoesNavegacao';

interface Etapa2Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  avancarParaEtapa3: (e: FormEvent) => void;
  voltarEtapa: () => void;
}

export function Etapa2({ infoSite, setInfoSite, avancarParaEtapa3, voltarEtapa }: Etapa2Props) {
  
  // Função para gerenciar a seleção de múltiplos estilos de marca (Checkboxes)
  const handleEstiloMarcaChange = (estilo: string, checked: boolean) => {
    const estilosAtuais = infoSite.estilo_marca || [];
    let novosEstilos: string[];

    if (checked) {
      novosEstilos = [...estilosAtuais, estilo];
    } else {
      novosEstilos = estilosAtuais.filter((e) => e !== estilo);
    }

    setInfoSite({ ...infoSite, estilo_marca: novosEstilos });
  };

  return (
    <div className="w-full max-w-3xl px-4 py-8 md:py-20 animate-fade-in">
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Identidade Visual</h2>
        <p className="text-sm md:text-base text-slate-500 font-medium mb-6 md:mb-8">
          Defina o nome da marca, as cores base e as preferências visuais do seu novo site.
        </p>
        
        <form onSubmit={avancarParaEtapa3} className="space-y-6 md:space-y-8">
          
          {/* Nome do Site */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Site / Empresa</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Tech Soluções"
              value={infoSite.nome || ''}
              onChange={(e) => setInfoSite({...infoSite, nome: e.target.value})}
              className="w-full px-4 py-3.5 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-base md:text-lg transition-all font-medium text-slate-800"
            />
          </div>

          {/* SEÇÃO DO LOGOTIPO */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">Sobre o Logotipo *</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-medium text-sm md:text-base">
                <input 
                  type="radio" 
                  name="status_logo" 
                  value="Já tenho o Logo em alta qualidade" 
                  checked={infoSite.status_logo === "Já tenho o Logo em alta qualidade"}
                  onChange={(e) => setInfoSite({ ...infoSite, status_logo: e.target.value })}
                  className="w-4 h-4 text-pink-600 focus:ring-pink-500 accent-pink-600" 
                  required
                /> 
                <span>Já tenho o Logo em alta qualidade</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-medium text-sm md:text-base">
                <input 
                  type="radio" 
                  name="status_logo" 
                  value="Tenho apenas a imagem (PNG/JPG)"
                  checked={infoSite.status_logo === "Tenho apenas a imagem (PNG/JPG)"}
                  onChange={(e) => setInfoSite({ ...infoSite, status_logo: e.target.value })}
                  className="w-4 h-4 text-pink-600 focus:ring-pink-500 accent-pink-600"
                /> 
                <span>Tenho apenas imagem (PNG/JPG)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-medium text-sm md:text-base">
                <input 
                  type="radio" 
                  name="status_logo" 
                  value="Preciso que o logo seja criado"
                  checked={infoSite.status_logo === "Preciso que o logo seja criado"}
                  onChange={(e) => setInfoSite({ ...infoSite, status_logo: e.target.value })}
                  className="w-4 h-4 text-pink-600 focus:ring-pink-500 accent-pink-600"
                /> 
                <span className="font-semibold text-pink-700">Quero que criem o logo para mim</span>
              </label>
            </div>

            {/* LÓGICA CONDICIONAL: Exibe Estilos E a Paleta de Cores apenas se a opção selecionada for "Preciso que o logo seja criado" */}
            {infoSite.status_logo === "Preciso que o logo seja criado" && (
              <div className="mt-4 p-5 bg-pink-50/60 border border-pink-200 rounded-2xl space-y-6 animate-fade-in">
                
                {/* Checkboxes de Percepção da Marca */}
                <div>
                  <p className="font-bold text-pink-800 text-sm md:text-base mb-3">Como você quer que a marca seja percebida?</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-semibold text-slate-700">
                    {['Moderna', 'Clássica/Séria', 'Divertida', 'Luxuosa', 'Minimalista'].map((estilo) => (
                      <label key={estilo} className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
                        <input 
                          type="checkbox" 
                          value={estilo}
                          checked={infoSite.estilo_marca?.includes(estilo) || false}
                          onChange={(e) => handleEstiloMarcaChange(estilo, e.target.checked)}
                          className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 accent-pink-600" 
                        /> 
                        <span>{estilo === 'Clássica/Séria' ? 'Clássica' : estilo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Paleta de Cores */}
                <div className="pt-4 border-t border-pink-200/60">
                  <label className="block text-sm font-bold text-pink-800 mb-3">Escolha sua Paleta de Cores:</label>
                  <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="flex flex-col items-center gap-2 md:gap-3">
                        <div className="relative group">
                          <input 
                            type="color" 
                            value={infoSite.cores?.[index] || '#ffffff'}
                            onChange={(e) => {
                              const novasCores = [...(infoSite.cores || ['#ffffff', '#ffffff', '#ffffff'])] as [string, string, string];
                              novasCores[index] = e.target.value;
                              setInfoSite({...infoSite, cores: novasCores});
                            }}
                            aria-label={`Cor ${index + 1}`}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl cursor-pointer border-0 p-0 shadow-md transition-transform md:group-hover:scale-105"
                          />
                        </div>
                        <span className="text-[10px] md:text-xs text-pink-700 font-mono font-bold uppercase">
                          {infoSite.cores?.[index] || '#ffffff'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Botões de Ação sem erros de propriedade ausente */}
          <BotoesNavegacao
            onVoltar={voltarEtapa}
            desabilitarProximo={false}
          />
          
        </form>
      </div>
    </div>
  );
}