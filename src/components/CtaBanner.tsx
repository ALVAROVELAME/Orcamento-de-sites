export function CtaBanner() {
  const scrollToFormulario = () => {
    const elemento = document.getElementById('formulario');
    elemento?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 my-24 w-full">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl overflow-hidden text-white p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar sua presença online?</h3>
          <p className="text-blue-100 text-sm">Solicite um orçamento sem compromisso e veja como podemos elevar seu negócio na internet.</p>
        </div>
        <button
          onClick={scrollToFormulario}
          className="relative z-10 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all whitespace-nowrap shadow-lg hover:scale-105 transform"
        >
          Solicitar Orçamento
        </button>
      </div>
    </section>
  );
}