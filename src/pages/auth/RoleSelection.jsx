// RoleSelection.jsx — Paso 1 del flujo de registro
// El usuario elige su rol antes de ver el formulario correspondiente.
import { useState } from 'react';
import { User, ChefHat, Tractor, ArrowRight, Leaf } from 'lucide-react';

const ROLES = [
  {
    id: 'usuario',
    label: 'Usuario',
    icon: User,
    description: 'Descubrí productos de temporada y conectá con productores locales.',
    gradient: 'from-green-900/60 to-green-950/80',
    border: 'border-green-700/40',
    activeBorder: 'border-green-400',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400',
    badge: 'Explorador',
  },
  {
    id: 'chef',
    label: 'Chef',
    icon: ChefHat,
    description: 'Accedé a ingredientes de estación directamente de productores bolivianos.',
    gradient: 'from-emerald-900/60 to-[#060c06]/80',
    border: 'border-emerald-700/40',
    activeBorder: 'border-emerald-400',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    badge: 'Profesional',
  },
  {
    id: 'productor',
    label: 'Productor',
    icon: Tractor,
    description: 'Publicá tu cosecha y llegá a chefs y compradores de todo el país.',
    gradient: 'from-lime-900/50 to-[#060c06]/80',
    border: 'border-lime-700/40',
    activeBorder: 'border-lime-400',
    iconBg: 'bg-lime-500/15',
    iconColor: 'text-lime-400',
    badge: 'Productor',
  },
];

export default function RoleSelection({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(roleId) {
    setSelected(roleId);
    // Breve delay para que la animación de selección sea visible
    setTimeout(() => onSelect(roleId), 280);
  }

  return (
    <div className="flex flex-col gap-8 py-6 px-4 animate-fade-in">

      {/* ── Logo + headline ── */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex items-center justify-center w-14 h-14 rounded-3xl bg-green-500/10 border border-green-500/30 shadow-[0_0_24px_rgba(74,222,128,0.15)]">
          <Leaf size={28} className="text-green-400" />
        </span>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-green-500 mb-1">
            Calendario Vivo FAN
          </p>
          <h1 className="text-2xl font-black text-green-50 leading-tight">
            ¿Cómo vas a<br />
            <span className="text-green-400">usar la plataforma?</span>
          </h1>
          <p className="text-sm text-green-600 mt-2 leading-relaxed">
            Elegí tu rol para personalizar tu experiencia.
          </p>
        </div>
      </div>

      {/* ── Tarjetas de rol ── */}
      <div className="flex flex-col gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isHovered = hovered === role.id;
          const isSelected = selected === role.id;

          return (
            <button
              key={role.id}
              id={`role-btn-${role.id}`}
              onClick={() => handleSelect(role.id)}
              onMouseEnter={() => setHovered(role.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Seleccionar rol: ${role.label}`}
              className={`
                relative overflow-hidden w-full text-left
                flex items-center gap-4 p-4 rounded-2xl
                bg-gradient-to-br ${role.gradient}
                border transition-all duration-300 ease-out
                active:scale-[0.98] focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-green-400/60
                ${isSelected
                  ? `${role.activeBorder} scale-[0.98] opacity-80`
                  : isHovered
                    ? `${role.activeBorder} shadow-[0_0_20px_rgba(74,222,128,0.12)]`
                    : role.border
                }
              `}
            >
              {/* Shimmer de fondo al hover */}
              <span
                className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent
                  transition-opacity duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}
                aria-hidden="true"
              />

              {/* Ícono */}
              <span
                className={`
                  shrink-0 flex items-center justify-center
                  w-12 h-12 rounded-xl ${role.iconBg} ${role.iconColor}
                  transition-transform duration-300
                  ${isHovered ? 'scale-110' : ''}
                `}
              >
                <Icon size={22} strokeWidth={1.8} />
              </span>

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base font-bold text-green-50">{role.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${role.iconBg} ${role.iconColor}`}>
                    {role.badge}
                  </span>
                </div>
                <p className="text-xs text-green-600 leading-relaxed">{role.description}</p>
              </div>

              {/* Flecha */}
              <ArrowRight
                size={16}
                className={`
                  shrink-0 ${role.iconColor} transition-all duration-300
                  ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-40'}
                `}
              />
            </button>
          );
        })}
      </div>

      {/* ── Link a Login ── */}
      <p className="text-center text-sm text-green-700">
        ¿Ya tenés cuenta?{' '}
        <a
          href="/login"
          id="go-to-login-link"
          className="text-green-400 font-semibold hover:text-green-300 transition-colors underline underline-offset-2"
        >
          Iniciá sesión
        </a>
      </p>

    </div>
  );
}
