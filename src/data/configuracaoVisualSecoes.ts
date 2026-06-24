import type { EntradaVisualModelo } from './construtoresSecoes';
import type { ModeloSecaoId } from './tipos';

export const CATALOGO_VISUAL_MODELOS: EntradaVisualModelo<ModeloSecaoId>[] = [
  { id: 'CapaModel1', thumb: '🖼️', tipoPreview: 'imagem', alt: 'Preview em imagem da secao de capa', imagemId: 'CapaModel1' },
  { id: 'SobreModel1', thumb: '🏢', tipoPreview: 'imagem', alt: 'Preview em imagem da secao sobre a empresa', imagemId: 'SobreModel1' },
  { id: 'ServicosModel1', thumb: '⚙️', tipoPreview: 'imagem', alt: 'Preview em imagem do modelo 1 da secao de servicos', imagemId: 'ServicosModel1' },
  { id: 'ServicosModel2', thumb: '⚙️', tipoPreview: 'imagem', alt: 'Preview em imagem do modelo 2 da secao de servicos', imagemId: 'ServicosModel2' },
  { id: 'DepCarrossel', thumb: '🎠', tipoPreview: 'imagem', alt: 'Preview em imagem do carrossel de avaliacoes', imagemId: 'DepCarrossel' },
  { id: 'DepGoogle', thumb: '🗺️', tipoPreview: 'imagem', alt: 'Preview em imagem das avaliacoes do Google', imagemId: 'DepGoogle' },
  { id: 'DepTradicional', thumb: '💬', tipoPreview: 'imagem', alt: 'Preview em imagem do depoimento em destaque', imagemId: 'DepTradicional' },
  { id: 'FaqModel1', thumb: '❓', tipoPreview: 'imagem', alt: 'Preview em imagem da secao de perguntas frequentes', imagemId: 'FaqModel1' },
  { id: 'BlogModel1', thumb: '📝', tipoPreview: 'imagem', alt: 'Preview em imagem da secao de blog', imagemId: 'BlogModel1' },
  { id: 'FormularioModel1', thumb: '✉️', tipoPreview: 'imagem', alt: 'Preview em imagem do formulario de contato ou reserva', imagemId: 'FormularioModel1' },
  { id: 'VideoModel1', thumb: '▶️', tipoPreview: 'imagem', alt: 'Preview em imagem da secao de video institucional', imagemId: 'VideoModel1' },
  { id: 'MapaModel1', thumb: '📍', tipoPreview: 'imagem', alt: 'Preview em imagem da secao de mapa', imagemId: 'MapaModel1' },
  { id: 'GaleriaModel1', thumb: '📸', tipoPreview: 'imagem', alt: 'Preview em imagem da secao de galeria', imagemId: 'GaleriaModel1' }
];
