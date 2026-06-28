// SnowBackground.tsx

interface SnowflakeItem {
  id: string;
  positionClassName: string;   // left-* top-* (partindo do canto superior esquerdo)
  sizeClassName: string;
  toneClassName: string;
  animationClassName: string;
}

const SNOWFLAKES: readonly SnowflakeItem[] = [
  // Fileira de entrada — canto superior esquerdo
  { id: 'flake-1',  positionClassName: 'left-[-4%] top-[-8%]',   sizeClassName: 'h-10 w-10', toneClassName: 'text-sky-400/80',    animationClassName: 'animate-snow-diagonal-slow   snow-delay-1' },
  { id: 'flake-2',  positionClassName: 'left-[6%] top-[-14%]',   sizeClassName: 'h-6 w-6',   toneClassName: 'text-indigo-400/75', animationClassName: 'animate-snow-diagonal-medium snow-delay-2' },
  { id: 'flake-3',  positionClassName: 'left-[14%] top-[-6%]',   sizeClassName: 'h-12 w-12', toneClassName: 'text-blue-400/70',   animationClassName: 'animate-snow-diagonal-slow   snow-delay-3' },
  { id: 'flake-4',  positionClassName: 'left-[22%] top-[-10%]',  sizeClassName: 'h-7 w-7',   toneClassName: 'text-cyan-400/72',   animationClassName: 'animate-snow-diagonal-fast   snow-delay-4' },
  { id: 'flake-5',  positionClassName: 'left-[30%] top-[-18%]',  sizeClassName: 'h-9 w-9',   toneClassName: 'text-indigo-300/78', animationClassName: 'animate-snow-diagonal-medium snow-delay-5' },
  { id: 'flake-6',  positionClassName: 'left-[38%] top-[-4%]',   sizeClassName: 'h-5 w-5',   toneClassName: 'text-sky-300/82',    animationClassName: 'animate-snow-diagonal-fast   snow-delay-6' },
  { id: 'flake-7',  positionClassName: 'left-[46%] top-[-12%]',  sizeClassName: 'h-11 w-11', toneClassName: 'text-violet-300/70', animationClassName: 'animate-snow-diagonal-slow   snow-delay-2' },
  { id: 'flake-8',  positionClassName: 'left-[54%] top-[-8%]',   sizeClassName: 'h-6 w-6',   toneClassName: 'text-blue-400/78',   animationClassName: 'animate-snow-diagonal-medium snow-delay-7' },
  // Segunda fileira — ligeiramente dentro da tela
  { id: 'flake-9',  positionClassName: 'left-[-2%] top-[4%]',    sizeClassName: 'h-7 w-7',   toneClassName: 'text-sky-400/55',    animationClassName: 'animate-snow-diagonal-medium snow-delay-8' },
  { id: 'flake-10', positionClassName: 'left-[10%] top-[10%]',   sizeClassName: 'h-4 w-4',   toneClassName: 'text-cyan-300/60',   animationClassName: 'animate-snow-diagonal-fast   snow-delay-4' },
  { id: 'flake-11', positionClassName: 'left-[20%] top-[2%]',    sizeClassName: 'h-6 w-6',   toneClassName: 'text-sky-400/60',    animationClassName: 'animate-snow-diagonal-medium snow-delay-6' },
  { id: 'flake-12', positionClassName: 'left-[35%] top-[6%]',    sizeClassName: 'h-10 w-10', toneClassName: 'text-indigo-300/58', animationClassName: 'animate-snow-diagonal-slow   snow-delay-7' },
  { id: 'flake-13', positionClassName: 'left-[0%] top-[14%]',    sizeClassName: 'h-5 w-5',   toneClassName: 'text-blue-300/50',   animationClassName: 'animate-snow-diagonal-fast   snow-delay-1' },
  { id: 'flake-14', positionClassName: 'left-[16%] top-[18%]',   sizeClassName: 'h-8 w-8',   toneClassName: 'text-cyan-300/48',   animationClassName: 'animate-snow-diagonal-medium snow-delay-3' },
  { id: 'flake-15', positionClassName: 'left-[28%] top-[12%]',   sizeClassName: 'h-5 w-5',   toneClassName: 'text-sky-300/50',    animationClassName: 'animate-snow-diagonal-fast   snow-delay-5' },
];

// globals.css — delays (ou inclua no tailwind.config como keyframes separados)
// .snow-delay-1 { animation-delay: 0s }
// .snow-delay-2 { animation-delay: -1s }
// .snow-delay-3 { animation-delay: -2s }
// .snow-delay-4 { animation-delay: -3s }
// .snow-delay-5 { animation-delay: -4s }
// .snow-delay-6 { animation-delay: -0.5s }
// .snow-delay-7 { animation-delay: -1.5s }
// .snow-delay-8 { animation-delay: -2.5s }

function SnowGlyph({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 10V54M14 20L50 44M14 44L50 20M22 14L32 24L42 14M22 50L32 40L42 50M16 28L28 32L16 36M48 28L36 32L48 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="5" fill="currentColor" fillOpacity="0.18" />
    </svg>
  );
}

export function SnowBackground() {
  return (
    // z-0 → fica atrás de todo o conteúdo do site
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.26),transparent_40%)]" />

      {SNOWFLAKES.map((flake) => (
        <div
          key={flake.id}
          className={`absolute ${flake.positionClassName} ${flake.sizeClassName} ${flake.animationClassName} ${flake.toneClassName}`}
        >
          <SnowGlyph className="h-full w-full drop-shadow-[0_0_16px_rgba(96,165,250,0.34)]" />
        </div>
      ))}
    </div>
  );
}
