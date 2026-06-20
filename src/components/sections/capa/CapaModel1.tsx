export function CapaModel1() {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      {/* --- FAIXA DE AVISO (TOP BANNER) --- */}
      <div className="bg-teal-700 text-white text-center py-2.5 px-4 text-xs md:text-sm relative z-10">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>
            Este é um modelo premium de alta conversão para Contabilidade. Quer este site com a sua marca?{' '}
            <a href="#" className="font-bold underline hover:text-teal-100 transition-colors">
              Fale com Álvaro Velame
            </a>
          </span>
        </div>
      </div>

      {/* --- CABEÇALHO (HEADER) --- */}
      <header className="bg-white flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-[5%] shadow-sm relative z-10 gap-4 md:gap-0">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">
          SeuSite<span className="text-[#00d2b4]">Contabilidade</span>
        </div>

        {/* Menu de Navegação (Oculto no Mobile) */}
        <ul className="hidden md:flex gap-8 list-none items-center m-0 p-0">
          <li>
            <a href="#" className="text-gray-800 font-semibold text-base border-b-2 border-[#00d2b4] pb-1 hover:text-[#00d2b4] transition-colors">
              Início
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 font-semibold text-base hover:text-[#00d2b4] transition-colors flex items-center gap-1">
              Páginas
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </li>
        </ul>

        {/* Botão de Contato */}
        <a 
          href="#" 
          className="bg-[#1e1b4b] hover:bg-[#312e81] text-white px-6 py-2.5 rounded-full font-semibold text-sm md:text-base flex items-center gap-2 transition-colors shadow-md"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 22.621l-3.521-6.792c-.008-.016-.017-.029-.026-.044-.216-.363-.442-.716-.677-1.06-.527-.775-1.144-1.464-1.83-2.046-.665-.563-1.402-1.002-2.188-1.303-.799-.306-1.642-.464-2.502-.464h-.002c-.86 0-1.704.158-2.502.464-.786.301-1.523.74-2.188 1.303-.686.582-1.303 1.271-1.83 2.046-.235.344-.461.697-.677 1.06-.009.015-.018.028-.026.044L2 22.621h18zM11 1.379C5.477 1.379 1 5.856 1 11.379c0 2.228.742 4.29 1.986 5.955L5.61 11.38c0-2.973 2.417-5.39 5.39-5.39 2.972 0 5.389 2.417 5.389 5.39l2.624 5.954C20.258 15.669 21 13.607 21 11.379 21 5.856 16.523 1.379 11 1.379z" />
          </svg>
          (75) 9933-1557
        </a>
      </header>

      {/* --- SEÇÃO PRINCIPAL (CAPA) --- */}
      <section className="capa-hero relative flex flex-col justify-center items-center text-center px-5 h-[80vh] min-h-[600px]">
        <div className="bg-[#00d2b4]/10 border border-[#00d2b4] text-[#00d2b4] px-5 py-1.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase mb-6">
          Modelo Demonstrativo
        </div>
        
        <h1 className="text-[2.2rem] md:text-6xl font-extrabold text-white leading-[1.15] max-w-[950px] mb-6">
          Serviços Fiscais Especializados para
          <span className="text-[#00d2b4] block mt-2">Pessoas Físicas e Empresas</span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-300 max-w-[650px] leading-relaxed font-normal">
          Garantimos a conformidade fiscal e a saúde financeira da sua organização através de soluções contábeis estratégicas e tecnologia integrada.
        </p>
      </section>

      {/* --- BOTÃO WHATSAPP FLUTUANTE --- */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="fixed bottom-8 right-8 bg-[#25d366] text-white w-[60px] h-[60px] rounded-full flex justify-center items-center shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-300 z-50"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.385 0 0 5.385 0 12.032c0 2.127.551 4.205 1.6 6.037L.25 24l6.096-1.599c1.764.954 3.743 1.458 5.76 1.458h.005c6.647 0 12.035-5.388 12.035-12.034C24.146 5.385 18.758 0 12.031 0zm.005 21.848h-.003c-1.8 0-3.567-.484-5.111-1.399l-.367-.217-3.8.997 1.018-3.704-.238-.379c-.999-1.59-1.526-3.432-1.526-5.313 0-5.508 4.484-9.992 9.995-9.992 5.508 0 9.994 4.484 9.994 9.992 0 5.508-4.486 9.992-9.994 9.992zm5.48-7.491c-.301-.151-1.782-.879-2.059-.979-.276-.1-.477-.151-.678.151-.201.301-.778.979-.954 1.18-.176.201-.352.226-.653.075-1.517-.762-2.617-1.428-3.605-2.921-.227-.34-.025-.526.126-.677.135-.135.301-.352.452-.527.151-.176.201-.301.301-.502.101-.201.051-.377-.025-.527-.075-.151-.678-1.631-.928-2.233-.243-.585-.49-.505-.678-.514-.176-.009-.377-.009-.578-.009-.201 0-.527.075-.803.377-.276.301-1.054 1.029-1.054 2.51 0 1.481 1.079 2.912 1.229 3.113.151.201 2.122 3.238 5.138 4.54.717.31 1.276.495 1.713.634.721.228 1.378.196 1.897.119.582-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.126-.276-.201-.577-.352z" />
        </svg>
      </a>
    </div>
  );
}
