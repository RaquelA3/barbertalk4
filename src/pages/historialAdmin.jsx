import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/historialAdmin.css';
import { useNavigate } from 'react-router-dom';

function historialAdmin() {
  const navigate = useNavigate(); 

  return (
    <div className='container-historial-Admin'>
       {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-historial-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-historial-Admin'>
         <img className='logo-historial-Admin' alt='no aparece' src='/img/Registro-PU.png'></img>
         <h1 className='titulo1-historial-Admin'>
           <span className='negro-historial-Admin'>Registro de las</span> <span className='amarillo-historial-Admin'>citas de hoy</span>
         </h1>
         <img className='bigote-historial-Admin' alt='no aparece' src='/img/BBigote.png'></img>
       </div>

       {/* Esta parte es la de la tabla de Admin  */}
       <div className='contenedor-tabla-historial-Admin'>
         <table className='tabla-historial-HA'>
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

       </div>

    </div>
  )
}

export default historialAdmin;