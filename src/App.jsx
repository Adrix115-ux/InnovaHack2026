// App.jsx — Enrutador principal del Calendario Vivo FAN
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import MapExplorer from './pages/MapExplorer';
import AuthPage from './pages/auth/AuthPage';

export default function App() {
  return (
    <BrowserRouter basename="/InnovaHack2026">
      <Routes>
        {/* Todas las rutas comparten el layout principal con navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/mapa" element={<MapExplorer />} />
          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* ── Flujo de Auth (sin MainLayout, layout propio) ── */}
        <Route path="/registro" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
