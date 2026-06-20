import { useEffect, useState } from 'react';
import { FORMULARIO_CONFIG, type InfoSite } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';

interface Etapa4Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
}

export function Etapa4({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto }: Etapa4Props) {
  const [paginaExpandida, setPaginaExpandida] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTogglePagina = (id: string) => {
    const selecionadasAtuais = infoSite.paginas_extras || [];
    const novasSelecionadas = selecionadasAtuais.includes(id as never)
      ? selecionadasAtuais.filter((item) => item !== id)
      : [...selecionadasAtuais, id as never];

    setInfoSite({ ...infoSite, paginas_extras: novasSelecionadas });
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
    />
  );
}
