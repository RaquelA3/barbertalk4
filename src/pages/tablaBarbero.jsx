import React, { useState, useEffect} from 'react';
import HeaderBarbero from '../components/HeaderBarbero';
import '../styles/tablaBarbero.css';
import BarraMini from '../components/BarraMini';


function tablaBarbero() {
  return (
    <div className='container-Tabla-Barbero'>
       {/*  Aqui puse el componente del encabezado simple */}
       <HeaderBarbero/> {/* Titulo pendiente, tengo que cambiarlo por el otro componente de TituloTB------------------(PENDIENTE) */}
       

       {/* Aqui puse el componente de la barra lateral mini */}
        <div className='componente-BarraMini'>
           <BarraMini/>
       </div> 



       <div className='cuadro-tablaBarbero'>
         {/* Esta parte es del titulo de "Citas por atender" */}
         <div className='contenido-tituloTB'>
           <img className='imagen-tablaTB' alt='no aparece' src='/img/Registro-PU.png'></img>
           <h1 className='Titulo-tablaTB'>
               <span className='negro1-tablaTB'>Citas por</span> <span className='ama1-tablaTB'>atender</span>
           </h1>
           <img className='Bigote1-tablaTB' alt='no aparece' src='/img/BBigote.png'></img>
         </div> {/* Este cierra el de contenido-tituloTB */}


          {/* Esta parte es la de tabla de citas pendientes del barbero */}
          <div className='contenedor-tabla-citasTB'>
             <table className='tabla-citasTB'>
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
          </div> {/* Este div cierra la seccion de la tabla y sus datos */}

       </div>{/* Este cierra el de cuadro-tablaBarbero */}

       

      
    </div>
  )
}

export default tablaBarbero;
