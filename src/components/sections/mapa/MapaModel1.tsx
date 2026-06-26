export function MapaModel1() {
  const carregarMapa = true;

  // Definição estática da cor da seção de produção (Exemplo: azul profissional)
  const tema = {
    bgIcone: 'bg-blue-50',
    textoLink: 'text-blue-600 hover:text-blue-700',
  };

  // Link real de rotas baseado no seu endereço fornecido
  const urlGoogleMapsRotas = "https://www.google.com/maps/dir/?api=1&destination=Av.+Centenário,+2992+-+Chame-Chame,+Salvador+-+BA";
  
  // URL de Embed Real (Substitua depois pelo src completo gerado no Google Maps se desejar)
  const urlEmbedMapa = "https://maps.google.com/maps?q=Av.%20Centen%C3%A1rio,%202992%20-%20Chame-Chame,%20Salvador%20-%20BA&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Textos de Cabeçalho da Seção */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Nossa Localização
          </h2>
          <p className="text-lg text-slate-700">
            Fácil acesso e excelente infraestrutura para receber você.
          </p>
        </div>

        {/* Container do Mapa - Proporção adaptável para Mobile/Desktop */}
        <div className="w-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md ring-1 ring-slate-200/50 aspect-[4/5] sm:aspect-[16/10] md:aspect-video transition-all duration-300">
          {carregarMapa ? (
            <iframe
              src={urlEmbedMapa}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa interativo mostrando a localização da empresa"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-600">
              Carregando mapa...
            </div>
          )}
        </div>

        {/* Bloco Informativo inferior */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 max-w-3xl mx-auto">
          <div className={`p-4 ${tema.bgIcone} rounded-2xl text-blue-600 shrink-0`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <div className="flex-1 w-full text-center sm:text-left space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Venha tomar um café conosco</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              Av. Centenário, 2992 - Chame-Chame, Salvador - BA.
            </p>
            <div className="pt-2">
              <a 
                href={urlGoogleMapsRotas}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir rotas de navegação no Google Maps externo"
                className={`inline-flex items-center text-base font-bold transition-colors ${tema.textoLink}`}
              >
                Como chegar
                <span className="sr-only"> abrir rotas no mapa do Google</span>
                <span className="ml-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
