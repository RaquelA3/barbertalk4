import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesionActiva } from '../utils/auth'; // Asegura la ruta correcta

/**
 * Componente Guard que protege las rutas y redirige al login correcto.
 * Verifica la validez del token en el backend y el rol del usuario.
 * @param {Array<string>} [rolesPermitidos] - Roles que pueden acceder ('cliente', '0', '1').
 */
const ProtectedRoute = ({ children, rolesPermitidos }) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; 
        
        const checkAuth = async () => {
            
            // 1. Consultar al Backend sobre el estado de la sesión
            const result = await verificarSesionActiva(); 
            
            if (isMounted) {
                if (result.sesion) {
                    // 2. Sesión VÁLIDA: Verificar Rol si es requerido
                    const userRole = result.rol;
                    
                    if (rolesPermitidos && !rolesPermitidos.includes(userRole)) {
                        // Usuario autenticado, pero sin el rol correcto (Error 403 en Frontend)
                        alert('Acceso denegado. No tienes los permisos necesarios para esta sección.');
                        
                        // Redirigir al usuario a su dashboard por defecto, no al login
                        navigate('/principalUsuario'); 
                        return;
                    }
                    
                    // Sesión y Rol OK
                    setIsLoading(false);
                    
                } else {
                    // 3. Sesión INVÁLIDA o EXPIRADA (Error 401)

                    // === LÓGICA DE REDIRECCIÓN CONDICIONAL ===
                    let loginPath = '/iniciosesion'; // Login de Cliente por defecto

                    // Si la ruta requiere roles de trabajador/admin, redirigir al login de Barbero
                    if (rolesPermitidos && (rolesPermitidos.includes('0') || rolesPermitidos.includes('1'))) {
                        loginPath = '/iniciosesionBarbero';
                    }
                    // =========================================
                    
                    alert('Sesión expirada o no iniciada. Por favor, inicie sesión.');
                    
                    // Redirigir a la página de inicio de sesión determinada
                    navigate(loginPath); 
                }
            }
        };
        
        checkAuth();

        // Limpieza
        return () => {
            isMounted = false;
        };
    }, [navigate, rolesPermitidos]); 

    if (isLoading) {
        return <div>Verificando sesión...</div>; 
    }

    return children;
};

export default ProtectedRoute;