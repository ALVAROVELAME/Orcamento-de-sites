import React, { useState } from 'react';

// =========================================================================
// 1. IMPORTAÇÃO DOS SEUS COMPONENTES REAIS
// Ajuste o caminho './components/sections/...' dependendo de onde este 
// arquivo Formulario.tsx está salvo no seu projeto.
// =========================================================================
// Substitua os imports atuais por estes:
import { BlogModel1 } from './sections/blog';
import { CarrosselAvaliacoes, DepoimentosGoogleMaps, DepoimentoTradicional } from './sections/depoimentos';
import { FaqModel1 } from './sections/faq';
import { FormularioModel1 } from './sections/formulario';

// --- TIPAGENS ---
type CategoriaSecao = 'capa' | 'sobre' | 'servicos' | 'depoimentos' | 'faq' | 'blog' | 'formulario' | 'video' | 'mapa' | 'galeria';

interface SecaoNoSite {
  id: string;
  categoria: CategoriaSecao;
  modelo: string;
}

interface Pacote {
  id: string;
  nome: string;
  preco: string;
  limiteSecoes: number | 'Ilimitado';
  limitePaginas: number;
  detalhes: string[];
}

interface InfoSite {
  nome: string;
  cores: [string, string, string];
}

// --- DADOS DOS PACOTES ---
const PACOTES_DISPONIVEIS: Pacote[] = [
  {
    id: 'start',
    nome: 'Cartão Digital Start',
    preco: 'R$ 200,00',
    limiteSecoes: 3,
    limitePaginas: 1,
    detalhes: ['Até 3 seções', 'Página Única (Link na Bio)', 'Botão WhatsApp', 'Otimização PageSpeed']
  },
  {
    id: 'pro',
    nome: 'Cartão Digital Pro',
    preco: 'R$ 400,00',
    limiteSecoes: 6,
    limitePaginas: 1,
    detalhes: ['Até 6 seções', 'Página Única', 'Mapa Interativo', 'Integração de Depoimentos']
  },
  {
    id: 'inst-std',
    nome: 'Site Institucional Standard',
    preco: 'R$ 1.200,00',
    limiteSecoes: 'Ilimitado',
    limitePaginas: 3,
    detalhes: ['Seções Ilimitadas na Home', 'Até 3 Páginas Internas', 'Formulário Avançado', 'Design Exclusivo']
  }
];

// =========================================================================
// 2. BIBLIOTECA DE SEÇÕES (Mapeando os IDs para as categorias)
// =========================================================================
const BIBLIOTECA_SECOES: Record<CategoriaSecao, { id: string; nome: string; thumb: string }[]> = {
  capa: [
    { id: 'CapaPlaceholder', nome: 'Capa Padrão (Em breve)', thumb: '🖼️' },
  ],
  sobre: [
    { id: 'SobrePlaceholder', nome: 'Sobre a Empresa (Em breve)', thumb: '🏢' },
  ],
  servicos: [
    { id: 'ServicosPlaceholder', nome: 'Grade de Serviços (Em breve)', thumb: '⚙️' },
  ],
  depoimentos: [
    { id: 'DepCarrossel', nome: 'Carrossel de Avaliações', thumb: '🎠' },
    { id: 'DepGoogle', nome: 'Avaliações do Google', thumb: '🗺️' },
    { id: 'DepTradicional', nome: 'Depoimento em Destaque', thumb: '💬' },
  ],
  faq: [
    { id: 'FaqModel1', nome: 'Perguntas Frequentes (FAQ)', thumb: '❓' },
  ],
  blog: [
    { id: 'BlogModel1', nome: 'Grid de Artigos do Blog', thumb: '📝' },
  ],
  formulario: [
    { id: 'FormularioModel1', nome: 'Formulário de Contato/Reserva', thumb: '✉️' },
  ],
  video: [
    { id: 'VideoPlaceholder', nome: 'Vídeo Institucional (Em breve)', thumb: '▶️' },
  ],
  mapa: [
    { id: 'MapaPlaceholder', nome: 'Localização (Em breve)', thumb: '📍' },
  ],
  galeria: [
    { id: 'GaleriaPlaceholder', nome: 'Galeria de Fotos (Em breve)', thumb: '📸' },
  ]
};

