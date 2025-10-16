import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta

// Recibe la propiedad 'requiredRole' ('worker' o 'client')
const PrivateRoute = ({ requiredRole }) => {
    const { userRole, loading } = useAuth();

    // 1. Cargando: Espera a que el AuthContext termine la verificación del backend
    if (loading) {
        return <div>Verificando credenciales...</div>; 
    }

    // 2. No Autenticado: Redirige a la página de login general
    if (!userRole) {
        // Redirige al login principal o a una página de bienvenida
        return <Navigate to="/" replace />; 
    }

    // 3. Rol Incorrecto: Redirige a una página de acceso denegado
    // Ejemplo: Un cliente intenta acceder al dashboard de trabajador
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/acceso-denegado" replace />; 
    }

    // 4. Acceso Concedido: Renderiza el contenido de la ruta
    return <Outlet />;
};

export default PrivateRoute;