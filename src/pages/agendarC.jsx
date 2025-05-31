import '../styles/agendar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgendarC() {
  const navigate = useNavigate();

  return (
    <div className='barber-container'>
      <div className='cuadro-agendar'>
        <div className='encabezado'>
          <h2>Registra tu cita</h2>
        </div>

        <form>
          <div className='grid-formulario'>
            <div  className='cuadro-fecha'>
               <label className='fechaCita'>Fecha de la cita:</label>
               <input type='date' className='fechaCita' required></input>
               {/* <button className='btnSiguienteFecha' type='button'>Siguiente</button> */}
            </div> 

            <div  className='cuadro-hora'>
               <label className='horaCita'>Hora de la cita:</label>
               <select className='horaC' required>
                   <option value="">Elige una de los horarios disponibles</option>
                   <option value="1">10:00</option>
                   <option value="2">11:00</option>
                   <option value="3">12:00</option>
                   <option value="4">1:00</option>
               </select>  
            </div>

            <div className='cuadro-barbero'>
               <p>Elije tu barbero:</p>
               <select className='barbero-seleccionado' required>
                   <option value="">Selecciona un barbero</option>
                   <option value="1">Pedro</option>
                   <option value="2">Juan</option>
               </select>
            </div>

            <div className='cuadro-servicio'>
              <p>Elije un servicio:</p>
              <select className='servicio-seleccionado' required>
                   <option value="0">Selecciona un servicio</option>
                   <option value="1">Corte de cabello</option>
                   <option value="2">Corte de barba</option>
                   <option value="3">Corte de bigote</option>
               </select>
            </div>

            <button className='Agendar'>Agendar cita</button>

          </div>
        </form>
      </div>
      


      <div className='sidebar'>
        <div className='sidebar-header'>
          <h1>Barber Talk</h1>
          {/* <img className='logo' alt='no aparece' href='/faviconC.ico'></img> */}
        </div>

        <h3>Menu</h3>

        <div className='sidebar-item'>       
          <span className='Home' onClick={() => navigate('/')}>Inicio</span>                      
          <span className='Perfil' onClick={() => navigate('/contacto')}>Mi perfil</span>         
          <span className='RegistroC' onClick={() => navigate('/agendarC')}>Mis citas</span>     
          <span className='AgendarC' onClick={() => navigate('/agendar')}>Agendar citas</span>    
          <span className='HistorialC' onClick={() => navigate('/agendarC')}>Historial citas</span>
        </div>
      </div>
    </div> /* CIerra el container */

 
  )
}

export default AgendarC;
