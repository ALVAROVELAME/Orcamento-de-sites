import { PREVIEW_IMAGENS_SECOES } from '../assets/previews/secoes';

export type TipoPreviewConstrutor = 'componente' | 'imagem';

export interface EntradaTextoCategoria<TCategoria extends string> {
  id: TCategoria;
  nome: string;
  descricao: string;
}

export interface EntradaPrecoCategoria<TCategoria extends string> {
  id: TCategoria;
  precoBase?: number;
}

export interface EntradaTextoModelo<TModelo extends string> {
  id: TModelo;
  nome: string;
  descricao?: string;
}

export interface EntradaPrecoModelo<TModelo extends string, TPacote extends string> {
  id: TModelo;
  valor: number;
  incluidoNosPacotes?: readonly TPacote[];
}

export interface EntradaVisualModelo<TModelo extends string> {
  id: TModelo;
  thumb: string;
  tipoPreview?: TipoPreviewConstrutor;
  alt?: string;
  imagemId?: keyof typeof PREVIEW_IMAGENS_SECOES;
}

export interface EntradaRelacaoCategoria<TCategoria extends string, TModelo extends string> {
  id: TCategoria;
  modelos: readonly TModelo[];
}

export interface EntradaTextoOpcao<TId extends string> {
  id: TId;
  titulo: string;
  descricao?: string;
}

export interface EntradaPrecoOpcao<TId extends string, TPacote extends string> {
  id: TId;
  preco?: number;
  destaque?: boolean;
  incluidoNosPacotes?: readonly TPacote[];
}

export interface OpcaoConstruida<TId extends string, TPacote extends string> {
  id: TId;
  titulo: string;
  descricao?: string;
  preco?: number;
  destaque?: boolean;
  incluidoNosPacotes?: readonly TPacote[];
}

export interface ModeloConstruido<TModelo extends string, TPacote extends string> {
  id: TModelo;
  nome: string;
  descricao?: string;
  thumb: string;
  preco?: number;
  incluidoNosPacotes?: readonly TPacote[];
  tipoPreview?: TipoPreviewConstrutor;
  previewImagemSrc?: string;
  previewImagemAlt?: string;
}

export interface CategoriaConstruida<TCategoria extends string, TModelo extends string, TPacote extends string> {
  id: TCategoria;
  nome: string;
  descricao: string;
  precoBase?: number;
  modelos: readonly ModeloConstruido<TModelo, TPacote>[];
}

export class GrupoCategorias<TCategoria extends string> {
  private textosLista: EntradaTextoCategoria<TCategoria>[] = [];
  private precosLista: EntradaPrecoCategoria<TCategoria>[] = [];

  textos(entradas: EntradaTextoCategoria<TCategoria>[]) {
    this.textosLista = entradas;
    return this;
  }

  precos(entradas: EntradaPrecoCategoria<TCategoria>[]) {
    this.precosLista = entradas;
    return this;
  }

  obterTextos() {
    return this.textosLista;
  }

  obterPrecos() {
    return this.precosLista;
  }
}

export class GrupoModelos<TModelo extends string, TPacote extends string> {
  private textosLista: EntradaTextoModelo<TModelo>[] = [];
  private precosLista: EntradaPrecoModelo<TModelo, TPacote>[] = [];
  private visualLista: EntradaVisualModelo<TModelo>[] = [];

  textos(entradas: EntradaTextoModelo<TModelo>[]) {
    this.textosLista = entradas;
    return this;
  }

  precos(entradas: EntradaPrecoModelo<TModelo, TPacote>[]) {
    this.precosLista = entradas;
    return this;
  }

  visual(entradas: EntradaVisualModelo<TModelo>[]) {
    this.visualLista = entradas;
    return this;
  }

  obterTextos() {
    return this.textosLista;
  }

  obterPrecos() {
    return this.precosLista;
  }

  obterVisual() {
    return this.visualLista;
  }
}

export class GrupoRelacao<TCategoria extends string, TModelo extends string> {
  private relacaoLista: EntradaRelacaoCategoria<TCategoria, TModelo>[] = [];

  relacao(entradas: EntradaRelacaoCategoria<TCategoria, TModelo>[]) {
    this.relacaoLista = entradas;
    return this;
  }

  obterRelacao() {
    return this.relacaoLista;
  }
}

export class GrupoOpcoes<TId extends string, TPacote extends string> {
  private textosLista: EntradaTextoOpcao<TId>[] = [];
  private precosLista: EntradaPrecoOpcao<TId, TPacote>[] = [];

  textos(entradas: EntradaTextoOpcao<TId>[]) {
    this.textosLista = entradas;
    return this;
  }

  precos(entradas: EntradaPrecoOpcao<TId, TPacote>[]) {
    this.precosLista = entradas;
    return this;
  }

