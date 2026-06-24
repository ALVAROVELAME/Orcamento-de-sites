import { useState } from 'react';
import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';
import { alternarItemSelecionado, useScrollToTopOnMount } from './helpers';

interface Etapa4Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
}

export function Etapa4({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto, pacoteEscolhido }: Etapa4Props) {
  const [paginaExpandida, setPaginaExpandida] = useState<string | null>(null);
  useScrollToTopOnMount();

  const handleTogglePagina = (id: string) => {
    setInfoSite({
      ...infoSite,
      paginas_extras: alternarItemSelecionado(infoSite.paginas_extras, id as never)
    });
  };

  return (
    <OptionSelectionStep
      titulo={FORMULARIO_CONFIG.etapa4.titulo}
      descricao={FORMULARIO_CONFIG.etapa4.descricao}
      opcoes={FORMULARIO_CONFIG.etapa4.opcoes}
      selecionados={infoSite.paginas_extras || []}
      expandido={paginaExpandida}
      onToggleExpandido={(id) => setPaginaExpandida(paginaExpandida === id ? null : id)}
      onToggleSelecionado={handleTogglePagina}
      onVoltar={voltarEtapa}
      onProximo={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa4.textoProximo}
      contadorSelecionadas={FORMULARIO_CONFIG.etapa4.contadorSelecionadas}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
