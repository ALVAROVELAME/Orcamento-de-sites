import { useEffect, useState } from 'react';
import { Etapa1 } from './Etapas/Etapa1';
import { Etapa2 } from './Etapas/Etapa2';
import { Etapa3 } from './Etapas/Etapa3';
import { Etapa4 } from './Etapas/Etapa4';
import { Etapa5 } from './Etapas/Etapa5';
import { Etapa6 } from './Etapas/Etapa6';
import { ProgressBar } from './Etapas/ProgressBar';
import {
  INFO_SITE_INICIAL,
  PACOTES,
  calcularValorProjeto,
  ehPacoteEcommerce,
  type InfoSite,
  type Pacote,
  type SecaoNoSite
} from '../data/precos';
import { abrirWhatsAppFormulario } from '../utils/whatsappFormulario';

type EtapaFormulario = 1 | 2 | 3 | 4 | 5 | 6;

export function Formulario() {
  const [etapaAtual, setEtapaAtual] = useState<EtapaFormulario>(1);
  const [pacoteEscolhido, setPacoteEscolhido] = useState<Pacote | null>(null);
  const [infoSite, setInfoSite] = useState<InfoSite>(INFO_SITE_INICIAL);
  const [site, setSite] = useState<SecaoNoSite[]>([]);
  const [etapa3ResetKey, setEtapa3ResetKey] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [etapaAtual]);

  const obterValorTotal = () => {
    if (!pacoteEscolhido) return 0;

    return calcularValorProjeto({
      pacoteId: pacoteEscolhido.id,
      secoes: site,
      paginasExtras: infoSite.paginas_extras,
      extrasIntegracoes: infoSite.extras_integracoes,
      ecommerceExtras: infoSite.ecommerce_extras,
      temHospedagemDominio: infoSite.tem_hospedagem_dominio,
      statusLogo: infoSite.status_logo
    });
  };

  const avancarParaEtapa2 = (pacote: Pacote) => {
    setPacoteEscolhido(pacote);
    setEtapaAtual(2);
  };

  const avancarParaEtapa3 = (event: React.FormEvent) => {
    event.preventDefault();
    if (infoSite.nome.trim() !== '') setEtapaAtual(3);
  };

  const avancarParaEtapa4 = () => setEtapaAtual(4);
  const avancarParaEtapa5 = () => setEtapaAtual(5);
  const avancarParaEtapa6 = () => setEtapaAtual(6);

  const avancarDaEtapa5 = () => {
    if (ehPacoteEcommerce(pacoteEscolhido)) {
      setEtapaAtual(6);
      return;
    }

    enviarFormularioWhatsApp();
  };

  const voltarEtapa = () => {
    if (etapaAtual === 2) setEtapaAtual(1);
    if (etapaAtual === 3) setEtapaAtual(2);
    if (etapaAtual === 4) setEtapaAtual(3);
    if (etapaAtual === 5) setEtapaAtual(4);
    if (etapaAtual === 6) setEtapaAtual(5);
  };

  const selecionarPacoteDireto = (pacote: Pacote) => {
    const mudouPacote = pacoteEscolhido?.id !== pacote.id;
    setPacoteEscolhido(pacote);

    if (mudouPacote && etapaAtual >= 3) {
      setSite([]);
      setInfoSite((atual) => ({
        ...atual,
        paginas_extras: [],
        extras_integracoes: [],
        ecommerce_extras: []
      }));
      setEtapa3ResetKey((prev) => prev + 1);
      setEtapaAtual(3);
    }
  };

  const enviarFormularioWhatsApp = () => {
    if (!pacoteEscolhido) return;

    abrirWhatsAppFormulario({
      infoSite,
      pacoteEscolhido,
      site,
      valorTotal: obterValorTotal()
    });
  };

  return (
    <div
      id="formulario"
      className="w-full min-h-screen bg-slate-50 flex flex-col items-center font-sans pt-[72px] md:pt-[72px]"
    >
      <ProgressBar
        etapaAtual={etapaAtual}
        pacoteEscolhido={pacoteEscolhido}
        listaPacotes={PACOTES}
        valorTotal={obterValorTotal()}
        selecionarPacote={selecionarPacoteDireto}
      />

      <div className="w-full pt-8 md:pt-10 flex flex-col items-center">
        {etapaAtual === 1 && <Etapa1 avancarParaEtapa2={avancarParaEtapa2} />}
        {etapaAtual === 2 && (
          <Etapa2
            infoSite={infoSite}
            setInfoSite={setInfoSite}
            avancarParaEtapa3={avancarParaEtapa3}
            voltarEtapa={voltarEtapa}
            pacoteEscolhido={pacoteEscolhido}
          />
        )}
        {etapaAtual === 3 && (
          <Etapa3
            key={etapa3ResetKey}
            infoSite={infoSite}
            pacoteEscolhido={pacoteEscolhido}
            site={site}
            setSite={setSite}
            onVoltarEtapaAnterior={voltarEtapa}
            onAvancarParaEtapa4={avancarParaEtapa4}
          />
        )}
        {etapaAtual === 4 && (
          <Etapa4
            infoSite={infoSite}
            setInfoSite={setInfoSite}
            voltarEtapa={voltarEtapa}
            finalizarProjeto={avancarParaEtapa5}
            pacoteEscolhido={pacoteEscolhido}
          />
        )}
        {etapaAtual === 5 && (
          <Etapa5
            infoSite={infoSite}
            setInfoSite={setInfoSite}
            pacoteEscolhido={pacoteEscolhido}
            voltarEtapa={voltarEtapa}
            proximaEtapa={avancarParaEtapa6}
            finalizarProjeto={avancarDaEtapa5}
          />
        )}
        {etapaAtual === 6 && (
          <Etapa6
            infoSite={infoSite}
            setInfoSite={setInfoSite}
            voltarEtapa={voltarEtapa}
            finalizarProjeto={enviarFormularioWhatsApp}
            pacoteEscolhido={pacoteEscolhido}
          />
        )}
      </div>
    </div>
  );
}
