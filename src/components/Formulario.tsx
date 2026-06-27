import { useEffect, useMemo, useState } from 'react';
import { Etapa1 } from './Etapas/Etapa1';
import { Etapa2 } from './Etapas/Etapa2';
import { Etapa3 } from './Etapas/Etapa3';
import { Etapa4 } from './Etapas/Etapa4';
import { Etapa5 } from './Etapas/Etapa5';
import { ProgressBar } from './Etapas/ProgressBar';
import { FORMULARIO_CONFIG, INFO_SITE_INICIAL } from '../data/configuracaoFormulario';
import {
  PACOTES,
  calcularValorProjeto,
  itemEstaIncluidoNoPacote,
  type CategoriaSecao,
  type InfoSite,
  type ModeloSecaoId,
  type Pacote,
  type SecaoNoSite
} from '../data/precos';
import { mesclarUnicos } from '../utils/colecoes';
import { scrollParaTopo } from '../utils/scroll';
import { abrirWhatsAppFormulario } from '../utils/whatsappFormulario';

type EtapaFormulario = 1 | 2 | 3 | 4 | 5 | 6;
type SecaoParaPreco = { categoria: CategoriaSecao; modelo?: ModeloSecaoId };

export function Formulario() {
  const [etapaAtual, setEtapaAtual] = useState<EtapaFormulario>(1);
  const [pacoteEscolhido, setPacoteEscolhido] = useState<Pacote | null>(null);
  const [infoSite, setInfoSite] = useState<InfoSite>(INFO_SITE_INICIAL);
  const [site, setSite] = useState<SecaoNoSite[]>([]);
  const [secoesParaPreco, setSecoesParaPreco] = useState<SecaoParaPreco[] | null>(null);
  const [etapa3ResetKey, setEtapa3ResetKey] = useState(0);

  const obterIdsInclusosNoPacote = <TId extends string>(
    opcoes: readonly { id: TId; incluidoNosPacotes?: readonly Pacote['id'][] }[],
    pacote: Pacote
  ): TId[] => {
    return opcoes
      .filter((opcao) => itemEstaIncluidoNoPacote(opcao, pacote))
      .map((opcao) => opcao.id);
  };

  const aplicarItensInclusosDoPacote = (atual: InfoSite, pacote: Pacote): InfoSite => {
    const paginasExtrasInclusas = obterIdsInclusosNoPacote(FORMULARIO_CONFIG.etapa4.opcoes, pacote);
    const extrasIntegracoesInclusos = obterIdsInclusosNoPacote(FORMULARIO_CONFIG.etapa5.opcoes, pacote);

    return {
      ...atual,
      paginas_extras: mesclarUnicos(atual.paginas_extras, paginasExtrasInclusas),
      extras_integracoes: mesclarUnicos(atual.extras_integracoes, extrasIntegracoesInclusos)
    };
  };

  useEffect(() => {
    scrollParaTopo();
  }, [etapaAtual]);

  const valorTotal = useMemo(() => {
    if (!pacoteEscolhido) return 0;

    return calcularValorProjeto({
      pacoteId: pacoteEscolhido.id,
      secoes: secoesParaPreco ?? site,
      paginasExtras: infoSite.paginas_extras,
      extrasIntegracoes: infoSite.extras_integracoes,
      ecommerceExtras: infoSite.ecommerce_extras,
      temHospedagemDominio: infoSite.tem_hospedagem_dominio,
      statusLogo: infoSite.status_logo
    });
  }, [infoSite, pacoteEscolhido, secoesParaPreco, site]);

  const avancarParaEtapa2 = (pacote: Pacote) => {
    const mudouPacote = pacoteEscolhido?.id !== pacote.id;
    setPacoteEscolhido(pacote);

    if (mudouPacote) {
      setSite([]);
      setSecoesParaPreco([]);
      setInfoSite((atual) =>
        aplicarItensInclusosDoPacote({
          ...atual,
          paginas_extras: [],
          extras_integracoes: [],
          ecommerce_extras: []
        }, pacote)
      );
      setEtapa3ResetKey((prev) => prev + 1);
    } else {
      setInfoSite((atual) => aplicarItensInclusosDoPacote(atual, pacote));
    }

    setEtapaAtual(2);
  };

  const avancarParaEtapa3 = (event: React.FormEvent) => {
    event.preventDefault();
    if (infoSite.nome.trim() !== '') setEtapaAtual(3);
  };

  const avancarParaEtapa4 = () => setEtapaAtual(4);
  const avancarParaEtapa5 = () => setEtapaAtual(5);
  const avancarDaEtapa5 = () => {
    // Loja virtual desativada temporariamente: encerramos o fluxo aqui.
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

    if (mudouPacote) {
      setSite([]);
      setSecoesParaPreco([]);
      setInfoSite((atual) =>
        aplicarItensInclusosDoPacote({
          ...atual,
          paginas_extras: [],
          extras_integracoes: [],
          ecommerce_extras: []
        }, pacote)
      );
      setEtapa3ResetKey((prev) => prev + 1);

      if (etapaAtual >= 3) {
        setEtapaAtual(3);
      }
    }
  };

  const enviarFormularioWhatsApp = () => {
    if (!pacoteEscolhido) return;

    abrirWhatsAppFormulario({
      infoSite,
      pacoteEscolhido,
      site,
      valorTotal
    });
  };

  return (
    <main
      id="formulario"
      className="w-full min-h-screen bg-slate-50 flex flex-col items-center font-sans pt-[72px] md:pt-[72px]"
    >
      <ProgressBar
        etapaAtual={etapaAtual}
        pacoteEscolhido={pacoteEscolhido}
        listaPacotes={PACOTES}
        valorTotal={valorTotal}
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
            setSecoesParaPreco={setSecoesParaPreco}
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
            finalizarProjeto={avancarDaEtapa5}
          />
        )}
      </div>
    </main>
  );
}
