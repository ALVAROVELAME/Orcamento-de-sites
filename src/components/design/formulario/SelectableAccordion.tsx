import type { ReactNode } from 'react';

type Accent = 'indigo' | 'emerald';
type SelectionType = 'checkbox' | 'radio';

interface SelectableAccordionProps {
  titulo: string;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
  selectionType?: SelectionType;
  accent?: Accent;
  children?: ReactNode;
  containerClassName?: string;
  titleClassName?: string;
  metaLabel?: string | null;
}

const ACCENT_STYLES: Record<
  Accent,
  {
    selectedBorder: string;
    selectedRing: string;
    activeBg: string;
    hoverBg: string;
    hoverText: string;
    unselectedHoverBorder: string;
    metaText: string;
    metaBg: string;
  }
> = {
  indigo: {
    selectedBorder: 'border-indigo-600',
    selectedRing: 'ring-indigo-600/20',
    activeBg: 'bg-indigo-600',
    hoverBg: 'group-hover:bg-indigo-50',
    hoverText: 'group-hover:text-indigo-600',
    unselectedHoverBorder: 'hover:border-indigo-400',
    metaText: 'text-indigo-700',
    metaBg: 'bg-indigo-50'
  },
  emerald: {
    selectedBorder: 'border-emerald-600',
    selectedRing: 'ring-emerald-600/20',
    activeBg: 'bg-emerald-600',
    hoverBg: 'group-hover:bg-emerald-50',
    hoverText: 'group-hover:text-emerald-600',
    unselectedHoverBorder: 'hover:border-emerald-400',
    metaText: 'text-emerald-700',
    metaBg: 'bg-emerald-50'
  }
};

export function SelectableAccordion({
  titulo,
  isExpanded,
  isSelected,
  onToggleExpand,
  onToggleSelect,
  selectionType = 'checkbox',
  accent = 'indigo',
  children,
  containerClassName = 'max-w-7xl mx-auto',
  titleClassName = '',
  metaLabel
}: SelectableAccordionProps) {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      className={`bg-white transition-all duration-300 w-full ${
        isSelected ? `ring-4 ${styles.selectedRing} border-y-2 ${styles.selectedBorder}` : 'border-y border-slate-200'
      }`}
    >
      <div
        className={`flex items-center justify-between p-5 bg-white cursor-pointer select-none group ${containerClassName}`}
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl font-black text-xl transition-colors duration-300 shrink-0 ${
              isExpanded ? `${styles.activeBg} text-white` : `bg-slate-100 text-slate-500 ${styles.hoverBg} ${styles.hoverText}`
            }`}
          >
            {isExpanded ? '-' : '+'}
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
            <span className={`font-bold text-slate-800 text-lg md:text-xl tracking-tight ${titleClassName}`}>{titulo}</span>
            {metaLabel ? (
              <span className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-sm md:text-base font-black border border-current/10 ${styles.metaText} ${styles.metaBg}`}>
                {metaLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="pl-4 flex items-center shrink-0" onClick={(event) => event.stopPropagation()}>
          <label className="relative cursor-pointer flex items-center">
            <input type={selectionType} checked={isSelected} onChange={onToggleSelect} className="peer sr-only" />
            <div
              className={`w-6 h-6 md:w-7 md:h-7 transition-all flex items-center justify-center ${
                selectionType === 'radio' ? 'rounded-full' : 'rounded'
              } ${
                isSelected
                  ? `${styles.selectedBorder} ${styles.activeBg}`
                  : `border-slate-300 bg-white ${styles.unselectedHoverBorder}`
              } border-2`}
            >
              {isSelected &&
                (selectionType === 'radio' ? (
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white" />
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ))}
            </div>
          </label>
        </div>
      </div>

      <div
        className={`grid transition-all duration-700 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
