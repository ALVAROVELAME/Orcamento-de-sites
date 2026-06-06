import { motion } from 'framer-motion';

interface ReviewProps {
  nome: string;
  cargo?: string;
  empresa?: string;
  texto: string;
  nota: number;
  imagem?: string;
  data?: string;
  verificado?: boolean;
}

const AvaliacaoGoogle = ({
  nome,
  cargo,
  empresa,
  texto,
  nota,
  imagem = "https://i.pravatar.cc/120",
  data = "2 semanas atrás",
  verificado = true
}: ReviewProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 lg:p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 group h-full flex flex-col w-full"
    >
      <div className="flex gap-3 lg:gap-4">
        {/* Foto de Perfil */}
        <img
          src={imagem}
          alt={nome}
          className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0"
        />

        <div className="flex-1 min-w-0 overflow-hidden">
          {/* Nome + Verificado */}
          <div className="flex items-center gap-2">
            <p className="font-medium text-slate-900 text-[15px] truncate">{nome}</p>
            {verificado && (
              <div className="text-blue-500 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Cargo / Empresa */}
          {(cargo || empresa) && (
            <p className="text-sm text-slate-600 mt-0.5 truncate">
              {cargo} {empresa && `• ${empresa}`}
            </p>
          )}

          {/* Estrelas + Data - Corrigido */}
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <div className="flex text-amber-400 text-lg flex-shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < nota ? "" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">• {data}</span>
          </div>
        </div>
      </div>

      {/* Texto do depoimento */}
      <p className="mt-4 text-slate-700 leading-relaxed text-[15px] break-words flex-1">
        {texto}
      </p>
    </motion.div>
  );
};

export function DepoimentosGoogleMaps() {
  const avaliacoes = [
    {
      nome: "Lucas Mendes",
      cargo: "CEO",
      empresa: "PixelFlow",
      texto: "Melhor ferramenta de automação que já usei. Interface limpa, suporte excelente e resultados visíveis desde a primeira semana.",
      nota: 5,
      imagem: "https://i.pravatar.cc/120?u=lucas",
      data: "1 semana atrás",
    },
    {
      nome: "Beatriz Lima",
      cargo: "Head de Marketing",
      empresa: "Vivid",
      texto: "Consegui aumentar em 47% nossa taxa de conversão usando as automações dessa plataforma. Simplesmente incrível.",
      nota: 5,
      imagem: "https://i.pravatar.cc/120?u=beatriz",
      data: "3 semanas atrás",
    },
    {
      nome: "Rafael Costa",
      cargo: "Diretor de Tecnologia",
      empresa: "Nexus Labs",
      texto: "A integração foi absurdamente fácil e o suporte técnico é um dos melhores que já vi. Recomendo fortemente.",
      nota: 5,
      imagem: "https://i.pravatar.cc/120?u=rafael",
      data: "1 mês atrás",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-5 py-2 rounded-full mb-6">
            ⭐ Avaliações verificadas
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            O que nossos clientes estão dizendo
          </h2>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
            Avaliações reais de quem já usa nossa plataforma todos os dias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avaliacoes.map((item, index) => (
            <AvaliacaoGoogle key={index} {...item} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            Baseado em <span className="font-semibold text-slate-700">1.247 avaliações</span>
            <span className="text-amber-400">★★★★★</span> 4.98
          </p>
        </div>
      </div>
    </section>
  );
}