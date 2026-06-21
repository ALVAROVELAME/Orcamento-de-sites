import { useEffect, useState } from 'react';
import { FORMULARIO_CONFIG, type InfoSite, type Pacote } from '../../data/precos';
import { OptionSelectionStep } from '../design/formulario';

interface Etapa6Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
  pacoteEscolhido: Pacote | null;
}

export function Etapa6({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto, pacoteEscolhido }: Etapa6Props) {
  const [extraExpandido, setExtraExpandido] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleEcommerce = (id: string) => {
    const selecionadosAtuais = infoSite.ecommerce_extras || [];
    const novosSelecionados = selecionadosAtuais.includes(id as never)
      ? selecionadosAtuais.filter((item) => item !== id)
      : [...selecionadosAtuais, id as never];

    setInfoSite({ ...infoSite, ecommerce_extras: novosSelecionados });
  };

  return (
    <OptionSelectionStep
      titulo={FORMULARIO_CONFIG.etapa6.titulo}
      descricao={FORMULARIO_CONFIG.etapa6.descricao}
      opcoes={FORMULARIO_CONFIG.etapa6.opcoes}
      selecionados={infoSite.ecommerce_extras || []}
      expandido={extraExpandido}
      onToggleExpandido={(id) => setExtraExpandido(extraExpandido === id ? null : id)}
      onToggleSelecionado={handleToggleEcommerce}
      onVoltar={voltarEtapa}
      onProximo={finalizarProjeto}
      textoProximo={FORMULARIO_CONFIG.etapa6.textoProximo}
      accent="emerald"
      pacoteEscolhido={pacoteEscolhido}
    />
  );
}
