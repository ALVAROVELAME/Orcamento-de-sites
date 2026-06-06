export function Footer() {
  const scrollToFormulario = () => {
    const elemento = document.getElementById('formulario');
    elemento?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-gray-400 py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px bg-slate-700 flex-1 max-w-[200px]"></div>
          <div className="text-center">
            <div className="text-3xl mb-2">�</div>
            <h2 className="text-2xl font-bold text-white tracking-widest">OrçamentoWeb</h2>
          </div>
          <div className="h-px bg-slate-700 flex-1 max-w-[200px]"></div>
        </div>

        {/* Informações */}
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left mb-12">
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm">Sobre</h4>
            <p className="text-sm leading-relaxed">
              Criamos sites profissionais e orçamentos personalizados para pequenos negócios.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li 
                onClick={scrollToFormulario}
                className="hover:text-blue-400 cursor-pointer transition-colors"
              >
                Solicitar Orçamento
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Voltar ao topo
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm">Contato</h4>
            <div className="space-y-2 text-sm">
              <p>📧 contato@orcamentoweb.com</p>
              <p>📱 (11) 99999-9999</p>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-slate-500">
          <p>&copy; 2024 OrçamentoWeb. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}