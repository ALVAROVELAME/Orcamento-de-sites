import { useState } from 'react';

type AccentColor = 'blue' | 'emerald' | 'rose' | 'violet';

export function MapaModel1() {
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');

  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:text-blue-700' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'hover:text-emerald-700' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'hover:text-rose-700' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'hover:text-violet-700' }
  } as const;
  const accentColorOptions = Object.keys(colors) as AccentColor[];

  return (
    <div className="space-y-4 p-6 max-w-2xl mx-auto w-full">
      
      {/* Seletor de Cores */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-slate-500">Tema:</span>
        {accentColorOptions.map((color) => (
          <button
            key={color}
            onClick={() => setAccentColor(color)}
            className={`w-6 h-6 rounded-full border-2 border-white ring-1 ring-slate-200 transition-transform hover:scale-110 ${
              color === 'blue' ? 'bg-blue-500' : 
              color === 'emerald' ? 'bg-emerald-500' : 
              color === 'rose' ? 'bg-rose-500' : 'bg-violet-500'
            }`}
          />
        ))}
      </div>

      {/* Container do Mapa - Proporção 3/4 (mais alto que largo no mobile) */}
      <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-200/50 aspect-[3/4] md:aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.4495784175965!2d-38.5253047!3d-13.0070176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7160379108013cb%3A0x4bae66cbdb92151f!2sShopping%20Barra!5e0!3m2!1spt-BR!2sbr!4v1780691277302!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nossa localização"
        />
      </div>

      {/* Seção de Informações */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className={`p-3 ${colors[accentColor].bg} rounded-2xl ${colors[accentColor].text}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <div className="flex-1 w-full text-center sm:text-left">
          <h3 className="text-lg font-bold text-slate-900">Visite nosso espaço</h3>
          <p className="mt-1 text-slate-600 text-sm leading-relaxed line-clamp-2">
            Av. Centenário, 2992 - Chame-Chame, Salvador - BA.
          </p>
          <button className={`mt-3 text-sm font-bold ${colors[accentColor].text} ${colors[accentColor].hover}`}>
            Como chegar →
          </button>
        </div>
      </div>
    </div>
  );
}