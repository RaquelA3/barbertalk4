import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/estadisticasAdmin.css';
import { useNavigate } from 'react-router-dom';

function estadisticasAdmin() {
  const navigate = useNavigate();

  return (
    <div className='container-estadisticas-Admin'>
       {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-estadisticas-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-estadisticasAdmin'>
         <img className='logo-e-Admin' alt='no aparece' src='/img/Estadisticas-PU.png'></img>
         <h1 className='titulo1-estadisticas-Admin'>
           <span className='negro-estadisticas-Admin'>Estadisticas de</span> <span className='amarillo-estadisticas-Admin'>la barberia</span>
         </h1>
         <img className='bigote-estadisticas-Admin' alt='no aparece' src='/img/BBigote.png'></img>        
       </div>

       {/* <div className='cuadro-esta-Admin'>
         <div className='cuadro1-EA'>
           <h2 className='titulo2-esta-Admin'>Estadisticas de las citas.</h2>
         </div>

       </div> */}

    </div>
  )
}

export default estadisticasAdmin
