import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/perfilAdmin.css';
import { useNavigate } from 'react-router-dom';

function perfilAdmin() {
  const navigate = useNavigate();

  return (
    <div className='container-perfilAdmin'>
      {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-perfil-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-perfilAdmin'>
         
         <h1 className='titulo1-perfilAdmin'>
           <span className='negro-perfil-Admin'>Mi perfil de</span> <span className='amarillo-perfil-Admin'>administrador</span>
         </h1>
         
       </div>

       {/* Sosa aqui programa lo que falta de esta pantalla de perfilAdmin */}
       <div className='cuadro-datos-Admin'>
          

        <div className='formulario-datos-Admin'>

          <div className='seccion-formulario-Admin'>
            <h3>Información básica</h3>
            <div className='campo-formulario-56'>
              <label>Nombre de usuario:</label>
              <input type='text' />
            </div>
            <div className='campo-formulario-56'>
              <label>Correo electrónico:</label>
              <input type='email' />
            </div>
          </div>

          <div className='seccion-formulario'>
            <h3>Información adicional</h3>
            <div className='campo-formulario-57'>
              <label>Número de teléfono:</label>
              <input type='text' />
            </div>
            <div className='campo-formulario-57'>
              <label>Nombre:</label>
              <input type='number' />
            </div>
            <div className='campo-formulario-57'>
              <label>Primer Apellido:</label>
              <input type='number' />
            </div>
            <div className='campo-formulario-57'>
              <label>Segundo Apellido:</label>
              <input type='number' />
            </div>
          </div>
          <button className='boton-guardar-cambios-Admin'>Guardar cambios</button>
        </div>
        <div className='panel-citas-Admin'>
          <img
            src='/img/Datos-perfilU.png'
            alt='barbero'
            className='imagen-panel-Admin'
          />
          
        </div>
      </div> 
       
    </div>
  )
}

export default perfilAdmin;
