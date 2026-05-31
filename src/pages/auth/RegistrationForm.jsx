// RegistrationForm.jsx — Paso 2: formularios dinámicos por rol
// Renderiza campos distintos según el rol elegido en RoleSelection.
import { useState } from 'react';
import {
  User, Mail, Lock, CreditCard, Phone, Building2,
  Eye, EyeOff, ArrowLeft, CheckCircle2, ChefHat, Tractor, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Configuración de campos por rol ─────────────────────────────────────────
const ROLE_CONFIG = {
  usuario: {
    label: 'Usuario',
    icon: User,
    accentColor: 'green',
    fields: [
      { id: 'username',  label: 'Nombre de usuario', type: 'text',     icon: User,       placeholder: 'tu_nombre_de_usuario' },
      { id: 'email',     label: 'Correo electrónico', type: 'email',    icon: Mail,       placeholder: 'correo@ejemplo.com' },
      { id: 'password',  label: 'Contraseña',         type: 'password', icon: Lock,       placeholder: 'Mínimo 8 caracteres' },
      { id: 'idCard',    label: 'Carnet de Identidad',type: 'text',     icon: CreditCard, placeholder: 'Ej. 1234567 LP' },
      { id: 'phone',     label: 'Nro. de Teléfono',   type: 'tel',      icon: Phone,      placeholder: '+591 7XXXXXXX' },
    ],
  },
  chef: {
    label: 'Chef',
    icon: ChefHat,
    accentColor: 'emerald',
    fields: [
      { id: 'username',  label: 'Nombre de usuario', type: 'text',     icon: User,       placeholder: 'tu_nombre_de_usuario' },
      { id: 'email',     label: 'Correo electrónico', type: 'email',    icon: Mail,       placeholder: 'correo@ejemplo.com' },
      { id: 'password',  label: 'Contraseña',         type: 'password', icon: Lock,       placeholder: 'Mínimo 8 caracteres' },
      { id: 'idCard',    label: 'Carnet de Identidad',type: 'text',     icon: CreditCard, placeholder: 'Ej. 1234567 LP' },
      { id: 'phone',     label: 'Nro. de Teléfono',   type: 'tel',      icon: Phone,      placeholder: '+591 7XXXXXXX' },
    ],
  },
  productor: {
    label: 'Productor',
    icon: Tractor,
    accentColor: 'lime',
    fields: [
      { id: 'username',     label: 'Nombre de usuario',     type: 'text',     icon: User,        placeholder: 'tu_nombre_de_usuario' },
      { id: 'email',        label: 'Correo electrónico',     type: 'email',    icon: Mail,        placeholder: 'correo@ejemplo.com' },
      { id: 'password',     label: 'Contraseña',             type: 'password', icon: Lock,        placeholder: 'Mínimo 8 caracteres' },
      { id: 'phone',        label: 'Nro. de Teléfono',       type: 'tel',      icon: Phone,       placeholder: '+591 7XXXXXXX' },
      { id: 'association',  label: 'Asociación',             type: 'text',     icon: Building2,   placeholder: 'Nombre de tu asociación', optional: true },
    ],
  },
};

// Paleta de colores por acento (Tailwind clases estáticas para purge-safe)
const ACCENT = {
  green: {
    ring: 'focus-within:ring-green-500/40 focus-within:border-green-500',
    label: 'text-green-400',
    icon: 'text-green-500',
    btn: 'bg-green-500 hover:bg-green-400 focus-visible:ring-green-400/50',
    badge: 'bg-green-500/15 text-green-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
  },
  emerald: {
    ring: 'focus-within:ring-emerald-500/40 focus-within:border-emerald-500',
    label: 'text-emerald-400',
    icon: 'text-emerald-500',
    btn: 'bg-emerald-500 hover:bg-emerald-400 focus-visible:ring-emerald-400/50',
    badge: 'bg-emerald-500/15 text-emerald-400',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  },
  lime: {
    ring: 'focus-within:ring-lime-500/40 focus-within:border-lime-500',
    label: 'text-lime-400',
    icon: 'text-lime-500',
    btn: 'bg-lime-500 hover:bg-lime-400 focus-visible:ring-lime-400/50',
    badge: 'bg-lime-500/15 text-lime-400',
    success: 'bg-lime-500/10 border-lime-500/30 text-lime-300',
  },
};

// ── Componente de campo individual ──────────────────────────────────────────
function FormField({ field, value, onChange, showPassword, onTogglePassword, accent }) {
  const FieldIcon = field.icon;
  const isPassword = field.type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : field.type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={`field-${field.id}`}
        className={`text-xs font-semibold tracking-wide uppercase ${accent.label}`}
      >
        {field.label}
        {field.optional && (
          <span className="ml-2 normal-case font-normal text-green-700 lowercase">
            (Opcional)
          </span>
        )}
      </label>

      <div
        className={`
          relative flex items-center
          rounded-xl border border-green-900/50 bg-[#0a160a]
          ring-1 ring-transparent transition-all duration-200
          ${accent.ring}
        `}
      >
        {/* Ícono izquierdo */}
        <span className={`absolute left-3.5 ${accent.icon} opacity-70`} aria-hidden="true">
          <FieldIcon size={16} strokeWidth={1.8} />
        </span>

        <input
          id={`field-${field.id}`}
          name={field.id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          autoComplete={isPassword ? 'new-password' : field.id}
          required={!field.optional}
          className="
            w-full bg-transparent pl-10 pr-10 py-3.5
            text-sm text-green-50 placeholder:text-green-800
            outline-none rounded-xl
          "
        />

        {/* Botón mostrar/ocultar contraseña */}
        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-3.5 text-green-700 hover:text-green-400 transition-colors"
          >
            {showPassword
              ? <EyeOff size={16} strokeWidth={1.8} />
              : <Eye size={16} strokeWidth={1.8} />
            }
          </button>
        )}
      </div>
    </div>
  );
}

