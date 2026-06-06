import { useEffect, useState, type ReactNode } from 'react';
import type { PersonalizacaoAsset } from '../../assets/personalizacaoAssets';
import { ShoppingCart, CheckCircle2, HelpCircle } from 'lucide-react';

// Importando a estrutura de pacotes e preços extras
import { PRECOS_SECOES, PACOTES, PRECO_SECAO_ADICIONAL } from '../../data/precos';

import {
  ServicosModel1,
  ServicosModel2,
  SobreModel1,
  VideoModel1,
  MapaModel1,
  GaleriaModel1,
  FormularioModel1,
  BlogModel1,
  FaqModel1,
  CarrosselAvaliacoes,
  DepoimentoTradicional,
  DepoimentosGoogleMaps
} from '../sections';

interface ModeloSecao {
  title: string;
  description: string;
  component: React.ComponentType; 
}

interface LivePreviewAccordionProps {
  secoes: (PersonalizacaoAsset & { 
    modelos?: ModeloSecao[];
  })[];
  selecionadas: string[];
  activeId: string;
  onToggleSecao: (id: string) => void;
  onActiveSectionChange: (id: string) => void;
}

export function LivePreviewAccordion({
  secoes,
  selecionadas,
  activeId,
  onToggleSecao,
  onActiveSectionChange,
}: LivePreviewAccordionProps) {
  const [expandedId, setExpandedId] = useState<string>(activeId || secoes[0]?.id || '');
  const [slideIndexes, setSlideIndexes] = useState<Record<string, number>>({});
  
  // Estado para o pacote ativo
  const [pacoteSelecionado, setPacoteSelecionado] = useState(PACOTES[0]);

  // Lógica de cálculo reativa
  const secoesSelecionadasQtd = selecionadas.length;
  const secoesExcedentes = Math.max(0, secoesSelecionadasQtd - pacoteSelecionado.limiteSecoes);
  const valorAdicional = secoesExcedentes * PRECO_SECAO_ADICIONAL;
  const precoTotal = pacoteSelecionado.precoBase + valorAdicional;

  useEffect(() => {
    if (activeId) setExpandedId(activeId);
  }, [activeId]);

  const handleHeaderClick = (id: string) => {
    const nextId = expandedId === id ? '' : id;
    setExpandedId(nextId);
    if (nextId) onActiveSectionChange(nextId);
  };

  const goToSlide = (sectionId: string, direction: number, maxSlides: number) => {
    setSlideIndexes(prev => {
      const current = prev[sectionId] ?? 0;
      const next = (current + direction + maxSlides) % maxSlides;
      return { ...prev, [sectionId]: next };
    });
  };

  const defaultSectionModels: Record<string, ModeloSecao[]> = {
    servicos: [
      { title: 'Cards de serviços', description: 'Mostre claramente os serviços com ícones e texto objetivo.', component: ServicosModel1 },
      { title: 'Diferenciais em destaque', description: 'Uma apresentação mais visual dos seus principais benefícios.', component: ServicosModel2 }
    ],
    sobre: [
      { title: 'Sobre institucional', description: 'Uma seção sobre a empresa com missão e valores.', component: SobreModel1 }
    ],
    video: [
      { title: 'Vídeo institucional', description: 'Tema visual com player e chamada para ação.', component: VideoModel1 }
    ],
    mapa: [
      { title: 'Localização clara', description: 'Mostre onde sua empresa está com mapa e endereço.', component: MapaModel1 }
    ],
    depoimentos: [
      { title: 'Depoimentos em cards', description: 'Mostre avaliações reais em uma seção que aumenta a confiança.', component: DepoimentoTradicional },
      { title: 'Carrossel de avaliações', description: 'Um layout que destaca várias opiniões de forma dinâmica.', component: CarrosselAvaliacoes },
      { title: 'Depoimentos no Google Maps', description: 'Integre avaliações diretamente no Google Maps para maior visibilidade.', component: DepoimentosGoogleMaps }
    ],
    galeria: [
      { title: 'Galeria em grid', description: 'Mostre imagens de trabalho ou projetos com layout visual.', component: GaleriaModel1 }
    ],
    formulario: [
      { title: 'Contato direto', description: 'Formulário simples para captação de leads ou pedidos.', component: FormularioModel1 }
    ],
    blog: [
      { title: 'Blog em destaque', description: 'Destaque artigos e conteúdos que trazem valor ao visitante.', component: BlogModel1 }
    ],
    faq: [
      { title: 'Perguntas frequentes', description: 'Responda dúvidas comuns em forma de lista clara e organizada.', component: FaqModel1 }
    ]
  };

  return (
    <div className="space-y-6 relative pt-[120px] sm:pt-[85px] w-full">
      
      {/* 1. RESUMO DO ORÇAMENTO TOTALMENTE FIXO NO TOPO */}
      <div className="sticky top-2 z-50 w-full bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl text-slate-100 transition-all">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-indigo-400 border border-slate-700/50">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-tight text-white">Resumo do Orçamento</h4>
            <p className="text-[10px] text-slate-400 font-medium">
              Pacote ativo: <span className="text-slate-200 font-semibold">{pacoteSelecionado.nome}</span> (Inclui {pacoteSelecionado.limiteSecoes} seções)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Seções Ativas</span>
            <span className="text-sm font-bold text-white">
              {secoesSelecionadasQtd} {secoesSelecionadasQtd === 1 ? 'selecionada' : 'selecionadas'}
              {secoesExcedentes > 0 && <span className="text-rose-400 font-extrabold text-xs"> (+{secoesExcedentes} extras)</span>}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Preço Estimado</span>
            <span className="text-xl font-black tracking-tight text-indigo-400">
              R$ {precoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEÇÃO: ESCOLHA O SEU PACOTE (COM LIMITE DE LARGURA MÁXIMA CONFIGURADO) */}
      <div className="space-y-3 w-full max-w-4xl mx-auto">
        <div className="px-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Escolha o seu Pacote 📦</h3>
          <p className="text-xs text-slate-500 font-medium">Qual destas opções melhor atende a sua necessidade atual?</p>
        </div>
        
        {/* Adicionado max-w-md no mobile e max-w-3xl/4xl no grid para os botões não esticarem excessivamente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md md:max-w-full mx-auto">
          {PACOTES.map((pacote) => {
            const isSelected = pacote.id === pacoteSelecionado.id;
            const saldoSecoes = pacote.limiteSecoes - secoesSelecionadasQtd;

            return (
              <button
                key={pacote.id}
                type="button"
                onClick={() => setPacoteSelecionado(pacote)}
                className={`flex text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden items-center justify-between w-full h-full ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-600/10' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start min-w-0 flex-1 pr-2">
                  <div className="text-2xl mr-3 select-none mt-0.5">{pacote.emoji}</div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {pacote.nome}
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight truncate">{pacote.descricao}</p>
                    <span className="text-xs font-extrabold text-indigo-600 block mt-1.5">
                      R$ {pacote.precoBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* CONTADOR DIREITO */}
                <div className="text-right shrink-0 ml-2 pl-2 border-l border-slate-100 flex flex-col items-end justify-center min-w-[75px]">
                  {saldoSecoes > 0 ? (
                    <>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md—">
                        Sobra {saldoSecoes}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium mt-0.5">vagas restando</span>
                    </>
                  ) : saldoSecoes === 0 ? (
                    <>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                        Limite exato
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium mt-0.5">{pacote.limiteSecoes} de {pacote.limiteSecoes}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                        {Math.abs(saldoSecoes)} extras
                      </span>
                      <span className="text-[9px] text-rose-400 font-medium mt-0.5">+ R$ {Math.abs(saldoSecoes) * PRECO_SECAO_ADICIONAL}</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LISTA DO ACORDEÃO DE SEÇÕES (CONSERVA O FLUXO EXPANSÍVEL ILIMITADO) */}
      <div className="space-y-4 pt-2 w-full">
        <div className="px-1">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Seções do Site 🧩</h3>
          <p className="text-xs text-slate-500 font-medium">Monte a estrutura ou adicione extras ao seu pacote.</p>
        </div>

        {secoes.map(secao => {
          const isSelected = selecionadas.includes(secao.id);
          const isExpanded = expandedId === secao.id;
          const currentIndex = slideIndexes[secao.id] ?? 0;
          const modelos = secao.modelos ?? defaultSectionModels[secao.id] ?? [];
          const currentModel = modelos[currentIndex];
          const PreviewComponent = currentModel?.component;

          return (
            <div key={secao.id} className={`group rounded-3xl overflow-hidden border transition-all duration-300 bg-white w-full ${isSelected ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10' : 'border-slate-200'}`}>
              
              <div
                onClick={() => handleHeaderClick(secao.id)}
                className="w-full flex items-center justify-between gap-4 p-4 md:p-5 cursor-pointer select-none hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>
                    {secao.icon}
                  </div>
                  <div className="truncate pr-2">
                    <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                      {secao.nome}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{secao.descricao}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onToggleSecao(secao.id); 
                    }}
                    className={`h-10 w-10 rounded-xl border font-bold transition cursor-pointer ${isSelected ? 'bg-indigo-600 text-white border-transparent' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                  >
                    {isSelected ? '✓' : '+'}
                  </button>
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" /></svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-4 w-full">
                  {modelos.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{currentModel?.title || 'Modelo'}</h3>
                        <p className="text-sm text-slate-500">{currentModel?.description || ''}</p>
                      </div>
                      {modelos.length > 1 && (
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1.5">
                            {modelos.map((_, idx) => (
                              <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-indigo-600 w-4' : 'bg-slate-200 w-1.5'}`} />
                            ))}
                          </div>
                          <button type="button" onClick={(e) => { e.stopPropagation(); goToSlide(secao.id, -1, modelos.length); }} className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer">❮</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); goToSlide(secao.id, 1, modelos.length); }} className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer">❯</button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm min-h-[200px] flex items-center justify-center w-full">
                    {PreviewComponent ? (
                      <div className="w-full h-full">
                        <PreviewComponent />
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm">Nenhum preview configurado para esta seção</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}