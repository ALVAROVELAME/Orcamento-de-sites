interface BotoesNavegacaoProps {
  onVoltar: () => void;
  onProximo?: () => void; // Opcional para quando o form lida com o submit
  desabilitarProximo: boolean;
  textoProximo?: string; // Nova propriedade opcional para modularizar o texto do botão
}

export function BotoesNavegacao({
  onVoltar,
  onProximo,
  desabilitarProximo,
  textoProximo,
}: BotoesNavegacaoProps) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      {/* Botão Voltar Genérico */}
      <button
        type="button" // Evita que o voltar envie o formulário sem querer
        onClick={onVoltar}
        className="w-full sm:w-auto px-6 py-3.5 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all text-base active:scale-95"
      >
        ← Voltar
      </button>

      {/* Botão Próximo / Ação Genérico */}
      <button
        type="submit" // Garante o disparo do onSubmit do form pai por padrão
        onClick={onProximo}
        disabled={desabilitarProximo}
        className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all text-lg shadow-lg active:scale-95"
      >
        {/* Renderiza o texto customizado, ou cai no padrão "Próximo →" */}
        {textoProximo || "Próximo →"}
      </button>
    </div>
  );
}