export interface PersonalizacaoAsset {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  icon: string;
  alt: string;
}

export const PERSONALIZACAO_SECOES: PersonalizacaoAsset[] = [
  {
    id: 'servicos',
    nome: 'Seção de Serviços',
    descricao: 'Mostre seus serviços ou vantagens em cards claros e organizados.',
    imagem: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    icon: '⚙️',
    alt: 'Seção de serviços com ícones e descrições'
  },
  {
    id: 'sobre',
    nome: 'Seção Sobre Nós',
    descricao: 'Conte a história da sua empresa e gere mais confiança no cliente.',
    imagem: 'https://images.unsplash.com/photo-1520975913563-3401e7f9a90b?q=80&w=800&auto=format&fit=crop',
    icon: '👥',
    alt: 'Equipe ou histórico da empresa apresentado na seção sobre'
  },
  {
    id: 'video',
    nome: 'Seção com Vídeo',
    descricao: 'Inclua um vídeo institucional ou de apresentação do seu negócio.',
    imagem: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?q=80&w=800&auto=format&fit=crop',
    icon: '🎥',
    alt: 'Miniatura de vídeo para seção de conteúdo multimídia'
  },
  {
    id: 'mapa',
    nome: 'Seção com Mapa',
    descricao: 'Mostre sua localização e facilite o contato com clientes locais.',
    imagem: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
    icon: '🗺️',
    alt: 'Mapa com localização da empresa para a seção de contato'
  },
  {
    id: 'depoimentos',
    nome: 'Seção de Depoimentos',
    descricao: 'Exiba depoimentos de clientes satisfeitos e gere prova social.',
    imagem: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    icon: '💬',
    alt: 'Depoimentos de clientes com citações e avaliações'
  },
  {
    id: 'galeria',
    nome: 'Seção Galeria',
    descricao: 'Apresente portfólio, cases ou fotos dos seus projetos.',
    imagem: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?q=80&w=800&auto=format&fit=crop',
    icon: '🖼️',
    alt: 'Galeria de imagens ou portfólio do trabalho'
  },
  {
    id: 'formulario',
    nome: 'Seção de Contato',
    descricao: 'Formulário de contato ou orçamento para captar clientes.' ,
    imagem: 'https://images.unsplash.com/photo-1515521579348-a91aba62e1b7?q=80&w=800&auto=format&fit=crop',
    icon: '📋',
    alt: 'Seção de contato com formulário para orçamento'
  },
  {
    id: 'blog',
    nome: 'Seção Blog',
    descricao: 'Mostre artigos, notícias ou conteúdos relevantes para seu público.',
    imagem: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    icon: '📝',
    alt: 'Seção de blog com posts e artigos recentes'
  },
  {
    id: 'faq',
    nome: 'Seção FAQ',
    descricao: 'Responda dúvidas frequentes e reduza o atrito do cliente.',
    imagem: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    icon: '❓',
    alt: 'Seção de perguntas frequentes com respostas claras'
  }
];
