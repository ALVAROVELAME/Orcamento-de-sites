import { scrollParaElemento, scrollParaTopo } from '../utils/scroll';

export function Footer() {
  const scrollToFormulario = () => {
    scrollParaElemento('formulario');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px bg-slate-700 flex-1 max-w-[200px]"></div>
          <div className="text-center">
            <div className="text-3xl mb-2">�</div>
            <p className="text-2xl font-bold text-white tracking-widest">OrçamentoWeb</p>
          </div>
          <div className="h-px bg-slate-700 flex-1 max-w-[200px]"></div>
        </div>

        {/* Informações */}
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left mb-12">
          
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-base">Sobre</h3>
            <p className="text-base leading-relaxed">
              Criamos sites profissionais e orçamentos personalizados para pequenos negócios.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-base">Links Rápidos</h3>
            <ul className="space-y-2 text-base">
              <li>
                <button
                  type="button"
                  onClick={scrollToFormulario}
                  className="hover:text-blue-400 transition-colors"
                >
                  Solicitar Orçamento
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-blue-400 transition-colors"
                  onClick={scrollParaTopo}
                >
                  Voltar ao topo
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-base">Contato</h3>
            <div className="space-y-2 text-base">
              <p>📧 contato@orcamentoweb.com</p>
              <p>📱 (11) 99999-9999</p>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-base text-slate-300">
          <p>&copy; 2024 OrçamentoWeb. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
