import React from "react";
import './BarraMini.css';
/* import { useNavigate } from "react-router-dom"; */

function BarraMini() {
  /*  const navigate = useNavigate(); */

  return (
    <div className="barra-mini-MB">
       <img className='usuario-barbero-MB' alt='no aparece' src='/img/Datos-perfilU.png'></img>
       <h2 className='nombre-barbero-MB'>
           <span className='negro1-MB'>Juan</span> <span className='amarillo1-MB'>Ramirez</span>
       </h2>

       <div className="menu-MB">
          <div className="opcion-MB">
             <img className="img-casa-MB" alt="no aparece" src="/img/casa.png"></img>
          </div>

          <div className="opcion-MB">
             <img className='img-registro-MB' alt='no aparece' src='/img/Registro-PU.png'></img>
          </div>

          <div className="opcion-MB">
             <img className='img-perfil-MB' alt='no aparece' src='/img/Perfil-PU.png'></img>
          </div>

          <div className="opcion-MB">
             <img className='img-estadisticas-MB' alt='no aparece' src='/img/Estadisticas-PU.png'></img>
          </div>

          <div className="opcion-MB">
             <img className='img-cerrar-MB' alt='no aparece' src='/img/cerrar-sesion.png'></img>
          </div>
       </div>
      
    </div>
  )
}

export default BarraMini;
