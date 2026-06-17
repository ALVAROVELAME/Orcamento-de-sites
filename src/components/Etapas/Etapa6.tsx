import { useState, useEffect } from 'react';
import type { InfoSite } from '../Formulario';
import { BotoesNavegacao } from './BotoesNavegacao';

// Lista de funcionalidades para E-commerce
const OPCOES_ECOMMERCE = [
  { id: 'pagamentos', titulo: 'Meios de Pagamento', desc: 'Integração com gateways como Mercado Pago, Pagar.me ou Stripe para processar cartões, Pix e boletos de forma segura.' },
  { id: 'frete', titulo: 'Cálculo de Frete (Correios/Melhor Envio)', desc: 'Automação para cálculo de frete em tempo real baseada no CEP do cliente e peso/dimensões dos produtos.' },
  { id: 'catalogo', titulo: 'Gestão de Catálogo', desc: 'Painel para cadastro de produtos, controle de variações (tamanho/cor) e gestão de estoque.' },
  { id: 'carrinho', titulo: 'Carrinho de Compras Abandonado', desc: 'Sistema que envia lembretes automáticos para clientes que iniciaram a compra mas não finalizaram.' }
];

interface EcommerceAcordeaoProps {
  titulo: string;
  descricao: string;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
}

function EcommerceAcordeao({ titulo, descricao, isExpanded, isSelected, onToggleExpand, onToggleSelect }: EcommerceAcordeaoProps) {
  return (
    <div className={`bg-white transition-all duration-300 w-full ${isSelected ? 'ring-4 ring-emerald-600/20 border-y-2 border-emerald-600' : 'border-y border-slate-200'}`}>
      <div className="flex items-center justify-between p-5 bg-white cursor-pointer select-none group max-w-7xl mx-auto" onClick={onToggleExpand}>
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl font-black text-xl transition-colors duration-300 ${
            isExpanded ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'
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
              isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white hover:border-emerald-400'
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
          <div className="p-6 md:p-8 bg-slate-50 text-slate-600 font-medium text-base md:text-lg border-l-4 border-emerald-500 ml-4 md:ml-6 my-4 rounded-r-lg">
            {descricao}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Etapa6Props {
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  voltarEtapa: () => void;
  finalizarProjeto: () => void;
}

export function Etapa6({ infoSite, setInfoSite, voltarEtapa, finalizarProjeto }: Etapa6Props) {
  const [extraExpandido, setExtraExpandido] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleEcommerce = (id: string) => {
    const selecionadosAtuais = infoSite.ecommerce_extras || [];
    let novosSelecionados;

    if (selecionadosAtuais.includes(id)) {
      novosSelecionados = selecionadosAtuais.filter(item => item !== id);
    } else {
      novosSelecionados = [...selecionadosAtuais, id];
    }
    
    setInfoSite({ ...infoSite, ecommerce_extras: novosSelecionados });
  };

  return (
    <div className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen">
      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className="bg-white w-full p-4 md:p-6 relative shadow-sm border-b border-slate-200">
          
          <div className="max-w-7xl mx-auto px-4 mt-2">
            <div className="mb-6 pb-4 border-b border-slate-100 flex justify-between items-end">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  Configurações de E-commerce
                </h3>
                <p className="text-sm md:text-base text-slate-500 mt-1">
                  Personalize as funcionalidades da sua loja virtual para vender online.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full mt-6">
              {OPCOES_ECOMMERCE.map((opcao) => {
                const isSelected = (infoSite.ecommerce_extras || []).includes(opcao.id);
                
                return (
                  <EcommerceAcordeao
                    key={opcao.id}
                    titulo={opcao.titulo}
                    descricao={opcao.desc}
                    isExpanded={extraExpandido === opcao.id}
                    isSelected={isSelected}
                    onToggleExpand={() => setExtraExpandido(extraExpandido === opcao.id ? null : opcao.id)}
                    onToggleSelect={() => handleToggleEcommerce(opcao.id)}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-12 max-w-7xl mx-auto px-4">
            <BotoesNavegacao
              onVoltar={voltarEtapa}
              onProximo={finalizarProjeto}
              desabilitarProximo={false}
              textoProximo="Finalizar e Enviar Projeto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}