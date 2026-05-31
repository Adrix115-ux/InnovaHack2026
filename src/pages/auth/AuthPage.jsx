// AuthPage.jsx — Contenedor padre del flujo de autenticación (registro)
// Orquesta la transición entre RoleSelection y RegistrationForm.
import { useState } from 'react';
import RoleSelection from './RoleSelection';
import RegistrationForm from './RegistrationForm';

export default function AuthPage() {
  // null = mostrando selección de rol | string = mostrando formulario del rol
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    // Pantalla full sin TopHeader ni BottomTabBar (layout propio)
    <div className="min-h-screen bg-[#060c06] flex flex-col">

      {/* Fondo decorativo con gradiente radial sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(74,222,128,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Contenido centrado Mobile-First */}
      <div className="relative z-10 flex-1 flex flex-col max-w-md mx-auto w-full">

        {selectedRole === null ? (
          <RoleSelection onSelect={(role) => setSelectedRole(role)} />
        ) : (
          <RegistrationForm
            role={selectedRole}
            onBack={() => setSelectedRole(null)}
          />
        )}

      </div>
    </div>
  );
}
