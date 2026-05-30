// RegionBottomSheet.jsx — Panel deslizante inferior para detalles de región
import { useEffect, useRef } from 'react';
import { X, MapPin, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import { PLACEHOLDER_ZONES } from './SantaCruzSVG';

/**
 * Props:
 *  - region (string|null): ID de la región activa (ej: "chiquitania")
 *  - products (array): Array filtrado de productos de esa región
 *  - onClose (fn): Callback para cerrar el panel
 */
export default function RegionBottomSheet({ region, products, onClose }) {
  const sheetRef = useRef(null);
  const isOpen = Boolean(region);

  // Bloquear scroll del body cuando el sheet está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Metadatos de la zona seleccionada
  const zoneData = PLACEHOLDER_ZONES.find((z) => z.id === region);
  const regionLabel = zoneData?.label ?? region;
  const regionEmoji = zoneData?.emoji ?? '📍';
  const regionColor = zoneData?.activeColor ?? '#4ade80';

  return (
    <>
      {/* ── Backdrop overlay ── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* ── Bottom Sheet panel ── */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={isOpen ? `Productos de ${regionLabel}` : 'Panel de región'}
        className={`
          fixed bottom-0 inset-x-0 z-50
          flex flex-col
          max-h-[78vh]
          bg-[#111b11]
          border-t border-green-900/50
          rounded-t-3xl
          shadow-2xl shadow-black/60
          transform transition-transform duration-400 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ maxWidth: '512px', margin: '0 auto' }}
      >
        {/* ── Handle drag indicator ── */}
        <div className="flex justify-center pt-3 pb-1 shrink-0" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-green-900/60" />
        </div>

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 shrink-0 border-b border-green-900/30">
          <div className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-2xl text-lg shrink-0"
              style={{ backgroundColor: regionColor + '22', border: `1px solid ${regionColor}55` }}
              aria-hidden="true"
            >
              {regionEmoji}
            </span>
            <div className="leading-tight">
              <p className="text-xs text-green-600 font-semibold uppercase tracking-widest">
                Región
              </p>
              <h2
                className="text-lg font-black leading-none"
                style={{ color: regionColor }}
              >
                {regionLabel}
              </h2>
            </div>
          </div>

          {/* Contador de productos + botón cierre */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-900/30 border border-green-900/40 px-2.5 py-1 rounded-full">
              <Package size={11} />
              {products.length} producto{products.length !== 1 ? 's' : ''}
            </span>
            <button
              id="close-bottom-sheet"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-2xl bg-green-900/30 border border-green-800/40 hover:bg-green-800/40 active:scale-95 transition-all"
              aria-label="Cerrar panel"
            >
              <X size={16} className="text-green-400" />
            </button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-6">
          {products.length > 0 ? (
            <>
              <p className="text-xs text-green-700 mb-3 font-medium flex items-center gap-1.5">
                <MapPin size={11} />
                Productos disponibles en esta región
              </p>
              <div
                className="grid grid-cols-2 gap-3"
                role="list"
                aria-label={`Productos de ${regionLabel}`}
              >
                {products.map((p) => (
                  <div key={p.id} role="listitem">
                    <ProductCard product={p} variant="grid" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Estado vacío */
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <span className="text-4xl" aria-hidden="true">🌿</span>
              <p className="text-green-500 font-semibold text-sm">
                Sin productos registrados
              </p>
              <p className="text-xs text-green-800 leading-relaxed max-w-[200px]">
                Esta región aún no tiene productos en el catálogo. ¡Pronto se agregarán!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
