import { useEffect } from 'react';

const TEMPO_AUTO_ABRIR_MS = 400;
const TEMPO_AUTO_FECHAR_MS = 1500;

export function useAutoExpandirTemporariamente<TId extends string>(
  ativo: boolean,
  itemId: TId | null | undefined,
  setExpandido: (item: TId | null) => void
) {
  useEffect(() => {
    if (!ativo || !itemId) return undefined;

    let fecharTimer: ReturnType<typeof setTimeout>;

    const abrirTimer = setTimeout(() => {
      setExpandido(itemId);
      fecharTimer = setTimeout(() => setExpandido(null), TEMPO_AUTO_FECHAR_MS);
    }, TEMPO_AUTO_ABRIR_MS);

    return () => {
      clearTimeout(abrirTimer);
      if (fecharTimer) clearTimeout(fecharTimer);
    };
  }, [ativo, itemId, setExpandido]);
}
