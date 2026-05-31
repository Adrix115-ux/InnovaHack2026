// ProductDetail.jsx — Ficha técnica completa de un producto
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, ChevronDown, ChevronUp, Leaf, UtensilsCrossed, CalendarDays, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import SeasonBadge from '../components/ui/SeasonBadge';
import { getAllMonths, getSeasonStyle } from '../utils/dateHelpers';
import products from '../data/mockProducts.json';

// Mapa de etiquetas para las regiones
const REGION_LABELS = {
  amazonia:    { label: 'Amazonía',    emoji: '🌿' },
  chiquitania: { label: 'Chiquitania', emoji: '🌳' },
  valles:      { label: 'Valles',      emoji: '🌄' },
  santa_cruz:  { label: 'Santa Cruz',  emoji: '🌴' },
};

// ── Componente: Visualizador de meses del año ────────────────────────────────
function MonthCalendar({ mesesDisponible }) {
  const months = getAllMonths();
  return (
    <div className="grid grid-cols-6 gap-2" role="list" aria-label="Disponibilidad mensual">
      {months.map(({ number, name }) => {
        const isActive = mesesDisponible.includes(number);
        return (
          <div
            key={number}
            role="listitem"
            aria-label={`${name}: ${isActive ? 'disponible' : 'no disponible'}`}
            className={`
              flex flex-col items-center justify-center py-2.5 rounded-2xl text-xs font-bold
              border transition-all duration-200
              ${isActive
                ? 'bg-green-500/25 border-green-500/60 text-green-300 shadow-md shadow-green-900/30'
                : 'bg-[#1a271a] border-green-900/20 text-green-900'}
            `}
          >
            {name}
            {isActive && (
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Componente: Acordeón ─────────────────────────────────────────────────────
function Accordion({ title, icon: Icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-green-900/40 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 bg-[#1e2d1e] hover:bg-[#243624] transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 text-green-300 font-bold text-sm">
          <Icon size={16} className="text-green-500" />
          {title}
        </div>
        {open ? (
          <ChevronUp size={16} className="text-green-700 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-green-700 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 bg-[#162016]">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Página ProductDetail ─────────────────────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center">
        <span className="text-5xl">🌿</span>
        <h2 className="text-xl font-bold text-green-300">Producto no encontrado</h2>
        <p className="text-sm text-green-700">El producto que buscás no existe en el catálogo.</p>
        <Link
          to="/"
          className="mt-2 px-6 py-3 rounded-2xl bg-green-600/20 border border-green-600/40 text-green-400 font-semibold text-sm hover:bg-green-600/30 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const { bg, text } = getSeasonStyle(product.estadoTemporada);

  return (
    <div className="flex flex-col">

      {/* ── Hero image placeholder ── */}
      <div
        className={`relative flex flex-col items-center justify-center h-56 ${bg}`}
        role="img"
        aria-label={`Imagen representativa de ${product.nombre}`}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <Leaf size={96} className={`${text} opacity-25 drop-shadow-2xl`} />

        {/* Gradient fade to page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0f1a0f]" />

        {/* Top bar: back + share */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-4">
          <button
            id="back-button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold hover:bg-black/60 transition-all duration-200 active:scale-95"
            aria-label="Volver atrás"
          >
            <ArrowLeft size={14} />
            Volver
          </button>
          <button
            id="share-product"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-black/60 transition-all duration-200 active:scale-95"
            aria-label="Compartir producto"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.nombre, text: product.descripcionBreve, url: window.location.href });
              }
            }}
          >
            <Share2 size={14} />
          </button>
        </div>

        {/* Region badge bottom-left */}
        {REGION_LABELS[product.region] && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
            <span className="text-sm">{REGION_LABELS[product.region].emoji}</span>
            <span className="text-xs text-white font-semibold">{REGION_LABELS[product.region].label}</span>
          </div>
        )}
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-col gap-5 px-4 pt-4 pb-8">

        {/* Name + badge */}
        <div className="flex flex-col gap-2">
          <SeasonBadge estado={product.estadoTemporada} size="md" />
          <h1 className="text-3xl font-black text-green-50 leading-tight">
            {product.nombre}
          </h1>
          <p className="text-sm text-green-400/80 leading-relaxed">
            {product.descripcionBreve}
          </p>
        </div>

        {/* ── Meses disponibles ── */}
        <section aria-label="Disponibilidad mensual">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays size={16} className="text-green-500" />
            <h2 className="text-sm font-bold text-green-300">Disponibilidad en el año</h2>
          </div>
          <MonthCalendar mesesDisponible={product.mesesDisponible} />
        </section>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-900/60 to-transparent" />

        {/* ── Contacto del productor ── */}
        <section
          className="flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#1e2d1e] to-[#162016] border border-green-900/40"
          aria-label="Contacto del productor"
        >
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-green-500" />
            <h2 className="text-sm font-bold text-green-300">Contacto del Productor</h2>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-green-50 font-bold text-base">
              {product.contacto.nombreAsociacion}
            </p>
            <a
              href={`tel:${product.contacto.telefono.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-green-400 font-semibold text-sm hover:text-green-300 transition-colors"
              aria-label={`Llamar a ${product.contacto.nombreAsociacion}`}
            >
              <Phone size={13} className="shrink-0" />
              {product.contacto.telefono}
            </a>
          </div>
          {/* Action buttons row */}
          <div className="flex gap-2 mt-1">
            {/* WhatsApp button — primary CTA */}
            <a
              href={`https://wa.me/${product.contacto.telefono.replace(/[\s+()-]/g, '')}?text=${encodeURIComponent(`Hola! Me interesa el producto *${product.nombre}* que vi en el Calendario Vivo FAN. ¿Tienen disponibilidad?`)}`}
              id="contact-whatsapp-button"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 flex items-center justify-center gap-2
                py-3.5 rounded-2xl
                bg-[#25D366] hover:bg-[#20b356] active:bg-[#1a9449]
                text-white font-bold text-sm
                transition-all duration-200 active:scale-[0.98]
                shadow-lg shadow-[#25D366]/20
              "
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            {/* Call button — secondary */}
            <a
              href={`tel:${product.contacto.telefono.replace(/\s/g, '')}`}
              id="contact-call-button"
              className="
                flex-1 flex items-center justify-center gap-2
                py-3.5 rounded-2xl
                bg-green-800/40 hover:bg-green-700/50 active:bg-green-800/60
                border border-green-700/40
                text-green-300 font-bold text-sm
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <Phone size={16} />
              Llamar
            </a>
          </div>
        </section>

        {/* ── Usos Gastronómicos (acordeón) ── */}
        <Accordion title="Usos Gastronómicos" icon={UtensilsCrossed}>
          <ul className="flex flex-col gap-2 pt-1" role="list">
            {product.usosGastronomicos.map((uso, i) => (
              <li
                key={i}
                className="flex items-start gap-3 py-2.5 border-b border-green-900/20 last:border-0"
              >
                <span
                  className="shrink-0 flex items-center justify-center w-6 h-6 rounded-lg bg-green-600/20 text-green-400 text-xs font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-sm text-green-200 leading-snug">{uso}</span>
              </li>
            ))}
          </ul>
        </Accordion>

      </div>
    </div>
  );
}
