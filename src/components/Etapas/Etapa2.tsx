import type { FormEvent } from 'react';
import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { IdentityVisualStep } from '../design/formulario';

interface Etapa2Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  avancarParaEtapa3: (event: FormEvent) => void;
  voltarEtapa: () => void;
  pacoteEscolhido: Pacote | null;
}

export function Etapa2({ infoSite, setInfoSite, avancarParaEtapa3, voltarEtapa, pacoteEscolhido }: Etapa2Props) {
  return (
    <IdentityVisualStep
      config={FORMULARIO_CONFIG.etapa2}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      onSubmit={avancarParaEtapa3}
      onVoltar={voltarEtapa}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
