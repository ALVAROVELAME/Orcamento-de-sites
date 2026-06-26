import { useEffect, useState } from 'react';
import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import {
  LISTA_CATEGORIAS_SECOES,
  obterMetaFaixaPrecoCategoria,
  obterModeloSecaoConfig,
  obterMetaPreco,
  obterTotalSecoesComCapa,
  obterCategoriaSecaoConfig,
  itemEstaIncluidoNoPacote,
  type CategoriaSecao,
  type InfoSite,
  type ModeloSecaoId,
  type Pacote,
  type SecaoNoSite
} from '../../data/precos';
import { SelectableAccordion } from '../design/formulario';
import { BIBLIOTECA_SECOES } from './constants';
import { BotoesNavegacao } from './BotoesNavegacao';
import { PreviewSecao } from './PreviewSecao';

const TODAS_CATEGORIAS = LISTA_CATEGORIAS_SECOES;
const TEMPO_AUTO_ABRIR_MS = 400;
const TEMPO_AUTO_FECHAR_MS = 1500;

function obterCategoriasIncluidasNoPacote(pacote: Pacote | null) {
  if (!pacote) return [];

  return TODAS_CATEGORIAS.filter((categoria) => {
    const categoriaConfig = obterCategoriaSecaoConfig(categoria);
    return categoriaConfig.modelos.some((modelo) => itemEstaIncluidoNoPacote(modelo, pacote));
  });
}

function obterModeloIncluidoNaCategoria(categoria: CategoriaSecao, pacote: Pacote | null) {
  if (!pacote) return null;

  const categoriaConfig = obterCategoriaSecaoConfig(categoria);
  return categoriaConfig.modelos.find((modelo) => itemEstaIncluidoNoPacote(modelo, pacote))?.id ?? null;
}

function useAutoExpandirTemporariamente<TId extends string>(
  ativo: boolean,
  itemId: TId | null | undefined,
  setExpandido: (item: TId | null) => void
) {
  useEffect(() => {
    if (!ativo || !itemId) return undefined;

    let fecharTimer: ReturnType<typeof setTimeout>;

    const abrirTimer = setTimeout(() => {
      setExpandido(itemId);
      fecharTimer = setTimeout(() => setExpandido(null), TEMPO_AUTO_FECHAR_MS);
    }, TEMPO_AUTO_ABRIR_MS);

    return () => {
      clearTimeout(abrirTimer);
      if (fecharTimer) clearTimeout(fecharTimer);
    };
  }, [ativo, itemId, setExpandido]);
}

