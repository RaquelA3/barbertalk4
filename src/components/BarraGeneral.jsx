import React from "react";
import './BarraGeneral.css';
import { useNavigate } from 'react-router-dom';

function BarraGeneral() {
   const navigate = useNavigate();
   
  return (
       <div className='barra-lateral-BB'>
           <img className='usuario-barbero-BB' alt='no aparece' src='/img/Datos-perfilU.png'></img>
           <h1 className='titulo1-BB'>Barbero:</h1>
           <h2 className='nombre-barbero-BB'>
               <span className='negro1-BB'>Juan</span> <span className='amarillo1-BB'>Ramirez</span>
           </h2>
           <img className='bigote-principalBB' alt='no aparece' src='/img/BBigote.png'></img>

           <div className='menu-BB'>
               <h2 className='titulo2-BB'>Menu de navegación:</h2>
               
               <div className='opcion-BB' onClick={() => navigate('/tablaBarbero')}>
                  <img className='img-registro-BB' alt='no aparece' src='/img/Registro-PU.png'></img>
                  <p className='subtitulo-registro-BB'>Registro de citas.</p>
               </div>

               <div className='opcion-BB'>
                  <img className='img-perfil-BB' alt='no aparece' src='/img/Perfil-PU.png'></img>
                  <p className='subtitulo-perfil-BB'>Revisar mi perfil.</p>
               </div>
               
               <div className='opcion-BB'>
                  <img className='img-estadisticas-BB' alt='no aparece' src='/img/Estadisticas-PU.png'></img>
                  <p className='subtitulo-estadisticas-BB'>Mis estadisticas.</p>
               </div>

               <div className='opcion-BB'>
                  <img className='img-cerrar-BB' alt='no aparece' src='/img/cerrar-sesion.png'></img>
                  <p className='subtitulo-cerrar-BB'>Cerrar sesión.</p>
               </div>

           </div>
       </div>
  )
}

export default BarraGeneral;
