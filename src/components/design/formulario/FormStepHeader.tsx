import type { ReactNode } from 'react';

interface FormStepHeaderProps {
  titulo: string;
  descricao?: string;
  textoAcaoAntesImagem?: string;
  imagemAcaoSrc?: string;
  imagemAcaoAlt?: string;
  textoAcaoDepoisImagem?: string;
  rightContent?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
}

export function FormStepHeader({
  titulo,
  descricao,
  textoAcaoAntesImagem,
  imagemAcaoSrc,
  imagemAcaoAlt,
  textoAcaoDepoisImagem,
  rightContent,
  titleClassName = 'text-2xl md:text-3xl font-black text-slate-800',
  descriptionClassName = 'text-base md:text-lg text-slate-700 leading-relaxed',
  containerClassName = 'mb-6 pb-4 border-b border-slate-100 flex justify-between items-end gap-4'
}: FormStepHeaderProps) {
  return (
    <div className={containerClassName}>
      <div>
        <h3 className={titleClassName}>{titulo}</h3>
        {descricao ? (
          <div className={`mt-1 flex flex-wrap items-center gap-2 ${descriptionClassName}`}>
            <span>{descricao}</span>
            {textoAcaoAntesImagem ? <span className="font-bold text-slate-900">{textoAcaoAntesImagem}</span> : null}
            {imagemAcaoSrc ? (
              <img
                src={imagemAcaoSrc}
                alt={imagemAcaoAlt ?? 'Imagem de ajuda'}
                className="inline-block h-12 w-12 md:h-14 md:w-14 rounded-sm align-middle"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            {textoAcaoDepoisImagem ? <span className="font-bold text-slate-900">{textoAcaoDepoisImagem}</span> : null}
          </div>
        ) : null}
      </div>

      {rightContent ? <div>{rightContent}</div> : null}
    </div>
  );
}