// ── Pantalla de éxito ────────────────────────────────────────────────────────
function SuccessScreen({ role, accent }) {
  const config = ROLE_CONFIG[role];
  const RoleIcon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 px-4 animate-fade-in text-center">
      <span
        className={`
          flex items-center justify-center w-20 h-20 rounded-full
          ${accent.success} border shadow-[0_0_40px_rgba(74,222,128,0.2)]
          animate-pulse-once
        `}
      >
        <CheckCircle2 size={40} strokeWidth={1.5} />
      </span>
      <div>
        <h2 className="text-2xl font-black text-green-50 mb-2">¡Registro exitoso!</h2>
        <p className="text-sm text-green-600 leading-relaxed max-w-xs mx-auto">
          Bienvenido/a a <span className="text-green-400 font-semibold">Calendario Vivo FAN</span>.
          {role === 'usuario'
            ? ' Te redirigimos a la pantalla de inicio...'
            : ' Tu cuenta está siendo revisada. Te avisaremos pronto.'}
        </p>
      </div>
      <span className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full ${accent.badge}`}>
        <RoleIcon size={14} strokeWidth={2} />
        {config.label} registrado
      </span>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function RegistrationForm({ role, onBack }) {
  const navigate = useNavigate();
  const config = ROLE_CONFIG[role];
  const accent = ACCENT[config.accentColor];
  const RoleIcon = config.icon;

  // Inicializar estado del formulario con los campos del rol
  const initialValues = config.fields.reduce((acc, f) => ({ ...acc, [f.id]: '' }), {});
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(fieldId, value) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) setErrors((prev) => ({ ...prev, [fieldId]: null }));
  }

  function validate() {
    const newErrors = {};
    config.fields.forEach((f) => {
      if (!f.optional && !values[f.id]?.trim()) {
        newErrors[f.id] = 'Este campo es requerido.';
      }
      if (f.id === 'email' && values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        newErrors.email = 'Correo electrónico inválido.';
      }
      if (f.id === 'password' && values.password && values.password.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
      }
    });
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Simulación de llamada a API (1.5s)
    await new Promise((res) => setTimeout(res, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Redireccion post-registro
    if (role === 'usuario') {
      // Usuario → Inicio directo después de mostrar el éxito
      setTimeout(() => navigate('/'), 2000);
    }
    // Chef y Productor permanecen en la pantalla de éxito (pending review)
  }

  // Mostrar pantalla de éxito
  if (isSuccess) {
    return <SuccessScreen role={role} accent={accent} />;
  }

  return (
    <div className="flex flex-col gap-6 py-6 px-4 animate-fade-in">

      {/* ── Encabezado con back ── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          id="back-to-role-selection"
          onClick={onBack}
          aria-label="Volver a selección de rol"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-900/30 border border-green-900/50 text-green-500 hover:bg-green-900/60 hover:text-green-300 transition-all active:scale-95"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-green-50">Crear cuenta</h1>
            <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${accent.badge}`}>
              <RoleIcon size={11} strokeWidth={2.5} />
              {config.label}
            </span>
          </div>
          <p className="text-xs text-green-700 mt-0.5">Completá tus datos para registrarte.</p>
        </div>
      </div>

      {/* ── Formulario ── */}
      <form
        id={`registration-form-${role}`}
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4"
      >
        {config.fields.map((field) => (
          <div key={field.id}>
            <FormField
              field={field}
              value={values[field.id]}
              onChange={handleChange}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((p) => !p)}
              accent={accent}
            />
            {/* Mensaje de error inline */}
            {errors[field.id] && (
              <p className="mt-1 text-xs text-red-400 pl-1" role="alert">
                {errors[field.id]}
              </p>
            )}
          </div>
        ))}

        {/* ── Botón de envío ── */}
        <button
          type="submit"
          id={`submit-registration-${role}`}
          disabled={isLoading}
          className={`
            mt-2 w-full flex items-center justify-center gap-2
            py-4 px-6 rounded-2xl
            font-bold text-sm text-[#060c06]
            transition-all duration-200 active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-offset-[#060c06] shadow-lg
            disabled:opacity-60 disabled:cursor-not-allowed
            ${accent.btn}
          `}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Registrando...</span>
            </>
          ) : (
            <>
              <span>Crear mi cuenta</span>
              <CheckCircle2 size={18} strokeWidth={2.5} />
            </>
          )}
        </button>

        {/* ── Link a login ── */}
        <p className="text-center text-xs text-green-700 mt-1">
          ¿Ya tenés cuenta?{' '}
          <a
            href="/login"
            id="go-to-login-from-form"
            className="text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            Iniciá sesión
          </a>
        </p>
      </form>
    </div>
  );
}
