import { useState } from 'react';

type AccentColor = 'blue' | 'emerald' | 'rose' | 'violet';

export function VideoModel1() {
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');

  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' }
  } as const;
  const accentColorOptions = Object.keys(colors) as AccentColor[];

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto w-full">
      {/* Seletor de Cores */}
      <div className="flex items-center gap-2">
        <span className="text-base font-medium text-slate-700">Tema:</span>
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

      {/* Container do Vídeo */}
      <div className={`rounded-3xl overflow-hidden border-2 shadow-sm ${colors[accentColor].border}`}>
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/A-hNZjcaS-Q"
            title="Como funcionam a INTERNET e a WEB?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      
      {/* Informações */}
      <div className="space-y-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${colors[accentColor].bg} ${colors[accentColor].text}`}>
          <span className={`w-2 h-2 rounded-full ${colors[accentColor].text.replace('text-', 'bg-')}`}></span>
          Conteúdo Educativo
        </div>
        <h3 className="text-xl font-bold text-slate-900">Como funciona a Web</h3>
        <p className="text-base text-slate-700 leading-relaxed">
          Uma visão geral sobre os bastidores da internet. Entenda o papel de domínios, servidores e a conexão necessária para uma presença digital robusta.
        </p>
      </div>
    </div>
  );
}
