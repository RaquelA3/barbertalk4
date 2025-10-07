import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/configuracionAdmin.css';
import { useNavigate } from 'react-router-dom';

function configuracionAdmin() {
  const navigate = useNavigate();

  return (
    <div className='container-config-Admin'>
       {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-config-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-configAdmin'>
         <img className='logo-config-Admin' alt='no aparece' src='/img/configuracion.png'></img>
         <h1 className='titulo1-config-Admin'>
           <span className='negro-config-Admin'>Configuraciones</span> <span className='amarillo-config-Admin'>de la barberia</span>
         </h1>
         <img className='bigote-config-Admin' alt='no aparece' src='/img/BBigote.png'></img>
       </div>

       <div className='cuadro-config-Admin'>
         <div className='parte1-cuadro-CA'> 
           <h2 className='titulo2-config-Admin'>Configuración de horarios de la barberia.</h2>
           <p className='sucursal-nohabiles-CA'>Seleccione la sucursal:</p>
             <select className="sucursal-CA">
              <option value="sucursal1">Sucursal 1</option>
              <option value="sucursal2">Sucursal 2</option>
            </select>

             <p className='dia-nohabil-CA'>Ingrese el dia no habil:</p>
             <input type='date'className='dia-input-nohabil-CA'></input>

             <p className='horario-nohabil-CA'>Horario no habil:</p>
             <input type='time'className='horario-input-nohabil-CA'></input>

             <button className='boton-guardar-nohabil'>Guardar horario</button>
          </div>

          <div className='parte2-cuadro-CA'>
             <h3 className='titulo3-config-Admin'>Configuración de precios por cada servicio.</h3>
             <p className='precio-pelo-CA'>Corte de pelo:</p>
             <input type='number' className='input-corte-CA'></input>

             <p className='precio-barba-CA'>Corte de barba:</p>
             <input type='number' className='input-barba-CA'></input>

             <p className='precio-diseño-CA'>Diseño de barba:</p>
             <input type='number' className='input-diseño-CA'></input>

             <button className='boton-guardar-precio'>Aplicar cambios</button>
          </div>

          <img className='imagen-config-Admin' alt='no aparece' src='/img/fondo-CA.jpg'></img>
          <img className='relleno-config-Admin' alt='no aparece' src='/img/Relleno-CA.png'></img>
          <hr className='linea-vertical-CA'></hr>
       </div> {/* Este div es del cuadro-config-Admin */}

    </div>
  )
}

export default configuracionAdmin;
