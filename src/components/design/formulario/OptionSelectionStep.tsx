import { BotoesNavegacao } from '../../Etapas/BotoesNavegacao';
import { obterMetaPreco, type Pacote } from '../../../data/precos';
import { FormStepHeader } from './FormStepHeader';
import { SelectableAccordion } from './SelectableAccordion';

interface OptionItem {
  id: string;
  titulo: string;
  descricao?: string;
  preco?: number;
  incluidoNosPacotes?: readonly ('cartao_3' | 'cartao_6' | 'institucional' | 'loja_pequena')[];
}

interface OptionSelectionStepProps {
  titulo: string;
  descricao: string;
  textoAcaoAntesImagem?: string;
  imagemAcaoSrc?: string;
  imagemAcaoAlt?: string;
  textoAcaoDepoisImagem?: string;
  opcoes: readonly OptionItem[];
  selecionados: string[];
  expandido: string | null;
  onToggleExpandido: (id: string) => void;
  onToggleSelecionado: (id: string) => void;
  onVoltar: () => void;
  onProximo: () => void;
  textoProximo?: string;
  accent?: 'indigo' | 'emerald';
  contadorSelecionadas?: string;
  pacoteEscolhido?: Pacote | null;
}

export function OptionSelectionStep({
  titulo,
  descricao,
  textoAcaoAntesImagem,
  imagemAcaoSrc,
  imagemAcaoAlt,
  textoAcaoDepoisImagem,
  opcoes,
  selecionados,
  expandido,
  onToggleExpandido,
  onToggleSelecionado,
  onVoltar,
  onProximo,
  textoProximo,
  accent = 'indigo',
  contadorSelecionadas,
  pacoteEscolhido
}: OptionSelectionStepProps) {
  const descricaoBorderClass = accent === 'emerald' ? 'border-emerald-500' : 'border-indigo-500';

  return (
    <div className="w-full flex flex-col items-center pb-24 bg-slate-50 min-h-screen">
      <div className="w-full max-w-none px-0 animate-fade-in delay-[300ms] fill-mode-both relative">
        <div className="bg-white w-full p-4 md:p-6 relative shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 mt-2">
            <FormStepHeader
              titulo={titulo}
              descricao={descricao}
              textoAcaoAntesImagem={textoAcaoAntesImagem}
              imagemAcaoSrc={imagemAcaoSrc}
              imagemAcaoAlt={imagemAcaoAlt}
              textoAcaoDepoisImagem={textoAcaoDepoisImagem}
              rightContent={contadorSelecionadas ? (
                <div className="text-right hidden sm:block">
                  <span className="text-base font-bold text-indigo-700">
                    {selecionados.length} {contadorSelecionadas}
                  </span>
                </div>
              ) : null}
            />

            <div className="flex flex-col gap-4 w-full mt-6 xl:max-w-5xl xl:mx-auto">
              {opcoes.map((opcao) => {
                const isSelected = selecionados.includes(opcao.id);
                const metaLabel = obterMetaPreco(opcao, pacoteEscolhido);

                return (
                  <SelectableAccordion
                    key={opcao.id}
                    titulo={opcao.titulo}
                    metaLabel={metaLabel}
                    isExpanded={expandido === opcao.id}
                    isSelected={isSelected}
                    onToggleExpand={() => onToggleExpandido(opcao.id)}
                    onToggleSelect={() => onToggleSelecionado(opcao.id)}
                    accent={accent}
                  >
                    <div
                      className={`p-6 md:p-8 bg-slate-50 text-slate-600 font-medium text-base md:text-lg border-l-4 ${descricaoBorderClass} ml-4 md:ml-6 my-4 rounded-r-lg`}
                    >
                      {opcao.descricao}
                    </div>
                  </SelectableAccordion>
                );
              })}
            </div>
          </div>

          <div className="mt-12 max-w-7xl xl:max-w-5xl mx-auto px-4">
            <BotoesNavegacao onVoltar={onVoltar} onProximo={onProximo} desabilitarProximo={false} textoProximo={textoProximo} />
          </div>
        </div>
      </div>
    </div>
  );
}
