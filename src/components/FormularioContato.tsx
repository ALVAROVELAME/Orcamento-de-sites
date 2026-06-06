import { useState } from 'react';
import { TIPOS_SITE, OPCOES_ORCAMENTO } from '../data/formConfig';
import { gerarLinkWhatsApp } from '../utils/whatsappService';

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  tipoSite: string;
  descricao: string;
  orcamento: string;
  atualizacoes: boolean;
}

export function FormularioContato() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    whatsapp: '',
    tipoSite: '',
    descricao: '',
    orcamento: '',
    atualizacoes: false
  });

  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (!formData.nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) novosErros.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) novosErros.email = 'Email inválido';
    if (!formData.whatsapp.trim()) novosErros.whatsapp = 'WhatsApp é obrigatório';
    if (!formData.tipoSite) novosErros.tipoSite = 'Selecione um tipo de site';
    if (!formData.descricao.trim()) novosErros.descricao = 'Descreva seu projeto';
    if (formData.descricao.length < 15) novosErros.descricao = 'Mínimo 15 caracteres';
    if (!formData.orcamento) novosErros.orcamento = 'Selecione uma faixa de orçamento';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Remove erro ao digitar
    if (erros[name]) {
      setErros(prev => {
        const novoErros = { ...prev };
        delete novoErros[name];
        return novoErros;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setEnviando(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const linkWhatsApp = gerarLinkWhatsApp(formData);
      window.open(linkWhatsApp, '_blank');

      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        tipoSite: '',
        descricao: '',
        orcamento: '',
        atualizacoes: false
      });

      alert('✅ Redirecionando para o WhatsApp...');
    } catch (erro) {
      console.error('Erro ao enviar:', erro);
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="formulario-contato" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
            💼 Orçamento Personalizado
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Vamos criar seu site?
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Preencha os dados abaixo e receba uma proposta sob medida em até 24h
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-7 border border-slate-100">
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 rounded-2xl border transition-all ${erros.nome ? 'border-red-500' : 'border-slate-200 focus:border-teal-500'}`}
                placeholder="João Silva"
                disabled={enviando}
              />
              {erros.nome && <p className="text-red-600 text-sm mt-1.5">{erros.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 rounded-2xl border transition-all ${erros.email ? 'border-red-500' : 'border-slate-200 focus:border-teal-500'}`}
                placeholder="seu@email.com"
                disabled={enviando}
              />
              {erros.email && <p className="text-red-600 text-sm mt-1.5">{erros.email}</p>}
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp *</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl border transition-all ${erros.whatsapp ? 'border-red-500' : 'border-slate-200 focus:border-teal-500'}`}
              placeholder="(11) 98765-4321"
              disabled={enviando}
            />
            {erros.whatsapp && <p className="text-red-600 text-sm mt-1.5">{erros.whatsapp}</p>}
          </div>

          {/* Tipo de Site */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Site *</label>
            <select
              name="tipoSite"
              value={formData.tipoSite}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl border transition-all ${erros.tipoSite ? 'border-red-500' : 'border-slate-200 focus:border-teal-500'}`}
              disabled={enviando}
            >
              <option value="">Selecione o tipo de site</option>
              {TIPOS_SITE.map(tipo => (
                <option key={tipo.id} value={tipo.label}>{tipo.label}</option>
              ))}
            </select>
            {erros.tipoSite && <p className="text-red-600 text-sm mt-1.5">{erros.tipoSite}</p>}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Descreva seu projeto *</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={5}
              className={`w-full px-5 py-4 rounded-2xl border transition-all resize-y min-h-[120px] ${erros.descricao ? 'border-red-500' : 'border-slate-200 focus:border-teal-500'}`}
              placeholder="Quero um site para contabilidade com área de clientes, dashboard financeiro..."
              disabled={enviando}
            />
            {erros.descricao && <p className="text-red-600 text-sm mt-1.5">{erros.descricao}</p>}
            <p className="text-xs text-slate-500 text-right mt-1">{formData.descricao.length}/800 caracteres</p>
          </div>

          {/* Orçamento */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Faixa de investimento *</label>
            <select
              name="orcamento"
              value={formData.orcamento}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl border transition-all ${erros.orcamento ? 'border-red-500' : 'border-slate-200 focus:border-teal-500'}`}
              disabled={enviando}
            >
              <option value="">Selecione uma faixa</option>
              {OPCOES_ORCAMENTO.map(opcao => (
                <option key={opcao.id} value={opcao.label}>{opcao.label}</option>
              ))}
            </select>
            {erros.orcamento && <p className="text-red-600 text-sm mt-1.5">{erros.orcamento}</p>}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="atualizacoes"
              name="atualizacoes"
              checked={formData.atualizacoes}
              onChange={handleChange}
              className="mt-1 w-5 h-5 accent-teal-600 cursor-pointer"
              disabled={enviando}
            />
            <label htmlFor="atualizacoes" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
              Quero receber atualizações e dicas sobre meu projeto por e-mail
            </label>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={enviando}
            className="w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
          >
            {enviando ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Enviando...
              </>
            ) : (
              'Enviar Solicitação de Orçamento'
            )}
          </button>

          <p className="text-center text-xs text-slate-500 mt-4">
            Você será redirecionado para o WhatsApp após o envio
          </p>
        </form>
      </div>
    </section>
  );
}