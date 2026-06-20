import React, { useState, useEffect } from 'react';
import { ProgressBar } from './Etapas/ProgressBar';
import { Etapa1 } from './Etapas/Etapa1';
import { Etapa2 } from './Etapas/Etapa2';
import { Etapa3 } from './Etapas/Etapa3';
import { Etapa4 } from './Etapas/Etapa4';
import { Etapa5 } from './Etapas/Etapa5';
import { Etapa6 } from './Etapas/Etapa6'; // <-- IMPORTAÇÃO DA NOVA ETAPA

import { PACOTES } from '../data/precos';
import type { Pacote } from '../data/precos';

export type CategoriaSecao = 'capa' | 'sobre' | 'servicos' | 'depoimentos' | 'faq' | 'blog' | 'formulario' | 'video' | 'mapa' | 'galeria';

export interface SecaoNoSite {
  id: string;
  categoria: CategoriaSecao;
  modelo: string;
}

export interface InfoSite {
  nome: string;
  cores: [string, string, string];
  status_logo?: string;      
  estilo_marca?: string[];   
  paginas_extras?: string[]; 
  extras_integracoes?: string[];
  ecommerce_extras?: string[]; // <-- NOVO: Armazena extras de E-commerce
}

export function Formulario() {
  // <-- ATUALIZADO: Agora suporta estados de 1 até 6
  const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3 | 4 | 5 | 6>(1); 
  const [pacoteEscolhido, setPacoteEscolhido] = useState<Pacote | null>(null);
  
  const [infoSite, setInfoSite] = useState<InfoSite>({ 
    nome: '', 
    cores: ['#2563eb', '#1e40af', '#ffffff'],
    status_logo: '',
    estilo_marca: [],
    paginas_extras: [],
    extras_integracoes: [],
    ecommerce_extras: [] // <-- Inicializado
  });
  const [site, setSite] = useState<SecaoNoSite[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [etapaAtual]);

  const obterValorTotal = (): number => {
    if (!pacoteEscolhido) return 0;
    return pacoteEscolhido.precoBase;
  };

  const avancarParaEtapa2 = (pacote: Pacote) => {
    setPacoteEscolhido(pacote);
    setEtapaAtual(2);
  };

  const avancarParaEtapa3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (infoSite.nome.trim() !== '') setEtapaAtual(3);
  };

  const avancarParaEtapa4 = () => setEtapaAtual(4);
  const avancarParaEtapa5 = () => setEtapaAtual(5);
  const avancarParaEtapa6 = () => setEtapaAtual(6);

  // <-- LÓGICA CONDICIONAL: Decide se vai para Etapa 6 ou finaliza
  const avancarDaEtapa5 = () => {
    const ehEcommerce = pacoteEscolhido?.nome.toLowerCase().includes('loja') || 
                        pacoteEscolhido?.nome.toLowerCase().includes('e-commerce');

    if (ehEcommerce) {
      setEtapaAtual(6);
    } else {
      finalizarProjeto();
    }
  };

  const finalizarProjeto = () => {
    console.log("Projeto Finalizado!", { infoSite, pacoteEscolhido, site });
    alert("Obrigado! Seu projeto foi configurado com sucesso.");
  };

  const voltarEtapa = () => {
    if (etapaAtual === 2) setEtapaAtual(1);
    if (etapaAtual === 3) setEtapaAtual(2);
    if (etapaAtual === 4) setEtapaAtual(3);
    if (etapaAtual === 5) setEtapaAtual(4);
    if (etapaAtual === 6) setEtapaAtual(5);
  };

  const selecionarPacoteDireto = (pacote: Pacote) => setPacoteEscolhido(pacote);

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
        {etapaAtual === 2 && <Etapa2 infoSite={infoSite} setInfoSite={setInfoSite} avancarParaEtapa3={avancarParaEtapa3} voltarEtapa={voltarEtapa} />}
        {etapaAtual === 3 && <Etapa3 infoSite={infoSite} pacoteEscolhido={pacoteEscolhido} site={site} setSite={setSite} onVoltarEtapaAnterior={voltarEtapa} onAvancarParaEtapa4={avancarParaEtapa4} />}
        {etapaAtual === 4 && <Etapa4 infoSite={infoSite} setInfoSite={setInfoSite} voltarEtapa={voltarEtapa} finalizarProjeto={avancarParaEtapa5} />}
        
        {/* Etapa 5 agora usa avancarDaEtapa5 para decidir o próximo passo */}
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

        {/* Etapa 6 Condicional */}
        {etapaAtual === 6 && (
          <Etapa6
            infoSite={infoSite}
            setInfoSite={setInfoSite}
            voltarEtapa={voltarEtapa}
            finalizarProjeto={finalizarProjeto}
          />
        )}
      </div>
    </div>
  );
}
