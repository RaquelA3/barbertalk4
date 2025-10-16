import React, { createContext, useContext, useState, useEffect } from 'react';

// 🚨 IMPORTANTE: Reemplaza con la URL base de tu backend
const BACKEND_URL = 'https://barbertalk-back.onrender.com'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // userRole: 'client', 'worker', o null (no autenticado)
    const [userRole, setUserRole] = useState(null); 
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función que verifica AMBAS cookies secuencialmente
    const checkSession = async () => {
        setLoading(true);
        
        // --- 1. Verificar Sesión de TRABAJADOR (worker_token) ---
        try {
            let response = await fetch(`${BACKEND_URL}/logintrabajador/sesion-activa`, {
                method: 'GET',
                credentials: 'include', // Clave para enviar la cookie httpOnly
            });
            let data = await response.json();

            if (data.sesion) {
                setUserRole('worker');
                setUserData(data.trabajador);
                setLoading(false);
                return; // Sesión de trabajador encontrada, no verificamos más
            }
        } catch (error) {
            console.error("Error al verificar trabajador:", error);
        }


        // --- 2. Verificar Sesión de CLIENTE (client_token) ---
        try {
            let response = await fetch(`${BACKEND_URL}/login/sesion-activa`, {
                method: 'GET',
                credentials: 'include',
            });
            let data = await response.json();

            if (data.sesion) {
                setUserRole('client');
                setUserData(data.cliente);
            } else {
                // Si ninguna sesión fue encontrada, el rol es null
                setUserRole(null);
                setUserData(null);
            }
        } catch (error) {
             console.error("Error al verificar cliente:", error);
             setUserRole(null);
             setUserData(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        checkSession();
    }, []);

    // Se llama tras un login exitoso
    const login = (role, data) => {
        setUserRole(role);
        setUserData(data);
    };
    
    // Llama al backend para destruir ambas cookies
    const logout = async () => {
        try {
            await fetch(`${BACKEND_URL}/logout`, {
                method: 'POST',
                credentials: 'include', // Necesario para que el backend pueda borrar las cookies
            });
        } catch (error) {
             console.warn("Error en el endpoint de logout, limpiando estado local de todas formas:", error);
        }
        
        // Limpia el estado local siempre, independientemente de la respuesta del backend
        setUserRole(null);
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, userData, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};