import { useState } from 'react';

interface Post {
  id: string;
  titulo: string;
  categoria: string;
  data: string;
  tempoLeitura: string;
  imagem: string;
}

const POSTS_MOCK: Post[] = [
  {
    id: '1',
    titulo: 'Como a Inteligência Artificial está transformando o Design de Interfaces',
    categoria: 'Inovação',
    data: '05 Jun, 2026',
    tempoLeitura: '5 min',
    imagem: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    titulo: '5 Métricas essenciais para medir a performance do seu site corporativo',
    categoria: 'Performance',
    data: '02 Jun, 2026',
    tempoLeitura: '4 min',
    imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    titulo: 'Por que o Minimalismo se tornou a maior tendência de conversão web',
    categoria: 'Design',
    data: '28 Mai, 2026',
    tempoLeitura: '3 min',
    imagem: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80',
  }
];

export function BlogModel1() {
  const [posts] = useState<Post[]>(POSTS_MOCK);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden p-6 md:p-10 transition-all duration-300">
      
      {/* Cabeçalho do Blog - Expandido e mais elegante */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="inline-flex items-center text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50/70 border border-indigo-100/50 px-3 py-1 rounded-full">
            ✨ Preview do Feed
          </span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-3 tracking-tight">
            Artigos Recentes e Conteúdos
          </h3>
        </div>
        <button 
          type="button"
          className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer transition-all duration-200 bg-slate-50 hover:bg-indigo-50/50 px-4 py-2 rounded-xl border border-slate-200/60 w-fit"
        >
          <span>Ver todos os artigos</span>
          <svg 
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Grid Fluido Dinâmico: Se adapta de 1 a 3 colunas dependendo do espaço total */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="group flex flex-col bg-white hover:bg-slate-50/30 rounded-2xl border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 cursor-pointer overflow-hidden h-full"
          >
            {/* Container da Imagem com Aspect Ratio fixo de Card */}
            <div className="aspect-video w-full flex-shrink-0 bg-slate-100 relative overflow-hidden">
              <img 
                src={post.imagem} 
                alt={post.titulo}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              {/* Overlay de gradiente sutil na imagem */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badge Flutuante moderno com blur */}
              <span className="absolute top-3 left-3 text-[9px] font-extrabold text-indigo-700 uppercase tracking-wider bg-white/90 backdrop-blur-md shadow-xs px-2.5 py-1 rounded-md border border-white/20">
                {post.categoria}
              </span>
            </div>

            {/* Bloco de Conteúdo Interno do Card */}
            <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
              <div>
                {/* Metadados */}
                <div className="flex items-center gap-2 mb-2.5 text-[11px] text-slate-400 font-semibold">
                  <span>{post.data}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{post.tempoLeitura}</span>
                  </div>
                </div>
                
                {/* Título do Post com hover integrado */}
                <h4 className="font-extrabold text-slate-800 text-base md:text-md group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug break-words tracking-tight mb-4">
                  {post.titulo}
                </h4>
              </div>

              {/* Rodapé do Card com Link de Ação interno */}
              <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                <span>Ler artigo completo</span>
                <svg 
                  className="w-4 h-4 transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}