import { useState, useEffect } from 'react';
import type { InfoSite } from '../Formulario';
import { BotoesNavegacao } from './BotoesNavegacao';

// Lista de páginas extras que o usuário pode escolher
const OPCOES_PAGINAS_EXTRAS = [
  { id: 'sobre_nos', titulo: 'Página Sobre Nós', desc: 'Uma página dedicada a contar a história da sua empresa, sua missão, visão, valores e apresentar a equipe.' },
  { id: 'privacidade', titulo: 'Política de Privacidade', desc: 'Página essencial para adequação à LGPD, explicando como os dados dos visitantes são coletados e tratados.' },
  { id: 'termos_uso', titulo: 'Termos de Uso', desc: 'Regras, direitos e diretrizes para o uso do seu site, serviço ou e-commerce.' },
  { id: 'contato', titulo: 'Página de Contato Completa', desc: 'Página separada com formulário de contato, mapa de localização do Google Maps, e links diretos para redes sociais e WhatsApp.' },
  { id: 'faq', titulo: 'Página de Dúvidas (FAQ)', desc: 'Uma página inteira dedicada a responder as perguntas mais frequentes dos seus clientes, ajudando a quebrar objeções.' },
  { id: 'erro_404', titulo: 'Página 404 Personalizada', desc: 'Página de "Erro - Não encontrado" com o design da sua marca e botões de retorno, para não perder o visitante que acessou um link quebrado.' }
];

interface PaginaAcordeaoProps {
  titulo: string;
  descricao: string;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
}

function PaginaAcordeao({ titulo, descricao, isExpanded, isSelected, onToggleExpand, onToggleSelect }: PaginaAcordeaoProps) {
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

      {/* Área expandida mostrando a descrição */}
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

interface Etapa4Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
}

export function Etapa4({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto }: Etapa4Props) {
  const [paginaExpandida, setPaginaExpandida] = useState<string | null>(null);

  // Garante que a página inicie no topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTogglePagina = (id: string) => {
    const selecionadasAtuais = infoSite.paginas_extras || [];
    let novasSelecionadas;

    if (selecionadasAtuais.includes(id)) {
      novasSelecionadas = selecionadasAtuais.filter(item => item !== id);
    } else {
      novasSelecionadas = [...selecionadasAtuais, id];
    }
    
    setInfoSite({ ...infoSite, paginas_extras: novasSelecionadas });
  };

  return (
    <div className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen">
      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className="bg-white w-full p-4 md:p-6 relative shadow-sm border-b border-slate-200">
          
          <div className="max-w-7xl mx-auto px-4 mt-2">
            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  Páginas Adicionais
                </h3>
                <p className="text-sm md:text-base text-slate-500 mt-1">
                  Selecione quais páginas extras você deseja incluir no seu projeto. Clique no <span className="font-bold">+</span> para ler os detalhes de cada uma.
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-sm font-bold text-indigo-600">
                  {(infoSite.paginas_extras || []).length} selecionadas
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full mt-6">
              {OPCOES_PAGINAS_EXTRAS.map((pagina) => {
                const isSelected = (infoSite.paginas_extras || []).includes(pagina.id);
                
                return (
                  <PaginaAcordeao
                    key={pagina.id}
                    titulo={pagina.titulo}
                    descricao={pagina.desc}
                    isExpanded={paginaExpandida === pagina.id}
                    isSelected={isSelected}
                    onToggleExpand={() => setPaginaExpandida(paginaExpandida === pagina.id ? null : pagina.id)}
                    onToggleSelect={() => handleTogglePagina(pagina.id)}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-12 max-w-7xl mx-auto px-4">
            <BotoesNavegacao
              onVoltar={voltarEtapa}
              onProximo={finalizarProjeto}
              desabilitarProximo={false} // Nesta etapa não é obrigatório escolher páginas extras
              textoProximo="Concluir Projeto" // Altera o texto do botão para indicar o fim
            />
          </div>

        </div>
      </div>
    </div>
  );
}