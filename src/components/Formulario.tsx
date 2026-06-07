import React, { useState } from 'react';
import { ProgressBar } from './Etapas/ProgressBar';
import { Etapa1 } from './Etapas/Etapa1';
import { Etapa2 } from './Etapas/Etapa2';
import { Etapa3 } from './Etapas/Etapa3';

// --- TIPOS E INTERFACES UNIFICADOS ---
export type CategoriaSecao = 'capa' | 'sobre' | 'servicos' | 'depoimentos' | 'faq' | 'blog' | 'formulario' | 'video' | 'mapa' | 'galeria';

export interface SecaoNoSite {
  id: string;
  categoria: CategoriaSecao;
  modelo: string;
}

export interface Pacote {
  id: string;
  nome: string;
  preco: string;
  limiteSecoes: number | 'Ilimitado';
  limitePaginas: number;
  detalhes: string[];
}

export interface InfoSite {
  nome: string;
  cores: [string, string, string];
}
// -------------------------------------

export function Formulario() {
  const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3>(1);
  const [pacoteEscolhido, setPacoteEscolhido] = useState<Pacote | null>(null);
  const [infoSite, setInfoSite] = useState<InfoSite>({ nome: '', cores: ['#2563eb', '#1e40af', '#ffffff'] });
  const [site, setSite] = useState<SecaoNoSite[]>([]);

  const avancarParaEtapa2 = (pacote: Pacote) => {
    setPacoteEscolhido(pacote);
    setEtapaAtual(2);
  };

  const avancarParaEtapa3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (infoSite.nome.trim() !== '') {
      setEtapaAtual(3);
    }
  };

  const voltarEtapa = () => {
    if (etapaAtual === 2) setEtapaAtual(1);
    if (etapaAtual === 3) setEtapaAtual(2);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center font-sans pt-44 md:pt-36">
      <ProgressBar 
        etapaAtual={etapaAtual} 
        pacoteEscolhido={pacoteEscolhido} 
        voltarEtapa={voltarEtapa} 
      />

      {etapaAtual === 1 && (
        <Etapa1 avancarParaEtapa2={avancarParaEtapa2} />
      )}

      {etapaAtual === 2 && (
        <Etapa2 
          infoSite={infoSite} 
          setInfoSite={setInfoSite} 
          avancarParaEtapa3={avancarParaEtapa3} 
          voltarEtapa={voltarEtapa} 
        />
      )}

      {etapaAtual === 3 && (
        <Etapa3 
          infoSite={infoSite}
          pacoteEscolhido={pacoteEscolhido}
          site={site}
          setSite={setSite}
        />
      )}
    </div>
  );
}