// =========================================================================
// 3. RENDERIZADOR (Conectando os IDs aos seus componentes React importados)
// =========================================================================
const RENDERIZADOR_COMPONENTES: Record<string, React.ElementType> = {
  // Componentes Reais
  DepCarrossel: CarrosselAvaliacoes,
  DepGoogle: DepoimentosGoogleMaps,
  DepTradicional: DepoimentoTradicional,
  FaqModel1: FaqModel1,
  BlogModel1: BlogModel1,
  FormularioModel1: FormularioModel1,
  
  // Placeholders provisórios enquanto você cria os outros
  CapaPlaceholder: () => <div className="w-full py-32 bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">Adicione o componente de Capa aqui</div>,
  SobrePlaceholder: () => <div className="w-full py-32 bg-white flex items-center justify-center text-2xl text-slate-500 border-b border-slate-100">Adicione o componente Sobre aqui</div>,
  ServicosPlaceholder: () => <div className="w-full py-32 bg-slate-50 flex items-center justify-center text-2xl text-slate-500 border-b border-slate-200">Adicione o componente Serviços aqui</div>,
  VideoPlaceholder: () => <div className="w-full py-32 bg-slate-900 text-white flex items-center justify-center text-2xl">Adicione o componente de Vídeo aqui</div>,
  MapaPlaceholder: () => <div className="w-full py-32 bg-white flex items-center justify-center text-2xl text-slate-500 border-b border-slate-100">Adicione o componente Mapa aqui</div>,
  GaleriaPlaceholder: () => <div className="w-full py-32 bg-slate-50 flex items-center justify-center text-2xl text-slate-500 border-b border-slate-200">Adicione o componente Galeria aqui</div>,
};

export function Formulario() {
  const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3>(1);
  const [pacoteEscolhido, setPacoteEscolhido] = useState<Pacote | null>(null);
  const [infoSite, setInfoSite] = useState<InfoSite>({ nome: '', cores: ['#2563eb', '#1e40af', '#ffffff'] });

  const [site, setSite] = useState<SecaoNoSite[]>([]);
  const [interfaceAtiva, setInterfaceAtiva] = useState<'nenhuma' | 'escolhendoCapa' | 'escolhendoCategoria' | 'escolhendoModelo'>('nenhuma');
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaSecao | null>(null);

  const avancarParaEtapa2 = (pacote: Pacote) => {
    setPacoteEscolhido(pacote);
    setEtapaAtual(2);
  };

  const avancarParaEtapa3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (infoSite.nome.trim() !== '') {
      setEtapaAtual(3);
    }
  };

  const voltarEtapa = () => {
    if (etapaAtual === 2) setEtapaAtual(1);
    if (etapaAtual === 3) setEtapaAtual(2);
  };

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
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center font-sans">
      
      {/* ================= BARRA DE PROGRESSO GLOBAL ================= */}
      {/* CORREÇÃO: Removido o sticky e z-50 para não sobrepor a Navbar */}
      <div className="w-full bg-white shadow-sm border-b border-slate-200 relative z-10">
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

      {/* ================= ETAPA 1 ================= */}
      {etapaAtual === 1 && (
        <div className="w-full max-w-7xl px-4 py-20 flex flex-col items-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 text-center tracking-tight">Escolha o plano ideal</h1>
          <p className="text-lg text-slate-500 mb-12 text-center max-w-2xl font-medium">Selecione o pacote que melhor atende ao seu projeto para liberarmos as seções no construtor.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {PACOTES_DISPONIVEIS.map((pacote) => (
              <div key={pacote.id} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{pacote.nome}</h3>
                <p className="text-4xl font-black text-indigo-600 mb-8">{pacote.preco}</p>
                <ul className="mb-8 flex-1 space-y-4">
                  {pacote.detalhes.map((detalhe, i) => (
                    <li key={i} className="flex items-center text-slate-600 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 shrink-0">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      {detalhe}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => avancarParaEtapa2(pacote)}
                  className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-slate-900/20"
                >
                  Selecionar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ETAPA 2 ================= */}
      {etapaAtual === 2 && (
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
      )}

      {/* ================= ETAPA 3: CONSTRUTOR ================= */}
      {etapaAtual === 3 && (
        <div className="w-full flex flex-col items-center pb-32 animate-fade-in bg-slate-100 min-h-screen">
          
          <div className="w-full bg-slate-900 text-white py-6 px-4 flex flex-col items-center justify-center text-center shadow-md">
            <h2 className="text-2xl font-black mb-1">{infoSite.nome}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Modo de Edição</p>
            <div className="flex gap-2">
              {infoSite.cores.map((cor, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-800 shadow-inner" style={{ backgroundColor: cor }} />
              ))}
            </div>
          </div>

          {/* RENDERIZAÇÃO DAS SEÇÕES REAIS */}
          <div className="w-full flex flex-col gap-0">
            {site.map((secao, index) => {
              const ComponenteReal = RENDERIZADOR_COMPONENTES[secao.modelo];
              return (
                <div key={secao.id} className="w-full relative group">
                  
                  {/* COMPONENTE RENDERIZADO */}
                  <div className="w-full bg-white">
                    {ComponenteReal ? <ComponenteReal /> : (
                      <div className="p-10 text-red-500 bg-red-50 font-bold text-center">
                        Erro: Componente '{secao.modelo}' não encontrado.
                      </div>
                    )}
                  </div>
                  
                  {/* UI Hover Options */}
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

          {/* MENUS DO CONSTRUTOR */}
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

          {/* Escolhendo Categoria */}
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

          {/* Escolhendo Modelo */}
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
      )}
    </div>
  );
}