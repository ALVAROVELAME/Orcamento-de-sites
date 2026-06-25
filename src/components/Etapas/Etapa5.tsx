import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import type { InfoSite, Pacote } from '../../data/precos';
import { EtapaSelecaoOpcoes } from './EtapaSelecaoOpcoes';

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
  return (
    <EtapaSelecaoOpcoes
      campo="extras_integracoes"
      titulo={FORMULARIO_CONFIG.etapa5.titulo}
      descricao={FORMULARIO_CONFIG.etapa5.descricao}
      opcoes={FORMULARIO_CONFIG.etapa5.opcoes}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa5.textoProximoPadrao}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
