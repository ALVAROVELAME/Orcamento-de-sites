import { useState } from 'react';

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

const FAQ_MOCK: FaqItem[] = [
  {
    id: 'faq-1',
    pergunta: 'Como funciona o processo de criação do site?',
    resposta: 'O processo é dividido em etapas claras: após a escolha do pacote e definição das seções através deste formulário, nós estruturamos o design inicial. Apresentamos o preview para você e, após sua aprovação, realizamos as integrações finais e colocamos o site no ar.',
  },
  {
    id: 'faq-2',
    pergunta: 'O site já vem otimizado para celulares (responsivo)?',
    resposta: 'Sim, absolutamente! Todos os nossos projetos são desenvolvidos com a filosofia "Mobile-First" ou totalmente responsivos. Isso significa que seu site funcionará perfeitamente, de forma rápida e elegante, em qualquer tamanho de tela, desde smartphones antigos até monitores UltraWide.',
  },
  {
    id: 'faq-3',
    pergunta: 'Vocês realizam a integração com sistemas de pagamento ou WhatsApp?',
    resposta: 'Sim! Podemos integrar botões flutuantes para direcionamento direto ao seu WhatsApp comercial, links de checkout para plataformas de pagamento (como Mercado Pago, Stripe ou Pagar.me) e formulários automatizados de captura de leads.',
  },
  {
    id: 'faq-4',
    pergunta: 'Preciso pagar mensalidade ou taxa de manutenção?',
    resposta: 'Não cobramos taxas de manutenção compulsórias. O site é totalmente seu após a entrega. Os únicos custos recorrentes que você terá serão com a hospedagem do servidor e a renovação anual do seu domínio (ex: seunome.com.br), os quais te ajudamos a configurar transparentemente.',
  }
];

export function FaqModel1() {
  // Estado para controlar qual item está aberto. Se for null, todos estão fechados.
  const [abertoId, setAbertoId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setAbertoId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden p-6 md:p-10 transition-all duration-300">
      
      {/* Cabeçalho da Seção */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50/70 border border-indigo-100/50 px-3 py-1 rounded-full">
          💬 Dúvidas Frequentes
        </span>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-3 tracking-tight">
          Perguntas Respondidas
        </h3>
        <p className="text-slate-500 text-sm mt-2">
          Esclareça as principais dúvidas sobre o desenvolvimento da sua nova presença digital.
        </p>
      </div>

      {/* Lista de Accordions */}
      <div className="max-w-4xl mx-auto space-y-4 w-full">
        {FAQ_MOCK.map((item) => {
          const isAberto = abertoId === item.id;
          
          return (
            <div 
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isAberto 
                  ? 'border-indigo-100 bg-indigo-50/10 ring-1 ring-indigo-100/50' 
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/40'
              }`}
            >
              {/* Botão de Gatilho (Trigger) */}
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 text-left font-bold text-slate-800 text-sm md:text-base cursor-pointer select-none"
              >
                <span className={`transition-colors duration-200 ${isAberto ? 'text-indigo-600' : 'text-slate-800'}`}>
                  {item.pergunta}
                </span>
                
                {/* Ícone Chevron Customizado com Rotação */}
                <div className={`w-7 h-7 flex items-center justify-center rounded-xl transition-all duration-300 shrink-0 ${
                  isAberto ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                }`}>
                  <svg 
                    className="w-3.5 h-3.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Painel de Conteúdo com Animação de Altura Sutil */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isAberto ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-indigo-100/30 pt-3">
                  {item.resposta}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé de Ajuda Rápida */}
      <div className="mt-10 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 font-medium">
          Ainda tem alguma dúvida específica?{' '}
          <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
            Fale conosco direto pelo chat
          </span>
        </p>
      </div>

    </div>
  );
}