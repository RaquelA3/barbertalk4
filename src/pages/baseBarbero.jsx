import React, { useState, useEffect} from 'react';
import HeaderBarbero from '../components/HeaderBarbero'
import '../styles/baseBarbero.css';
import { useNavigate } from 'react-router-dom';
import BarraGeneral from '../components/BarraGeneral';

function baseBarbero() {
   const navigate = useNavigate(); 
   
  return (
    <div className='container-Base-Barbero'> 
       {/* Aqui puse el otro componente, es el encabezado simple */}
       <HeaderBarbero/>
       {/* Aqui puse el componente que es la barra lateral del barbero */}
       <BarraGeneral/>

       
       <div className='general-baseBarbero'>
        <img className='saludo-BB' alt='no aparece' src='/img/saludar-BB.png'></img>
         <h3 className='titulo3-BB'>
             <span className='negro2-BB'>Hola,</span> <span className='amarillo2-BB'>bienvenido de nuevo</span>
         </h3>
         <img className='bigote-general-BB' alt='no aparece' src='/img/BBigote.png'></img>
         <h4 className='frase-BB'>Un buen estilo, comienza con un buen barbero.</h4>

         <img className='revisa-BB' alt='no aparece' src='/img/general-BB.png'></img>
         <h5 className='mensaje-BB'>Revisa tu citas de hoy para comenzar a trabajar.</h5>
         <button className='btn-revisa-BB' onClick={() => navigate('/tablaBarbero')}>Revisar agenda</button>
       </div> 

       <div className='estado-cita-BB'>
          <div className='cuadro-BB'>
             <img className='logo-cita-BB' alt='no aparece' src='/img/pendiente.png'></img> 
             <p className='subtitulo-cita-BB'>Cita Pendientes</p> 
             <p className='numero-cita-BB'>10</p>
          </div>

          <div className='cuadro-BB'>
             <img className='logo-cita-BB' alt='no aparece' src='/img/realizada.png'></img> 
             <p className='subtitulo-cita-BB'>Cita Realizadas</p> 
             <p className='numero-cita-BB'>12</p>
          </div>

          <div className='cuadro-BB'>
             <img className='logo-cita-BB' alt='no aparece' src='/img/cancelar.png'></img> 
             <p className='subtitulo-cita-BB'>Cita Cancelada</p> 
             <p className='numero-cita-BB'>15</p>
          </div>
       </div>

       





    </div>/*  Este cierra el div de container-Base-Barbero */

    
  )
}

export default baseBarbero
