import { useEffect } from 'react';

export function scrollParaTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollParaElemento(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function useScrollParaTopoAoMontar() {
  useEffect(() => {
    scrollParaTopo();
  }, []);
}
