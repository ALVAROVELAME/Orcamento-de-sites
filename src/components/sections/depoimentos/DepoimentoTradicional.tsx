import { motion } from 'framer-motion';

interface DepoimentoTradicionalProps {
  nome?: string;
  cargo?: string;
  texto?: string;
  empresa?: string;
  imagem?: string;
  nota?: number;
}

export function DepoimentoTradicional({
  nome = "Mariana Souza",
  cargo = "Diretora de Marketing",
  texto = "A implementação foi impecável. A equipe superou todas as expectativas e o resultado final trouxe um retorno imediato para o nosso negócio.",
  empresa = "TechSol",
  imagem = "https://i.pravatar.cc/120?u=mariana",
  nota = 5,
}: DepoimentoTradicionalProps = {}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100 border border-slate-100 hover:border-indigo-100 transition-all duration-500"
    >
      <div className="max-w-3xl mx-auto">
        {/* Aspas decorativas */}
        <div className="text-7xl md:text-8xl text-indigo-100 font-serif leading-none mb-6">
          “
        </div>

        {/* Texto do depoimento */}
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-tight text-slate-800 mb-10">
          {texto}
        </blockquote>

        {/* Avaliação em estrelas */}
        <div className="flex justify-center md:justify-start gap-1 text-2xl text-amber-400 mb-8">
          {Array.from({ length: nota }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Autor */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={imagem}
            alt={nome}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md flex-shrink-0"
          />
          
          <div className="text-center md:text-left">
            <p className="font-semibold text-xl text-slate-900">{nome}</p>
            <p className="text-indigo-600 font-medium">
              {cargo} {empresa && `• ${empresa}`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}