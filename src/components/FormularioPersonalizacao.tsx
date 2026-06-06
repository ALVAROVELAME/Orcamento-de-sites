import { useState } from 'react';
import type { DadosPersonalizacao } from '../data/personalizacaoConfig';
import { SECOES_DISPONIVEIS, CORES_DISPONVEIS } from '../data/personalizacaoConfig';
import { LivePreviewAccordion } from './TiraPreview/LivePreviewAccordion';
import { gerarMensagemPersonalizacao } from '../utils/whatsappService';
import { getWhatsappLink } from '../data/config';

type Etapa = 'pacotes' | 'inicial' | 'secoes' | 'personalizacao' | 'confirmacao';

const PACOTES_DISPONIVEIS = [
  { id: 'cartao_3', nome: 'Cartão Digital (3 Seções)', desc: 'Ideal para contatos rápidos e links úteis.', icone: '📱' },
  { id: 'cartao_6', nome: 'Cartão Digital (6 Seções)', desc: 'Mais completo, perfeito para portfólio inicial.', icone: '📇' },
  { id: 'site_inst_1', nome: 'Site Institucional Básico', desc: 'Presença online profissional padrão.', icone: '🏢' },
  { id: 'site_inst_2', nome: 'Site Institucional Completo', desc: 'Com blog e áreas dinâmicas.', icone: '🌐' },
  { id: 'loja_virtual', nome: 'Loja Virtual Pequena', desc: 'Comece a vender seus produtos online.', icone: '🛍️' }
];

