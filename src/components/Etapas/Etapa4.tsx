import { FORMULARIO_CONFIG } from '../../data/configuracaoFormulario';
import { type InfoSite, type Pacote } from '../../data/precos';
import { EtapaSelecaoOpcoes } from './EtapaSelecaoOpcoes';

interface Etapa4Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
}

export function Etapa4({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto, pacoteEscolhido }: Etapa4Props) {
  return (
    <EtapaSelecaoOpcoes
      campo="paginas_extras"
      titulo={FORMULARIO_CONFIG.etapa4.titulo}
      descricao={FORMULARIO_CONFIG.etapa4.descricao}
      textoAcaoAntesImagem={FORMULARIO_CONFIG.etapa4.textoAcaoAntesImagem}
      imagemAcaoSrc={FORMULARIO_CONFIG.etapa4.imagemAcaoSrc}
      imagemAcaoAlt={FORMULARIO_CONFIG.etapa4.imagemAcaoAlt}
      textoAcaoDepoisImagem={FORMULARIO_CONFIG.etapa4.textoAcaoDepoisImagem}
      opcoes={FORMULARIO_CONFIG.etapa4.opcoes}
      infoSite={infoSite}
      setInfoSite={setInfoSite}
      voltarEtapa={voltarEtapa}
      finalizarProjeto={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa4.textoProximo}
      contadorSelecionadas={FORMULARIO_CONFIG.etapa4.contadorSelecionadas}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
