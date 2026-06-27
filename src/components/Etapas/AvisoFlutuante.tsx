type AvisoCor = 'rose' | 'indigo';
type AvisoLado = 'left' | 'right';
type AvisoIcone = 'alerta' | 'info';

interface AvisoFlutuanteProps {
  visivel: boolean;
  lado: AvisoLado;
  cor: AvisoCor;
  icone: AvisoIcone;
  titulo: string;
  descricao: string;
  ariaLabelFechar: string;
  onFechar: () => void;
}

const POSICAO_LADO: Record<AvisoLado, string> = {
  left: 'left-4 md:left-8',
  right: 'right-4 md:right-8'
};

const CORES: Record<AvisoCor, { container: string; texto: string; hover: string }> = {
  rose: {
    container: 'bg-rose-600 border-rose-500',
    texto: 'text-rose-50',
    hover: 'hover:bg-rose-700'
  },
  indigo: {
    container: 'bg-indigo-600 border-indigo-500',
    texto: 'text-indigo-50',
    hover: 'hover:bg-indigo-700'
  }
};

function IconeAviso({ tipo }: { tipo: AvisoIcone }) {
  if (tipo === 'info') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5A8.5 8.5 0 1 0 12 3.5a8.5 8.5 0 0 0 0 17Z" />
      </svg>
    );
  }

  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

export function AvisoFlutuante({
  visivel,
  lado,
  cor,
  icone,
  titulo,
  descricao,
  ariaLabelFechar,
  onFechar
}: AvisoFlutuanteProps) {
  const cores = CORES[cor];

  return (
    <div
      className={`fixed top-4 ${POSICAO_LADO[lado]} md:top-8 z-50 transition-all duration-500 transform ${
        visivel ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className={`${cores.container} text-white p-4 rounded-xl shadow-xl flex items-start gap-4 border max-w-sm`}>
        <div className="mt-0.5">
          <IconeAviso tipo={icone} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-md mb-1">{titulo}</h4>
          <p className={`text-base ${cores.texto}`}>{descricao}</p>
        </div>
        <button
          onClick={onFechar}
          aria-label={ariaLabelFechar}
          title={ariaLabelFechar}
          className={`p-1 ${cores.hover} rounded transition-colors`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
