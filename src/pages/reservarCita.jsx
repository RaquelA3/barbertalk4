import '../styles/reservarCita.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function reservarCita() {
  const navigate = useNavigate(); 

  return (
   <div className='container-Reservar'>
     {/*  Aqui puse el componente, que sirve de encabezado */}
     <BaseHeader/>

     <div className='Reservar'>
         <h1 className='Titulo1-R'>Registre su cita</h1>
         <h2 className='Sub1-R'>
             <span className='negro1-R'>Barber</span> <span className='ama1-R'>Talk</span>
              <img className='Bigote1-R' alt='no aparece' src='/img/BBigote.png'></img>
         </h2>
         <img className='imagen1-R' alt='no aparece' src='/img/Reservar1-R.png'></img>
         <img className='imagen2-R' alt='no aparece' src='/img/Reservar2-R.png'></img>
     
     <div className='formularioReservar'>
        <div className='cuadroReservar'>
           <img className='imagenSilla-R' alt='no aparece' src='/img/Silla.png'></img>
           <h3 className='Sub2-R'>
             <span className='negro2-R'>Barber</span> <span className='ama2-R'>Talk</span>
           </h3>
           <h4 className='Sub3-R'>Agenda tu cita con nosotros.</h4>

           <div className='contenido-formulario'>
              <div className='cuadro-sucursal-R'>
                 <label className='Sucursal-R'>Seleccione una sucursal:</label>
                 <select className='sucursal-seleccionada'>
                     <option value="0">Seleccione una</option>
                     <option value="1">Sucursal Norte</option>
                     <option value="2">Sucursal Sur</option>
                 </select>
              </div>

              <div className='cuadro-fecha-R'>
                 <label className='fechaCita-R'>Fecha de la cita:</label>
                 <input type='date' className='fecha-R' required></input>
              </div>

              <div className='cuadro-hora-R'>
                 <label className='horaCita-R'>Hora de la cita:</label>
                 <select className='horaC-R' required>
                     <option value="">Seleccione un horario</option>
                     <option value="1">10:00</option>
                     <option value="2">11:00</option>
                     <option value="3">12:00</option>
                     <option value="4">1:00</option>
                     <option value="5">2:00</option>
                 </select>
              </div>

              <div className='cuadro-barbero-R'>
                 <p className='barberoE-R'>Elije un barbero:</p>
                 <select className='barbero-seleccionado-R'>
                     <option value="">Seleccione un barbero</option>
                     <option value="1">Pedro Hernandez</option> 
                     <option value="2">Mario Juarez</option>
                 </select>
              </div>

              <div className='cuadro-servicios-R'>
                 <p className='servicio-RC'>Elije uno o más servicios:</p>
                 <select className='servicio-multiselect-R'>
                     <option value="">Selecciona un servicio</option>
                     <option value="1">Corte de cabello</option>
                     <option value="2">Corte de barba</option>
                     <option value="3">Corte de bigote</option>
                 </select>
              </div>
              </div>

              <a className='boton-Reservar-R' href='registro'>AGENDAR CITA</a>
           </div>
        </div> {/* Este cierra el div de contenido-formulario */}
     </div> {/* Este cierra el div de Reservar */}

      
    </div> /* Este cierra el container-ReservarC */
  )
}

export default reservarCita;
