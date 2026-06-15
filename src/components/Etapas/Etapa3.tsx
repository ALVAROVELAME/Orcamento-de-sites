import { useState, useEffect, useRef } from 'react';
import type { InfoSite, SecaoNoSite, CategoriaSecao } from '../Formulario';
import type { Pacote } from '../../data/precos'; 
import { BIBLIOTECA_SECOES, RENDERIZADOR_COMPONENTES } from './constants';
import { SeletorSessoes } from './SeletorSessoes';
import { BotoesNavegacao } from './BotoesNavegacao';

interface Etapa3Props {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote | null;
  site: SecaoNoSite[];
  setSite: (site: SecaoNoSite[]) => void;
  onVoltarEtapaAnterior: () => void;
}

export function Etapa3({ infoSite, pacoteEscolhido, site, setSite, onVoltarEtapaAnterior }: Etapa3Props) {
  // Referência para fixar o topo da Etapa 3
  const topoComponenteRef = useRef<HTMLDivElement>(null);

  // Fases do Wizard
  const [fase, setFase] = useState<'selecao_inicial' | 'escolha_modelos' | 'resumo'>('selecao_inicial');
  
  // Controle de navegação das seções
  const [categoriasPendentes, setCategoriasPendentes] = useState<CategoriaSecao[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  // Estados locais para seleção de categorias (Sessões iniciais)
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<CategoriaSecao[]>([]);

  // Estados para o layout Acordeão
  const [modeloExpandido, setModeloExpandido] = useState<string | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null);

  const limiteDoPlano = pacoteEscolhido?.limiteSecoes === 'Ilimitado' ? 999 : (pacoteEscolhido?.limiteSecoes as number) || 5;

  // Função reaproveitável para rolar a tela suavemente até o topo do componente
  const rolarParaOTopo = () => {
    if (topoComponenteRef.current) {
      const posicaoY = topoComponenteRef.current.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({
        top: posicaoY,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calcula a posição absoluta em pixels fixos nas mudanças de fase ou índice
  useEffect(() => {
    const timerScroll = setTimeout(() => {
      rolarParaOTopo();
    }, 50); 
    return () => clearTimeout(timerScroll);
  }, [fase, indiceAtual]);

  // Sequência de timers para controlar a animação e subir o scroll após fechar
  useEffect(() => {
    if (fase === 'escolha_modelos' && categoriasPendentes[indiceAtual]) {
      const modelosDaCategoria = BIBLIOTECA_SECOES[categoriasPendentes[indiceAtual]];
      
      if (modelosDaCategoria && modelosDaCategoria.length > 0) {
        const primeiroModeloId = modelosDaCategoria[0].id;
        
        let fecharTimer: ReturnType<typeof setTimeout>;
        let subirTimer: ReturnType<typeof setTimeout>;

        // 1. Espera 500ms antes de abrir o acordeão
        const abrirTimer = setTimeout(() => {
          setModeloExpandido(primeiroModeloId);

          // 2. Após abrir, espera mais 1000ms (1 segundo) para fechar
          fecharTimer = setTimeout(() => {
            setModeloExpandido(null);

            // Espera a animação de fechamento do grid (700ms) terminar 
            // para jogar a tela suavemente de volta ao topo.
            subirTimer = setTimeout(() => {
              rolarParaOTopo();
            }, 700);

          }, 1000);

        }, 500);

        return () => {
          clearTimeout(abrirTimer);
          if (fecharTimer) clearTimeout(fecharTimer);
          if (subirTimer) clearTimeout(subirTimer);
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
      const ultimaCategoria = categoriasPendentes[categoriasPendentes.length - 1];
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
      // Concluir formulário se necessário
    }
  };

  const checarProximoDesabilitado = () => {
    // CORREÇÃO DO ERRO TS2552: Removido o prefixo incorreto "Reduzir"
    if (fase === 'selecao_inicial') return categoriasSelecionadas.length === 0;
    if (fase === 'escolha_modelos') return !modeloSelecionado;
    return false;
  };

  const removerSecao = (idParaRemover: string) => {
    setSite(site.filter(secao => secao.id !== idParaRemover));
  };

  return (
    <div ref={topoComponenteRef} className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen">
      <div className="w-full max-w-none px-0 animate-fade-in">
        <div className={`bg-white w-full p-4 md:p-6 ${fase === 'escolha_modelos' ? 'shadow-none bg-transparent' : 'shadow-sm border-b border-slate-200'}`}>
          
          {fase === 'selecao_inicial' && (
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  Selecione as seções desejadas
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Escolha os blocos de conteúdo que farão parte da estrutura do seu site.
                </p>
              </div>
              
              <SeletorSessoes 
                selecionados={categoriasSelecionadas} 
                setSelecionados={setCategoriasSelecionadas} 
                limiteSecoes={limiteDoPlano}
              />
            </div>
          )}

          {fase === 'escolha_modelos' && categoriasPendentes.length > 0 && (
            <div className="w-full">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-800">
                    Defina o estilo para: <span className="text-indigo-600 capitalize">{categoriasPendentes[indiceAtual]}</span>
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {BIBLIOTECA_SECOES[categoriasPendentes[indiceAtual]].map((modelo) => {
                  const isExpanded = modeloExpandido === modelo.id;
                  const isSelected = modeloSelecionado === modelo.id;
                  const ComponenteReal = RENDERIZADOR_COMPONENTES[modelo.id];

                  return (
                    <div 
                      key={modelo.id} 
                      className={`bg-white transition-all duration-300 w-full ${
                        isSelected ? 'ring-4 ring-indigo-600/20 border-y-2 border-indigo-600' : 'border-y border-slate-200'
                      }`}
                    >
                      <div 
                        className="flex items-center justify-between p-5 bg-white cursor-pointer select-none group max-w-7xl mx-auto"
                        onClick={() => setModeloExpandido(isExpanded ? null : modelo.id)}
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
                              name={`text-selecao-${categoriasPendentes[indiceAtual]}`}
                              checked={isSelected}
                              onChange={() => {
                                setModeloSelecionado(modelo.id);
                                if (!isExpanded) setModeloExpandido(modelo.id);
                              }}
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
                })}
              </div>
            </div>
          )}

          {fase === 'resumo' && (
            <div className="w-full">
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