import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { PACOTES, type Pacote } from '../../data/precos';
import { PlanSelectionStep } from '../design/formulario';

interface Etapa1Props {
  avancarParaEtapa2: (pacote: Pacote) => void;
}

export function Etapa1({ avancarParaEtapa2 }: Etapa1Props) {
  return (
    <PlanSelectionStep
      titulo={FORMULARIO_CONFIG.etapa1.titulo}
      descricao={FORMULARIO_CONFIG.etapa1.descricao}
      textoBotaoSelecionar={FORMULARIO_CONFIG.etapa1.textoBotaoSelecionar}
      prefixoLimiteSecoes={FORMULARIO_CONFIG.etapa1.prefixoLimiteSecoes}
      sufixoLimiteSecoes={FORMULARIO_CONFIG.etapa1.sufixoLimiteSecoes}
      pacotes={PACOTES}
      onSelecionar={avancarParaEtapa2}
    />
  );
}
