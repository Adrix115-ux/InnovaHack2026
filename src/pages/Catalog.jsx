// Catalog.jsx — Buscador y catálogo completo de productos
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import products from '../data/mockProducts.json';

const ESTADOS = ['Todos', 'En temporada', 'Próximo a iniciar', 'Por terminar'];

const CHIP_STYLES = {
  'En temporada':   { active: 'bg-green-500 text-white border-green-500',   inactive: 'border-green-700/50 text-green-500 hover:bg-green-900/30' },
  'Próximo a iniciar': { active: 'bg-amber-500 text-white border-amber-500', inactive: 'border-amber-700/50 text-amber-500 hover:bg-amber-900/30' },
  'Por terminar':   { active: 'bg-rose-500 text-white border-rose-500',      inactive: 'border-rose-700/50 text-rose-500 hover:bg-rose-900/30' },
  'Todos':          { active: 'bg-green-800 text-green-100 border-green-700', inactive: 'border-green-900/60 text-green-600 hover:bg-green-900/30' },
};

export default function Catalog() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        query === '' ||
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.descripcionBreve.toLowerCase().includes(query.toLowerCase()) ||
        p.usosGastronomicos.some((u) => u.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter =
        activeFilter === 'Todos' || p.estadoTemporada === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <div className="flex flex-col gap-5 py-5">

      {/* ── Header ── */}
      <div className="px-4 flex flex-col gap-1">
        <p className="text-xs font-semibold tracking-widest uppercase text-green-500">
          Catálogo
        </p>
        <h1 className="text-2xl font-black text-green-50">
          Buscador de Productos
        </h1>
        <p className="text-sm text-green-500/70">
          {products.length} productos de origen boliviano
        </p>
      </div>

      {/* ── Search bar ── */}
      <div className="px-4">
        <label htmlFor="catalog-search" className="sr-only">
          Buscar producto
        </label>
        <div className="relative flex items-center">
          <Search
            size={18}
            className="absolute left-4 text-green-600 pointer-events-none"
          />
          <input
            id="catalog-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, uso o descripción..."
            className="
              w-full pl-11 pr-4 py-3.5 rounded-2xl
              bg-[#1e2d1e] border border-green-800/50
              text-green-50 placeholder-green-800
              text-sm font-medium
              focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              transition-all duration-200
            "
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-green-600 hover:text-green-400 transition-colors text-xs font-bold"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Filter chips ── */}
      <div className="px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-green-700 font-medium">
          <SlidersHorizontal size={12} />
          Filtrar por estado
        </div>
        <div
          className="flex gap-2 overflow-x-auto hide-scrollbar pb-1"
          role="group"
          aria-label="Filtros de temporada"
        >
          {ESTADOS.map((estado) => {
            const isActive = activeFilter === estado;
            const styles = CHIP_STYLES[estado];
            return (
              <button
                key={estado}
                id={`filter-chip-${estado.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveFilter(estado)}
                className={`
                  shrink-0 px-4 py-2 rounded-full text-sm font-semibold border
                  transition-all duration-200 active:scale-95
                  ${isActive ? styles.active : styles.inactive}
                `}
                aria-pressed={isActive}
              >
                {estado}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="px-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-green-900/40" />
        <span className="text-xs text-green-700 font-medium whitespace-nowrap">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
        <div className="h-px flex-1 bg-green-900/40" />
      </div>

      {/* ── Product grid ── */}
      <div className="px-4">
        {filtered.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-3"
            role="list"
            aria-label="Lista de productos"
          >
            {filtered.map((p) => (
              <div key={p.id} role="listitem">
                <ProductCard product={p} variant="grid" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <span className="text-4xl">🌿</span>
            <p className="text-green-600 font-semibold">
              No se encontraron productos
            </p>
            <p className="text-xs text-green-800">
              Intentá con otro término o limpiá los filtros
            </p>
            <button
              onClick={() => { setQuery(''); setActiveFilter('Todos'); }}
              className="mt-2 px-5 py-2.5 rounded-full bg-green-600/20 border border-green-600/40 text-green-400 text-sm font-semibold hover:bg-green-600/30 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
