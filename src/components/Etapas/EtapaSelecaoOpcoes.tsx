import { useState } from 'react';
import { type InfoSite, type Pacote } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';
import { alternarItemSelecionado, useScrollToTopOnMount } from './helpers';

type CampoSelecaoInfoSite = 'paginas_extras' | 'extras_integracoes' | 'ecommerce_extras';

interface OpcaoSelecao {
  id: string;
  titulo: string;
  descricao?: string;
  preco?: number;
  incluidoNosPacotes?: readonly Pacote['id'][];
}

interface ConfigSelecaoOpcoes {
  titulo: string;
  descricao: string;
  textoAcaoAntesImagem?: string;
  imagemAcaoSrc?: string;
  imagemAcaoAlt?: string;
  textoAcaoDepoisImagem?: string;
  opcoes: readonly OpcaoSelecao[];
  textoProximo?: string;
  contadorSelecionadas?: string;
}

interface EtapaSelecaoOpcoesProps {
  campo: CampoSelecaoInfoSite;
  titulo: string;
  descricao: string;
  textoAcaoAntesImagem?: string;
  imagemAcaoSrc?: string;
  imagemAcaoAlt?: string;
  textoAcaoDepoisImagem?: string;
  opcoes: readonly OpcaoSelecao[];
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
  textoProximo?: string;
  contadorSelecionadas?: string;
  accent?: 'indigo' | 'emerald';
}

interface EtapaSelecaoOpcoesComConfigProps {
  campo: CampoSelecaoInfoSite;
  config: ConfigSelecaoOpcoes;
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
  textoProximo?: string;
  accent?: 'indigo' | 'emerald';
}

export function EtapaSelecaoOpcoesComConfig({
  campo,
  config,
  infoSite,
  setInfoSite,
  voltarEtapa,
  finalizarProjeto,
  pacoteEscolhido,
  textoProximo,
  accent
}: EtapaSelecaoOpcoesComConfigProps) {
  return (
    <EtapaSelecaoOpcoes
      campo={campo}
      titulo={config.titulo}
      descricao={config.descricao}
      textoAcaoAntesImagem={config.textoAcaoAntesImagem}
      imagemAcaoSrc={config.imagemAcaoSrc}
      imagemAcaoAlt={config.imagemAcaoAlt}
      textoAcaoDepoisImagem={config.textoAcaoDepoisImagem}
      opcoes={config.opcoes}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      textoProximo={textoProximo ?? config.textoProximo}
      contadorSelecionadas={config.contadorSelecionadas}
      accent={accent}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}

export function EtapaSelecaoOpcoes({
  campo,
  titulo,
  descricao,
  textoAcaoAntesImagem,
  imagemAcaoSrc,
  imagemAcaoAlt,
  textoAcaoDepoisImagem,
  opcoes,
  infoSite,
  setInfoSite,
  voltarEtapa,
  finalizarProjeto,
  pacoteEscolhido,
  textoProximo,
  contadorSelecionadas,
  accent
}: EtapaSelecaoOpcoesProps) {
  const [itemExpandido, setItemExpandido] = useState<string | null>(null);
  useScrollToTopOnMount();

  const selecionados = (infoSite[campo] as readonly string[] | undefined) ?? [];

  const handleToggleItem = (id: string) => {
    setInfoSite({
      ...infoSite,
      [campo]: alternarItemSelecionado(selecionados, id)
    } as InfoSite);
  };

  return (
    <OptionSelectionStep
      titulo={titulo}
      descricao={descricao}
      textoAcaoAntesImagem={textoAcaoAntesImagem}
      imagemAcaoSrc={imagemAcaoSrc}
      imagemAcaoAlt={imagemAcaoAlt}
      textoAcaoDepoisImagem={textoAcaoDepoisImagem}
      opcoes={opcoes}
      selecionados={[...selecionados]}
      expandido={itemExpandido}
      onToggleExpandido={(id) => setItemExpandido(itemExpandido === id ? null : id)}
      onToggleSelecionado={handleToggleItem}
      onVoltar={voltarEtapa}
      onProximo={finalizarProjeto}
      textoProximo={textoProximo}
      contadorSelecionadas={contadorSelecionadas}
      accent={accent}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
