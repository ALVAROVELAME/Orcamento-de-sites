import { useEffect, useState } from 'react';
import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import {
  LISTA_CATEGORIAS_SECOES,
  obterMetaFaixaPrecoCategoria,
  obterModeloSecaoConfig,
  obterMetaPrecoSecaoModelo,
  obterTotalSecoesComCapa,
  obterCategoriaSecaoConfig,
  itemEstaIncluidoNoPacote,
  type CategoriaSecao,
  type InfoSite,
  type ModeloSecaoId,
  type ModeloSecaoPreview,
  type Pacote,
  type SelecaoPrecoProjeto,
  type SecaoNoSite
} from '../../data/precos';
import { scrollParaTopo } from '../../utils/scroll';
import { FormStepHeader, SelectableAccordion } from '../design/formulario';
import { BIBLIOTECA_SECOES } from './constants';
import { AvisoFlutuante } from './AvisoFlutuante';
import { BotoesNavegacao } from './BotoesNavegacao';
import { PreviewSecao } from './PreviewSecao';
import { useAutoExpandirTemporariamente } from './useAutoExpandirTemporariamente';

const TODAS_CATEGORIAS = LISTA_CATEGORIAS_SECOES;

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

type SecaoParaPreco = NonNullable<SelecaoPrecoProjeto['secoes']>[number];

function montarSecoesParaPreco(
  categorias: CategoriaSecao[],
  secoesComModelo: SecaoNoSite[],
  pacote: Pacote | null
): SecaoParaPreco[] {
  return categorias.map((categoria) => {
    const secaoComModelo = secoesComModelo.find((secao) => secao.categoria === categoria);
    const modeloIncluido = obterModeloIncluidoNaCategoria(categoria, pacote) ?? undefined;

    return {
      categoria,
      modelo: secaoComModelo?.modelo ?? modeloIncluido
    };
  });
}

function atualizarSecaoNoSite(site: SecaoNoSite[], categoria: CategoriaSecao, modelo: ModeloSecaoId) {
  const siteFiltrado = site.filter((secao) => secao.categoria !== categoria);
  const novaSecao: SecaoNoSite = { id: crypto.randomUUID(), categoria, modelo };
  return [...siteFiltrado, novaSecao];
}

interface PreviewCategoriaSecaoProps {
  descricaoCategoria: string;
  modeloParaImagem?: ModeloSecaoPreview;
}

function PreviewCategoriaSecao({ descricaoCategoria, modeloParaImagem }: PreviewCategoriaSecaoProps) {
  return (
    <div className="p-0 bg-white w-full overflow-x-auto">
      <div className="w-full bg-white pointer-events-none">
        <div className="px-5 pt-4 pb-5 md:px-6 md:pt-5 md:pb-6 bg-slate-50 border-t border-slate-100 text-left">
          <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl">
            {descricaoCategoria}
          </p>
        </div>
        {modeloParaImagem?.previewImagemSrc ? (
          <div className="px-5 pb-6 md:px-6 md:pb-8 bg-slate-50">
            <img
              src={modeloParaImagem.previewImagemSrc}
              alt={modeloParaImagem.previewImagemAlt ?? modeloParaImagem.nome}
              className="block w-full max-w-4xl mx-auto h-auto rounded-md border border-slate-200 shadow-sm"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface Etapa3Props {
  infoSite: InfoSite;
  pacoteEscolhido: Pacote | null;
  site: SecaoNoSite[];
  setSite: (site: SecaoNoSite[]) => void;
  setSecoesParaPreco: (secoes: SecaoParaPreco[]) => void;
  onVoltarEtapaAnterior: () => void;
  onAvancarParaEtapa4: () => void;
}

export function Etapa3({
  infoSite,
  pacoteEscolhido,
  site,
  setSite,
  setSecoesParaPreco,
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
    scrollParaTopo();
  }, [fase, indiceAtual]);

  useEffect(() => {
    setSecoesParaPreco(montarSecoesParaPreco(categoriasSelecionadas, site, pacoteEscolhido));
  }, [categoriasSelecionadas, pacoteEscolhido, setSecoesParaPreco, site]);

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
      <AvisoFlutuante
        visivel={mostrarAvisoLimite}
        lado="right"
        cor="rose"
        icone="alerta"
        titulo={config.avisoLimite.titulo}
        descricao={avisoLimiteDescricao}
        ariaLabelFechar="Fechar aviso de limite do pacote"
        onFechar={() => setMostrarAvisoLimite(false)}
      />

      <AvisoFlutuante
        visivel={mostrarAvisoSeccoesRestantes}
        lado="left"
        cor="indigo"
        icone="info"
        titulo={config.avisoSecoesRestantes.titulo}
        descricao={avisoSecoesRestantesDescricao}
        ariaLabelFechar="Fechar aviso de secoes restantes"
        onFechar={() => setMostrarAvisoSeccoesRestantes(false)}
      />

      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className={`bg-white w-full p-4 md:p-6 relative ${fase === 'escolha_modelos' ? 'shadow-none bg-transparent' : 'shadow-sm border-b border-slate-200'}`}>
          {fase === 'selecao_inicial' && (
            <div className="max-w-7xl mx-auto px-4 mt-2">
              <FormStepHeader
                titulo={config.selecaoInicial.titulo}
                descricao={config.selecaoInicial.descricao}
                textoAcaoAntesImagem={config.selecaoInicial.textoAcaoAntesImagem}
                imagemAcaoSrc={config.selecaoInicial.imagemAcaoSrc}
                imagemAcaoAlt={config.selecaoInicial.imagemAcaoAlt}
                textoAcaoDepoisImagem={config.selecaoInicial.textoAcaoDepoisImagem}
                descriptionClassName="text-base text-slate-700 leading-relaxed"
                rightContent={(
                  <div className="text-right">
                    <span className={`text-sm font-bold ${categoriasSelecionadas.length >= limiteDoPlano ? 'text-rose-500' : 'text-indigo-600'}`}>
                      {categoriasSelecionadas.length} / {limiteDoPlano}
                    </span>
                    <p className="text-sm text-slate-600">{config.selecaoInicial.contadorSelecionadas}</p>
                  </div>
                )}
              />

              <div className="flex flex-col gap-6 w-full mt-6 xl:max-w-5xl xl:mx-auto">
                {TODAS_CATEGORIAS.map((categoria) => {
                  const categoriaConfig = obterCategoriaSecaoConfig(categoria);
                  const modeloParaImagemDaCategoria = BIBLIOTECA_SECOES[categoria][0];
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
                      <PreviewCategoriaSecao
                        descricaoCategoria={categoriaConfig.descricao}
                        modeloParaImagem={modeloParaImagemDaCategoria}
                      />
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
                      metaLabel={obterMetaPrecoSecaoModelo(categoriaAtual, modelo.id, pacoteEscolhido)}
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
              <FormStepHeader
                titulo={config.resumo.titulo}
                descricao={infoSite.nome ? `${config.resumo.prefixoProjeto} ${infoSite.nome}` : undefined}
                titleClassName="text-2xl font-black text-slate-800"
                descriptionClassName="text-base text-indigo-700 font-semibold"
                containerClassName="max-w-7xl xl:max-w-5xl mx-auto px-4 flex flex-col mb-6 pb-4 border-b border-slate-100 gap-1"
              />

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
