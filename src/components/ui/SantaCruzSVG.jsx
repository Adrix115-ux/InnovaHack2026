// SantaCruzSVG.jsx — Placeholder interactivo del mapa de Santa Cruz
// ────────────────────────────────────────────────────────────────────────────
// INSTRUCCIONES PARA REEMPLAZAR:
//   1. Cuando tengas el SVG real, reemplaza el contenido del <svg> interno.
//   2. Asegúrate de que cada zona clickeable tenga:
//        - Un atributo `data-region="<id-de-region>"` (ej: "chiquitania")
//        - El handler onClick ya conectado: onClick={handleZoneClick}
//   3. Puedes mantener el estilo de resaltado usando la prop `selectedRegion`.
// ────────────────────────────────────────────────────────────────────────────

// Definición de zonas del placeholder — reemplazar con tus paths SVG reales
const PLACEHOLDER_ZONES = [
  {
    id: 'chiquitania',
    label: 'Chiquitania',
    color: '#15803d',
    activeColor: '#4ade80',
    // Posición y tamaño en el placeholder cuadrado (porcentajes)
    x: '55%', y: '35%', width: '38%', height: '42%',
    emoji: '🌳',
  },
  {
    id: 'amazonia',
    label: 'Amazonía Norte',
    color: '#0f766e',
    activeColor: '#2dd4bf',
    x: '5%', y: '5%', width: '46%', height: '40%',
    emoji: '🌿',
  },
  {
    id: 'valles',
    label: 'Valles Cruceños',
    color: '#1d4ed8',
    activeColor: '#60a5fa',
    x: '5%', y: '50%', width: '46%', height: '44%',
    emoji: '🏔️',
  },
];

/**
 * Props:
 *  - selectedRegion (string|null): ID de la región activa
 *  - onRegionClick (fn): Callback que recibe el ID de la región clickeada
 */
export default function SantaCruzSVG({ selectedRegion, onRegionClick }) {
  return (
    <div className="relative w-full h-full" aria-label="Mapa interactivo de Santa Cruz">
      {/*
        ════════════════════════════════════════════════════════════════
        ZONA DE REEMPLAZO SVG
        ─────────────────────────────────────────────────────────────
        Reemplaza este <svg> completo con tu SVG real.
        Cada zona clickeable debe tener:
          data-region="chiquitania"  (u otro id)
          onClick={e => onRegionClick(e.currentTarget.dataset.region)}
          className="cursor-pointer transition-all duration-300 ..."
        ════════════════════════════════════════════════════════════════
      */}
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Placeholder del mapa — reemplazar con SVG real"
      >
        {/* Fondo del mapa */}
        <rect width="400" height="400" fill="#0f1a10" rx="16" />

        {/* Grid decorativo de fondo */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2e1a" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid)" rx="16" />

        {/* ── Zonas placeholder ── */}
        {PLACEHOLDER_ZONES.map((zone) => {
          const isActive = selectedRegion === zone.id;
          // Convertir porcentajes a coordenadas SVG (viewBox 400x400)
          const x = parseFloat(zone.x) * 4;
          const y = parseFloat(zone.y) * 4;
          const w = parseFloat(zone.width) * 4;
          const h = parseFloat(zone.height) * 4;

          return (
            <g
              key={zone.id}
              data-region={zone.id}
              onClick={() => onRegionClick(zone.id)}
              className="cursor-pointer"
              role="button"
              aria-label={`Seleccionar región: ${zone.label}`}
              aria-pressed={isActive}
            >
              {/* Sombra / glow cuando está activo */}
              {isActive && (
                <rect
                  x={x - 3} y={y - 3}
                  width={w + 6} height={h + 6}
                  rx="14"
                  fill="none"
                  stroke={zone.activeColor}
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                />
              )}

              {/* Cuerpo de la zona */}
              <rect
                x={x} y={y} width={w} height={h}
                rx="12"
                fill={isActive ? zone.activeColor + '33' : zone.color + '22'}
                stroke={isActive ? zone.activeColor : zone.color}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: 'all 0.25s ease' }}
              />

              {/* Emoji indicador */}
              <text
                x={x + w / 2} y={y + h / 2 - 10}
                textAnchor="middle"
                fontSize="22"
                className="select-none"
              >
                {zone.emoji}
              </text>

              {/* Nombre de la zona */}
              <text
                x={x + w / 2} y={y + h / 2 + 14}
                textAnchor="middle"
                fontSize="11"
                fontWeight={isActive ? '700' : '500'}
                fill={isActive ? zone.activeColor : '#86efac'}
                fontFamily="Inter, system-ui, sans-serif"
                className="select-none"
                style={{ transition: 'fill 0.25s ease' }}
              >
                {zone.label}
              </text>

              {/* Indicador "toca aquí" sólo cuando no está activo */}
              {!isActive && (
                <text
                  x={x + w / 2} y={y + h / 2 + 28}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#4b7a4b"
                  fontFamily="Inter, system-ui, sans-serif"
                  className="select-none"
                >
                  Toca para explorar
                </text>
              )}
            </g>
          );
        })}

        {/* Watermark placeholder */}
        <text
          x="200" y="390"
          textAnchor="middle"
          fontSize="8"
          fill="#2d4a2d"
          fontFamily="Inter, system-ui, sans-serif"
        >
          ← Reemplazar con SVG real de Santa Cruz →
        </text>
      </svg>
    </div>
  );
}

// Exportar las zonas para uso externo (ej: mostrar el label en el bottom sheet)
export { PLACEHOLDER_ZONES };
