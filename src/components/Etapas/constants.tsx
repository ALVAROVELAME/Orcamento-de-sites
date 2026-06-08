import type { ElementType } from 'react';
import type { Pacote, CategoriaSecao } from '../Formulario';

// =========================================================================
// IMPORTAÇÕES
// =========================================================================
import { BlogModel1 } from '../sections/blog';
import { CarrosselAvaliacoes, DepoimentosGoogleMaps, DepoimentoTradicional } from '../sections/depoimentos';
import { FaqModel1 } from '../sections/faq';
import { FormularioModel1 } from '../sections/formulario';
import { MapaModel1 } from '../sections/mapa';
import { GaleriaModel1 } from '../sections/galeria';
import { ServicosModel1 , ServicosModel2 } from '../sections/servicos';
import { SobreModel1 } from '../sections/sobre';
import { VideoModel1 } from '../sections/video';


// =========================================================================
// PARTE 1: CLASSES (Ajustadas para respeitar o erasableSyntaxOnly)
// =========================================================================

class ObjetoPacote implements Pacote {
  id: string;
  nome: string;
  preco: string;
  limiteSecoes: number | 'Ilimitado';
  limitePaginas: number;
  detalhes: string[];

  constructor(
    id: string,
    nome: string,
    preco: string,
    limiteSecoes: number | 'Ilimitado',
    limitePaginas: number,
    detalhes: string[]
  ) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.limiteSecoes = limiteSecoes;
    this.limitePaginas = limitePaginas;
    this.detalhes = detalhes;
  }
}

class ObjetoSecao {
  id: string;
  nome: string;
  thumb: string;
  componente: ElementType;

  constructor(
    id: string,
    nome: string,
    thumb: string,
    componente: ElementType
  ) {
    this.id = id;
    this.nome = nome;
    this.thumb = thumb;
    this.componente = componente;
  }
}


// =========================================================================
// PARTE 2: OBJETOS DOS PACOTES
// =========================================================================

const pacoteStart = new ObjetoPacote(
  'start', 
  'Cartão Digital Start', 
  'R$ 200,00', 
  3, 
  1, 
  ['Até 3 seções', 'Página Única (Link na Bio)', 'Botão WhatsApp', 'Otimização PageSpeed']
);

const pacotePro = new ObjetoPacote(
  'pro', 
  'Cartão Digital Pro', 
  'R$ 400,00', 
  6, 
  1, 
  ['Até 6 seções', 'Página Única', 'Mapa Interativo', 'Integração de Depoimentos']
);

const pacoteInst = new ObjetoPacote(
  'inst-std', 
  'Site Institucional Standard', 
  'R$ 1.200,00', 
  'Ilimitado', 
  3, 
  ['Seções Ilimitadas na Home', 'Até 3 Páginas Internas', 'Formulário Avançado', 'Design Exclusivo']
);


// =========================================================================
// PARTE 3: OBJETOS DAS SEÇÕES
// =========================================================================

// Capa
const capaPadrao = new ObjetoSecao('CapaPlaceholder', 'Capa Padrão (Em breve)', '🖼️', () => <div className="w-full py-32 bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">Adicione o componente de Capa aqui</div>);

// Sobre
const sobreEmpresa = new ObjetoSecao('SobreModel1', 'Sobre a Empresa', '🏢', SobreModel1);

// Serviços
const servicosModel1 = new ObjetoSecao('ServicosModel1', 'Serviços - Modelo 1', '⚙️', ServicosModel1);
const servicosModel2 = new ObjetoSecao('ServicosModel2', 'Serviços - Modelo 2', '⚙️', ServicosModel2);

// Depoimentos
const depCarrossel = new ObjetoSecao('DepCarrossel', 'Carrossel de Avaliações', '🎠', CarrosselAvaliacoes);
const depGoogle = new ObjetoSecao('DepGoogle', 'Avaliações do Google', '🗺️', DepoimentosGoogleMaps);
const depTradicional = new ObjetoSecao('DepTradicional', 'Depoimento em Destaque', '💬', DepoimentoTradicional);

// FAQ
const faqModel1 = new ObjetoSecao('FaqModel1', 'Perguntas Frequentes (FAQ)', '❓', FaqModel1);

// Blog
const blogModel1 = new ObjetoSecao('BlogModel1', 'Grid de Artigos do Blog', '📝', BlogModel1);

// Formulário
const formModel1 = new ObjetoSecao('FormularioModel1', 'Formulário de Contato/Reserva', '✉️', FormularioModel1);

// Vídeo
const videoInst = new ObjetoSecao('VideoModel1', 'Vídeo Institucional', '▶️', VideoModel1);

// Mapa
const mapaLocal = new ObjetoSecao('MapaModel1', 'Localização', '📍', MapaModel1);

// Galeria
const galeriaFotos = new ObjetoSecao('GaleriaModel1', 'Galeria de Fotos', '📸', GaleriaModel1);


// =========================================================================
// PARTE 4: AGRUPAMENTO E EXPORTAÇÃO
// =========================================================================

export const PACOTES_DISPONIVEIS: Pacote[] = [pacoteStart, pacotePro, pacoteInst];

const visual = (obj: ObjetoSecao) => ({ id: obj.id, nome: obj.nome, thumb: obj.thumb });

export const BIBLIOTECA_SECOES: Record<CategoriaSecao, { id: string; nome: string; thumb: string }[]> = {
  capa: [visual(capaPadrao)],
  sobre: [visual(sobreEmpresa)],
  servicos: [visual(servicosModel1), visual(servicosModel2)],
  depoimentos: [visual(depCarrossel), visual(depGoogle), visual(depTradicional)],
  faq: [visual(faqModel1)],
  blog: [visual(blogModel1)],
  formulario: [visual(formModel1)],
  video: [visual(videoInst)],
  mapa: [visual(mapaLocal)],
  galeria: [visual(galeriaFotos)]
};

export const RENDERIZADOR_COMPONENTES: Record<string, ElementType> = {
  [capaPadrao.id]: capaPadrao.componente,
  [sobreEmpresa.id]: sobreEmpresa.componente,
  [servicosModel1.id]: servicosModel1.componente,
  [servicosModel2.id]: servicosModel2.componente,
  [depCarrossel.id]: depCarrossel.componente,
  [depGoogle.id]: depGoogle.componente,
  [depTradicional.id]: depTradicional.componente,
  [faqModel1.id]: faqModel1.componente,
  [blogModel1.id]: blogModel1.componente,
  [formModel1.id]: formModel1.componente,
  [videoInst.id]: videoInst.componente,
  [mapaLocal.id]: mapaLocal.componente,
  [galeriaFotos.id]: galeriaFotos.componente,
};