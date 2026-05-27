import { useState, useEffect } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Navbar } from '../components/Navbar';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp';
import { GlobalEffects } from '../components/GlobalEffects';
import { fetchPortfolioData } from '../data/portfolioData';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; index: number } | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const result = await fetchPortfolioData();
      setData(result);
    }
    load();
  }, []);

  // Hook isolado para controlar as animações após os dados estarem prontos no DOM
  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Opcional: para de observar após animar para ganho de performance
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    // Timeout leve para garantir o ciclo de renderização do React
    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.scroll-animate');
      animatedElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [data]);

  const openLightbox = (images: string[], index: number) => setLightboxState({ images, index });
  
  const whatsappLink = "https://wa.me/557599331557";

  if (!data) return null;

  const faqs = [
    { q: "Quais documentos preciso para migrar de contador?", a: "A transição é simples e totalmente cuidada por nós. Solicitamos os relatórios e livros necessários diretamente ao seu antigo escritório sem que você tenha dores de cabeça." },
    { q: "Como funciona a abertura de empresa ou mudança de regime?", a: "Analisamos o seu modelo de negócio para enquadrá-lo no regime tributário mais econômico e seguro (Simples Nacional, Lucro Presumido ou Real), evitando o pagamento de impostos desnecessários." },
    { q: "Vocês atendem empresas de quais segmentos?", a: "Atendemos prestadores de serviços, profissionais liberais, comércios locais e empresas de tecnologia de forma 100% digital e consultiva." }
  ];

  const posts = [
    { data: "24 de Maio, 2026", autor: "Contador", titulo: "Planejamento Tributário: Como reduzir custos legalmente na sua empresa" },
    { data: "15 de Maio, 2026", autor: "Contador", titulo: "Mudanças no Simples Nacional: O que muda para o seu negócio este ano" },
    { data: "02 de Maio, 2026", autor: "Contador", titulo: "Guia definitivo de fluxo de caixa para micro e pequenas empresas" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 selection:bg-teal-100 font-sans scroll-smooth overflow-x-hidden w-full">
      {/* Estilos CSS Controlados para Scroll Animation de Alta Performance */}
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <GlobalEffects />
      
      {lightboxState && (
        <Lightbox 
          index={lightboxState.index} 
          images={lightboxState.images} 
          onClose={() => setLightboxState(null)} 
          onNext={() => setLightboxState(prev => prev ? {...prev, index: (prev.index + 1) % prev.images.length} : null)} 
          onPrev={() => setLightboxState(prev => prev ? {...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length} : null)}
          setIndex={(newIndex: number) => setLightboxState(prev => prev ? { ...prev, index: newIndex } : null)}
        />
      )}
      
      <FloatingWhatsapp />
      <Navbar />

      {/* BANNER DE VENDA DO DESENVOLVEDOR */}
      <div className="fixed top-20 w-full z-40 bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-3 px-4 text-center text-xs md:text-sm font-semibold shadow-md animate-pulse">
        🚀 Este é um modelo premium de alta conversão para Contabilidade. Quer este site com a sua marca? 
        <a href={whatsappLink} className="underline ml-2 hover:text-slate-100 transition-all font-bold">Fale com Álvaro Velame</a>
      </div>

      <main>
        {/* HERO SECTION */}
        <header className="relative bg-slate-950 text-white pt-64 pb-48 w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200')] bg-cover bg-center opacity-15 pointer-events-none"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
            <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-full mb-6 uppercase tracking-wider scroll-animate">
              Modelo Demonstrativo
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-white scroll-animate">
              Serviços Fiscais Especializados para <br />
              <span className="text-teal-400">Pessoas Físicas e Empresas</span>
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto mb-10 scroll-animate">
              Garantimos a conformidade fiscal e a saúde financeira da sua organização através de soluções contábeis estratégicas e tecnologia integrada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate">
              <a href={whatsappLink} className="bg-teal-500 text-slate-950 px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-teal-400 hover:scale-105 transition-all text-center shadow-lg">
                Fale Conosco
              </a>
              <a href="#servicos" className="border border-white/30 text-white px-8 py-3.5 rounded-sm font-bold text-sm hover:bg-white/10 transition-all text-center">
                Explarar Serviços
              </a>
            </div>
          </div>
        </header>

        {/* LOGOS / PARCEIROS */}
        <section className="py-12 bg-white border-b border-slate-100 w-full">
          <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale scroll-animate">
            <div className="font-bold text-lg text-slate-800 tracking-wider">SeuSiteContabilidade</div>
            <div className="font-bold text-lg text-slate-800 tracking-wider">SeuSiteContabilidade</div>
            <div className="font-bold text-lg text-slate-800 tracking-wider">SeuSiteContabilidade</div>
            <div className="font-bold text-lg text-slate-800 tracking-wider">SeuSiteContabilidade</div>
          </div>
        </section>

        {/* APRESENTAÇÃO DO PROJETO - PROPOSTA COMERCIAL */}
        <section className="py-24 w-full bg-teal-50/30 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="relative group overflow-hidden rounded-2xl shadow-xl scroll-animate">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" alt="Desenvolvimento de Sites" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold bg-teal-600 px-4 py-2 rounded-sm text-sm">Desenvolvido por Álvaro Velame</span>
              </div>
            </div>
            <div className="scroll-animate">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Adquira esta estrutura</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900">Seu escritório contábil na internet com autoridade e elegância</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Este site foi arquitetado sob medida pelo desenvolvedor <strong>Álvaro Velame</strong> utilizando <strong>Vite + React e Tailwind CSS</strong>. Ele entrega uma performance absurdamente rápida, SEO otimizado para o Google e um layout totalmente adaptável para celulares e computadores.
              </p>
              <div className="space-y-3 mb-8 text-sm text-slate-600">
                <p className="flex items-center gap-2">✅ <span className="font-medium text-slate-900">Design Premium:</span> Inspirado em modelos corporativos de sucesso internacional.</p>
                <p className="flex items-center gap-2">✅ <span className="font-medium text-slate-900">Foco em Conversão:</span> Cliques direcionados direto para o seu WhatsApp corporativo.</p>
                <p className="flex items-center gap-2">✅ <span className="font-medium text-slate-900">Pronto para Usar:</span> Textos e seções estruturados para contabilidade nacional.</p>
              </div>
              <a href={whatsappLink} className="bg-slate-900 text-white px-8 py-3 rounded-sm font-bold text-sm hover:bg-teal-600 transition-all inline-block shadow-md">Garantir Este Site</a>
            </div>
          </div>
        </section>

        {/* SERVIÇOS PROFISSIONAIS - QUEM SOMOS */}
        <section className="py-24 w-full bg-white" id="sobre">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="relative scroll-animate">
              <div className="bg-slate-200 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800" alt="Profissionais trabalhando" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="scroll-animate">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Quem Somos</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900">Serviços Contábeis Profissionais para o seu Negócio</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Nossa missão é simplificar a burocracia contábil da sua empresa. Atuamos de forma consultiva, analisando gargalos fiscais e identificando oportunidades reais de economia tributária para que você foque no que importa: crescer.
              </p>
              <a href={whatsappLink} className="bg-teal-500 text-slate-950 px-8 py-3 rounded-sm font-bold text-sm hover:bg-teal-400 transition-all inline-block">Saber Mais</a>
            </div>
          </div>
        </section>

        {/* CARDS DE SOLUÇÕES COM EFEITO HOVER ANIMADO */}
        <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100 w-full" id="servicos">
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
            <div className="text-center max-w-xl mx-auto mb-16 scroll-animate">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Nossos Serviços</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Soluções Eficientes para Todo Tipo de Empresa</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-md shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-animate">
                <div className="w-10 h-10 bg-slate-100 text-teal-600 rounded flex items-center justify-center mb-6 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">📄</div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Demonstrações Financeiras</h3>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">Estruturação de balanços patrimoniais, DRE e relatórios consolidados para tomada de decisões seguras.</p>
                <a href={whatsappLink} className="text-slate-900 font-semibold text-sm hover:text-teal-600 flex items-center gap-1">Ler Mais →</a>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-8 rounded-md shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-animate">
                <div className="w-10 h-10 bg-slate-100 text-teal-600 rounded flex items-center justify-center mb-6 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">💰</div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Planejamento Tributário</h3>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">Análise técnica detalhada focada em reduzir legalmente a carga de impostos da sua empresa.</p>
                <a href={whatsappLink} className="text-slate-900 font-semibold text-sm hover:text-teal-600 flex items-center gap-1">Ler Mais →</a>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-8 rounded-md shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-animate">
                <div className="w-10 h-10 bg-slate-100 text-teal-600 rounded flex items-center justify-center mb-6 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">📊</div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Rotinas Contábeis</h3>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">Escrituração digital completa, conciliação bancária rigorosa e assessoria contínua para o dia a dia.</p>
                <a href={whatsappLink} className="text-slate-900 font-semibold text-sm hover:text-teal-600 flex items-center gap-1">Ler Mais →</a>
              </div>
            </div>
          </div>
        </section>

        {/* TRAJETÓRIA */}
        <section className="py-24 w-full bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="order-2 lg:order-1 scroll-animate">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Nossa Trajetória</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight text-slate-900">Nossa história conta com mais de 15 anos de experiência</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Ao longo de mais de uma década, ajudamos centenas de negócios a se estabelecerem no mercado, organizando suas finanças e estruturando o crescimento seguro dentro das leis fiscais brasileiras.
              </p>
              <a href={whatsappLink} className="bg-teal-500 text-slate-950 px-8 py-3 rounded-sm font-bold text-sm hover:bg-teal-400 transition-all inline-block">Fale Conosco</a>
            </div>
            <div className="order-1 lg:order-2 relative group overflow-hidden rounded-2xl shadow-lg scroll-animate">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800" alt="Equipe reunida trabalhando corporativo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="py-24 bg-slate-950 text-white w-full relative">
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
            <div className="mb-16 scroll-animate">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-3">Parcerias de Sucesso</span>
              <h2 className="text-3xl font-bold tracking-tight">Aprovado por Empresas como a Sua</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0f1b29] p-8 rounded-sm border border-slate-800 hover:border-teal-500 transition-colors scroll-animate">
                <p className="text-slate-300 italic mb-6">"Excelente transição de sistema. A equipe reduziu toda a nossa burocracia interna e conseguimos focar 100% nas nossas vendas, sabendo que a parte fiscal está impecável."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" alt="Cliente" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Amanda Silva</h4>
                    <span className="text-xs text-slate-500">Diretora, TechStore</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1b29] p-8 rounded-sm border border-slate-800 hover:border-teal-500 transition-colors scroll-animate">
                <p className="text-slate-300 italic mb-6">"O planejamento tributário que fizeram poupou milhares de reais logo no primeiro trimestre do ano. Recomendo muito o modelo de atendimento consultivo deles."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="Cliente" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Ricardo Mendes</h4>
                    <span className="text-xs text-slate-500">Fundador, Construtora RM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POSTS RECENTES */}
        <section className="py-24 w-full bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
            <div className="flex justify-between items-end mb-16 scroll-animate">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-3">Blog Informativo</span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Últimas Postagens</h2>
              </div>
              <a href="#" className="bg-teal-500 text-slate-950 px-6 py-2.5 rounded-sm font-bold text-xs hover:bg-teal-400 transition-all">Ver Todos</a>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <div key={idx} className="group cursor-pointer scroll-animate">
                  <div className="bg-slate-100 aspect-video rounded-md overflow-hidden mb-4">
                    <img src={`https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&sig=${idx}`} alt="Capa do artigo" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="flex gap-4 text-xs text-slate-400 mb-2">
                    <span>📅 {post.data}</span>
                    <span>👤 Por {post.autor}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-all duration-200 leading-snug">{post.titulo}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES */}
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

        {/* BANNER INFERIOR DE CONSULTA GRATUITA */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 my-24 w-full">
          <div className="relative bg-slate-950 rounded-xl overflow-hidden text-white p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl scroll-animate">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200')] bg-cover bg-center opacity-10 pointer-events-none"></div>
            <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Entre em contato hoje para uma consultoria gratuita</h3>
              <p className="text-slate-400 text-sm">Fale diretamente com um consultor especialista e descubra como otimizar a carga tributária do seu negócio.</p>
            </div>
            <a href={whatsappLink} className="relative z-10 bg-white text-slate-950 px-8 py-4 rounded-sm font-bold text-sm hover:bg-teal-400 hover:text-slate-950 transition-all whitespace-nowrap shadow-lg hover:scale-105 transform">Agendar Avaliação</a>
          </div>
        </section>
      </main>

      {/* RODAPÉ CORPORATIVO */}
      <footer className="py-16 bg-slate-950 text-slate-400 border-t border-slate-900 px-4 md:px-8 w-full text-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">SeuSiteContabilidade</h4>
            <p className="text-slate-400 leading-relaxed text-xs">Transformando obrigações contábeis e fiscais em inteligência financeira estratégica para a sua organização.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-md mb-4">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#sobre" className="hover:text-teal-400 transition-all">Quem Somos</a></li>
              <li><a href="#servicos" className="hover:text-teal-400 transition-all">Nossos Serviços</a></li>
              <li><a href={whatsappLink} className="hover:text-teal-400 transition-all">Contato Direto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-md mb-4">Informações de Contato</h4>
            <p className="text-xs text-slate-400 mb-2">📍 Atendimento Digital e Presencial</p>
            <p className="text-xs text-slate-400 mb-2">📞 (75) 9933-1557</p>
            <p className="text-xs text-slate-400">✉️ contato@seusitecontabilidade.com.br</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-900 text-center text-xs text-slate-600 flex flex-col sm:flex-row justify-between gap-4">
          <p>© 2026 SeuSiteContabilidade. Todos os direitos reservados.</p>
          <p className="hover:text-teal-400 transition-colors">Desenvolvido com maestria por Álvaro Velame</p>
        </div>
      </footer>
    </div>
  );
}