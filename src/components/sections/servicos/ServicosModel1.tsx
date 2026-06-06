import { motion } from 'framer-motion';

export function ServicosModel1() {
  const servicos = [
    {
      id: 1,
      titulo: "Contabilidade Completa",
      descricao: "Gestão contábil integral com relatórios mensais, balanços e demonstrações financeiras.",
      icone: "📊",
      cor: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      titulo: "Declaração de Imposto",
      descricao: "Declaração de IRPF, IRPJ, DCTF, SPED e todas as obrigações acessórias.",
      icone: "📋",
      cor: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      titulo: "Consultoria Fiscal",
      descricao: "Planejamento tributário inteligente para reduzir custos de forma legal.",
      icone: "💡",
      cor: "from-violet-500 to-purple-500"
    },
    {
      id: 4,
      titulo: "Folha de Pagamento",
      descricao: "Gestão completa de folha, pró-labore, benefícios e obrigações trabalhistas.",
      icone: "👥",
      cor: "from-amber-500 to-orange-500"
    },
    {
      id: 5,
      titulo: "Abertura de Empresa",
      descricao: "Abertura rápida e segura de empresas, MEI, LTDA e mais.",
      icone: "🏢",
      cor: "from-rose-500 to-pink-500"
    },
    {
      id: 6,
      titulo: "Regularização Fiscal",
      descricao: "Regularização de pendências junto à Receita Federal e órgãos públicos.",
      icone: "✅",
      cor: "from-lime-500 to-green-500"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Soluções completas para sua <span className="text-teal-600">contabilidade</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Oferecemos serviços especializados com tecnologia e atendimento humanizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, index) => (
            <motion.div
              key={servico.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white border border-slate-100 rounded-3xl p-8 hover:border-teal-200 hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${servico.cor} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                {servico.icone}
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                {servico.titulo}
              </h3>

              <p className="text-slate-600 leading-relaxed flex-1">
                {servico.descricao}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-teal-600 font-medium group-hover:underline inline-flex items-center gap-2 text-sm">
                  Saiba mais →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}