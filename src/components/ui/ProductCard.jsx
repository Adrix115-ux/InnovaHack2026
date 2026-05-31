// ProductCard.jsx — Tarjeta de producto para carruseles y grids
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SeasonBadge from './SeasonBadge';
import { formatMonthRange, getSeasonStyle } from '../../utils/dateHelpers';

/**
 * Props:
 *  - product (object): Un objeto del mockProducts.json
 *  - variant (string): 'carousel' | 'grid'  [default: 'carousel']
 */
export default function ProductCard({ product, variant = 'carousel' }) {
  const { bg } = getSeasonStyle(product.estadoTemporada);
  const isGrid = variant === 'grid';
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/producto/${product.id}`}
      className={`
        group relative flex flex-col overflow-hidden rounded-3xl
        bg-gradient-to-br from-[#1e2d1e] to-[#162016]
        border border-green-900/40 hover:border-green-500/50
        shadow-lg hover:shadow-green-900/40 hover:shadow-xl
        transition-all duration-300 active:scale-[0.97]
        ${isGrid ? 'w-full' : 'w-44 shrink-0'}
      `}
      aria-label={`Ver ficha de ${product.nombre}`}
    >
      {/* Image hero */}
      <div
        className={`
          relative flex items-center justify-center overflow-hidden
          ${isGrid ? 'h-32' : 'h-28'}
        `}
        style={{ background: '#162016' }}
      >
        {product.imagenUrl && !imgError ? (
          <img
            src={product.imagenUrl}
            alt={product.nombre}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* Fallback: colored background + emoji */
          <div className={`absolute inset-0 ${bg} flex items-center justify-center`}>
            <span
              className="text-5xl select-none drop-shadow-lg"
              aria-hidden="true"
              style={{ fontSize: isGrid ? '3rem' : '2.5rem' }}
            >
              🌿
            </span>
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#162016] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <SeasonBadge estado={product.estadoTemporada} size="sm" />

        <h3 className={`font-bold text-green-50 leading-tight ${isGrid ? 'text-base' : 'text-sm'}`}>
          {product.nombre}
        </h3>

        <p className="text-xs text-green-400/70 leading-snug line-clamp-2 flex-1">
          {product.descripcionBreve}
        </p>

        {/* Footer: months + arrow */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-green-600 font-medium">
            📅 {formatMonthRange(product.mesesDisponible)}
          </span>
          <ArrowRight
            size={14}
            className="text-green-500 group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  );
}
