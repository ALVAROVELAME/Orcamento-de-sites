export function alternarItem<T>(itens: readonly T[] | undefined, item: T) {
  return itens?.includes(item) ? itens.filter((atual) => atual !== item) : [...(itens ?? []), item];
}

export function definirItem<T>(itens: readonly T[] | undefined, item: T, ativo: boolean) {
  if (!ativo) return (itens ?? []).filter((atual) => atual !== item);
  return itens?.includes(item) ? [...itens] : [...(itens ?? []), item];
}

export function mesclarUnicos<T>(atuais: readonly T[] | undefined, novos: readonly T[]) {
  return [...new Set([...(atuais ?? []), ...novos])];
}
