import { useState } from 'react';

export function FaqSection() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Quais documentos preciso para migrar de contador?", a: "A transição é simples e totalmente cuidada por nós. Solicitamos os relatórios e livros necessários diretamente ao seu antigo escritório sem que você tenha dores de cabeça." },
    { q: "Como funciona a abertura de empresa ou mudança de regime?", a: "Analisamos o seu modelo de negócio para enquadrá-lo no regime tributário mais econômico e seguro (Simples Nacional, Lucro Presumido ou Real), evitando o pagamento de impostos desnecessários." },
    { q: "Vocês atendem empresas de quais segmentos?", a: "Atendemos prestadores de serviços, profissionais liberais, comércios locais e empresas de tecnologia de forma 100% digital e consultiva." }
  ];

  return (
    <section className="py-24 w-full bg-slate-50/50 border-t border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16 scroll-animate">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Dúvidas</span>
          <h2 className="text-3xl font-bold text-slate-900">Ficou com alguma dúvida? Nós respondemos</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded bg-white overflow-hidden transition-all shadow-sm scroll-animate">
              <button 
                type="button"
                className="w-full text-left p-5 font-semibold text-slate-900 bg-white flex justify-between items-center hover:bg-slate-50 transition-all"
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                <span>{faq.q}</span>
                <span className="text-teal-600 font-bold transition-transform duration-200">{faqOpen === index ? '−' : '+'}</span>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${faqOpen === index ? 'max-h-40 border-t border-slate-100' : 'max-h-0'}`}>
                <p className="p-5 text-sm text-slate-500 leading-relaxed bg-slate-50">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}