import { useState, useEffect } from 'react';
import type { InfoSite } from '../Formulario';
import type { Pacote } from '../../data/precos';
import { BotoesNavegacao } from './BotoesNavegacao';

// Lista de integrações e extras
const OPCOES_EXTRAS = [
  { id: 'whatsapp', titulo: 'Botão WhatsApp Flutuante', desc: 'Um botão flutuante posicionado estrategicamente para que seus visitantes iniciem conversas direto no seu WhatsApp.' },
  { id: 'analytics', titulo: 'Google Analytics', desc: 'Integração completa para monitorar o comportamento dos visitantes, saber de onde vêm e quais páginas acessam.' },
  { id: 'meta_pixel', titulo: 'Pixel Meta', desc: 'Essencial para rastrear conversões, otimizar anúncios e criar públicos personalizados para campanhas no Facebook e Instagram.' },
  { id: 'agendamento', titulo: 'Sistema de Agendamento', desc: 'Ferramenta integrada para que seus clientes marquem horários, consultas ou reuniões diretamente pelo site.' },
  { id: 'seo_avancado', titulo: 'SEO Avançado', desc: 'Configuração técnica de palavras-chave, meta tags e sitemap para melhorar o posicionamento do seu site no Google.' }
];

interface ExtraAcordeaoProps {
  titulo: string;
  descricao: string;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
}

function ExtraAcordeao({ titulo, descricao, isExpanded, isSelected, onToggleExpand, onToggleSelect }: ExtraAcordeaoProps) {
  return (
    <div className={`bg-white transition-all duration-300 w-full ${isSelected ? 'ring-4 ring-indigo-600/20 border-y-2 border-indigo-600' : 'border-y border-slate-200'}`}>
      <div className="flex items-center justify-between p-5 bg-white cursor-pointer select-none group max-w-7xl mx-auto" onClick={onToggleExpand}>
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl font-black text-xl transition-colors duration-300 ${
            isExpanded ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
          }`}>
            {isExpanded ? '-' : '+'}
          </div>
          <span className="font-bold text-slate-800 text-lg md:text-xl tracking-tight">
            {titulo}
          </span>
        </div>

        <div className="pl-4 flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="relative cursor-pointer flex items-center">
            <input type="checkbox" checked={isSelected} onChange={onToggleSelect} className="peer sr-only" />
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded border-2 transition-all flex items-center justify-center ${
              isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white hover:border-indigo-400'
            }`}>
              {isSelected && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-6 md:p-8 bg-slate-50 text-slate-600 font-medium text-base md:text-lg border-l-4 border-indigo-500 ml-4 md:ml-6 my-4 rounded-r-lg">
            {descricao}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Etapa5Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  pacoteEscolhido: Pacote | null; // ADICIONADO: Recebe o pacote selecionado
  voltarEtapa: () => void;
  proximaEtapa: () => void; // ADICIONADO: Função para ir para a etapa 6
  finalizarProjeto: () => void;
}

export function Etapa5({ infoSite, setInfoSite, pacoteEscolhido, voltarEtapa, proximaEtapa, finalizarProjeto }: Etapa5Props) {
  const [extraExpandido, setExtraExpandido] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Lógica para detectar se é E-commerce
  const ehEcommerce = pacoteEscolhido?.nome.toLowerCase().includes('loja') || 
                      pacoteEscolhido?.nome.toLowerCase().includes('e-commerce');

  const handleToggleExtra = (id: string) => {
    const selecionadosAtuais = infoSite.extras_integracoes || [];
    let novosSelecionados;

    if (selecionadosAtuais.includes(id)) {
      novosSelecionados = selecionadosAtuais.filter(item => item !== id);
    } else {
      novosSelecionados = [...selecionadosAtuais, id];
    }
    
    setInfoSite({ ...infoSite, extras_integracoes: novosSelecionados });
  };

  return (
    <div className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen">
      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className="bg-white w-full p-4 md:p-6 relative shadow-sm border-b border-slate-200">
          
          <div className="max-w-7xl mx-auto px-4 mt-2">
            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  Extras e Integrações
                </h3>
                <p className="text-sm md:text-base text-slate-500 mt-1">
                  Selecione funcionalidades adicionais para potencializar o seu site.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full mt-6">
              {OPCOES_EXTRAS.map((extra) => {
                const isSelected = (infoSite.extras_integracoes || []).includes(extra.id);
                
                return (
                  <ExtraAcordeao
                    key={extra.id}
                    titulo={extra.titulo}
                    descricao={extra.desc}
                    isExpanded={extraExpandido === extra.id}
                    isSelected={isSelected}
                    onToggleExpand={() => setExtraExpandido(extraExpandido === extra.id ? null : extra.id)}
                    onToggleSelect={() => handleToggleExtra(extra.id)}
                  />
                );
              })}
            </div>
          </div>

          {/* Alterado para alternar dinamicamente a ação e o texto do botão */}
          <div className="mt-12 max-w-7xl mx-auto px-4">
            <BotoesNavegacao
              onVoltar={voltarEtapa}
              onProximo={ehEcommerce ? proximaEtapa : finalizarProjeto}
              desabilitarProximo={false}
              textoProximo={ehEcommerce ? "Próximo Passo" : "Concluir Projeto"}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
