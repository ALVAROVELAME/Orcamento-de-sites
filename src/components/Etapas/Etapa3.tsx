import { useState, useEffect } from 'react';
import type { InfoSite, SecaoNoSite, CategoriaSecao } from '../Formulario';
import type { Pacote } from '../../data/precos'; 
import { BIBLIOTECA_SECOES, RENDERIZADOR_COMPONENTES } from './constants';
import { BotoesNavegacao } from './BotoesNavegacao';

const TODAS_CATEGORIAS = Object.keys(BIBLIOTECA_SECOES) as CategoriaSecao[];

// --- COMPONENTE PARA A FASE 2: ESCOLHA DOS MODELOS (MANTIDO E INTACTO) ---
interface ItemAcordeaoProps {
  modelo: { id: string; nome: string };
  isExpanded: boolean;
  isSelected: boolean;
  categoriaAtual: CategoriaSecao;
  onToggleExpand: () => void;
  onSelect: () => void;
  ComponenteReal: React.ElementType | undefined;
}

function ItemAcordeao({
  modelo,
  isExpanded,
  isSelected,
  onToggleExpand,
  onSelect,
  ComponenteReal,
}: ItemAcordeaoProps) {
  return (
    <div 
      className={`bg-white transition-all duration-300 w-full ${
        isSelected ? 'ring-4 ring-indigo-600/20 border-y-2 border-indigo-600' : 'border-y border-slate-200'
      }`}
    >
      <div 
        className="flex items-center justify-between p-5 bg-white cursor-pointer select-none group max-w-7xl mx-auto"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl font-black text-xl transition-colors duration-300 ${
            isExpanded ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
          }`}>
            {isExpanded ? '-' : '+'}
          </div>
          <span className="font-bold text-slate-800 text-lg md:text-xl tracking-tight">
            {modelo.nome}
          </span>
        </div>

        <div className="pl-4 flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="relative cursor-pointer flex items-center">
            <input 
              type="radio" 
              checked={isSelected}
              onChange={onSelect}
              className="peer sr-only" 
            />
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 transition-all flex items-center justify-center ${
              isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white hover:border-indigo-400'
            }`}>
              {isSelected && <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white" />}
            </div>
          </label>
        </div>
      </div>

      <div 
        className={`grid transition-all duration-700 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-0 bg-white w-full overflow-x-auto">
            <div className="w-full bg-white pointer-events-none">
              {ComponenteReal ? <ComponenteReal /> : <div className="p-8 text-center font-bold text-slate-400">Modelo indisponível</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- NOVO COMPONENTE PARA A FASE 1: SELEÇÃO DE CATEGORIAS ---
interface CategoriaAcordeaoProps {
  categoria: CategoriaSecao;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
  ComponenteReal: React.ElementType | undefined;
}

function CategoriaAcordeao({
  categoria,
  isExpanded,
  isSelected,
  onToggleExpand,
  onToggleSelect,
  ComponenteReal,
}: CategoriaAcordeaoProps) {
  return (
    <div 
      className={`bg-white transition-all duration-300 w-full ${
        isSelected ? 'ring-4 ring-indigo-600/20 border-y-2 border-indigo-600' : 'border-y border-slate-200'
      }`}
    >
      <div 
        className="flex items-center justify-between p-5 bg-white cursor-pointer select-none group max-w-7xl mx-auto"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl font-black text-xl transition-colors duration-300 ${
            isExpanded ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
          }`}>
            {isExpanded ? '-' : '+'}
          </div>
          <span className="font-bold text-slate-800 text-lg md:text-xl tracking-tight capitalize">
            {categoria}
          </span>
        </div>

        <div className="pl-4 flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="relative cursor-pointer flex items-center">
            <input 
              type="checkbox" 
              checked={isSelected}
              onChange={onToggleSelect}
              className="peer sr-only" 
            />
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded border-2 transition-all flex items-center justify-center ${
              isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white hover:border-indigo-400'
            }`}>
              {isSelected && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </label>
        </div>
      </div>

      <div 
        className={`grid transition-all duration-700 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-0 bg-white w-full overflow-x-auto">
            <div className="w-full bg-white pointer-events-none">
              {ComponenteReal ? <ComponenteReal /> : <div className="p-8 text-center font-bold text-slate-400">Prévia indisponível</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- INTERFACE ATUALIZADA PARA SUPORTAR O PROXIMO PASSO (ETAPA 4) ---
interface Etapa3Props {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote | null;
  site: SecaoNoSite[];
  setSite: (site: SecaoNoSite[]) => void;
  onVoltarEtapaAnterior: () => void;
  onAvancarParaEtapa4: () => void; 
}

export function Etapa3({ 
  infoSite, 
  pacoteEscolhido, 
  site, 
  setSite, 
  onVoltarEtapaAnterior,
  onAvancarParaEtapa4 
}: Etapa3Props) {
  const [fase, setFase] = useState<'selecao_inicial' | 'escolha_modelos' | 'resumo'>('selecao_inicial');
  const [categoriasPendentes, setCategoriasPendentes] = useState<CategoriaSecao[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<CategoriaSecao[]>([]);
  
  const [categoriaExpandida, setCategoriaExpandida] = useState<CategoriaSecao | null>(null);
  const [modeloExpandido, setModeloExpandido] = useState<string | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null);

  // NOVO ESTADO: Controla a exibição do aviso de limite
  const [mostrarAvisoLimite, setMostrarAvisoLimite] = useState(false);

  const limiteDoPlano = pacoteEscolhido?.limiteSecoes ?? 5;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [fase, indiceAtual]);

  // NOVO EFEITO: Fecha o aviso de limite automaticamente após 5 segundos
  useEffect(() => {
    if (mostrarAvisoLimite) {
      const timer = setTimeout(() => {
        setMostrarAvisoLimite(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mostrarAvisoLimite]);

  // --- EFEITO: Animação de prévia para a Fase 1 (Categorias) ---
  useEffect(() => {
    if (fase === 'selecao_inicial' && TODAS_CATEGORIAS.length > 0) {
      const primeiraCategoria = TODAS_CATEGORIAS[0];
      let fecharTimer: ReturnType<typeof setTimeout>;

      const abrirTimer = setTimeout(() => {
        setCategoriaExpandida(primeiraCategoria);
        
        fecharTimer = setTimeout(() => {
          setCategoriaExpandida(null);
        }, 1500);
      }, 400);

      return () => {
        clearTimeout(abrirTimer);
        if (fecharTimer) clearTimeout(fecharTimer);
      };
    }
  }, [fase]); 

  // --- EFEITO: Animação de prévia para a Fase 2 (Modelos) ---
  useEffect(() => {
    if (fase === 'escolha_modelos' && categoriasPendentes[indiceAtual]) {
      const modelosDaCategoria = BIBLIOTECA_SECOES[categoriasPendentes[indiceAtual]];
      
      if (modelosDaCategoria && modelosDaCategoria.length > 0) {
        const primeiroModeloId = modelosDaCategoria[0].id;
        let fecharTimer: ReturnType<typeof setTimeout>;

        const abrirTimer = setTimeout(() => {
          setModeloExpandido(primeiroModeloId);
          
          fecharTimer = setTimeout(() => {
            setModeloExpandido(null);
          }, 1500);
        }, 400);

        return () => {
          clearTimeout(abrirTimer);
          if (fecharTimer) clearTimeout(fecharTimer);
        };
      }
    }
  }, [fase, indiceAtual, categoriasPendentes]);

  const iniciarEscolhaDeModelos = () => {
    if (categoriasSelecionadas.length === 0) return;
    setCategoriasPendentes(categoriasSelecionadas);
    setIndiceAtual(0);
    setModeloExpandido(null);
    setModeloSelecionado(null);
    setSite([]); 
    setFase('escolha_modelos');
  };

  const avancarParaProximaCategoria = () => {
    if (!modeloSelecionado) return;

    const categoryAtual = categoriasPendentes[indiceAtual];
    const siteFiltrado = site.filter(secao => secao.categoria !== categoryAtual);
    const novaSecao = { id: crypto.randomUUID(), categoria: categoryAtual, modelo: modeloSelecionado };
    
    const novoSite = [...siteFiltrado, novaSecao];
    setSite(novoSite);

    if (indiceAtual + 1 < categoriasPendentes.length) {
      setIndiceAtual(prev => prev + 1);
      setModeloExpandido(null);
      
      const proximaCategoria = categoriasPendentes[indiceAtual + 1];
      const secaoExistente = novoSite.find(s => s.categoria === proximaCategoria);
      setModeloSelecionado(secaoExistente ? secaoExistente.modelo : null);
    } else {
      setFase('resumo');
    }
  };

  const tratarAcaoVoltar = () => {
    if (fase === 'selecao_inicial') {
      if (onVoltarEtapaAnterior) onVoltarEtapaAnterior();
    } else if (fase === 'escolha_modelos') {
      if (indiceAtual > 0) {
        const novoIndice = indiceAtual - 1;
        setIndiceAtual(novoIndice);
        setModeloExpandido(null);
        
        const categoriaAnterior = categoriasPendentes[novoIndice];
        const secaoExistente = site.find(s => s.categoria === categoriaAnterior);
        setModeloSelecionado(secaoExistente ? secaoExistente.modelo : null);
      } else {
        setFase('selecao_inicial');
      }
    } else if (fase === 'resumo') {
      setFase('escolha_modelos');
      setIndiceAtual(categoriasPendentes.length - 1);
      const ultimaCategoria = site[site.length - 1]?.categoria || categoriasPendentes[categoriasPendentes.length - 1];
      const secaoExistente = site.find(s => s.categoria === ultimaCategoria);
      setModeloSelecionado(secaoExistente ? secaoExistente.modelo : null);
    }
  };

  const tratarAcaoProximo = () => {
    if (fase === 'selecao_inicial') {
      iniciarEscolhaDeModelos();
    } else if (fase === 'escolha_modelos') {
      avancarParaProximaCategoria();
    } else if (fase === 'resumo') {
      onAvancarParaEtapa4(); 
    }
  };

  const checarProximoDesabilitado = () => {
    if (fase === 'selecao_inicial') return categoriasSelecionadas.length === 0;
    if (fase === 'escolha_modelos') return !modeloSelecionado;
    return false;
  };

  const removerSecao = (idParaRemover: string) => {
    setSite(site.filter(secao => secao.id !== idParaRemover));
  };

  return (
    <div className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* --- MENSAGEM DE AVISO (TOAST) --- */}
      <div 
        className={`fixed top-4 right-4 md:top-8 md:right-8 z-50 transition-all duration-500 transform ${
          mostrarAvisoLimite ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-rose-600 text-white p-4 rounded-xl shadow-xl flex items-start gap-4 border border-rose-500 max-w-sm">
          <div className="mt-0.5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-md mb-1">Limite do Pacote Atingido</h4>
            <p className="text-sm text-rose-100">
              Seu pacote permite apenas {limiteDoPlano} seções. Para adicionar mais opções, você precisará alterar o plano escolhido.
            </p>
          </div>
          <button 
            onClick={() => setMostrarAvisoLimite(false)}
            aria-label="Fechar aviso de limite do pacote"
            title="Fechar aviso de limite do pacote"
            className="p-1 hover:bg-rose-700 rounded transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      {/* --------------------------------- */}

      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className={`bg-white w-full p-4 md:p-6 relative ${fase === 'escolha_modelos' ? 'shadow-none bg-transparent' : 'shadow-sm border-b border-slate-200'}`}>
          
          {/* --- FASE 1: SELEÇÃO INICIAL --- */}
          {fase === 'selecao_inicial' && (
            <div className="max-w-7xl mx-auto px-4 mt-2">
              <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                    Selecione as seções desejadas
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Escolha os blocos de conteúdo que farão parte da estrutura do seu site. 
                    Clique para ver uma prévia de cada categoria.
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${categoriasSelecionadas.length >= limiteDoPlano ? 'text-rose-500' : 'text-indigo-600'}`}>
                    {categoriasSelecionadas.length} / {limiteDoPlano === 999 ? '∞' : limiteDoPlano}
                  </span>
                  <p className="text-xs text-slate-400">selecionadas</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 w-full mt-6">
                {TODAS_CATEGORIAS.map((categoria) => {
                  const modelosDaCategoria = BIBLIOTECA_SECOES[categoria];
                  const primeiroModelo = modelosDaCategoria && modelosDaCategoria.length > 0 ? modelosDaCategoria[0] : null;
                  const ComponentePreview = primeiroModelo ? RENDERIZADOR_COMPONENTES[primeiroModelo.id] : undefined;
                  const isSelected = categoriasSelecionadas.includes(categoria);

                  return (
                    <CategoriaAcordeao
                      key={categoria}
                      categoria={categoria}
                      isExpanded={categoriaExpandida === categoria}
                      isSelected={isSelected}
                      ComponenteReal={ComponentePreview}
                      onToggleExpand={() => setCategoriaExpandida(categoriaExpandida === categoria ? null : categoria)}
                      onToggleSelect={() => {
                        if (isSelected) {
                          setCategoriasSelecionadas(categoriasSelecionadas.filter(c => c !== categoria));
                          setMostrarAvisoLimite(false); // Esconde o aviso caso desmarque
                        } else {
                          if (categoriasSelecionadas.length < limiteDoPlano) {
                            setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
                            setMostrarAvisoLimite(false);
                          } else {
                            // MOSTRA O AVISO SE TENTAR PASSAR DO LIMITE
                            setMostrarAvisoLimite(true);
                          }
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* --- FASE 2: ESCOLHA DOS MODELOS --- */}
          {fase === 'escolha_modelos' && categoriasPendentes.length > 0 && (
            <div className="w-full mt-2">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-800">
                    Defina o estilo para: <span className="text-indigo-600 capitalize">{categoriasPendentes[indiceAtual]}</span>
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {BIBLIOTECA_SECOES[categoriasPendentes[indiceAtual]].map((modelo) => {
                  return (
                    <ItemAcordeao
                      key={modelo.id}
                      modelo={modelo}
                      categoriaAtual={categoriasPendentes[indiceAtual]}
                      isExpanded={modeloExpandido === modelo.id}
                      isSelected={modeloSelecionado === modelo.id}
                      ComponenteReal={RENDERIZADOR_COMPONENTES[modelo.id]}
                      onToggleExpand={() => setModeloExpandido(modeloExpandido === modelo.id ? null : modelo.id)}
                      onSelect={() => {
                        setModeloSelecionado(modelo.id);
                        if (modeloExpandido !== modelo.id) setModeloExpandido(modelo.id);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* --- FASE 3: RESUMO --- */}
          {fase === 'resumo' && (
            <div className="w-full mt-2">
              <div className="max-w-7xl mx-auto px-4 flex flex-col mb-6 pb-4 border-b border-slate-100 gap-1">
                <h3 className="text-2xl font-black text-slate-800">Estrutura Final do Site</h3>
                {infoSite.nome && (
                  <p className="text-sm text-indigo-600 font-semibold">
                    Projeto Customizado para: {infoSite.nome}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-6 w-full">
                {site.map((secao, index) => {
                  const ComponenteReal = RENDERIZADOR_COMPONENTES[secao.modelo];
                  
                  return (
                    <div key={secao.id} className="relative bg-white border-y border-slate-200 overflow-hidden">
                      <div className="bg-slate-800 p-4 flex justify-between items-center z-10 relative">
                        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
                          <span className="text-indigo-300 font-black uppercase text-sm">
                            {index + 1}. {secao.categoria}
                          </span>
                          <button 
                            onClick={() => removerSecao(secao.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-lg font-bold text-sm transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>

                      <div className="w-full pointer-events-none opacity-90 max-h-[600px] overflow-hidden relative">
                        {ComponenteReal ? <ComponenteReal /> : <div className="p-10 text-center text-slate-500 font-bold bg-slate-50">Visualização não disponível.</div>}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 max-w-7xl mx-auto px-4">
            <BotoesNavegacao
              onVoltar={tratarAcaoVoltar}
              onProximo={tratarAcaoProximo}
              desabilitarProximo={checarProximoDesabilitado()}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
