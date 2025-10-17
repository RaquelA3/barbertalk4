import React from "react";
import './BarraMini.css';
 import { useNavigate } from "react-router-dom";

function BarraMini() {
    const navigate = useNavigate(); 

  return (
    <div className="barra-mini-MB">
       <img className='usuario-barbero-MB' alt='no aparece' src='/img/Datos-perfilU.png'></img>
       <h2 className='nombre-barbero-MB'>
           <span className='negro1-MB'>Juan</span> <span className='amarillo1-MB'>Ramirez</span>
       </h2>

       <h3 className="titulo-menu-MB">Menú</h3>

       {/* Esta parte es del menu de navegacion */}
       <div className="menu-MB">
         
          <div className="opcion-MB" onClick={() => navigate('/baseBarbero')}>
             <img className="img-casa-MB" alt="no aparece" src="/img/casa.png"></img>
          </div>

          <div className="opcion-MB" onClick={() => navigate('/estadisticasBarbero')}>
             <img className='img-registro-MB' alt='no aparece' src='/img/Registro-PU.png'></img>
          </div>

          <div className="opcion-MB" onClick={() => navigate('/perfilBarbero')}>
             <img className='img-perfil-MB' alt='no aparece' src='/img/Perfil-PU.png'></img>
          </div>
          
          <div className="opcion-MB" onClick={async () => {
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
         <img className='img-cerrar-MB' alt='no aparece' src='/img/cerrar-sesion.png'></img>
         </div>

       </div>
      
    </div>
  )
}

export default BarraMini;
