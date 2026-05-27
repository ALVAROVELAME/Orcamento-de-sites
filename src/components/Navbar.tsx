interface NavbarProps {
  phone?: string;
}

export function Navbar({ phone = "557599331557" }: NavbarProps) {
  // Formata o link limpando caracteres especiais caso venham na prop
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`}`;

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* LOGO CONFORME O DESIGN SOLICITADO */}
        <div className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer hover:text-teal-600 transition-colors">
          SeuSite<span className="text-teal-600 font-extrabold">Contabilidade</span>
        </div>

        {/* LINKS DE NAVEGAÇÃO CENTRAIS DO DESIGN (Home / Pages) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="text-slate-900 font-semibold border-b-2 border-teal-500 pb-1 transition-all">
            Início
          </a>
          <div className="relative group cursor-pointer pb-1 hover:text-slate-900 transition-colors flex items-center gap-1">
            <span>Páginas</span>
            <span className="text-[10px] text-slate-400 group-hover:rotate-180 transition-transform duration-200">▼</span>
            
            {/* Menu Dropdown demonstrativo para valorizar o site */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 py-2 z-50">
              <a href="#sobre" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-600">Quem Somos</a>
              <a href="#servicos" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-600">Nossos Serviços</a>
              <a href="#" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-600">Blog Corporativo</a>
            </div>
          </div>
        </div>

        {/* BOTÃO DA DIREITA COM O ÍCONE E TELEFONE DO DESIGN */}
        <div className="flex items-center">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900 text-white hover:bg-teal-600 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-md hover:shadow-lg hover:scale-102 transition-all duration-200"
          >
            {/* Ícone de telefone retrô minimalista idêntico ao modelo */}
            <span className="text-sm text-teal-400">📞</span>
            <span>(75) 9933-1557</span>
          </a>
        </div>

      </div>
    </nav>
  );
}