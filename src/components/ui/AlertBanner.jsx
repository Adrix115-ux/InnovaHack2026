// AlertBanner.jsx — Banner de alerta destacado para la portada
import { Bell, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Props:
 *  - message (string): Texto del aviso
 *  - type (string): 'success' | 'warning' | 'info'  [default: 'success']
 *  - dismissible (bool): Si puede cerrarse [default: true]
 */
export default function AlertBanner({ message, type = 'success', dismissible = true }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const styles = {
    success: {
      wrapper: 'bg-gradient-to-r from-green-600/90 to-emerald-600/90 border-green-500/50',
      icon: 'text-green-200',
      text: 'text-green-50',
    },
    warning: {
      wrapper: 'bg-gradient-to-r from-amber-600/90 to-orange-600/90 border-amber-500/50',
      icon: 'text-amber-200',
      text: 'text-amber-50',
    },
    info: {
      wrapper: 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 border-blue-500/50',
      icon: 'text-blue-200',
      text: 'text-blue-50',
    },
  };

  const s = styles[type] ?? styles.success;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-sm ${s.wrapper} shadow-lg`}
      role="alert"
    >
      {/* Animated bell icon */}
      <span className={`shrink-0 ${s.icon}`}>
        <Bell size={18} className="animate-bounce" />
      </span>

      {/* Message */}
      <p className={`flex-1 text-sm font-semibold leading-snug ${s.text}`}>
        {message}
      </p>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className={`shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors ${s.icon}`}
          aria-label="Cerrar aviso"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
