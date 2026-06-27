import { alternarItem } from '../../utils/colecoes';
import { useScrollParaTopoAoMontar } from '../../utils/scroll';

export function useScrollToTopOnMount() {
  useScrollParaTopoAoMontar();
}

export function alternarItemSelecionado<T>(itens: readonly T[] | undefined, item: T) {
  return alternarItem(itens, item);
}
