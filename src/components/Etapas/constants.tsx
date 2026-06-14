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

// Interface interna do motor visual para controle das opções de blocos
interface InterfaceObjetoSecao {
  id: string;
  nome: string;
  thumb: string;
  componente: ElementType;
}

// =========================================================================
// INSTÂNCIAS DE COMPONENTES DAS SEÇÕES
// =========================================================================
const secoesEspecificas: Record<string, InterfaceObjetoSecao> = {
  capaPadrao: { id: 'CapaPlaceholder', nome: 'Capa Padrão (Em breve)', thumb: '🖼️', componente: () => <div className="w-full py-32 bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">Adicione o componente de Capa aqui</div> },
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
};

// Helper simples para formatar a saída sem precisar de classes complexas
const extrairDadosVisuais = (secao: InterfaceObjetoSecao) => ({ 
  id: secao.id, 
  nome: secao.nome, 
  thumb: secao.thumb 
});

// =========================================================================
// BIBLIOTECA DA LISTA LATERAL (CONSTRUTOR ETAPA 3)
// =========================================================================
export const BIBLIOTECA_SECOES: Record<CategoriaSecao, { id: string; nome: string; thumb: string }[]> = {
  capa: [extrairDadosVisuais(secoesEspecificas.capaPadrao)],
  sobre: [extrairDadosVisuais(secoesEspecificas.sobreEmpresa)],
  servicos: [extrairDadosVisuais(secoesEspecificas.servicosModel1), extrairDadosVisuais(secoesEspecificas.servicosModel2)],
  depoimentos: [extrairDadosVisuais(secoesEspecificas.depCarrossel), extrairDadosVisuais(secoesEspecificas.depGoogle), extrairDadosVisuais(secoesEspecificas.depTradicional)],
  faq: [extrairDadosVisuais(secoesEspecificas.faqModel1)],
  blog: [extrairDadosVisuais(secoesEspecificas.blogModel1)],
  formulario: [extrairDadosVisuais(secoesEspecificas.formModel1)],
  video: [extrairDadosVisuais(secoesEspecificas.videoInst)],
  mapa: [extrairDadosVisuais(secoesEspecificas.mapaLocal)],
  galeria: [extrairDadosVisuais(secoesEspecificas.galeriaFotos)]
};

// =========================================================================
// DICIONÁRIO RENDERIZADOR (CONSTRUTOR ETAPA 3)
// =========================================================================
export const RENDERIZADOR_COMPONENTES: Record<string, ElementType> = Object.values(secoesEspecificas).reduce((acc, secao) => {
  acc[secao.id] = secao.componente;
  return acc;
}, {} as Record<string, ElementType>);