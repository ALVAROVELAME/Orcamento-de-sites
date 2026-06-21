import type { FormEvent } from 'react';
import { obterRotuloPreco, type InfoSite, type Pacote, type PacoteId } from '../../../data/precos';
import { BotoesNavegacao } from '../../Etapas/BotoesNavegacao';

interface IdentityVisualStepProps {
  config: {
    titulo: string;
    descricao: string;
    campoNome: {
      rotulo: string;
      placeholder: string;
    };
    hospedagemDominio: {
      titulo: string;
      descricao: string;
      opcoes: readonly { id: string; titulo: string }[];
    };
    logotipo: {
      titulo: string;
      opcoes: readonly { id: string; titulo: string; destaque?: boolean; preco?: number; incluidoNosPacotes?: readonly PacoteId[] }[];
      idQueLiberaDetalhes: string;
    };
    criacaoLogo: {
      titulo: string;
      opcoes: readonly { id: string; titulo: string }[];
    };
    paletaCores: {
      titulo: string;
      quantidade: number;
      corPadrao: string;
    };
  };
  infoSite: InfoSite;
  setInfoSite: (info: InfoSite) => void;
  onSubmit: (event: FormEvent) => void;
  onVoltar: () => void;
  pacoteEscolhido?: Pacote | null;
}

function toggleValorArray<T extends string>(valores: readonly T[] | undefined, valor: T, checked: boolean) {
  const listaAtual = [...(valores ?? [])];

  if (checked) {
    return listaAtual.includes(valor) ? listaAtual : [...listaAtual, valor];
  }

  return listaAtual.filter((item) => item !== valor);
}

export function IdentityVisualStep({
  config,
  infoSite,
  setInfoSite,
  onSubmit,
  onVoltar,
  pacoteEscolhido
}: IdentityVisualStepProps) {
  const statusLiberaDetalhes = infoSite.status_logo === config.logotipo.idQueLiberaDetalhes;

  return (
    <div className="w-full max-w-3xl px-4 py-8 md:py-16 animate-fade-in">
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{config.titulo}</h2>
        <p className="text-base md:text-lg text-slate-600 font-medium mb-6 md:mb-8">{config.descricao}</p>

        <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
          <div>
            <label htmlFor="nome-site" className="block text-base md:text-lg font-bold text-slate-800 mb-2">
              {config.campoNome.rotulo}
            </label>
            <input
              id="nome-site"
              type="text"
              required
              placeholder={config.campoNome.placeholder}
              value={infoSite.nome}
              onChange={(event) => setInfoSite({ ...infoSite, nome: event.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-lg transition-all font-medium text-slate-800"
            />
          </div>

          <fieldset className="bg-slate-50 p-6 rounded-2xl border border-slate-300 space-y-4">
            <legend className="text-base md:text-lg font-bold text-slate-800 float-left w-full mb-2">{config.hospedagemDominio.titulo}</legend>
            <p className="text-sm text-slate-600 clear-both">{config.hospedagemDominio.descricao}</p>

            <div className="space-y-4 pt-2 clear-both">
              {config.hospedagemDominio.opcoes.map((opcao) => {
                const valorBooleano = opcao.id === 'tem';

                return (
                  <label key={opcao.id} className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                    <input
                      type="radio"
                      name="tem_hospedagem_dominio"
                      value={opcao.id}
                      checked={infoSite.tem_hospedagem_dominio === valorBooleano}
                      onChange={() => setInfoSite({ ...infoSite, tem_hospedagem_dominio: valorBooleano })}
                      className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                      required
                    />
                    <span>{opcao.titulo}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="bg-slate-50 p-6 rounded-2xl border border-slate-300 space-y-4">
            <legend className="text-base md:text-lg font-bold text-slate-800 float-left w-full mb-2">{config.logotipo.titulo}</legend>

            <div className="space-y-4 pt-2 clear-both">
              {config.logotipo.opcoes.map((opcao) => (
                <label key={opcao.id} className="flex items-center gap-3 cursor-pointer text-slate-700 font-bold text-base md:text-lg">
                  <input
                    type="radio"
                    name="status_logo"
                    value={opcao.id}
                    checked={infoSite.status_logo === opcao.id}
                    onChange={(event) => setInfoSite({ ...infoSite, status_logo: event.target.value as InfoSite['status_logo'] })}
                    className="w-5 h-5 text-pink-600 focus:ring-pink-500 accent-pink-600"
                    required
                  />
                  <span className={opcao.destaque ? 'font-extrabold text-pink-800' : ''}>
                    {opcao.titulo}
                    {obterRotuloPreco(opcao, pacoteEscolhido) ? ` (${obterRotuloPreco(opcao, pacoteEscolhido)})` : ''}
                  </span>
                </label>
              ))}
            </div>

            {statusLiberaDetalhes ? (
              <div className="mt-4 p-5 bg-pink-50/60 border border-pink-200 rounded-2xl space-y-6 animate-fade-in">
                <fieldset>
                  <legend className="font-bold text-pink-900 text-base md:text-lg mb-3">{config.criacaoLogo.titulo}</legend>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base font-bold text-slate-700">
                    {config.criacaoLogo.opcoes.map((estilo) => (
                      <label key={estilo.id} className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
                        <input
                          type="checkbox"
                          value={estilo.id}
                          checked={infoSite.estilo_marca?.includes(estilo.id as never) || false}
                          onChange={(event) =>
                            setInfoSite({
                              ...infoSite,
                              estilo_marca: toggleValorArray(infoSite.estilo_marca, estilo.id as never, event.target.checked)
                            })
                          }
                          className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 accent-pink-600"
                        />
                        <span>{estilo.titulo}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="pt-4 border-t border-pink-200">
                  <label htmlFor="paleta-cores-0" className="block text-base md:text-lg font-bold text-pink-900 mb-3">
                    {config.paletaCores.titulo}
                  </label>

                  <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
                    {Array.from({ length: config.paletaCores.quantidade }).map((_, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 md:gap-3">
                        <div className="relative group">
                          <input
                            id={`paleta-cores-${index}`}
                            type="color"
                            value={infoSite.cores?.[index] || config.paletaCores.corPadrao}
                            onChange={(event) => {
                              const novasCores = [...infoSite.cores] as [string, string, string];
                              novasCores[index] = event.target.value;
                              setInfoSite({ ...infoSite, cores: novasCores });
                            }}
                            aria-label={`Cor ${index + 1}`}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl cursor-pointer border-0 p-0 shadow-md transition-transform md:group-hover:scale-105"
                          />
                        </div>
                        <span className="text-xs md:text-sm text-pink-900 font-mono font-bold uppercase">
                          {infoSite.cores?.[index] || config.paletaCores.corPadrao}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </fieldset>

          <BotoesNavegacao onVoltar={onVoltar} desabilitarProximo={false} />
        </form>
      </div>
    </div>
  );
}
