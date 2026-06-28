import { useEffect, useState } from 'react';
import { BadgeCheck, Building2, Gem, Store } from 'lucide-react';
import type { Pacote } from '../../../data/precos';
import { obterTotalSecoesComCapa } from '../../../data/precos';
import { formatarMoedaBRL } from '../../../utils/formatadores';

interface PlanSelectionStepProps {
  titulo: string;
  descricao: string;
  descricaoExtra?: string;
  textoBotaoSelecionar: string;
  prefixoLimiteSecoes: string;
  sufixoLimiteSecoes: string;
  pacotes: Pacote[];
  onSelecionar: (pacote: Pacote) => void;
}

function renderizarDescricao(descricao: string) {
  const trechoSemQuebra = 'Contato ou Sobre Nos.';

  if (!descricao.includes(trechoSemQuebra)) {
    return descricao;
  }

  const [antes, depois] = descricao.split(trechoSemQuebra);

  return (
    <>
      {antes}
      <span className="whitespace-nowrap">{trechoSemQuebra}</span>
      {depois}
    </>
  );
}

function renderizarIconePacote(icone: string) {
  const className = 'w-7 h-7 md:w-8 md:h-8';

  switch (icone) {
    case 'badge-check':
      return <BadgeCheck className={className} strokeWidth={2.2} />;
    case 'gem':
      return <Gem className={className} strokeWidth={2.2} />;
    case 'building-2':
      return <Building2 className={className} strokeWidth={2.2} />;
    case 'store':
      return <Store className={className} strokeWidth={2.2} />;
    default:
      return <BadgeCheck className={className} strokeWidth={2.2} />;
  }
}

function obterClasseIconePacote(pacoteId: Pacote['id']) {
  switch (pacoteId) {
    case 'cartao_3':
      return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-white text-blue-700 border border-blue-100 shadow-blue-100/70';
    case 'cartao_6':
      return 'bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white text-violet-700 border border-violet-100 shadow-violet-100/70';
    case 'institucional':
      return 'bg-gradient-to-br from-slate-100 via-sky-50 to-white text-slate-700 border border-slate-200 shadow-slate-200/70';
    case 'loja_pequena':
      return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white text-emerald-700 border border-emerald-100 shadow-emerald-100/70';
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-100 shadow-slate-100/70';
  }
}

export function PlanSelectionStep({
  titulo,
  descricao,
  descricaoExtra,
  textoBotaoSelecionar,
  prefixoLimiteSecoes,
  sufixoLimiteSecoes,
  pacotes,
  onSelecionar
}: PlanSelectionStepProps) {
  const gridClassName =
    pacotes.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3 lg:max-w-6xl lg:mx-auto' : 'md:grid-cols-2 lg:grid-cols-4';
  const [quantidadeCardsVisiveis, setQuantidadeCardsVisiveis] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      setQuantidadeCardsVisiveis(1);

      intervalId = window.setInterval(() => {
        setQuantidadeCardsVisiveis((quantidadeAtual) => {
          const proximaQuantidade = Math.min(quantidadeAtual + 1, pacotes.length);

          if (proximaQuantidade >= pacotes.length) {
            window.clearInterval(intervalId);
          }

          return proximaQuantidade;
        });
      }, 70);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [pacotes.length]);

  const pacotesVisiveis = pacotes.slice(0, quantidadeCardsVisiveis);

  return (
    <div className="w-full max-w-7xl px-4 py-8 md:py-20 flex flex-col items-center animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 text-center tracking-tight">
        {titulo}
      </h1>
      <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
        <div className="relative max-w-2xl mx-auto overflow-hidden rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,242,255,0.92))] p-6 md:p-8 text-left shadow-[0_20px_60px_-30px_rgba(79,70,229,0.45)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

          <div className="relative flex items-start gap-4 md:gap-5">
            <div className="mt-1 flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-3xl md:text-4xl font-black text-white shadow-lg shadow-indigo-600/20">
              "
            </div>

            <div className="min-w-0">
              <p className="text-lg md:text-xl font-semibold tracking-tight text-slate-800 leading-snug">
                {renderizarDescricao(descricao)}
              </p>

              <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-500">
                <span className="h-px w-8 bg-indigo-200" />
                <span className="uppercase tracking-[0.24em] text-indigo-700">{descricaoExtra || 'Guia rapido'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 md:gap-8 w-full ${gridClassName}`}>
        {pacotesVisiveis.map((pacote) => (
          <div
            key={pacote.id}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between animate-fade-in"
          >
            <div>
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${obterClasseIconePacote(pacote.id)}`}
                aria-hidden="true"
              >
                {renderizarIconePacote(pacote.icone)}
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{pacote.nome}</h2>

              <p className="text-base text-slate-700 mb-6 font-medium leading-relaxed">{pacote.descricao}</p>

              <ul className="mb-8 space-y-3 md:space-y-4">
                {pacote.detalhes.map((detalhe, index) => (
                  <li key={`${pacote.id}-${index}`} className="flex items-center text-base text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {detalhe}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-black text-indigo-600 mb-2">{formatarMoedaBRL(pacote.precoBase)}</p>

              <p className="text-sm text-slate-600 font-bold uppercase tracking-wider mb-6 leading-relaxed">
                {prefixoLimiteSecoes} {pacote.limiteSecoes} {sufixoLimiteSecoes} (+ capa garantida, total {obterTotalSecoesComCapa(pacote)})
              </p>

              <button
                type="button"
                onClick={() => onSelecionar(pacote)}
                className="w-full py-3.5 md:py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-base md:text-lg transition-colors shadow-lg shadow-slate-900/20"
              >
                {textoBotaoSelecionar}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
