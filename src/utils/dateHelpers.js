// dateHelpers.js — Utilidades de fecha para el Calendario Vivo FAN

const MONTHS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const MONTHS_FULL = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Devuelve el número del mes actual (1-12)
 */
export const getCurrentMonth = () => new Date().getMonth() + 1;

/**
 * Devuelve el nombre abreviado de un mes (1-12)
 */
export const getMonthName = (monthNumber) => MONTHS[monthNumber - 1] ?? '';

/**
 * Devuelve el nombre completo de un mes (1-12)
 */
export const getMonthFullName = (monthNumber) => MONTHS_FULL[monthNumber - 1] ?? '';

/**
 * Devuelve todos los meses con su nombre abreviado
 */
export const getAllMonths = () =>
  MONTHS.map((name, i) => ({ number: i + 1, name }));

/**
 * Verifica si un producto está activo este mes
 */
export const isActiveThisMonth = (mesesDisponible) =>
  mesesDisponible.includes(getCurrentMonth());

/**
 * Devuelve el rango de meses formateado (ej: "Mar – May")
 */
export const formatMonthRange = (mesesDisponible) => {
  if (!mesesDisponible || mesesDisponible.length === 0) return '—';
  const sorted = [...mesesDisponible].sort((a, b) => a - b);
  if (sorted.length === 1) return MONTHS[sorted[0] - 1];
  return `${MONTHS[sorted[0] - 1]} – ${MONTHS[sorted[sorted.length - 1] - 1]}`;
};

/**
 * Colores y estilos por estado de temporada
 */
export const getSeasonStyle = (estado) => {
  switch (estado) {
    case 'En temporada':
      return {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/40',
        dot: 'bg-green-400',
        label: 'En Temporada',
      };
    case 'Próximo a iniciar':
      return {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        dot: 'bg-amber-400',
        label: 'Próximo',
      };
    case 'Por terminar':
      return {
        bg: 'bg-rose-500/20',
        text: 'text-rose-400',
        border: 'border-rose-500/40',
        dot: 'bg-rose-400',
        label: 'Por Terminar',
      };
    default:
      return {
        bg: 'bg-gray-500/20',
        text: 'text-gray-400',
        border: 'border-gray-500/40',
        dot: 'bg-gray-400',
        label: estado,
      };
  }
};