function atualizarSecaoNoSite(site: SecaoNoSite[], categoria: CategoriaSecao, modelo: ModeloSecaoId) {
  const siteFiltrado = site.filter((secao) => secao.categoria !== categoria);
  const novaSecao: SecaoNoSite = { id: crypto.randomUUID(), categoria, modelo };
  return [...siteFiltrado, novaSecao];
}

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
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<CategoriaSecao[]>(() => obterCategoriasIncluidasNoPacote(pacoteEscolhido));
  const [categoriaExpandida, setCategoriaExpandida] = useState<CategoriaSecao | null>(null);
  const [modeloExpandido, setModeloExpandido] = useState<ModeloSecaoId | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloSecaoId | null>(null);
  const [resumoExpandido, setResumoExpandido] = useState<string | null>(null);
  const [mostrarAvisoLimite, setMostrarAvisoLimite] = useState(false);
  const [mostrarAvisoSeccoesRestantes, setMostrarAvisoSeccoesRestantes] = useState(false);

  const limiteDoPlano = obterTotalSecoesComCapa(pacoteEscolhido);
  const config = FORMULARIO_CONFIG.etapa3;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fase, indiceAtual]);

  useEffect(() => {
    if (!mostrarAvisoLimite) return undefined;

    const timer = setTimeout(() => {
      setMostrarAvisoLimite(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [mostrarAvisoLimite]);

  const categoriaAtual = categoriasPendentes[indiceAtual];
  const primeiroModeloDaCategoriaAtual = categoriaAtual ? BIBLIOTECA_SECOES[categoriaAtual]?.[0]?.id ?? null : null;
  const primeiraSecaoResumo = site[0]?.id ?? null;

  useAutoExpandirTemporariamente(fase === 'selecao_inicial', TODAS_CATEGORIAS[0] ?? null, setCategoriaExpandida);
  useAutoExpandirTemporariamente(fase === 'escolha_modelos', primeiroModeloDaCategoriaAtual, setModeloExpandido);
  useAutoExpandirTemporariamente(fase === 'resumo', primeiraSecaoResumo, setResumoExpandido);

  const iniciarEscolhaDeModelos = () => {
    if (categoriasSelecionadas.length === 0) return;
    setCategoriasPendentes(categoriasSelecionadas);
    setIndiceAtual(0);
    setModeloExpandido(null);
    setModeloSelecionado(obterModeloIncluidoNaCategoria(categoriasSelecionadas[0], pacoteEscolhido));
    setSite([]);
    setFase('escolha_modelos');
  };

  const avancarParaProximaCategoria = () => {
    if (!modeloSelecionado || !categoriaAtual) return;

    const novoSite = atualizarSecaoNoSite(site, categoriaAtual, modeloSelecionado);
    setSite(novoSite);

    if (indiceAtual + 1 < categoriasPendentes.length) {
      const proximaCategoria = categoriasPendentes[indiceAtual + 1];
      const secaoExistente = novoSite.find((secao) => secao.categoria === proximaCategoria);
      setIndiceAtual((prev) => prev + 1);
      setModeloExpandido(null);
      setModeloSelecionado(secaoExistente ? secaoExistente.modelo : null);
      return;
    }

    setResumoExpandido(null);
    setFase('resumo');
  };

  const tratarAcaoVoltar = () => {
    if (fase === 'selecao_inicial') {
      onVoltarEtapaAnterior();
      return;
    }

    if (fase === 'escolha_modelos') {
      if (indiceAtual > 0) {
        const novoIndice = indiceAtual - 1;
        const categoriaAnterior = categoriasPendentes[novoIndice];
        const secaoExistente = site.find((secao) => secao.categoria === categoriaAnterior);

        setIndiceAtual(novoIndice);
        setModeloExpandido(null);
        setModeloSelecionado(secaoExistente ? secaoExistente.modelo : null);
        return;
      }

      setFase('selecao_inicial');
      return;
    }

    setFase('escolha_modelos');
    setIndiceAtual(categoriasPendentes.length - 1);
    const ultimaCategoria = site[site.length - 1]?.categoria || categoriasPendentes[categoriasPendentes.length - 1];
    const secaoExistente = site.find((secao) => secao.categoria === ultimaCategoria);
    setModeloSelecionado(secaoExistente ? secaoExistente.modelo : null);
  };

  const tratarAcaoProximo = () => {
    if (fase === 'selecao_inicial') {
      if (categoriasSelecionadas.length < limiteDoPlano) {
        setMostrarAvisoSeccoesRestantes(true);
      }
      iniciarEscolhaDeModelos();
      return;
    }

    if (fase === 'escolha_modelos') {
      avancarParaProximaCategoria();
      return;
    }

    onAvancarParaEtapa4();
  };

  const proximoDesabilitado =
    fase === 'selecao_inicial' ? categoriasSelecionadas.length === 0 : fase === 'escolha_modelos' ? !modeloSelecionado : false;

  const voltarAoInicioDaEtapa3 = () => {
    setFase('selecao_inicial');
    setIndiceAtual(0);
    setModeloExpandido(null);
    setModeloSelecionado(null);
    setResumoExpandido(null);
  };

  const sincronizarSecaoAtualNoSite = (modeloId: ModeloSecaoId) => {
    if (!categoriaAtual) return;

    setSite(atualizarSecaoNoSite(site, categoriaAtual, modeloId));
  };

  const avisoLimiteDescricao = config.avisoLimite.descricao.replace('{limite}', String(limiteDoPlano));
  const avisoSecoesRestantesDescricao = `Voce ainda pode escolher ${limiteDoPlano - categoriasSelecionadas.length} secao(oes) a mais. A capa ja esta incluida no pacote.`;
  const categoriaAtualConfig = categoriaAtual ? obterCategoriaSecaoConfig(categoriaAtual) : null;

  return (
    <div className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen relative overflow-hidden">
      <div
        className={`fixed top-4 right-4 md:top-8 md:right-8 z-50 transition-all duration-500 transform ${
          mostrarAvisoLimite ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-rose-600 text-white p-4 rounded-xl shadow-xl flex items-start gap-4 border border-rose-500 max-w-sm">
          <div className="mt-0.5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-md mb-1">{config.avisoLimite.titulo}</h4>
            <p className="text-base text-rose-50">{avisoLimiteDescricao}</p>
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

      <div
        className={`fixed top-4 left-4 md:top-8 md:left-8 z-50 transition-all duration-500 transform ${
          mostrarAvisoSeccoesRestantes ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-xl flex items-start gap-4 border border-indigo-500 max-w-sm">
          <div className="mt-0.5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5A8.5 8.5 0 1 0 12 3.5a8.5 8.5 0 0 0 0 17Z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-md mb-1">{config.avisoSecoesRestantes.titulo}</h4>
            <p className="text-base text-indigo-50">{avisoSecoesRestantesDescricao}</p>
          </div>
          <button
            onClick={() => setMostrarAvisoSeccoesRestantes(false)}
            aria-label="Fechar aviso de secoes restantes"
            title="Fechar aviso de secoes restantes"
            className="p-1 hover:bg-indigo-700 rounded transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className={`bg-white w-full p-4 md:p-6 relative ${fase === 'escolha_modelos' ? 'shadow-none bg-transparent' : 'shadow-sm border-b border-slate-200'}`}>
          {fase === 'selecao_inicial' && (
            <div className="max-w-7xl mx-auto px-4 mt-2">
              <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800">{config.selecaoInicial.titulo}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-base text-slate-700 leading-relaxed">
                    <span>{config.selecaoInicial.descricao}</span>
                    <span className="font-bold text-slate-900">{config.selecaoInicial.textoAcaoAntesImagem}</span>
                    <img
                      src={config.selecaoInicial.imagemAcaoSrc}
                      alt={config.selecaoInicial.imagemAcaoAlt}
                      className="inline-block h-12 w-12 md:h-14 md:w-14 rounded-sm align-middle"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="font-bold text-slate-900">{config.selecaoInicial.textoAcaoDepoisImagem}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${categoriasSelecionadas.length >= limiteDoPlano ? 'text-rose-500' : 'text-indigo-600'}`}>
                    {categoriasSelecionadas.length} / {limiteDoPlano}
                  </span>
                  <p className="text-sm text-slate-600">{config.selecaoInicial.contadorSelecionadas}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full mt-6 xl:max-w-5xl xl:mx-auto">
                {TODAS_CATEGORIAS.map((categoria) => {
                  const categoriaConfig = obterCategoriaSecaoConfig(categoria);
                  const modelosDaCategoria = BIBLIOTECA_SECOES[categoria];
                  const primeiroModelo = modelosDaCategoria[0];
                  const isSelected = categoriasSelecionadas.includes(categoria);

                  return (
                    <SelectableAccordion
                      key={categoria}
                      titulo={categoriaConfig.nome}
                      metaLabel={obterMetaFaixaPrecoCategoria(categoria, pacoteEscolhido)}
                      titleClassName="capitalize"
                      isExpanded={categoriaExpandida === categoria}
                      isSelected={isSelected}
                      onToggleExpand={() => setCategoriaExpandida(categoriaExpandida === categoria ? null : categoria)}
                      onToggleSelect={() => {
                        if (isSelected) {
                          setCategoriasSelecionadas(categoriasSelecionadas.filter((item) => item !== categoria));
                          setMostrarAvisoLimite(false);
                          setMostrarAvisoSeccoesRestantes(false);
                          return;
                        }

                        if (categoriasSelecionadas.length < limiteDoPlano) {
                          setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
                          setMostrarAvisoLimite(false);
                          setMostrarAvisoSeccoesRestantes(false);
                          return;
                        }

                        setMostrarAvisoLimite(true);
                      }}
                    >
                      <div className="p-0 bg-white w-full overflow-x-auto">
                        <div className="w-full bg-white pointer-events-none">
                          <PreviewSecao modelo={primeiroModelo} fallbackText={config.textoPreviewIndisponivel} />
                        </div>
                      </div>
                    </SelectableAccordion>
                  );
                })}
              </div>
            </div>
          )}

          {fase === 'escolha_modelos' && categoriaAtual && categoriaAtualConfig && (
            <div className="w-full mt-2">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-800">
                    {config.escolhaModelos.prefixoTitulo} <span className="text-indigo-600 capitalize">{categoriaAtualConfig.nome}</span>
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full xl:max-w-5xl xl:mx-auto">
                {BIBLIOTECA_SECOES[categoriaAtual].map((modelo) => {
                  return (
                    <SelectableAccordion
                      key={modelo.id}
                      titulo={modelo.nome}
                      metaLabel={obterMetaPreco(modelo, pacoteEscolhido)}
                      isExpanded={modeloExpandido === modelo.id}
                      isSelected={modeloSelecionado === modelo.id}
                      onToggleExpand={() => setModeloExpandido(modeloExpandido === modelo.id ? null : modelo.id)}
                      onToggleSelect={() => {
                        setModeloSelecionado(modelo.id);
                        sincronizarSecaoAtualNoSite(modelo.id);
                        if (modeloExpandido !== modelo.id) setModeloExpandido(modelo.id);
                      }}
                      selectionType="radio"
                    >
                      <div className="p-0 bg-white w-full overflow-x-auto">
                        <div className="w-full bg-white pointer-events-none">
                          <PreviewSecao modelo={modelo} fallbackText={config.textoModeloIndisponivel} />
                        </div>
                      </div>
                    </SelectableAccordion>
                  );
                })}
              </div>
            </div>
          )}

          {fase === 'resumo' && (
            <div className="w-full mt-2 xl:max-w-5xl xl:mx-auto">
              <div className="max-w-7xl xl:max-w-5xl mx-auto px-4 flex flex-col mb-6 pb-4 border-b border-slate-100 gap-1">
                <h3 className="text-2xl font-black text-slate-800">{config.resumo.titulo}</h3>
                {infoSite.nome && <p className="text-base text-indigo-700 font-semibold">{config.resumo.prefixoProjeto} {infoSite.nome}</p>}
              </div>

              <div className="flex flex-col gap-4 w-full">
                {site.map((secao, index) => {
                  const categoriaConfig = obterCategoriaSecaoConfig(secao.categoria);
                  const modeloConfig = obterModeloSecaoConfig(secao.modelo);

                  return (
                    <SelectableAccordion
                      key={secao.id}
                      titulo={`${index + 1}. ${categoriaConfig.nome}`}
                      metaLabel={modeloConfig?.nome ?? null}
                      isExpanded={resumoExpandido === secao.id}
                      isSelected={resumoExpandido === secao.id}
                      onToggleExpand={() => setResumoExpandido(resumoExpandido === secao.id ? null : secao.id)}
                      onToggleSelect={() => setResumoExpandido(resumoExpandido === secao.id ? null : secao.id)}
                      mostrarSelecao={false}
                      headerRightContent={(
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            voltarAoInicioDaEtapa3();
                          }}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-lg font-bold text-sm transition-colors"
                        >
                          Voltar
                        </button>
                      )}
                      containerClassName="max-w-7xl xl:max-w-5xl mx-auto"
                    >
                      <div className="bg-white">
                        <div className="pointer-events-none opacity-95 max-h-[600px] overflow-hidden relative">
                          <PreviewSecao modelo={modeloConfig} fallbackText={config.resumo.textoVisualizacaoIndisponivel} />
                          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
                        </div>
                      </div>
                    </SelectableAccordion>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 max-w-7xl xl:max-w-5xl mx-auto px-4">
            <BotoesNavegacao onVoltar={tratarAcaoVoltar} onProximo={tratarAcaoProximo} desabilitarProximo={proximoDesabilitado} />
          </div>
        </div>
      </div>
    </div>
  );
}
