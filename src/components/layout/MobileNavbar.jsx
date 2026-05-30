// MobileNavbar.jsx — Header fijo superior con brand y menú hamburguesa
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Search, Map } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Portada', icon: Leaf },
  { to: '/catalogo', label: 'Buscador', icon: Search },
  { to: '/mapa', label: 'Mapa Regional', icon: Map },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* ── Header bar ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14 bg-[#0f1a0f]/95 backdrop-blur-md border-b border-green-900/40 shadow-lg shadow-black/30">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
          aria-label="Ir a inicio"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-green-600/20 border border-green-500/40 group-hover:bg-green-600/30 transition-colors">
            <Leaf size={16} className="text-green-400" />
          </span>
          <div className="leading-none">
            <span className="block text-xs text-green-500 font-semibold tracking-widest uppercase">
              InnovaHack
            </span>
            <span className="block text-sm text-green-50 font-bold tracking-tight leading-none">
              FAN
            </span>
          </div>
        </Link>

        {/* Hamburger button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center w-10 h-10 rounded-2xl bg-green-900/30 border border-green-800/40 hover:bg-green-800/40 active:scale-95 transition-all"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? (
            <X size={20} className="text-green-300" />
          ) : (
            <Menu size={20} className="text-green-300" />
          )}
        </button>
      </header>

      {/* ── Dropdown menu overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={`
          fixed top-14 right-0 z-40 w-56
          bg-[#162016] border border-green-900/40 rounded-bl-3xl
          shadow-2xl shadow-black/60
          transform transition-all duration-300 ease-out
          ${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
        `}
        aria-label="Menú principal"
      >
        <ul className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm
                    transition-all duration-200 active:scale-[0.97]
                    ${isActive
                      ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                      : 'text-green-400/80 hover:bg-green-900/30 hover:text-green-300'}
                  `}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="px-4 pb-4">
          <p className="text-xs text-green-800 text-center">
            Calendario Vivo FAN v0.1
          </p>
        </div>
      </nav>
    </>
  );
}
