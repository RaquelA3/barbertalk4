import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import '../styles/principalAdmin.css';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';

function principalAdmin() {
  const navigate = useNavigate();

  return (
     <div className='container-Base-Administrador'>
       {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-menuAdmin'>
         <MenuAdmin/>
       </div>

       <div className='general-principalAdmin'>
         <img className='saludo-Admin' alt='no aparece' src='/img/saludar-BB.png'></img>  
         <h1 className='titulo1-Admin'>
           <span className='negro-Admin'>Hola,</span> <span className='amarillo-Admin'>bienvenido de nuevo</span>
         </h1>
         <img className='bigote-principal-Admin' alt='no aparece' src='/img/BBigote.png'></img>

         <div className='cuadro-negro-Admin'>
           <h2 className='mensaje-Admin'>Revisa las ultimas citas realizadas hoy.</h2>
           <button className='btn-revisa-Admin' onClick={() => navigate('/historialAdmin')}>Revisar historial</button>
         </div>

         <div className='cuadro-trabajores-Admin'>
           <h3 className='titulo2-Admin'>Mis trabajadores</h3>
           <img className='logo-Trabajadores-Admin' alt='no aparece' src='/img/manos.png'></img>
           <div className='lista-trabajador-Admin'>
             <p className='nombre-trabajador-Admin'>Jose Manuel Carrazco Lopez.</p>
             <p className='nombre-trabajador-Admin'>Jose Manuel Carrazco Lopez.</p>
             <p className='nombre-trabajador-Admin'>Jose Manuel Carrazco Lopez.</p>
             <p className='nombre-trabajador-Admin'>Jose Manuel Carrazco Lopez.</p>
           </div>
         </div>

         <div className='cuadro-estadisticas-Admin'>
           <h4 className='titulo3-Admin'>Revisar estadisticas</h4> 
           <img className='logo-estadisticas-Admin' alt='no aparece' src='/img/Estadisticas-AD.png'></img>
         </div>

       </div>
       
      


     </div>
  )
}

export default principalAdmin;
