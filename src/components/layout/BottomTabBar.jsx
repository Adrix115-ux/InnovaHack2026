// BottomTabBar.jsx — Barra de navegación inferior estilo nativo móvil
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Map } from 'lucide-react';

const TABS = [
  { to: '/',        label: 'Inicio',    icon: Home   },
  { to: '/catalogo', label: 'Catálogo', icon: Search },
  { to: '/mapa',    label: 'Mapa',      icon: Map    },
];

export default function BottomTabBar() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50"
      aria-label="Navegación principal"
    >
      {/* Glass background */}
      <div className="max-w-lg mx-auto">
        <div
          className="
            flex items-stretch
            bg-[#0f1a0f]/95 backdrop-blur-xl
            border-t border-green-900/40
            shadow-[0_-8px_32px_rgba(0,0,0,0.5)]
          "
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {TABS.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                id={`tab-${label.toLowerCase()}`}
                className={`
                  relative flex-1 flex flex-col items-center justify-center gap-1
                  py-3 px-2 transition-all duration-200 active:scale-95
                  ${isActive ? 'text-green-400' : 'text-green-700 hover:text-green-500'}
                `}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-green-400"
                    aria-hidden="true"
                  />
                )}

                {/* Icon container */}
                <span
                  className={`
                    relative flex items-center justify-center
                    w-10 h-7 rounded-2xl transition-all duration-300
                    ${isActive
                      ? 'bg-green-500/15 scale-110'
                      : 'bg-transparent'}
                  `}
                >
                  <Icon
                    size={isActive ? 20 : 18}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className="transition-all duration-300"
                  />
                </span>

                {/* Label */}
                <span
                  className={`
                    text-[10px] font-semibold tracking-wide transition-all duration-300
                    ${isActive ? 'opacity-100' : 'opacity-60'}
                  `}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
