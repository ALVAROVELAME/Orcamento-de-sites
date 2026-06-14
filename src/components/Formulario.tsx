import React, { useState } from 'react';
import { ProgressBar } from './Etapas/ProgressBar';
import { Etapa1 } from './Etapas/Etapa1';
import { Etapa2 } from './Etapas/Etapa2';
import { Etapa3 } from './Etapas/Etapa3';

// IMPORTAÇÃO DOS SEUS DADOS REAIS
import { PACOTES } from '../data/precos';
import type { Pacote } from '../data/precos';

// --- OUTROS TIPOS CONFIGURADOS ---
export type CategoriaSecao = 'capa' | 'sobre' | 'servicos' | 'depoimentos' | 'faq' | 'blog' | 'formulario' | 'video' | 'mapa' | 'galeria';

export interface SecaoNoSite {
  id: string;
  categoria: CategoriaSecao;
  modelo: string;
}

// INTERFACE ATUALIZADA: Agora o TypeScript reconhece os novos campos da Etapa 2
export interface InfoSite {
  nome: string;
  cores: [string, string, string];
  status_logo?: string;      // Adicionado para rastrear o Radio Button do Logo
  estilo_marca?: string[];   // Adicionado para rastrear os Checkboxes de Percepção
}

export function Formulario() {
  const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3>(1);
  const [pacoteEscolhido, setPacoteEscolhido] = useState<Pacote | null>(null);
  
  // ESTADO INICIAL ATUALIZADO: Evita erros de undefined ao montar os novos campos na Etapa 2
  const [infoSite, setInfoSite] = useState<InfoSite>({ 
    nome: '', 
    cores: ['#2563eb', '#1e40af', '#ffffff'],
    status_logo: '',
    estilo_marca: []
  });
  const [site, setSite] = useState<SecaoNoSite[]>([]);

  // Calcula o valor total baseado no preço base numérico do seu arquivo de preços
  const obterValorTotal = (): number => {
    if (!pacoteEscolhido) return 0;
    return pacoteEscolhido.precoBase; // Retorna o valor numérico puro do precos.ts
  };

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

  // Função disparada quando a pessoa muda o pacote pelo seletor da barra
  const selecionarPacoteDireto = (pacote: Pacote) => {
    setPacoteEscolhido(pacote);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center font-sans pt-[130px] md:pt-[120px]">
      
      {/* ProgressBar corrigida: a propriedade voltarEtapa foi removida daqui */}
      <ProgressBar 
        etapaAtual={etapaAtual} 
        pacoteEscolhido={pacoteEscolhido} 
        listaPacotes={PACOTES} 
        valorTotal={obterValorTotal()}
        selecionarPacote={selecionarPacoteDireto}
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