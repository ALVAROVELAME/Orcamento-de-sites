import { useEffect } from 'react';

export function useScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
}

export function alternarItemSelecionado<T>(itens: readonly T[] | undefined, item: T) {
  if (!itens) return [item];
  return itens.includes(item) ? itens.filter((atual) => atual !== item) : [...itens, item];
}
