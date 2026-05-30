// MainLayout.jsx — Wrapper principal que incluye la navbar y el área de contenido
import { Outlet } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f1a0f]">
      {/* Navbar fija */}
      <MobileNavbar />

      {/* Contenido principal — offset por la altura del header (56px = h-14) */}
      <main
        className="flex-1 pt-14 pb-6 max-w-lg mx-auto w-full"
        id="main-content"
      >
        <Outlet />
      </main>

      {/* Footer mínimo */}
      <footer className="text-center py-4 text-xs text-green-900 border-t border-green-900/20">
        InnovaHack FAN &copy; {new Date().getFullYear()} — Bolivia
      </footer>
    </div>
  );
}
