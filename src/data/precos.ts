// src/data/precos.ts

export interface Pacote {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  precoBase: number;
  limiteSecoes: number;
}

export const PACOTES: Pacote[] = [
  {
    id: 'cartao_3',
    nome: 'Cartão Digital (3 Seções)',
    descricao: 'Ideal para contatos rápidos e links úteis.',
    emoji: '📱',
    precoBase: 200.00,
    limiteSecoes: 3
  },
  {
    id: 'cartao_6',
    nome: 'Cartão Digital (6 Seções)',
    descricao: 'Mais completo, perfeito para portfólio inicial.',
    emoji: '📇',
    precoBase: 400.00,
    limiteSecoes: 6
  },
  {
    id: 'institucional',
    nome: 'Site Institucional Básico',
    descricao: 'Presença online profissional padrão.',
    emoji: '🏢',
    precoBase: 1200.00,
    limiteSecoes: 8
  },
  {
    id: 'loja_pequena',
    nome: 'Loja Virtual Pequena',
    descricao: 'Comece a vender seus produtos online.',
    emoji: '🛍️',
    precoBase: 4000.00,
    limiteSecoes: 12
  }
];

export const PRECO_SECAO_ADICIONAL = 50.00;

export const PRECOS_SECOES: Record<string, number> = {
  servicos: 150.00,
  sobre: 100.00,
  video: 120.00,
  mapa: 60.00,
  depoimentos: 90.00,
  galeria: 140.00,
  formulario: 110.00,
  blog: 160.00,
  faq: 70.00
};