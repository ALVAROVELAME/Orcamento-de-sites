import { useState } from 'react';
import type { InfoSite, SecaoNoSite, Pacote, CategoriaSecao } from '../Formulario';
import { BIBLIOTECA_SECOES, RENDERIZADOR_COMPONENTES } from './constants';

interface Etapa3Props {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote | null;
  site: SecaoNoSite[];
  setSite: (site: SecaoNoSite[]) => void;
}

export function Etapa3({ infoSite, pacoteEscolhido, site, setSite }: Etapa3Props) {
  const [interfaceAtiva, setInterfaceAtiva] = useState<'nenhuma' | 'escolhendoCapa' | 'escolhendoCategoria' | 'escolhendoModelo'>('nenhuma');
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaSecao | null>(null);

  const adicionarSecao = (modeloId: string) => {
    const categoria = site.length === 0 ? 'capa' : categoriaAtiva;
    if (!categoria) return;

    setSite([...site, { id: crypto.randomUUID(), categoria, modelo: modeloId }]);
    setInterfaceAtiva('nenhuma');
    setCategoriaAtiva(null);
  };

  const removerSecao = (idParaRemover: string) => {
    setSite(site.filter(secao => secao.id !== idParaRemover));
  };

  const limiteAtingido = pacoteEscolhido?.limiteSecoes !== 'Ilimitado' && site.length >= (pacoteEscolhido?.limiteSecoes as number);

  return (
    <div className="w-full flex flex-col items-center pb-24 md:pb-32 bg-slate-100 min-h-screen overflow-x-hidden">
      
      {/* Cabeçalho do Modo de Edição */}
      <div className="w-full bg-slate-900 text-white py-6 px-4 flex flex-col items-center justify-center text-center shadow-lg border-b-4 border-amber-500 box-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 break-words max-w-full">{infoSite.nome}</h2>
        <p className="text-xs text-slate-300 font-bold uppercase tracking-widest mb-3">Painel de Edição do Site</p>
        
        <div className="flex gap-3 flex-wrap justify-center">
          {infoSite.cores.map((cor, i) => (
            <svg key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-md shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill={cor} />
            </svg>
          ))}
        </div>
      </div>

      {/* Lista de Seções do Site */}
      <div className="w-full flex flex-col gap-8 md:gap-4 mt-4 box-border">
        {site.map((secao, index) => {
          const ComponenteReal = RENDERIZADOR_COMPONENTES[secao.modelo];
          return (
            <div key={secao.id} className="w-full relative bg-white border-y-4 border-slate-300 md:border-y-0 md:group transition-all box-border overflow-x-hidden">
              
              {/* Barra de Gerenciamento do Bloco */}
              <div className="w-full bg-slate-800 text-white px-2 py-2 flex flex-row items-center justify-between gap-2 md:absolute md:top-4 md:left-4 md:w-[calc(100%-2rem)] md:z-20 md:bg-transparent md:text-slate-900 md:p-0 pointer-events-none box-border">
                
                {/* Indicador de Seção - Fonte ajustada para text-sm e padding ideal */}
                <span className="bg-slate-900 text-amber-400 border border-amber-500 px-2 py-2.5 rounded-xl text-center text-sm md:text-base font-black uppercase tracking-wider shadow-md pointer-events-auto block w-1/2 sm:w-auto truncate">
                  {index + 1}. {secao.categoria}
                </span>

                {/* Botão Remover - Otimizado para usar o tamanho máximo do texto no mobile */}
                <button 
                  onClick={() => removerSecao(secao.id)}
                  title={`Remover seção número ${index + 1}: ${secao.categoria}`}
                  className="bg-rose-700 hover:bg-rose-800 text-white min-h-[40px] sm:min-h-[48px] px-1 sm:px-4 py-2.5 rounded-xl shadow-lg transition-all font-black flex items-center justify-center gap-2 text-sm md:text-lg cursor-pointer pointer-events-auto border-2 border-white active:scale-95 md:opacity-100 md:group-hover:opacity-100 w-1/2 sm:w-auto md:max-w-xs shrink-0"
                >
                  {/* Ícone oculto no mobile para dar espaço total ao texto */}
                  <svg className="hidden sm:block w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="truncate w-full text-center">Remover Seção</span>
                </button>
              </div>

              {/* Renderização Real do Componente */}
              <div className="w-full min-h-[150px] border-b-2 border-slate-200 overflow-x-hidden">
                {ComponenteReal ? <ComponenteReal /> : (
                  <div className="p-6 text-rose-700 bg-rose-50 font-black text-center text-base border-2 border-rose-300 m-2 rounded-xl">
                    Aviso: O modelo '{secao.modelo}' está em manutenção.
                  </div>
                )}
              </div>
              
              {/* Borda indicadora visual para Desktop */}
              <div className="hidden md:block absolute inset-0 border-[4px] border-transparent md:group-hover:border-indigo-600 pointer-events-none transition-all duration-200 z-10" />
            </div>
          );
        })}
      </div>

      {/* Estado Vazio: Botão Adicionar Capa */}
      {site.length === 0 && interfaceAtiva === 'nenhuma' && (
        <div className="w-full max-w-5xl px-4 mt-12 box-border">
          <button 
            onClick={() => setInterfaceAtiva('escolhendoCapa')}
            className="w-full min-h-[160px] sm:min-h-[180px] border-4 border-dashed border-slate-400 hover:border-indigo-600 hover:bg-indigo-50 transition-all rounded-3xl flex flex-col items-center justify-center text-slate-700 hover:text-indigo-700 font-black text-lg sm:text-xl md:text-2xl uppercase bg-white shadow-md p-4 sm:p-6 box-border"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 sm:mb-4 border-2 border-indigo-300 shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </div>
            + Adicionar Capa do Site
          </button>
        </div>
      )}

      {/* Painel Informativo Dinâmico */}
      {site.length > 0 && interfaceAtiva === 'nenhuma' && (
        <div className="w-full max-w-5xl px-4 mt-12 mb-12 box-border">
          {limiteAtingido ? (
            <div className="w-full p-5 sm:p-6 md:p-10 text-center bg-rose-900 border-4 border-rose-600 rounded-3xl text-white shadow-xl space-y-3 box-border" role="alert">
              <div className="flex flex-wrap items-center justify-center gap-2 text-amber-400 text-xl sm:text-2xl font-black">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>LIMITE DE SEÇÕES ATINGIDO</span>
              </div>
              <p className="font-black text-lg sm:text-xl md:text-2xl">
                O seu plano atual (<span className="text-amber-400">{pacoteEscolhido?.nome}</span>) permite até {pacoteEscolhido?.limiteSecoes} seções.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 bg-black/30 p-3 rounded-xl inline-block font-bold max-w-full break-words">
                Para incluir outro conteúdo, clique em <span className="text-rose-400 font-black">"Remover Seção"</span> logo acima do bloco que deseja tirar.
              </p>
            </div>
          ) : (
            <button 
              onClick={() => setInterfaceAtiva('escolhendoCategoria')}
              className="w-full min-h-[70px] sm:min-h-[80px] py-4 sm:py-6 border-4 border-dashed border-slate-400 hover:border-indigo-600 hover:bg-indigo-50 transition-all rounded-2xl flex items-center justify-center text-slate-800 hover:text-indigo-700 font-black text-base sm:text-lg md:text-2xl uppercase shadow-md bg-white gap-2 sm:gap-3 px-3 box-border"
            >
              <span className="text-2xl sm:text-3xl font-black text-indigo-600">+</span> Adicionar Nova Seção ({site.length} de {pacoteEscolhido?.limiteSecoes})
            </button>
          )}
        </div>
      )}

      {/* Interface: Seleção de Categoria */}
      {interfaceAtiva === 'escolhendoCategoria' && (
        <div className="w-full max-w-6xl px-4 mt-8 mb-12 box-border">
          <div className="bg-white p-4 sm:p-6 md:p-10 rounded-3xl shadow-2xl border-2 border-slate-200 box-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b-2 border-slate-200 gap-4 box-border">
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900">Selecione o tipo de bloco:</h3>
              <button onClick={() => setInterfaceAtiva('nenhuma')} className="w-full md:w-auto min-h-[44px] sm:min-h-[48px] px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-black rounded-xl transition-colors text-center text-base sm:text-lg border border-slate-400">Voltar para a Página</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {(Object.keys(BIBLIOTECA_SECOES) as CategoriaSecao[]).filter(cat => cat !== 'capa').map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => {
                    setCategoriaAtiva(categoria);
                    setInterfaceAtiva('escolhendoModelo');
                  }}
                  className="min-h-[80px] sm:min-h-[90px] p-4 sm:p-5 bg-slate-50 hover:bg-indigo-700 hover:text-white border-2 border-slate-300 hover:border-indigo-700 rounded-2xl font-black text-base sm:text-lg md:text-xl transition-all capitalize text-slate-800 flex items-center justify-start sm:justify-center gap-3 sm:gap-4 group shadow-sm active:scale-95 box-border"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl shrink-0">
                    {BIBLIOTECA_SECOES[categoria][0]?.thumb}
                  </span>
                  <span className="truncate">{categoria}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interface: Seleção de Modelos Específicos */}
      {(interfaceAtiva === 'escolhendoModelo' || interfaceAtiva === 'escolhendoCapa') && (
        <div className="w-full max-w-6xl px-4 mt-8 mb-12 box-border">
          <div className="bg-white p-4 sm:p-6 md:p-10 rounded-3xl shadow-2xl border-2 border-slate-200 ring-4 ring-indigo-100 box-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b-2 border-slate-200 gap-4 box-border">
              <h3 className="text-lg sm:text-xl md:text-4xl font-black text-slate-900 capitalize break-words max-w-full">
                {interfaceAtiva === 'escolhendoCapa' ? 'Modelos de Capa Disponíveis' : `Modelos: ${categoriaAtiva}`}
              </h3>
              <button 
                onClick={() => interfaceAtiva === 'escolhendoCapa' ? setInterfaceAtiva('nenhuma') : setInterfaceAtiva('escolhendoCategoria')} 
                className="w-full md:w-auto min-h-[44px] sm:min-h-[48px] px-5 py-2 text-indigo-800 bg-indigo-100 hover:bg-indigo-200 font-black rounded-xl transition-colors text-center text-base sm:text-lg border-2 border-indigo-300 box-border"
              >
                ← Voltar
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {BIBLIOTECA_SECOES[interfaceAtiva === 'escolhendoCapa' ? 'capa' : categoriaAtiva!].map((modelo) => (
                <div 
                  key={modelo.id} 
                  onClick={() => adicionarSecao(modelo.id)} 
                  className="cursor-pointer group rounded-2xl overflow-hidden border-2 border-slate-300 hover:border-indigo-600 shadow-md hover:shadow-2xl transition-all bg-slate-50 flex flex-col active:scale-95 box-border"
                >
                  <div className="w-full h-36 sm:h-40 md:h-48 bg-slate-200 border-b-2 border-slate-300 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shrink-0">
                    {modelo.thumb}
                  </div>
                  <div className="p-4 sm:p-5 bg-white font-black text-sm sm:text-base md:text-xl text-slate-900 text-center border-t border-slate-100 group-hover:text-indigo-700 transition-colors break-words">
                    {modelo.nome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}