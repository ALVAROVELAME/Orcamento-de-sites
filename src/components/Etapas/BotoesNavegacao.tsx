interface BotoesNavegacaoProps {
  onVoltar: () => void;
  onProximo?: () => void;
  desabilitarProximo: boolean;
  textoProximo?: string;
}

export function BotoesNavegacao({
  onVoltar,
  onProximo,
  desabilitarProximo,
  textoProximo
}: BotoesNavegacaoProps) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      <button
        type="button"
        onClick={onVoltar}
        className="w-full sm:w-auto px-6 py-3.5 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all text-base active:scale-95"
      >
        ← Voltar
      </button>

      <button
        type="submit"
        onClick={onProximo}
        disabled={desabilitarProximo}
        className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all text-lg shadow-lg active:scale-95"
      >
        {textoProximo ?? 'Proximo →'}
      </button>
    </div>
  );
}
