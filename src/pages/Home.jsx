// Home.jsx — Portada del Calendario Vivo FAN
import { Leaf, Sprout, Clock } from 'lucide-react';
import AlertBanner from '../components/ui/AlertBanner';
import ProductCard from '../components/ui/ProductCard';
import products from '../data/mockProducts.json';

// Filtrar productos por estado
const enTemporada   = products.filter((p) => p.estadoTemporada === 'En temporada');
const proximosIniciar = products.filter((p) => p.estadoTemporada === 'Próximo a iniciar');
const porTerminar   = products.filter((p) => p.estadoTemporada === 'Por terminar');

// ── Sección de carrusel horizontal ──────────────────────────────────────────
function ProductCarousel({ title, icon: Icon, iconClass, products, emptyMessage }) {
  return (
    <section className="flex flex-col gap-3" aria-label={title}>
      {/* Título de sección */}
      <div className="flex items-center gap-2 px-4">
        <span className={`p-1.5 rounded-xl bg-green-900/40 ${iconClass}`}>
          <Icon size={15} />
        </span>
        <h2 className="text-base font-bold text-green-100">{title}</h2>
        <span className="ml-auto text-xs text-green-700 font-medium bg-green-900/30 px-2 py-0.5 rounded-full">
          {products.length}
        </span>
      </div>

      {/* Scroll horizontal */}
      {products.length > 0 ? (
        <div
          className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-2"
          role="list"
          aria-label={`Lista de productos: ${title}`}
        >
          {products.map((p) => (
            <div key={p.id} role="listitem">
              <ProductCard product={p} variant="carousel" />
            </div>
          ))}
          {/* Spacer al final para que la última tarjeta no quede cortada */}
          <div className="shrink-0 w-2" aria-hidden="true" />
        </div>
      ) : (
        <p className="px-4 text-sm text-green-800 italic">{emptyMessage}</p>
      )}
    </section>
  );
}

// ── Stats strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { value: products.length, label: 'Productos', emoji: '🌱' },
    { value: enTemporada.length, label: 'En temporada', emoji: '✅' },
    { value: new Set(products.map(p => p.region)).size, label: 'Regiones', emoji: '🗺️' },
  ];

  return (
    <div className="px-4">
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ value, label, emoji }) => (
          <div
            key={label}
            className="
              flex flex-col items-center justify-center gap-1
              py-3 px-2 rounded-2xl
              bg-gradient-to-br from-[#1e2d1e] to-[#162016]
              border border-green-900/40
            "
          >
            <span className="text-lg" aria-hidden="true">{emoji}</span>
            <span className="text-xl font-black text-green-300">{value}</span>
            <span className="text-[10px] text-green-700 font-semibold text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Página Home ──────────────────────────────────────────────────────────────
export default function Home() {
  // Buscar el primer producto en temporada para el banner
  const featuredProduct = enTemporada[0];

  return (
    <div className="flex flex-col gap-6 py-5">

      {/* ── Hero ── */}
      <div className="px-4 flex flex-col gap-4">
        {/* Headline */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold tracking-widest uppercase text-green-500">
            Calendario Vivo
          </p>
          <h1 className="text-3xl font-black text-green-50 leading-tight">
            Sabores de Bolivia,<br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1px #22c55e' }}
            >
              en su momento exacto.
            </span>
          </h1>
          <p className="text-sm text-green-500/80 mt-1 leading-relaxed">
            Conectamos chefs y restaurantes con los productores locales y sus temporadas de cosecha.
          </p>
        </div>

        {/* AlertBanner dinámico */}
        {featuredProduct && (
          <AlertBanner
            message={`¡Ya inició la temporada de ${featuredProduct.nombre}! Contactá a ${featuredProduct.contacto.nombreAsociacion}.`}
            type="success"
          />
        )}
      </div>

      {/* ── Stats strip ── */}
      <StatsStrip />

      {/* ── Separador decorativo ── */}
      <div className="px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-green-800/60 to-transparent" />
      </div>

      {/* ── Carrusel 1: En Temporada ── */}
      <ProductCarousel
        title="En Temporada"
        icon={Leaf}
        iconClass="text-green-400"
        products={enTemporada}
        emptyMessage="Sin productos en temporada este mes."
      />

      {/* ── Carrusel 2: Próximos a iniciar ── */}
      <ProductCarousel
        title="Próximos a Iniciar"
        icon={Sprout}
        iconClass="text-amber-400"
        products={proximosIniciar}
        emptyMessage="Sin productos próximos a iniciar."
      />

      {/* ── Carrusel 3: Por terminar ── */}
      <ProductCarousel
        title="Por Terminar"
        icon={Clock}
        iconClass="text-rose-400"
        products={porTerminar}
        emptyMessage="Ningún producto está por terminar su temporada."
      />

    </div>
  );
}
