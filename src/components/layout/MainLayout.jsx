// MainLayout.jsx — Wrapper principal con header minimal + bottom tab bar
import { Outlet, useLocation } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';

// Pequeño header de branding (ya no hamburguesa)
import TopHeader from './TopHeader';

export default function MainLayout() {
  const { pathname } = useLocation();

  // El MapExplorer maneja su propio layout de pantalla completa,
  // así que sólo le damos padding inferior para la tab bar
  const isMap = pathname === '/mapa';

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1a0f]">
      {/* Header fijo con branding */}
      <TopHeader />

      {/* Contenido principal */}
      <main
        id="main-content"
        className={`
          flex-1 max-w-lg mx-auto w-full
          ${isMap
            ? 'pt-0'                         // el mapa maneja su propio padding-top
            : 'pt-14 pb-24 page-transition'  // 56px header + 80px tab bar
          }
        `}
      >
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <BottomTabBar />
    </div>
  );
}