export function FormularioPersonalizacao() {
  const [etapaAtual, setEtapaAtual] = useState<Etapa>('pacotes');
  const [secoesSelecionadas, setSecoesSelecionadas] = useState<string[]>([]);
  const [corSelecionada, setCorSelecionada] = useState('azul');
  const [secaoAtiva, setSecaoAtiva] = useState<string>(SECOES_DISPONIVEIS[0]?.id ?? '');  

  const [dados, setDados] = useState<DadosPersonalizacao>({
    pacote: '',
    nomeEmpresa: '',
    descricaoEmpresa: '',
    secoes: [],
    corPrincipal: 'azul',
    observacoes: '',
    telefonePrincipal: '',
    emailPrincipal: ''
  });

  const [enviando, setEnviando] = useState(false);

  const secoesAgrupadas = SECOES_DISPONIVEIS.map(secao => ({
    ...secao,
    quantidade: secoesSelecionadas.filter(id => id === secao.id).length
  })).filter(s => s.quantidade > 0);

  const calcularProgresso = () => {
    switch (etapaAtual) {
      case 'pacotes': return 20;
      case 'inicial': return 40;
      case 'secoes': return 60;
      case 'personalizacao': return 80;
      case 'confirmacao': return 100;
      default: return 0;
    }
  };

  const getNumeroPasso = () => {
    switch (etapaAtual) {
      case 'pacotes': return '1';
      case 'inicial': return '2';
      case 'secoes': return '3';
      case 'personalizacao': return '4';
      case 'confirmacao': return '5';
      default: return '1';
    }
  };

  const handleAdicionarSecao = (secaoId: string) => {
    setSecoesSelecionadas(prev => {
      const novaSelecao = [...prev, secaoId];
      setDados(dadosPrev => ({ ...dadosPrev, secoes: novaSelecao }));
      return novaSelecao;
    });
    setSecaoAtiva(secaoId);
  };

  const handleRemoverSecao = (secaoId: string) => {
    setSecoesSelecionadas(prev => {
      const index = prev.lastIndexOf(secaoId);
      if (index === -1) return prev;
      const novaSelecao = [...prev];
      novaSelecao.splice(index, 1);
      setDados(dadosPrev => ({ ...dadosPrev, secoes: novaSelecao }));
      return novaSelecao;
    });
  };

  const handleToggleSecao = (secaoId: string) => {
    const quantidade = secoesSelecionadas.filter(id => id === secaoId).length;
    if (quantidade > 0) {
      handleRemoverSecao(secaoId);
    } else {
      handleAdicionarSecao(secaoId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDados(prev => ({ ...prev, [name]: value }));
  };

  const handleAvancar = () => {
    if (etapaAtual === 'pacotes') {
      if (!dados.pacote) {
        alert('Selecione um pacote para continuar.');
        return;
      }
      setEtapaAtual('inicial');
    } else if (etapaAtual === 'inicial') {
      if (!dados.nomeEmpresa.trim() || !dados.descricaoEmpresa.trim()) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }
      setDados(prev => ({ ...prev, corPrincipal: corSelecionada }));
      setEtapaAtual('secoes');
    } else if (etapaAtual === 'secoes') {
      if (secoesSelecionadas.length === 0) {
        alert('Selecione pelo menos uma seção para continuar.');
        return;
      }
      setEtapaAtual('personalizacao');
    } else if (etapaAtual === 'personalizacao') {
      if (!dados.telefonePrincipal.trim() || !dados.emailPrincipal.trim()) {
        alert('Preencha todos os campos de contato.');
        return;
      }
      setEtapaAtual('confirmacao');
    }
  };

  const handleVoltar = () => {
    if (etapaAtual === 'inicial') setEtapaAtual('pacotes');
    else if (etapaAtual === 'secoes') setEtapaAtual('inicial');
    else if (etapaAtual === 'personalizacao') setEtapaAtual('secoes');
    else if (etapaAtual === 'confirmacao') setEtapaAtual('personalizacao');
  };

  const handleEnviar = async () => {
    setEnviando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const pacoteNome = PACOTES_DISPONIVEIS.find(p => p.id === dados.pacote)?.nome ?? 'Nenhum pacote';
      const secoesSelecionadasNomes = secoesAgrupadas.flatMap(secao => Array(secao.quantidade).fill(secao.nome));
      const message = gerarMensagemPersonalizacao(dados, pacoteNome, secoesSelecionadasNomes);
      const link = getWhatsappLink(message);
      
      window.open(link, '_blank');
      
      setEtapaAtual('pacotes');
      setSecoesSelecionadas([]);
      setCorSelecionada('azul');
      setSecaoAtiva(SECOES_DISPONIVEIS[0]?.id ?? '');
      setDados({
        pacote: '', nomeEmpresa: '', descricaoEmpresa: '', secoes: [],
        corPrincipal: 'azul', observacoes: '', telefonePrincipal: '', emailPrincipal: ''
      });
    } catch (error) {
      console.error("Erro ao processar o envio:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="formulario" className="py-12 bg-slate-50 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 blur-3xl"></div>
      
      {/* Container de largura total fluida para o computador */}
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* Barra de Progresso - Mantida centralizada e legível */}
        <div className="mb-10 max-w-3xl mx-auto w-full">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-4 px-1">
            <span className="tracking-wide uppercase text-xs">Passo {getNumeroPasso()} de 5</span>
            <span className="text-indigo-600 font-semibold">{calcularProgresso()}%</span>
          </div>
          <div className="w-full bg-slate-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${calcularProgresso()}%` }}
            ></div>
          </div>
        </div>

        {/* Card Principal - Sem max-width limitando as laterais */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden transition-all duration-500 w-full">
          <div className="min-h-[400px]">
            
            {/* ETAPA 1: Seleção de Pacote */}
            {etapaAtual === 'pacotes' && (
              <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Escolha o seu Pacote 📦
                </h2>
                <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">Qual destas opções melhor atende a sua necessidade atual?</p>
                {/* Grid expandido em telas grandes para aproveitar o espaço */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {PACOTES_DISPONIVEIS.map(pacote => (
                    <button
                      key={pacote.id}
                      type="button"
                      onClick={() => setDados(prev => ({ ...prev, pacote: pacote.id }))}
                      className={`relative p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 cursor-pointer ${
                        dados.pacote === pacote.id
                          ? 'border-indigo-500 bg-indigo-50/30 ring-4 ring-indigo-500/10'
                          : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{pacote.icone}</span>
                        <h3 className={`font-bold text-lg ${dados.pacote === pacote.id ? 'text-indigo-700' : 'text-slate-800'}`}>
                          {pacote.nome}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-sm">{pacote.desc}</p>
                      {dados.pacote === pacote.id && (
                        <div className="absolute top-6 right-6 text-indigo-500">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 2: Informações Básicas e Cores */}
            {etapaAtual === 'inicial' && (
              <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Sobre o Projeto & Cores 🚀🎨
                </h2>
                <p className="text-slate-500 text-sm md:text-base mb-8">Identidade básica do seu novo site.</p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
                        Nome do Projeto <span className="text-indigo-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nomeEmpresa"
                        value={dados.nomeEmpresa}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm placeholder:text-slate-400"
                        placeholder="Ex: TechSolutions LTDA"
                      />
                    </div>

                    <div className="lg:col-span-7">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
                        Cor Principal da Marca <span className="text-indigo-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CORES_DISPONVEIS.map(cor => (
                          <button
                            key={cor.id}
                            type="button"
                            onClick={() => setCorSelecionada(cor.id)}
                            className={`relative py-2.5 px-2 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                              corSelecionada === cor.id
                                ? 'border-indigo-500 bg-indigo-50/30'
                                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="w-4 h-4 rounded-full flex-shrink-0 shadow-xs border border-black/5" style={{ backgroundColor: cor.valor }}></div>
                            <span className="text-xs font-semibold text-slate-600">{cor.nome}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
                      O que a empresa faz e objetivos do site? <span className="text-indigo-500">*</span>
                    </label>
                    <textarea
                      name="descricaoEmpresa"
                      value={dados.descricaoEmpresa}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm resize-none placeholder:text-slate-400"
                      placeholder="Descreva brevemente o principal diferencial do seu serviço ou produto..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3: Seleção de Seções */}
            {etapaAtual === 'secoes' && (
              <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                      Estrutura do Site 📑
                    </h2>
                    <p className="text-slate-500 text-base mt-2">
                      Selecione as áreas que não podem faltar. O preview se adapta dinamicamente à tela inteira.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-fit shrink-0">
                    <span className="text-sm font-medium text-slate-600">Sua Cor:</span>
                    <div
                      className="w-6 h-6 rounded-md shadow-sm border border-black/10"
                      style={{ backgroundColor: CORES_DISPONVEIS.find(c => c.id === corSelecionada)?.valor }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-slate-50/50 rounded-2xl p-2 md:p-6 ring-1 ring-slate-100 mb-8 w-full">
                  <LivePreviewAccordion
                    secoes={SECOES_DISPONIVEIS}
                    onToggleSecao={handleToggleSecao} 
                    selecionadas={secoesSelecionadas}
                    activeId={secaoAtiva}
                    onActiveSectionChange={setSecaoAtiva}
                  />
                </div>

                {secoesAgrupadas.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-5xl mx-auto">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Seções Selecionadas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {secoesAgrupadas.map(secao => (
                        <div key={secao.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <span>{secao.icon}</span>
                            <span className="text-sm font-semibold text-slate-700">{secao.nome}</span>
                          </div>
                          <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200">
                            <button type="button" onClick={() => handleRemoverSecao(secao.id)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 rounded font-bold cursor-pointer">-</button>
                            <span className="text-sm font-bold w-4 text-center">{secao.quantidade}</span>
                            <button type="button" onClick={() => handleAdicionarSecao(secao.id)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded font-bold cursor-pointer">+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ETAPA 4: Personalização */}
            {etapaAtual === 'personalizacao' && (
              <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Quase lá! 📩
                </h2>
                <p className="text-slate-500 text-lg mb-10">Deixe os dados de contato e os detalhes finais do projeto.</p>
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                      Algum adicional ou funcionalidade específica? (Opcional)
                    </label>
                    <textarea
                      name="observacoes"
                      value={dados.observacoes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none placeholder:text-slate-400"
                      placeholder="Ex: Integração com Instagram, botão flutuante diferente, etc."
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <label className="block text-sm font-semibold text-slate-700 mb-4 ml-1">
                      Informações de Contato
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">WhatsApp <span className="text-indigo-500">*</span></label>
                        <input
                          type="tel"
                          name="telefonePrincipal"
                          value={dados.telefonePrincipal}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">E-mail corporativo <span className="text-indigo-500">*</span></label>
                        <input
                          type="email"
                          name="emailPrincipal"
                          value={dados.emailPrincipal}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 5: Confirmação */}
            {etapaAtual === 'confirmacao' && (
              <div className="p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Tudo certo! ✅
                </h2>
                <p className="text-slate-500 text-lg mb-10">Revise os detalhes abaixo antes de enviarmos sua solicitação via WhatsApp.</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pacote Selecionado</div>
                      <div className="text-lg font-bold text-indigo-600">{PACOTES_DISPONIVEIS.find(p => p.id === dados.pacote)?.nome}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Empresa</div>
                      <div className="text-xl font-bold text-slate-900">{dados.nomeEmpresa}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Objetivo</div>
                      <div className="text-sm text-slate-600 leading-relaxed">{dados.descricaoEmpresa}</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Seções Selecionadas ({secoesSelecionadas.length})</div>
                      <div className="flex flex-wrap gap-2">
                        {secoesAgrupadas.map(secao => (
                          <span key={secao.id} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                            {secao.icon} {secao.nome} <span className="ml-1 text-xs text-indigo-500 font-bold">x{secao.quantidade}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cor Brand</div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: CORES_DISPONVEIS.find(c => c.id === dados.corPrincipal)?.valor }}></div>
                          <span className="font-semibold text-sm text-slate-700">{CORES_DISPONVEIS.find(c => c.id === dados.corPrincipal)?.nome}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contato</div>
                        <div className="text-sm text-slate-700 font-medium truncate">{dados.telefonePrincipal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Rodapé de Ações Limitado para não esticar no computador */}
          <div className="bg-slate-50/90 backdrop-blur-sm border-t border-slate-100 p-6">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 w-full">
              {etapaAtual !== 'pacotes' && (
                <button
                  type="button"
                  onClick={handleVoltar}
                  disabled={enviando}
                  className="px-5 py-3 border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Voltar</span>
                </button>
              )}

              <div className="flex items-center gap-4 ml-auto">
                {etapaAtual === 'secoes' && secoesSelecionadas.length > 0 && (
                  <div className="hidden sm:block text-xs font-bold tracking-wide uppercase text-indigo-600 bg-indigo-50 ring-1 ring-indigo-500/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {secoesSelecionadas.length} {secoesSelecionadas.length === 1 ? 'seção' : 'seções'}
                  </div>
                )}

                {etapaAtual !== 'confirmacao' ? (
                  <button
                    type="button"
                    onClick={handleAvancar}
                    disabled={enviando}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/15 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Próximo Passo</span>
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnviar}
                    disabled={enviando}
                    className="px-6 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    {enviando ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white shrink-0" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.132 1.233 8.368 3.472 2.235 2.24 3.461 5.214 3.46 8.38-.003 6.533-5.328 11.858-11.857 11.858-2.004-.001-3.974-.51-5.729-1.479L0 24zm6.59-4.846c1.657.983 3.284 1.503 4.883 1.504 5.428 0 9.845-4.414 9.848-9.841.002-2.63-1.02-5.101-2.877-6.959-1.856-1.857-4.326-2.879-6.953-2.88-5.431 0-9.848 4.415-9.851 9.842-.001 1.708.471 3.376 1.364 4.849l-.999 3.648 3.73-.978zm11.567-7.92c-.301-.151-1.784-.88-2.057-.979-.273-.1-.471-.151-.669.151-.198.3-.765.979-.939 1.178-.173.199-.347.225-.648.075-.302-.15-1.273-.469-2.426-1.494-.897-.8-1.502-1.787-1.679-2.088-.176-.3-.019-.462.13-.611.135-.134.302-.351.453-.527.151-.176.201-.3.302-.5.101-.2.05-.376-.026-.526-.075-.151-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.784-.73 2.032-1.433.248-.704.248-1.307.173-1.432-.074-.124-.272-.198-.573-.349z"/>
                        </svg>
                        <span>Enviar para o WhatsApp</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}