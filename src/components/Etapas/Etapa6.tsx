import { useState } from 'react';
import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';
import { alternarItemSelecionado, useScrollToTopOnMount } from './helpers';

interface Etapa6Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
}

// FUTURO: etapa de e-commerce preservada para reativacao do fluxo de loja virtual.
export function Etapa6({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto, pacoteEscolhido }: Etapa6Props) {
  const [extraExpandido, setExtraExpandido] = useState<string | null>(null);
  useScrollToTopOnMount();

  const handleToggleEcommerce = (id: string) => {
    setInfoSite({
      ...infoSite,
      ecommerce_extras: alternarItemSelecionado(infoSite.ecommerce_extras, id as never)
    });
  };

  return (
    <OptionSelectionStep
      titulo={FORMULARIO_CONFIG.etapa6.titulo}
      descricao={FORMULARIO_CONFIG.etapa6.descricao}
      opcoes={FORMULARIO_CONFIG.etapa6.opcoes}
      selecionados={infoSite.ecommerce_extras || []}
      expandido={extraExpandido}
      onToggleExpandido={(id) => setExtraExpandido(extraExpandido === id ? null : id)}
      onToggleSelecionado={handleToggleEcommerce}
      onVoltar={voltarEtapa}
      onProximo={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa6.textoProximo}
      accent="emerald"
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
