import { useState } from 'react';
import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import type { InfoSite, Pacote } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';
import { alternarItemSelecionado, useScrollToTopOnMount } from './helpers';

interface Etapa5Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  pacoteEscolhido: Pacote | null;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
}

export function Etapa5({
  infoSite,
  setInfoSite,
  pacoteEscolhido,
  voltarEtapa,
  finalizarProjeto
}: Etapa5Props) {
  const [extraExpandido, setExtraExpandido] = useState<string | null>(null);
  useScrollToTopOnMount();

  const handleToggleExtra = (id: string) => {
    setInfoSite({
      ...infoSite,
      extras_integracoes: alternarItemSelecionado(infoSite.extras_integracoes, id as never)
    });
  };

  return (
    <OptionSelectionStep
      titulo={FORMULARIO_CONFIG.etapa5.titulo}
      descricao={FORMULARIO_CONFIG.etapa5.descricao}
      opcoes={FORMULARIO_CONFIG.etapa5.opcoes}
      selecionados={infoSite.extras_integracoes || []}
      expandido={extraExpandido}
      onToggleExpandido={(id) => setExtraExpandido(extraExpandido === id ? null : id)}
      onToggleSelecionado={handleToggleExtra}
      onVoltar={voltarEtapa}
      // Loja virtual desativada temporariamente: sempre finaliza o projeto nesta etapa.
      onProximo={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa5.textoProximoPadrao}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
