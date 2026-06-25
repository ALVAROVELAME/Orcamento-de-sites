import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { EtapaSelecaoOpcoes } from './EtapaSelecaoOpcoes';

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
    <EtapaSelecaoOpcoes
      campo="ecommerce_extras"
      titulo={FORMULARIO_CONFIG.etapa6.titulo}
      descricao={FORMULARIO_CONFIG.etapa6.descricao}
      opcoes={FORMULARIO_CONFIG.etapa6.opcoes}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa6.textoProximo}
      accent="emerald"
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
