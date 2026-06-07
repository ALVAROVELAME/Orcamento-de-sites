import type { ElementType } from 'react';
import type { Pacote, CategoriaSecao } from '../Formulario';

// =========================================================================
// IMPORTAÇÃO DOS SEUS COMPONENTES REAIS
// Caminho ajustado para '../sections/' pois estamos dentro de 'Etapas'
// =========================================================================
import { BlogModel1 } from '../sections/blog';
import { CarrosselAvaliacoes, DepoimentosGoogleMaps, DepoimentoTradicional } from '../sections/depoimentos';
import { FaqModel1 } from '../sections/faq';
import { FormularioModel1 } from '../sections/formulario';

export const PACOTES_DISPONIVEIS: Pacote[] = [
  {
    id: 'start',
    nome: 'Cartão Digital Start',
    preco: 'R$ 200,00',
    limiteSecoes: 3,
    limitePaginas: 1,
    detalhes: ['Até 3 seções', 'Página Única (Link na Bio)', 'Botão WhatsApp', 'Otimização PageSpeed']
  },
  {
    id: 'pro',
    nome: 'Cartão Digital Pro',
    preco: 'R$ 400,00',
    limiteSecoes: 6,
    limitePaginas: 1,
    detalhes: ['Até 6 seções', 'Página Única', 'Mapa Interativo', 'Integração de Depoimentos']
  },
  {
    id: 'inst-std',
    nome: 'Site Institucional Standard',
    preco: 'R$ 1.200,00',
    limiteSecoes: 'Ilimitado',
    limitePaginas: 3,
    detalhes: ['Seções Ilimitadas na Home', 'Até 3 Páginas Internas', 'Formulário Avançado', 'Design Exclusivo']
  }
];

export const BIBLIOTECA_SECOES: Record<CategoriaSecao, { id: string; nome: string; thumb: string }[]> = {
  capa: [{ id: 'CapaPlaceholder', nome: 'Capa Padrão (Em breve)', thumb: '🖼️' }],
  sobre: [{ id: 'SobrePlaceholder', nome: 'Sobre a Empresa (Em breve)', thumb: '🏢' }],
  servicos: [{ id: 'ServicosPlaceholder', nome: 'Grade de Serviços (Em breve)', thumb: '⚙️' }],
  depoimentos: [
    { id: 'DepCarrossel', nome: 'Carrossel de Avaliações', thumb: '🎠' },
    { id: 'DepGoogle', nome: 'Avaliações do Google', thumb: '🗺️' },
    { id: 'DepTradicional', nome: 'Depoimento em Destaque', thumb: '💬' },
  ],
  faq: [{ id: 'FaqModel1', nome: 'Perguntas Frequentes (FAQ)', thumb: '❓' }],
  blog: [{ id: 'BlogModel1', nome: 'Grid de Artigos do Blog', thumb: '📝' }],
  formulario: [{ id: 'FormularioModel1', nome: 'Formulário de Contato/Reserva', thumb: '✉️' }],
  video: [{ id: 'VideoPlaceholder', nome: 'Vídeo Institucional (Em breve)', thumb: '▶️' }],
  mapa: [{ id: 'MapaPlaceholder', nome: 'Localização (Em breve)', thumb: '📍' }],
  galeria: [{ id: 'GaleriaPlaceholder', nome: 'Galeria de Fotos (Em breve)', thumb: '📸' }]
};

export const RENDERIZADOR_COMPONENTES: Record<string, ElementType> = {
  DepCarrossel: CarrosselAvaliacoes,
  DepGoogle: DepoimentosGoogleMaps,
  DepTradicional: DepoimentoTradicional,
  FaqModel1: FaqModel1,
  BlogModel1: BlogModel1,
  FormularioModel1: FormularioModel1,
  CapaPlaceholder: () => <div className="w-full py-32 bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">Adicione o componente de Capa aqui</div>,
  SobrePlaceholder: () => <div className="w-full py-32 bg-white flex items-center justify-center text-2xl text-slate-500 border-b border-slate-100">Adicione o componente Sobre aqui</div>,
  ServicosPlaceholder: () => <div className="w-full py-32 bg-slate-50 flex items-center justify-center text-2xl text-slate-500 border-b border-slate-200">Adicione o componente Serviços aqui</div>,
  VideoPlaceholder: () => <div className="w-full py-32 bg-slate-900 text-white flex items-center justify-center text-2xl">Adicione o componente de Vídeo aqui</div>,
  MapaPlaceholder: () => <div className="w-full py-32 bg-white flex items-center justify-center text-2xl text-slate-500 border-b border-slate-100">Adicione o componente Mapa aqui</div>,
  GaleriaPlaceholder: () => <div className="w-full py-32 bg-slate-50 flex items-center justify-center text-2xl text-slate-500 border-b border-slate-200">Adicione o componente Galeria aqui</div>,
};