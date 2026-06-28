import { useEffect, useRef, useState } from 'react';
import { ehPacoteEcommerce, type Pacote } from '../../data/precos';
import { formatarMoedaBRL } from '../../utils/formatadores';

interface ProgressBarProps {
  etapaAtual: 1 | 2 | 3 | 4 | 5 | 6;
  pacoteEscolhido: Pacote | null;
  listaPacotes: Pacote[];
  valorTotal: number;
  selecionarPacote: (pacote: Pacote) => void;
}

export function ProgressBar({
  etapaAtual,
  pacoteEscolhido,
  listaPacotes = [],
  valorTotal = 0,
  selecionarPacote
}: ProgressBarProps) {
  const totalEtapas = ehPacoteEcommerce(pacoteEscolhido) ? 6 : 5;
  const progressoClasse = obterClasseProgresso(etapaAtual, totalEtapas);
  const barraRef = useRef<HTMLDivElement>(null);
  const [alturaBarra, setAlturaBarra] = useState(160);

  useEffect(() => {
    const barra = barraRef.current;
    if (!barra) return undefined;

    const atualizarAltura = () => {
      setAlturaBarra((alturaAtual) => {
        const novaAltura = Math.ceil(barra.getBoundingClientRect().height);
        return novaAltura === alturaAtual ? alturaAtual : novaAltura;
      });
    };

    const frameId = window.requestAnimationFrame(atualizarAltura);

    if (!window.ResizeObserver) {
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new ResizeObserver(atualizarAltura);
    observer.observe(barra);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  const handlePacoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pacoteId = event.target.value;
    const pacoteEncontrado = listaPacotes.find((pacote) => pacote.id === pacoteId);
    if (pacoteEncontrado) {
      selecionarPacote(pacoteEncontrado);
    }
  };

  return (
    <>
      <div
        ref={barraRef}
        className="fixed top-[72px] left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-300 shadow-lg shadow-slate-200/50 border-b border-slate-100"
        role="region"
        aria-label="Status do orcamento e progresso do formulario"
      >
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 gap-y-4 gap-x-4 md:flex md:flex-row md:justify-between md:items-center md:gap-8">
          <div className="flex items-center justify-start md:min-w-[160px]">
            <span className="text-sm md:text-base font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 px-5 py-3 rounded-xl border border-indigo-200/60 whitespace-nowrap shadow-sm">
              Etapa {etapaAtual} de {totalEtapas}
            </span>
          </div>

          <div className="flex items-center justify-end md:min-w-[260px]">
            {pacoteEscolhido && listaPacotes.length > 0 ? (
              <div className="relative w-full max-w-[240px] group">
                <label htmlFor="seletor-pacote-direta" className="sr-only">
                  Trocar plano contratado
                </label>
                <select
                  id="seletor-pacote-direta"
                  value={pacoteEscolhido.id}
                  onChange={handlePacoteChange}
                  className="w-full bg-white border-2 border-slate-200 text-slate-800 py-3 pl-4 pr-10 rounded-xl text-base font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none cursor-pointer transition-all appearance-none text-left hover:border-indigo-300"
                >
                  {listaPacotes.map((pacote) => (
                    <option key={pacote.id} value={pacote.id} className="font-bold text-base">
                      {pacote.nome}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-hover:text-slate-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
              <span className="text-base text-slate-600 font-medium italic">Selecione o plano...</span>
            )}
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-row items-center gap-3 justify-center text-center bg-slate-50 md:bg-transparent py-3 md:py-0 rounded-xl border border-slate-100 md:border-none">
            <span className="text-sm md:text-base text-slate-700 font-bold uppercase tracking-wider">Total Estimado:</span>
            <span className="text-2xl md:text-3xl font-black text-indigo-600 tracking-tight">{formatarMoedaBRL(valorTotal)}</span>
          </div>
        </div>

        <div className="w-full h-[4px] bg-slate-100 overflow-hidden" aria-hidden="true">
          <div
            className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-700 ease-out ${progressoClasse}`}
          />
        </div>
      </div>
      <div style={{ height: alturaBarra }} aria-hidden="true" />
    </>
  );
}

function obterClasseProgresso(etapaAtual: number, totalEtapas: number) {
  const etapaNormalizada = Math.min(Math.max(etapaAtual, 1), totalEtapas);

  if (totalEtapas === 6) {
    const mapaClassesEcommerce: Record<number, string> = {
      1: 'w-0',
      2: 'w-[20%]',
      3: 'w-[40%]',
      4: 'w-[60%]',
      5: 'w-[80%]',
      6: 'w-full'
    };

    return mapaClassesEcommerce[etapaNormalizada] ?? 'w-0';
  }

  const mapaClassesPadrao: Record<number, string> = {
    1: 'w-0',
    2: 'w-1/4',
    3: 'w-1/2',
    4: 'w-3/4',
    5: 'w-full'
  };

  return mapaClassesPadrao[etapaNormalizada] ?? 'w-0';
}
