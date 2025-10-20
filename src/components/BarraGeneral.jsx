import React from "react";
import './BarraGeneral.css';
import { useNavigate } from 'react-router-dom';

function BarraGeneral() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Llamada al endpoint de logout
      const response = await fetch("https://barbertalk-back.onrender.com/logout", {
        method: "POST",
        credentials: "include", // importante para enviar cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Limpieza de cualquier token guardado localmente
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("csrfToken");
        sessionStorage.clear();

        // Redirige al login
        navigate("/iniciosesionBarbero");
      } else {
        console.error("Error al cerrar sesión:", response.status);
        alert("No se pudo cerrar sesión correctamente.");
      }
    } catch (error) {
      console.error("Error en la solicitud de logout:", error);
      alert("Hubo un error al cerrar sesión.");
    }
  };

  return (
    <div className='barra-lateral-BB'>
      <img className='usuario-barbero-BB' alt='no aparece' src='/img/Datos-perfilU.png' />
      <h1 className='titulo1-BB'>Barbero:</h1>
      <h2 className='nombre-barbero-BB'>
        <span className='negro1-BB'>Juan</span> <span className='amarillo1-BB'>Ramirez</span>
      </h2>
      <img className='bigote-principalBB' alt='no aparece' src='/img/BBigote.png' />

      <div className='menu-BB'>
        <h2 className='titulo2-BB'>Menu de navegación:</h2>

               <div className='opcion-BB' onClick={() => navigate('/perfilBarbero')}>
                  <img className='img-perfil-BB' alt='no aparece' src='/img/Perfil-PU.png'></img>
                  <p className='subtitulo-perfil-BB'>Revisar mi perfil.</p>
               </div>

               <div className='opcion-BB' onClick={() => navigate('/tablaBarbero')}>
                  <img className='img-perfil-BB' alt='no aparece' src='/img/Registro-PU.png'></img>
                  <p className='subtitulo-perfil-BB'>Tabla de citas.</p>
               </div>

               
               <div className='opcion-BB' onClick={async () => {
               try {
                  const res = await fetch('https://barbertalk-back.onrender.com/logout', {
                     method: 'POST',
                     credentials: 'include', // importante para enviar la cookie de sesión
                  });

                  if (res.ok) {
                     alert('Sesión cerrada correctamente');
                     navigate('/'); // redirige a la pantalla de login o inicio
                  } else {
                     alert('Error al cerrar sesión');
                  }
               } catch (err) {
                  console.error('Error al cerrar sesión:', err);
                  alert('Error del servidor');
               }
               }}>
               <img className='img-cerrar-BB' alt='no aparece' src='/img/cerrar-sesion.png'></img>
               <p className='subtitulo-cerrar-BB'>Cerrar sesión.</p>
               </div>


           </div>
       </div>
  )
}

export default BarraGeneral;
