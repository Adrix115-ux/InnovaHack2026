// MapExplorer.jsx — Vista de exploración geográfica del Calendario Vivo FAN
import { useState, useMemo, useCallback } from 'react';
import { Map, Info } from 'lucide-react';
import MapaInteractivo from '../components/ui/MapaInteractivo';
import RegionBottomSheet from '../components/ui/RegionBottomSheet';
import products from '../data/mockProducts.json';

export default function MapExplorer() {
  // ── Estado principal: qué región está seleccionada ─────────────────────────
  const [selectedRegion, setSelectedRegion] = useState(null);

  // ── Filtrar productos según la región activa ───────────────────────────────
  const regionProducts = useMemo(() => {
    if (!selectedRegion) return [];
    return products.filter((p) => p.region === selectedRegion);
  }, [selectedRegion]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleRegionClick = useCallback((regionId) => {
    // Si se toca la misma región dos veces, se deselecciona
    setSelectedRegion((prev) => (prev === regionId ? null : regionId));
  }, []);

  const handleClose = useCallback(() => {
    setSelectedRegion(null);
  }, []);

  return (
    // Pantalla completa — sin scroll vertical propio, el sheet maneja su scroll
    <div className="fixed inset-0 flex flex-col bg-[#0a120a]" style={{ paddingTop: '56px', paddingBottom: '72px' }}>

      {/* ── Barra de título de la vista ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f1a0f]/90 backdrop-blur-sm border-b border-green-900/30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-green-600/15 border border-green-700/40">
            <Map size={15} className="text-green-400" />
          </span>
          <div className="leading-tight">
            <h1 className="text-sm font-black text-green-50">Mapa de Regiones</h1>
            <p className="text-xs text-green-700">
              {selectedRegion
                ? `Región seleccionada`
                : 'Toca una zona para explorar'}
            </p>
          </div>
        </div>

        {/* Info tooltip hint */}
        <button
          id="map-info-hint"
          className="flex items-center gap-1.5 text-xs text-green-700 hover:text-green-500 transition-colors"
          aria-label="Información del mapa"
          title="Toca cualquier zona del mapa para ver los productos de esa región"
        >
          <Info size={14} />
          <span className="hidden sm:inline">¿Cómo usar?</span>
        </button>
      </div>

      {/* ── Área del mapa — ocupa todo el espacio restante ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Contenedor del SVG — ocupa todo el espacio disponible */}
        <div className="absolute inset-0 z-0">
          <MapaInteractivo
            selectedRegion={selectedRegion}
            onRegionClick={handleRegionClick}
          />
        </div>

        {/* ── Leyenda inferior flotante ── */}
        {!selectedRegion && (
          <div
            className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none"
            aria-live="polite"
            aria-label="Instrucción de uso"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#162016]/90 border border-green-900/40 backdrop-blur-sm shadow-lg">
              <span className="text-base" aria-hidden="true">👆</span>
              <p className="text-xs text-green-500 font-semibold">
                Toca una región del mapa
              </p>
            </div>
          </div>
        )}

        {/* ── Chip de región activa (cuando hay selección) ── */}
        {selectedRegion && (
          <div
            className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/20 border border-green-500/40 backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <p className="text-xs text-green-300 font-semibold">
                Panel abierto — deslizá hacia arriba
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Sheet ── se monta siempre, la animación es CSS ── */}
      <RegionBottomSheet
        region={selectedRegion}
        products={regionProducts}
        onClose={handleClose}
      />
    </div>
  );
}
