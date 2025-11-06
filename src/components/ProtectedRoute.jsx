import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesionActiva } from '../utils/auth';

const ProtectedRoute = ({ children, rolesPermitidos }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            const result = await verificarSesionActiva();

            if (!isMounted) return;

            if (result.sesion) {
                // ✅ Sesión válida
                const userRole = result.rol;

                if (rolesPermitidos && !rolesPermitidos.includes(userRole)) {
                    // ❌ No tiene permisos → redirige
                    navigate('/principalUsuario', { replace: true });
                    return;
                }

                setIsLoading(false);
            } else {
                // ❌ Sesión expirada o inexistente
                let loginPath = '/iniciosesion';

                if (rolesPermitidos && (rolesPermitidos.includes('0') || rolesPermitidos.includes('1'))) {
                    loginPath = '/iniciosesionBarbero';
                }

                // ✅ Redirige inmediatamente
                navigate(loginPath, { replace: true });
            }
        };

        checkAuth();

        return () => { isMounted = false; };
    }, [navigate, rolesPermitidos]);

    if (isLoading) return null; // ✅ Nada de “Verificando sesión...”

    return children;
};

export default ProtectedRoute;
