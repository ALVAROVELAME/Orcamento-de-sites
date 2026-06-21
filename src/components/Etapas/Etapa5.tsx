import { useEffect, useState } from 'react';
import { FORMULARIO_CONFIG, ehPacoteEcommerce, type InfoSite, type Pacote } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';

interface Etapa5Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  pacoteEscolhido: Pacote | null;
  voltarEtapa: () => void;
  proximaEtapa: () => void;
  finalizarProjeto: () => void;
}

export function Etapa5({
  infoSite,
  setInfoSite,
  pacoteEscolhido,
  voltarEtapa,
  proximaEtapa,
  finalizarProjeto
}: Etapa5Props) {
  const [extraExpandido, setExtraExpandido] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleExtra = (id: string) => {
    const selecionadosAtuais = infoSite.extras_integracoes || [];
    const novosSelecionados = selecionadosAtuais.includes(id as never)
      ? selecionadosAtuais.filter((item) => item !== id)
      : [...selecionadosAtuais, id as never];

    setInfoSite({ ...infoSite, extras_integracoes: novosSelecionados });
  };

  const ecommerce = ehPacoteEcommerce(pacoteEscolhido);

  return (
    <OptionSelectionStep
      titulo={FORMULARIO_CONFIG.etapa5.titulo}
      descricao={FORMULARIO_CONFIG.etapa5.descricao}
      opcoes={FORMULARIO_CONFIG.etapa5.opcoes}
      selecionados={infoSite.extras_integracoes || []}
      expandido={extraExpandido}
      onToggleExpandido={(id) => setExtraExpandido(extraExpandido === id ? null : id)}
      onToggleSelecionado={handleToggleExtra}
      onVoltar={voltarEtapa}
      onProximo={ecommerce ? proximaEtapa : finalizarProjeto}
      textoProximo={ecommerce ? FORMULARIO_CONFIG.etapa5.textoProximoEcommerce : FORMULARIO_CONFIG.etapa5.textoProximoPadrao}
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
