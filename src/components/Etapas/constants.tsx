// src/components/Etapas/constants.ts
import type { ElementType } from 'react';
import type { CategoriaSecao } from '../Formulario';

// Importações dos seus Componentes Visuais
import { BlogModel1 } from '../sections/blog';
import { CarrosselAvaliacoes, DepoimentosGoogleMaps, DepoimentoTradicional } from '../sections/depoimentos';
import { FaqModel1 } from '../sections/faq';
import { FormularioModel1 } from '../sections/formulario';
import { MapaModel1 } from '../sections/mapa';
import { GaleriaModel1 } from '../sections/galeria';
import { ServicosModel1 , ServicosModel2 } from '../sections/servicos';
import { SobreModel1 } from '../sections/sobre';
import { VideoModel1 } from '../sections/video';
import { CapaModel1 } from '../sections/capa';
// =========================================================================
// REGISTRO ÚNICO DOS MODELOS
// =========================================================================
const MODELOS_SECOES = {
  capaModel1: { id: 'CapaModel1', nome: 'Capa com Destaque', thumb: '🖼️', componente: CapaModel1 },
  sobreEmpresa: { id: 'SobreModel1', nome: 'Sobre a Empresa', thumb: '🏢', componente: SobreModel1 },
  servicosModel1: { id: 'ServicosModel1', nome: 'Serviços - Modelo 1', thumb: '⚙️', componente: ServicosModel1 },
  servicosModel2: { id: 'ServicosModel2', nome: 'Serviços - Modelo 2', thumb: '⚙️', componente: ServicosModel2 },
  depCarrossel: { id: 'DepCarrossel', nome: 'Carrossel de Avaliações', thumb: '🎠', componente: CarrosselAvaliacoes },
  depGoogle: { id: 'DepGoogle', nome: 'Avaliações do Google', thumb: '🗺️', componente: DepoimentosGoogleMaps },
  depTradicional: { id: 'DepTradicional', nome: 'Depoimento em Destaque', thumb: '💬', componente: DepoimentoTradicional },
  faqModel1: { id: 'FaqModel1', nome: 'Perguntas Frequentes (FAQ)', thumb: '❓', componente: FaqModel1 },
  blogModel1: { id: 'BlogModel1', nome: 'Grid de Artigos do Blog', thumb: '📝', componente: BlogModel1 },
  formModel1: { id: 'FormularioModel1', nome: 'Formulário de Contato/Reserva', thumb: '✉️', componente: FormularioModel1 },
  videoInst: { id: 'VideoModel1', nome: 'Vídeo Institucional', thumb: '▶️', componente: VideoModel1 },
  mapaLocal: { id: 'MapaModel1', nome: 'Localização', thumb: '📍', componente: MapaModel1 },
  galeriaFotos: { id: 'GaleriaModel1', nome: 'Galeria de Fotos', thumb: '📸', componente: GaleriaModel1 },
} as const;

type ModeloSecao = (typeof MODELOS_SECOES)[keyof typeof MODELOS_SECOES];
const toPreviewItem = ({ id, nome, thumb }: ModeloSecao) => ({ id, nome, thumb });

// =========================================================================
// BIBLIOTECA DA LISTA LATERAL (CONSTRUTOR ETAPA 3)
// =========================================================================
export const BIBLIOTECA_SECOES: Record<CategoriaSecao, { id: string; nome: string; thumb: string }[]> = {
  capa: [toPreviewItem(MODELOS_SECOES.capaModel1)],
  sobre: [toPreviewItem(MODELOS_SECOES.sobreEmpresa)],
  servicos: [toPreviewItem(MODELOS_SECOES.servicosModel1), toPreviewItem(MODELOS_SECOES.servicosModel2)],
  depoimentos: [toPreviewItem(MODELOS_SECOES.depCarrossel), toPreviewItem(MODELOS_SECOES.depGoogle), toPreviewItem(MODELOS_SECOES.depTradicional)],
  faq: [toPreviewItem(MODELOS_SECOES.faqModel1)],
  blog: [toPreviewItem(MODELOS_SECOES.blogModel1)],
  formulario: [toPreviewItem(MODELOS_SECOES.formModel1)],
  video: [toPreviewItem(MODELOS_SECOES.videoInst)],
  mapa: [toPreviewItem(MODELOS_SECOES.mapaLocal)],
  galeria: [toPreviewItem(MODELOS_SECOES.galeriaFotos)],
};

// =========================================================================
// DICIONÁRIO RENDERIZADOR (CONSTRUTOR ETAPA 3)
// =========================================================================
export const RENDERIZADOR_COMPONENTES: Record<string, ElementType> = Object.values(MODELOS_SECOES).reduce((acc, secao) => {
  acc[secao.id] = secao.componente;
  return acc;
}, {} as Record<string, ElementType>);
