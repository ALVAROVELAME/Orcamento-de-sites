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

interface EtapaSelecaoOpcoesProps {
  campo: CampoSelecaoInfoSite;
  titulo: string;
  descricao: string;
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

export function EtapaSelecaoOpcoes({
  campo,
  titulo,
  descricao,
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
