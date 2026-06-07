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
    <div className="w-full flex flex-col items-center pb-32 animate-fade-in bg-slate-100 min-h-screen">
      
      <div className="w-full bg-slate-900 text-white py-6 px-4 flex flex-col items-center justify-center text-center shadow-md">
        <h2 className="text-2xl font-black mb-1">{infoSite.nome}</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Modo de Edição</p>
        <div className="flex gap-2">
          {infoSite.cores.map((cor, i) => (
            <svg key={i} className="w-6 h-6 rounded-full border-2 border-slate-800 shadow-inner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="10" fill={cor} />
            </svg>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-0">
        {site.map((secao, index) => {
          const ComponenteReal = RENDERIZADOR_COMPONENTES[secao.modelo];
          return (
            <div key={secao.id} className="w-full relative group">
              <div className="w-full bg-white">
                {ComponenteReal ? <ComponenteReal /> : (
                  <div className="p-10 text-red-500 bg-red-50 font-bold text-center">
                    Erro: Componente '{secao.modelo}' não encontrado.
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 pointer-events-none transition-all duration-200 z-10" />
              
              <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest z-20 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                {index + 1}. {secao.categoria}
              </div>
              
              <button 
                onClick={() => removerSecao(secao.id)}
                className="absolute top-4 right-4 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer pointer-events-auto font-bold flex items-center gap-2 hover:-translate-y-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                Remover
              </button>
            </div>
          );
        })}
      </div>

      {site.length === 0 && interfaceAtiva === 'nenhuma' && (
        <div className="w-full max-w-5xl px-4 mt-16">
          <button 
            onClick={() => setInterfaceAtiva('escolhendoCapa')}
            className="w-full h-56 border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 rounded-3xl flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 font-bold text-xl uppercase bg-white shadow-sm hover:shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </div>
            Adicionar Capa do Site
          </button>
        </div>
      )}

      {site.length > 0 && interfaceAtiva === 'nenhuma' && (
        <div className="w-full max-w-5xl px-4 mt-12 mb-10">
          {limiteAtingido ? (
            <div className="w-full p-8 text-center bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 shadow-sm">
              <p className="font-black text-xl mb-2">Limite do Pacote Atingido</p>
              <p className="font-medium">O plano <strong>{pacoteEscolhido?.nome}</strong> permite até {pacoteEscolhido?.limiteSecoes} seções. Remova alguma para adicionar outra.</p>
            </div>
          ) : (
            <button 
              onClick={() => setInterfaceAtiva('escolhendoCategoria')}
              className="w-full h-24 border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all rounded-2xl flex items-center justify-center text-slate-600 hover:text-indigo-600 font-black text-lg uppercase shadow-sm bg-white"
            >
              <span className="mr-2 text-2xl">+</span> Adicionar Nova Seção ({site.length} / {pacoteEscolhido?.limiteSecoes})
            </button>
          )}
        </div>
      )}

      {interfaceAtiva === 'escolhendoCategoria' && (
        <div className="w-full max-w-6xl px-4 mt-12 mb-10">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <h3 className="text-3xl font-black text-slate-900">Tipo de Seção</h3>
              <button onClick={() => setInterfaceAtiva('nenhuma')} className="px-4 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold rounded-lg transition-colors">Cancelar</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(BIBLIOTECA_SECOES) as CategoriaSecao[]).filter(cat => cat !== 'capa').map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => {
                    setCategoriaAtiva(categoria);
                    setInterfaceAtiva('escolhendoModelo');
                  }}
                  className="p-6 bg-slate-50 hover:bg-indigo-600 hover:text-white border border-slate-200 hover:border-indigo-600 rounded-2xl font-bold text-lg transition-all capitalize text-slate-700 flex flex-col items-center gap-3 group"
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform">
                    {BIBLIOTECA_SECOES[categoria][0]?.thumb}
                  </span>
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {(interfaceAtiva === 'escolhendoModelo' || interfaceAtiva === 'escolhendoCapa') && (
        <div className="w-full max-w-6xl px-4 mt-12 mb-10">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 ring-4 ring-indigo-50">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <h3 className="text-3xl font-black text-slate-900 capitalize">
                {interfaceAtiva === 'escolhendoCapa' ? 'Modelos de Capa' : `Modelos: ${categoriaAtiva}`}
              </h3>
              <button 
                onClick={() => interfaceAtiva === 'escolhendoCapa' ? setInterfaceAtiva('nenhuma') : setInterfaceAtiva('escolhendoCategoria')} 
                className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 font-bold rounded-lg transition-colors"
              >
                ← Voltar
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BIBLIOTECA_SECOES[interfaceAtiva === 'escolhendoCapa' ? 'capa' : categoriaAtiva!].map((modelo) => (
                <div 
                  key={modelo.id} 
                  onClick={() => adicionarSecao(modelo.id)} 
                  className="cursor-pointer group rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-slate-50 flex flex-col"
                >
                  <div className="w-full h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                    {modelo.thumb}
                  </div>
                  <div className="p-5 bg-white font-bold text-lg text-slate-800 text-center group-hover:text-indigo-600 transition-colors">
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