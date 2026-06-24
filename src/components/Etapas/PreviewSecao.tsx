import type { ModeloSecaoPreview } from '../../data/precos';
import { RENDERIZADOR_COMPONENTES } from './constants';

interface PreviewSecaoProps {
  modelo?: ModeloSecaoPreview | null;
  fallbackText: string;
}

export function PreviewSecao({ modelo, fallbackText }: PreviewSecaoProps) {
  if (!modelo) {
    return <div className="p-8 text-center font-bold text-slate-400">{fallbackText}</div>;
  }

  if (modelo.tipoPreview === 'imagem' && modelo.previewImagemSrc) {
    return (
      <img
        src={modelo.previewImagemSrc}
        alt={modelo.previewImagemAlt ?? modelo.nome}
        className="block h-auto w-full"
        loading="lazy"
        decoding="async"
      />
    );
  }

  const ComponentePreview = RENDERIZADOR_COMPONENTES[modelo.id];

  if (!ComponentePreview) {
    return <div className="p-8 text-center font-bold text-slate-400">{fallbackText}</div>;
  }

  return <ComponentePreview />;
}
