import React from 'react';
import './MenuAdmin.css';
import { useNavigate } from 'react-router-dom';

function MenuAdmin() {
  const navigate = useNavigate();

  return (
     <div className='menu-lateral-MA'>
       <div className='parte-arriba-MA'>
         <img className='bigote-titulo-MA' alt='no aparece' src='/img/bigote-admin.png'></img>
         <h1 className='titulo1-MA'>Barber Talk</h1>
       </div>

       <div className='parte-media-MA'>
         <h2 className='titulo2-MA'>Administrador</h2>
         <hr className='linea-MA'></hr> 
       </div>

       <div className='menu-MA'>
         <h3 className='sub1-MA'>Menu</h3>

         <div className='opcion-MA'>
            <img className='img-configuracion-MA' alt='no aparece' src='/img/configuracion.png'></img>  
            <p className='subtitulo-configuracion-MA'>Configuracion</p>
         </div>

         <div className='opcion-MA'>
            <img className='img-registro-MA' alt='no aparece' src='/img/Registro-PU.png'></img>  
            <p className='subtitulo-registro-MA'>Registro de Citas</p>
         </div>

         <div className='opcion-MA'>
            <img className='img-perfil-MA' alt='no aparece' src='/img/Perfil-PU.png'></img>  
            <p className='subtitulo-perfil-MA'>Mi perfil</p>
         </div>

         <div className='opcion-MA'>
            <img className='img-estadisticas-MA' alt='no aparece' src='/img/Estadisticas-PU.png'></img>  
            <p className='subtitulo-estadisticas-MA'>Estadisticas</p>
         </div>

         <div className='opcion-MA'>
            <img className='img-agregar-MA' alt='no aparece' src='/img/AgregarB.png'></img>  
            <p className='subtitulo-agregar-MA'>Agregar barbero</p>
         </div>

         <div className='opcion-MA'>
            <img className='img-trabajadores-MA' alt='no aparece' src='/img/trabajadores.png'></img>  
            <p className='subtitulo-trabajadores-MA'>Mis trabajadores</p>
         </div>

         <div className='opcion-MA'>
            <img className='img-cerrarS-MA' alt='no aparece' src='/img/cerrar-sesion.png'></img>  
            <p className='subtitulo-cerrarS-MA'>Cerrar sesión</p>
         </div>


       </div> {/* Este cierra el menu de navegacion del div MA */}

      
     </div>
  )
}

export default MenuAdmin;
