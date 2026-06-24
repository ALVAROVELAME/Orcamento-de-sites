import {
  ECOMMERCE_EXTRAS_OPCOES,
  ESTILOS_MARCA_OPCOES,
  EXTRAS_INTEGRACOES_OPCOES,
  PAGINAS_EXTRAS_OPCOES,
  STATUS_LOGO_OPCOES
} from './precos';
import type { InfoSite } from './tipos';

export const FORMULARIO_CONFIG = {
  etapa1: {
    titulo: 'Escolha o plano ideal',
    descricao: 'Selecione o pacote que melhor atende ao seu projeto para liberarmos as secoes no construtor.',
    textoBotaoSelecionar: 'Selecionar',
    prefixoLimiteSecoes: 'Limite:',
    sufixoLimiteSecoes: 'secoes basicas'
  },
  etapa2: {
    titulo: 'Identidade Visual',
    descricao: 'Defina o nome da marca, as cores base e as preferencias visuais do seu novo site.',
    campoNome: {
      rotulo: 'Nome do Site / Empresa',
      placeholder: 'Ex: Tech Solucoes'
    },
    hospedagemDominio: {
      titulo: 'Hospedagem e Dominio *',
      descricao: 'Informe se voce ja possui hospedagem e dominio. Caso nao tenha, adicionaremos o custo de configuracao/contratacao no orcamento para que o site possa ser publicado.',
      opcoes: [
        { id: 'tem', titulo: 'Ja tenho hospedagem e dominio' },
        { id: 'nao_tem', titulo: 'Nao tenho, quero incluir hospedagem/dominio no orcamento' }
      ]
    },
    logotipo: {
      titulo: 'Sobre o Logotipo *',
      opcoes: STATUS_LOGO_OPCOES,
      idQueLiberaDetalhes: 'logo_criacao'
    },
    criacaoLogo: {
      titulo: 'Como voce quer que a marca seja percebida?',
      opcoes: ESTILOS_MARCA_OPCOES
    },
    paletaCores: {
      // Paleta de cores desativada temporariamente para uso futuro.
      titulo: '',
      quantidade: 0,
      corPadrao: '#ffffff'
    }
  },
  etapa3: {
    selecaoInicial: {
      titulo: 'Selecione as secoes desejadas',
      descricao: 'Escolha os blocos de conteudo que farao parte da estrutura do seu site. Clique para ver uma previa de cada categoria.',
      contadorSelecionadas: 'selecionadas'
    },
    escolhaModelos: {
      prefixoTitulo: 'Defina o estilo para:'
    },
    resumo: {
      titulo: 'Estrutura Final do Site',
      prefixoProjeto: 'Projeto customizado para:',
      textoBotaoRemover: 'Remover',
      textoVisualizacaoIndisponivel: 'Visualizacao nao disponivel.'
    },
    avisoLimite: {
      titulo: 'Limite do pacote atingido',
      descricao: 'Seu pacote permite apenas {limite} secoes contando a capa garantida. Para adicionar mais opcoes, voce precisara alterar o plano escolhido.'
    },
    avisoSecoesRestantes: {
      titulo: 'Voce ainda pode usar mais secoes'
    },
    textoPreviewIndisponivel: 'Previa indisponivel',
    textoModeloIndisponivel: 'Modelo indisponivel'
  },
  etapa4: {
    titulo: 'Paginas Adicionais',
    descricao: 'Selecione quais paginas extras voce deseja incluir no seu projeto. Clique no + para ler os detalhes de cada uma.',
    contadorSelecionadas: 'selecionadas',
    textoProximo: 'Proximo passo',
    opcoes: PAGINAS_EXTRAS_OPCOES
  },
  etapa5: {
    titulo: 'Extras e Integracoes',
    descricao: 'Selecione funcionalidades adicionais para potencializar o seu site.',
    opcoes: EXTRAS_INTEGRACOES_OPCOES,
    textoProximoPadrao: 'Concluir Projeto',
    textoProximoEcommerce: 'Proximo Passo'
  },
  etapa6: {
    titulo: 'Configuracoes de E-commerce',
    descricao: 'Personalize as funcionalidades da sua loja virtual para vender online.',
    opcoes: ECOMMERCE_EXTRAS_OPCOES,
    textoProximo: 'Finalizar e Enviar Projeto'
  }
} as const;

export const INFO_SITE_INICIAL: InfoSite = {
  nome: '',
  cores: ['#2563eb', '#1e40af', '#ffffff'],
  status_logo: '',
  estilo_marca: [],
  paginas_extras: [],
  extras_integracoes: [],
  ecommerce_extras: [],
  tem_hospedagem_dominio: true
};
