import { useState } from 'react';
import type { FormEvent } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Utensils, 
  Phone, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

type AccentColor = 'blue' | 'emerald' | 'rose' | 'violet';

export function FormularioModel1() {
  const [loading, setLoading] = useState(false);
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');

  // Dicionário de cores exatamente no estilo do seu modelo
  const colors = {
    blue: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-600', 
      border: 'border-blue-100',
      focus: 'focus:border-blue-500 focus:ring-blue-100',
      btn: 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-blue-600/10'
    },
    emerald: { 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-600', 
      border: 'border-emerald-100',
      focus: 'focus:border-emerald-500 focus:ring-emerald-100',
      btn: 'from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-emerald-600/10'
    },
    rose: { 
      bg: 'bg-rose-50', 
      text: 'text-rose-600', 
      border: 'border-rose-100',
      focus: 'focus:border-rose-500 focus:ring-rose-100',
      btn: 'from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 shadow-rose-600/10'
    },
    violet: { 
      bg: 'bg-violet-50', 
      text: 'text-violet-600', 
      border: 'border-violet-100',
      focus: 'focus:border-violet-500 focus:ring-violet-100',
      btn: 'from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 shadow-violet-600/10'
    }
  } as const;

  const accentColorOptions = Object.keys(colors) as AccentColor[];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto w-full p-2">
      
      {/* Seletor de Cores Exatamente Igual ao Seu Exemplo */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="text-sm font-medium text-slate-500">Tema:</span>
        {accentColorOptions.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setAccentColor(color)}
            className={`w-6 h-6 rounded-full border-2 border-white ring-1 ring-slate-200 transition-transform hover:scale-110 cursor-pointer ${
              color === 'blue' ? 'bg-blue-500' : 
              color === 'emerald' ? 'bg-emerald-500' : 
              color === 'rose' ? 'bg-rose-500' : 'bg-violet-500'
            } ${color === accentColor ? 'scale-110 ring-slate-400' : ''}`}
          />
        ))}
      </div>

      {/* Container Principal do Formulário */}
      <section className="w-full bg-white p-4 md:p-8 rounded-3xl antialiased text-slate-800 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lado Esquerdo: Informações de Apoio */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="space-y-5">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${colors[accentColor].bg} ${colors[accentColor].border} ${colors[accentColor].text}`}>
                <Sparkles className="w-3 h-3" />
                Reservas
              </div>
              
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                  Garanta a sua mesa exclusiva
                </h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">
                  Reserve em menos de um minuto e viva uma experiência gastronômica memorável.
                </p>
              </div>

              {/* Informações Básicas com Cores Reativas */}
              <div className="space-y-3 pt-3 border-t border-slate-200/60">
                <div className="flex items-start gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-3xs shrink-0 ${colors[accentColor].text}`}>
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Horários</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Terça a Domingo: 12h às 23h</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-3xs shrink-0 ${colors[accentColor].text}`}>
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Contato</h3>
                    <p className="text-[11px] text-slate-500 font-medium">(11) 99999-8888</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-3xs shrink-0 ${colors[accentColor].text}`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Endereço</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Av. Paulista, 1000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Formulário com Inputs dinâmicos */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label htmlFor="name" className="text-xs font-bold text-slate-700 tracking-wide">Nome Completo</label>
              <input 
                id="name"
                type="text" 
                required
                placeholder="Ex: Álvaro Velame"
                className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-3 shadow-3xs transition-all duration-200 ${colors[accentColor].focus}`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-xs font-bold text-slate-700 tracking-wide">WhatsApp</label>
              <input 
                id="phone"
                type="tel" 
                required
                placeholder="(00) 00000-0000"
                className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-3 shadow-3xs transition-all duration-200 ${colors[accentColor].focus}`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="guests" className="text-xs font-bold text-slate-700 tracking-wide">Pessoas</label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select 
                  id="guests"
                  defaultValue="2"
                  className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:bg-white focus:ring-3 shadow-3xs appearance-none cursor-pointer transition-all duration-200 ${colors[accentColor].focus}`}
                >
                  <option value="1">1 Pessoa</option>
                  <option value="2">2 Pessoas</option>
                  <option value="4">4 Pessoas</option>
                  <option value="6">6 Pessoas</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-xs font-bold text-slate-700 tracking-wide">Data</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input 
                  id="date"
                  type="date" 
                  required
                  className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:bg-white focus:ring-3 shadow-3xs cursor-pointer transition-all duration-200 ${colors[accentColor].focus}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="time" className="text-xs font-bold text-slate-700 tracking-wide">Horário</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select 
                  id="time"
                  className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:bg-white focus:ring-3 shadow-3xs appearance-none cursor-pointer transition-all duration-200 ${colors[accentColor].focus}`}
                >
                  <option value="12:00">12:00</option>
                  <option value="19:00">19:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>

            {/* Botão Principal com as Cores de Envio Dinâmicas */}
            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 ${colors[accentColor].btn}`}
              >
                <Utensils className="w-4 h-4" />
                {loading ? 'Confirmando sua mesa...' : 'Solicitar Reserva'}
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}