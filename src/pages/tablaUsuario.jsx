import '../styles/tablaUsuario.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function tablaUsuario() {
  return (
    <div className='container-tablaUsuario'>
       {/*  Aqui puse el componnete, que sirve como encabezado */}
       <BaseHeader/>

       <div className='cuadro-tablaUsuario'>
         <div className='contenido-tituloRU'>
           <img className='imagen-tablaRU' alt='no aparece' src='/img/Registro-PU.png'></img>
           <h1 className='Titulo-tablaRU'>
             <span className='negro1-tablaRU'>Registro de</span> <span className='ama1-tablaRU'>sus citas</span>
           </h1>
           <img className='Bigote1-tablaRU' alt='no aparece' src='/img/BBigote.png'></img>
        </div>
        
           <div className='contenedor-tabla-citasRU'>
             <table className='tabla-citasRU'>
               <thead>
                 <tr>
                   <th>Fecha</th>
                   <th>Hora</th>
                   <th>Cliente</th>
                   <th>Servicios</th>
                   <th>Personal a cargo</th>  
                   <th>Estado de la cita</th>
                 </tr>
               </thead>

               <tbody>
                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

                 <tr>
                   <td>06/08/2025</td>
                   <td>10:00 AM</td>
                   <td>Juan Pérez</td>
                   <td>Corte de cabello</td>
                   <td>Barbero 1</td>
                   <td>Pendiente</td>
                 </tr>

               </tbody>

             </table>

           </div>
       </div>

       
    </div> /* Esto cierra el div del container-tablaUsuario */
  )
}

export default tablaUsuario;
