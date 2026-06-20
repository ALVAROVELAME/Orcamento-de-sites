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
    <div className="w-full max-w-3xl px-4 py-8 md:py-16 animate-fade-in">
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Identidade Visual</h2>
        <p className="text-base md:text-lg text-slate-600 font-medium mb-6 md:mb-8">
          Defina o nome da marca, as cores base e as preferências visuais do seu novo site.
        </p>
        
        <form onSubmit={avancarParaEtapa3} className="space-y-6 md:space-y-8">
          
          {/* Nome do Site */}
          <div>
            <label htmlFor="nome-site" className="block text-base md:text-lg font-bold text-slate-800 mb-2">
              Nome do Site / Empresa
            </label>
            <input 
              id="nome-site"
              type="text" 
              required
              placeholder="Ex: Tech Soluções"
              value={infoSite.nome || ''}
              onChange={(e) => setInfoSite({...infoSite, nome: e.target.value})}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-lg transition-all font-medium text-slate-800"
            />
          </div>

          <fieldset className="bg-slate-50 p-6 rounded-2xl border border-slate-300 space-y-4">
            <legend className="text-base md:text-lg font-bold text-slate-800 float-left w-full mb-2">
              Hospedagem e Domínio *
            </legend>
            <p className="text-sm text-slate-600 clear-both">
              Informe se você já possui hospedagem e domínio. Caso não tenha, adicionaremos esse item no orçamento.
            </p>

            <div className="space-y-4 pt-2 clear-both">
              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                <input
                  type="radio"
                  name="tem_hospedagem_dominio"
                  value="true"
                  checked={infoSite.tem_hospedagem_dominio === true}
                  onChange={() => setInfoSite({ ...infoSite, tem_hospedagem_dominio: true })}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                  required
                />
                <span>Já tenho hospedagem e domínio</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                <input
                  type="radio"
                  name="tem_hospedagem_dominio"
                  value="false"
                  checked={infoSite.tem_hospedagem_dominio === false}
                  onChange={() => setInfoSite({ ...infoSite, tem_hospedagem_dominio: false })}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span>Não tenho, quero incluir no orçamento</span>
              </label>
            </div>
          </fieldset>

          {/* SEÇÃO DO LOGOTIPO */}
          <fieldset className="bg-slate-50 p-6 rounded-2xl border border-slate-300 space-y-4">
            <legend className="text-base md:text-lg font-bold text-slate-800 float-left w-full mb-2">
              Sobre o Logotipo *
            </legend>
            
            <div className="space-y-4 pt-2 clear-both">
              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                <input 
                  type="radio" 
                  name="status_logo" 
                  value="Já tenho o Logo em alta qualidade" 
                  checked={infoSite.status_logo === "Já tenho o Logo em alta qualidade"}
                  onChange={(e) => setInfoSite({ ...infoSite, status_logo: e.target.value })}
                  className="w-5 h-5 text-pink-600 focus:ring-pink-500 accent-pink-600" 
                  required
                /> 
                <span>Já tenho o Logo em alta qualidade</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                <input 
                  type="radio" 
                  name="status_logo" 
                  value="Tenho apenas a imagem (PNG/JPG)"
                  checked={infoSite.status_logo === "Tenho apenas a imagem (PNG/JPG)"}
                  onChange={(e) => setInfoSite({ ...infoSite, status_logo: e.target.value })}
                  className="w-5 h-5 text-pink-600 focus:ring-pink-500 accent-pink-600"
                /> 
                <span>Tenho apenas imagem (PNG/JPG)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                <input 
                  type="radio" 
                  name="status_logo" 
                  value="Preciso que o logo seja criado"
                  checked={infoSite.status_logo === "Preciso que o logo seja criado"}
                  onChange={(e) => setInfoSite({ ...infoSite, status_logo: e.target.value })}
                  className="w-5 h-5 text-pink-600 focus:ring-pink-500 accent-pink-600"
                /> 
                <span className="font-extrabold text-pink-800">Quero que criem o logo para mim</span>
              </label>
            </div>

            {/* LÓGICA CONDICIONAL */}
            {infoSite.status_logo === "Preciso que o logo seja criado" && (
              <div className="mt-4 p-5 bg-pink-50/60 border border-pink-200 rounded-2xl space-y-6 animate-fade-in">
                
                {/* Checkboxes de Percepção da Marca */}
                <fieldset>
                  <legend className="font-bold text-pink-900 text-base md:text-lg mb-3">
                    Como você quer que a marca seja percebida?
                  </legend>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base font-bold text-slate-700">
                    {/* idx removido daqui para sanar o erro do TypeScript */}
                    {['Moderna', 'Clássica/Séria', 'Divertida', 'Luxuosa', 'Minimalista'].map((estilo) => (
                      <label key={estilo} className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
                        <input 
                          type="checkbox" 
                          value={estilo}
                          checked={infoSite.estilo_marca?.includes(estilo) || false}
                          onChange={(e) => handleEstiloMarcaChange(estilo, e.target.checked)}
                          className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 accent-pink-600" 
                        /> 
                        <span>{estilo === 'Clássica/Séria' ? 'Clássica' : estilo}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Paleta de Cores */}
                <div className="pt-4 border-t border-pink-200">
                  <label htmlFor="paleta-cores-0" className="block text-base md:text-lg font-bold text-pink-900 mb-3">
                    Escolha sua Paleta de Cores:
                  </label>
                  
                  <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="flex flex-col items-center gap-2 md:gap-3">
                        <div className="relative group">
                          <input 
                            id={`paleta-cores-${index}`}
                            type="color" 
                            value={infoSite.cores?.[index] || '#ffffff'}
                            onChange={(e) => {
                              const novasCores = [...(infoSite.cores || ['#ffffff', '#ffffff', '#ffffff'])] as [string, string, string];
                              novasCores[index] = e.target.value;
                              setInfoSite({...infoSite, cores: novasCores});
                            }}
                            aria-label={`Cor ${index + 1}`}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl cursor-pointer border-0 p-0 shadow-md transition-transform md:group-hover:scale-105"
                          />
                        </div>
                        <span className="text-xs md:text-sm text-pink-900 font-mono font-bold uppercase">
                          {infoSite.cores?.[index] || '#ffffff'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </fieldset>

          {/* Botões de Ação */}
          <BotoesNavegacao
            onVoltar={voltarEtapa}
            desabilitarProximo={false}
          />
          
        </form>
      </div>
    </div>
  );
}
