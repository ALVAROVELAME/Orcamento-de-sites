import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { EtapaSelecaoOpcoesComConfig } from './EtapaSelecaoOpcoes';

interface Etapa6Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
}

// FUTURO: etapa de e-commerce preservada para reativacao do fluxo de loja virtual.
export function Etapa6({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto, pacoteEscolhido }: Etapa6Props) {
  return (
    <EtapaSelecaoOpcoesComConfig
      campo="ecommerce_extras"
      config={FORMULARIO_CONFIG.etapa6}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      accent="emerald"
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
