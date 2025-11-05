// utils/auth.js (Archivo de utilidades del Frontend)

/**
 * Consulta al backend el estado de la sesión (client_token o worker_token).
 * @returns {object} { sesion: boolean, rol: string, id: integer }
 */
export async function verificarSesionActiva() {
    try {
        const response = await fetch('https://barbertalk-back.onrender.com/sesion-activa', {
            method: 'GET',
            credentials: 'include', // Necesario para enviar las cookies (client_token / worker_token)
            headers: {
                // Si la ruta requiere CSRF, aquí deberías añadir el token, 
                // pero /sesion-activa en el backend no lo requiere.
            }
        });

        // El backend devuelve 200 OK y el JSON con el estado de la sesión
        if (response.status === 200) {
            const data = await response.json();
            return data; 
        }
        
        return { sesion: false };
    } catch (error) {
        console.error("Fallo de red al verificar sesión:", error);
        return { sesion: false };
    }
}