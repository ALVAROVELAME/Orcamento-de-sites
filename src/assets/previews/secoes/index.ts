import blogPreview from './blog.svg';
import capaPreview from './capa.svg';
import depoimentosPreview from './depoimentos.svg';
import faqPreview from './faq.svg';
import formularioPreview from './formulario.svg';
import galeriaPreview from './galeria.svg';
import mapaPreview from './mapa.svg';
import sobrePreview from './sobre.svg';
import servicosPreview from './servicos.svg';
import videoPreview from './video.svg';

export const PREVIEW_IMAGENS_SECOES = {
  CapaModel1: capaPreview,
  SobreModel1: sobrePreview,
  ServicosModel1: servicosPreview,
  ServicosModel2: servicosPreview,
  DepCarrossel: depoimentosPreview,
  DepGoogle: depoimentosPreview,
  DepTradicional: depoimentosPreview,
  FaqModel1: faqPreview,
  BlogModel1: blogPreview,
  FormularioModel1: formularioPreview,
  VideoModel1: videoPreview,
  MapaModel1: mapaPreview,
  GaleriaModel1: galeriaPreview
} as const;
