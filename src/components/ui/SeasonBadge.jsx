// SeasonBadge.jsx — Píldora visual que indica el estado de temporada de un producto
import { getSeasonStyle } from '../../utils/dateHelpers';

/**
 * Props:
 *  - estado (string): 'En temporada' | 'Próximo a iniciar' | 'Por terminar'
 *  - size (string): 'sm' | 'md'  [default: 'sm']
 */
export default function SeasonBadge({ estado, size = 'sm' }) {
  const { bg, text, border, dot, label } = getSeasonStyle(estado);

  const sizeClasses = size === 'md'
    ? 'px-3 py-1.5 text-sm gap-2'
    : 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${bg} ${text} ${border} ${sizeClasses}`}
    >
      {/* Pulsing dot */}
      <span className="relative flex shrink-0" style={{ width: size === 'md' ? 10 : 8, height: size === 'md' ? 10 : 8 }}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-60`} />
        <span className={`relative inline-flex rounded-full h-full w-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}
