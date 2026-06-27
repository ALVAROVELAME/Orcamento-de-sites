export function formatarMoedaBRL(valor: number) {
  const numeroValido = typeof valor === 'number' ? valor : 0;
  return numeroValido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarSimNao(valor?: boolean) {
  return valor ? 'Sim' : 'Nao';
}
