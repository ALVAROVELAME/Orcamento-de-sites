import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { EtapaSelecaoOpcoesComConfig } from './EtapaSelecaoOpcoes';

interface Etapa4Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
}

export function Etapa4({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto, pacoteEscolhido }: Etapa4Props) {
  return (
    <EtapaSelecaoOpcoesComConfig
      campo="paginas_extras"
      config={FORMULARIO_CONFIG.etapa4}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
