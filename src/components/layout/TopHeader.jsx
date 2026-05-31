// TopHeader.jsx — Header fijo superior con branding minimal
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function TopHeader() {
  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        flex items-center justify-between
        px-4 h-14
        bg-[#0f1a0f]/95 backdrop-blur-xl
        border-b border-green-900/30
        shadow-[0_2px_20px_rgba(0,0,0,0.4)]
      "
    >
      <div className="max-w-lg mx-auto w-full flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="Ir al inicio — Calendario Vivo FAN"
        >
          <span
            className="
              flex items-center justify-center w-8 h-8 rounded-xl
              bg-green-500/15 border border-green-500/30
              group-hover:bg-green-500/25 group-hover:border-green-500/50
              transition-all duration-200
            "
          >
            <Leaf size={15} className="text-green-400" />
          </span>
          <div className="leading-none">
            <span className="block text-[10px] text-green-600 font-bold tracking-[0.15em] uppercase">
              Calendario Vivo
            </span>
            <span className="block text-sm text-green-50 font-black tracking-tight leading-none">
              FAN Bolivia
            </span>
          </div>
        </Link>

        {/* Indicador de temporada actual */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs text-green-600 font-semibold">En vivo</span>
        </div>
      </div>
    </header>
  );
}
