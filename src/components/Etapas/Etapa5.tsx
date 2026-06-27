import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import type { InfoSite, Pacote } from '../../data/precos';
import { EtapaSelecaoOpcoesComConfig } from './EtapaSelecaoOpcoes';

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
    <EtapaSelecaoOpcoesComConfig
      campo="extras_integracoes"
      config={FORMULARIO_CONFIG.etapa5}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa5.textoProximoPadrao}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
