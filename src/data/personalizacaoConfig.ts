import type { PersonalizacaoAsset } from '../assets/personalizacaoAssets';
import { PERSONALIZACAO_SECOES } from '../assets/personalizacaoAssets';

export type SecaoSite = PersonalizacaoAsset;

export const SECOES_DISPONIVEIS: SecaoSite[] = PERSONALIZACAO_SECOES;

export const CORES_DISPONVEIS = [
  { id: 'azul', nome: 'Azul', valor: '#3B82F6' },
  { id: 'verde', nome: 'Verde', valor: '#10B981' },
  { id: 'vermelho', nome: 'Vermelho', valor: '#EF4444' },
  { id: 'roxo', nome: 'Roxo', valor: '#8B5CF6' },
  { id: 'rosa', nome: 'Rosa', valor: '#EC4899' },
  { id: 'laranja', nome: 'Laranja', valor: '#F97316' },
  { id: 'preto', nome: 'Preto', valor: '#1F2937' }
];

export interface DadosPersonalizacao {
  pacote: string;
  nomeEmpresa: string;
  descricaoEmpresa: string;
  secoes: string[];
  corPrincipal: string;
  observacoes: string;
  telefonePrincipal: string;
  emailPrincipal: string;
}
