import type { ModeloSecaoPreview } from '../../data/precos';
import { RENDERIZADOR_COMPONENTES } from './constants';

interface PreviewSecaoProps {
  modelo?: ModeloSecaoPreview | null;
  fallbackText: string;
}

export function PreviewSecao({ modelo, fallbackText }: PreviewSecaoProps) {
  if (!modelo) {
    return <div className="p-8 text-center font-bold text-slate-600">{fallbackText}</div>;
  }

  if (modelo.tipoPreview === 'texto') {
    return (
      <div className="p-6 md:p-8 bg-slate-50 border-l-4 border-indigo-500 text-left">
        <h4 className="text-lg md:text-xl font-black text-slate-800 mb-3">{modelo.nome}</h4>
        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
          {modelo.descricao ?? fallbackText}
        </p>
      </div>
    );
  }

  if (modelo.tipoPreview === 'imagem' && modelo.previewImagemSrc) {
    return (
      <div className="flex flex-col gap-4">
        {modelo.descricao ? (
          <div className="px-4 md:px-6 pt-4 md:pt-6 text-left">
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">{modelo.descricao}</p>
          </div>
        ) : null}

        <img
          src={modelo.previewImagemSrc}
          alt={modelo.previewImagemAlt ?? modelo.nome}
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  const ComponentePreview = RENDERIZADOR_COMPONENTES[modelo.id];

  if (!ComponentePreview) {
    return <div className="p-8 text-center font-bold text-slate-600">{fallbackText}</div>;
  }

  return <ComponentePreview />;
}
