import {
  ECOMMERCE_EXTRAS_OPCOES,
  ESTILOS_MARCA_OPCOES,
  EXTRAS_INTEGRACOES_OPCOES,
  PAGINAS_EXTRAS_OPCOES,
  STATUS_LOGO_OPCOES
} from './precos';
import type { InfoSite } from './tipos';

const ACAO_ABRIR_PREVIA = {
  textoAcaoAntesImagem: 'Clique no Botão ',
  imagemAcaoSrc: '/mais.webp',
  imagemAcaoAlt: 'Simbolo de mais para abrir a previa',
  textoAcaoDepoisImagem: 'ou na opcao desejada.'
} as const;

const ACAO_ABRIR_DETALHES = {
  ...ACAO_ABRIR_PREVIA,
  imagemAcaoAlt: 'Simbolo de mais para abrir os detalhes'
} as const;

export const FORMULARIO_CONFIG = {
  etapa1: {
    titulo: 'Escolha seu plano',
    descricao: 'Secoes sao blocos dentro do site. Paginas sao telas separadas, como Contato ou Sobre Nos.',
    descricaoExtra: 'Escolha um dos 3 pacotes pra começar',
    textoBotaoSelecionar: 'Escolher plano',
    prefixoLimiteSecoes: 'Este plano inclui:',
    sufixoLimiteSecoes: 'secoes principais'
  },
  etapa2: {
    titulo: 'Identidade Visual',
    descricao: 'Agora preencha as informacoes principais da sua marca para montarmos seu site do seu jeito.',
    campoNome: {
      rotulo: 'Nome do site ou da empresa',
      placeholder: 'Ex: Tech Solucoes'
    },
    hospedagemDominio: {
      titulo: 'Hospedagem e dominio *',
      descricao: 'Informe se voce ja tem hospedagem e dominio. Se ainda nao tiver, podemos incluir isso no seu orcamento.',
      descricaoAbaixoOpcoes: '"Hospedagem e dominio são o endereco e o lugar do seu site na internet."',
      opcoes: [
        { id: 'tem', titulo: 'Ja tenho hospedagem e dominio' },
        { id: 'nao_tem', titulo: 'Ainda nao tenho e quero incluir no orcamento' }
      ]
    },
    logotipo: {
      titulo: 'Sobre o logotipo *',
      opcoes: STATUS_LOGO_OPCOES,
      idQueLiberaDetalhes: 'logo_criacao'
    },
    criacaoLogo: {
      titulo: 'Como voce quer que sua marca seja vista pelas pessoas?',
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
      descricao: 'Escolha os blocos de conteudo que farao parte da estrutura do seu site.',
      ...ACAO_ABRIR_PREVIA,
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
    titulo: 'Paginas adicionais',
    descricao: 'Escolha as paginas extras que voce quer adicionar ao seu site.',
    ...ACAO_ABRIR_DETALHES,
    contadorSelecionadas: 'selecionadas',
    textoProximo: 'Continuar',
    opcoes: PAGINAS_EXTRAS_OPCOES
  },
  etapa5: {
    titulo: 'Extras e integracoes',
    descricao: 'Escolha recursos extras para deixar seu site mais completo e mais util para seus clientes.',
    ...ACAO_ABRIR_DETALHES,
    opcoes: EXTRAS_INTEGRACOES_OPCOES,
    textoProximoPadrao: 'Concluir projeto',
    textoProximoEcommerce: 'Continuar'
  },
  etapa6: {
    titulo: 'Configuracoes da loja virtual',
    descricao: 'Escolha como sua loja virtual vai funcionar para vender seus produtos pela internet.',
    ...ACAO_ABRIR_DETALHES,
    opcoes: ECOMMERCE_EXTRAS_OPCOES,
    textoProximo: 'Finalizar e enviar projeto'
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