  construir(): OpcaoConstruida<TId, TPacote>[] {
    const mapaPrecos = new Map(this.precosLista.map((entrada) => [entrada.id, entrada]));

    return this.textosLista.map((texto) => {
      const preco = mapaPrecos.get(texto.id);
      return {
        id: texto.id,
        titulo: texto.titulo,
        descricao: texto.descricao,
        preco: preco?.preco,
        destaque: preco?.destaque,
        incluidoNosPacotes: preco?.incluidoNosPacotes
      };
    });
  }
}

export function criarGrupoCategorias<TCategoria extends string>() {
  return new GrupoCategorias<TCategoria>();
}

export function criarGrupoModelos<TModelo extends string, TPacote extends string>() {
  return new GrupoModelos<TModelo, TPacote>();
}

export function criarGrupoRelacao<TCategoria extends string, TModelo extends string>() {
  return new GrupoRelacao<TCategoria, TModelo>();
}

export function criarGrupoOpcoes<TId extends string, TPacote extends string>() {
  return new GrupoOpcoes<TId, TPacote>();
}

interface FontesCatalogoSecoes<TCategoria extends string, TModelo extends string, TPacote extends string> {
  categorias: GrupoCategorias<TCategoria>;
  modelos: GrupoModelos<TModelo, TPacote>;
  relacao: GrupoRelacao<TCategoria, TModelo>;
}

export class ConstrutorSecoes<TCategoria extends string, TModelo extends string, TPacote extends string> {
  private readonly categorias: GrupoCategorias<TCategoria>;
  private readonly modelos: GrupoModelos<TModelo, TPacote>;
  private readonly relacao: GrupoRelacao<TCategoria, TModelo>;

  constructor(fontes: FontesCatalogoSecoes<TCategoria, TModelo, TPacote>) {
    this.categorias = fontes.categorias;
    this.modelos = fontes.modelos;
    this.relacao = fontes.relacao;
  }

  construir(): Record<TCategoria, CategoriaConstruida<TCategoria, TModelo, TPacote>> {
    const mapaTextoCategoria = new Map(this.categorias.obterTextos().map((entrada) => [entrada.id, entrada]));
    const mapaPrecoCategoria = new Map(this.categorias.obterPrecos().map((entrada) => [entrada.id, entrada]));
    const mapaTextoModelo = new Map(this.modelos.obterTextos().map((entrada) => [entrada.id, entrada]));
    const mapaPrecoModelo = new Map(this.modelos.obterPrecos().map((entrada) => [entrada.id, entrada]));
    const mapaVisualModelo = new Map(this.modelos.obterVisual().map((entrada) => [entrada.id, entrada]));

    return this.relacao.obterRelacao().reduce<Record<TCategoria, CategoriaConstruida<TCategoria, TModelo, TPacote>>>((acc, entradaRelacao) => {
      const textoCategoria = mapaTextoCategoria.get(entradaRelacao.id);
      if (!textoCategoria) {
        throw new Error(`Textos nao definidos para a categoria "${entradaRelacao.id}".`);
      }

      acc[entradaRelacao.id] = {
        id: entradaRelacao.id,
        nome: textoCategoria.nome,
        descricao: textoCategoria.descricao,
        precoBase: mapaPrecoCategoria.get(entradaRelacao.id)?.precoBase,
        modelos: entradaRelacao.modelos.map((modeloId) => {
          const textoModelo = mapaTextoModelo.get(modeloId);
          const precoModelo = mapaPrecoModelo.get(modeloId);
          const visualModelo = mapaVisualModelo.get(modeloId);

          if (!textoModelo) throw new Error(`Textos nao definidos para o modelo "${modeloId}".`);
          if (!precoModelo) throw new Error(`Precos nao definidos para o modelo "${modeloId}".`);
          if (!visualModelo) throw new Error(`Visual nao definido para o modelo "${modeloId}".`);

          return {
            id: modeloId,
            nome: textoModelo.nome,
            descricao: textoModelo.descricao,
            thumb: visualModelo.thumb,
            preco: precoModelo.valor,
            incluidoNosPacotes: precoModelo.incluidoNosPacotes,
            ...resolverPreviewVisual(textoModelo.nome, visualModelo)
          };
        })
      };

      return acc;
    }, {} as Record<TCategoria, CategoriaConstruida<TCategoria, TModelo, TPacote>>);
  }
}

function resolverPreviewVisual<TModelo extends string>(nomeModelo: string, visual: EntradaVisualModelo<TModelo>) {
  if (!visual.tipoPreview || visual.tipoPreview === 'componente') {
    return {
      tipoPreview: 'componente' as const
    };
  }

  if (!visual.imagemId) {
    throw new Error(`O modelo "${nomeModelo}" esta marcado como "imagem" mas nao informou imagemId.`);
  }

  const previewImagemSrc = PREVIEW_IMAGENS_SECOES[visual.imagemId];
  if (!previewImagemSrc) {
    throw new Error(`Nenhuma imagem de preview encontrada para "${nomeModelo}" (imagemId: "${visual.imagemId}").`);
  }

  return {
    tipoPreview: 'imagem' as const,
    previewImagemSrc,
    previewImagemAlt: visual.alt ?? nomeModelo
  };
}
