import type { ElementType } from 'react';
import { CATALOGO_SECOES, LISTA_CATEGORIAS_SECOES, type CategoriaSecao, type ModeloSecaoId, type ModeloSecaoPreview } from '../../data/precos';
import { BlogModel1 } from '../sections/blog';
import { CapaModel1 } from '../sections/capa';
import { CarrosselAvaliacoes } from '../sections/depoimentos';
import { FaqModel1 } from '../sections/faq';
import { FormularioModel1 } from '../sections/formulario';
import { GaleriaModel1 } from '../sections/galeria';
import { ServicosModel1 } from '../sections/servicos';
import { SobreModel1 } from '../sections/sobre';
import { VideoModel1 } from '../sections/video';

export const RENDERIZADOR_COMPONENTES: Partial<Record<ModeloSecaoId, ElementType>> = {
  CapaModel1,
  SobreModel1,
  ServicosModel1,
  DepCarrossel: CarrosselAvaliacoes,
  FaqModel1,
  BlogModel1,
  FormularioModel1,
  VideoModel1,
  GaleriaModel1
};

export const BIBLIOTECA_SECOES: Record<CategoriaSecao, ModeloSecaoPreview[]> =
  LISTA_CATEGORIAS_SECOES.reduce((acc, categoria) => {
    acc[categoria] = CATALOGO_SECOES[categoria].modelos.map((modelo) => ({
      id: modelo.id,
      nome: modelo.nome,
      descricao: modelo.descricao ?? CATALOGO_SECOES[categoria].descricao,
      thumb: modelo.thumb,
      tipoPreview: modelo.tipoPreview,
      previewImagemSrc: modelo.previewImagemSrc,
      previewImagemAlt: modelo.previewImagemAlt,
      preco: modelo.preco,
      incluidoNosPacotes: modelo.incluidoNosPacotes
    }));
    return acc;
  }, {} as Record<CategoriaSecao, ModeloSecaoPreview[]>);
