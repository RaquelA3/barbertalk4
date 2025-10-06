import React from 'react';
import '../styles/perfilBarbero.css';
import TituloTB from '../components/TituloTB';
import BarraMini from '../components/BarraMini';


function perfilBarbero() {
  return (
    <div className='container-perfilBarbero'>
       {/* Aqui puse el componente que es un encabezado simple y centrado */}
       <TituloTB/>

       {/* Aqui puse el componente de la barra lateral mini */}
       <div className='componente-BarraMini-PF'>
           <BarraMini/>
       </div> 

       {/* Contenido principal */}
       <div className='cuadro-datos-Barbero'>
          <div className='panel-citas-barbero'>
          <img
            src='/img/Datos-perfilU.png'
            alt='barbero'
            className='imagen-panel-barbero'
          />
          <h3>Detalles de las citas:</h3>
          <p> Realizadas <span>10</span></p>
          <p> Total <span>10</span></p>
          <p> Canceladas <span>10</span></p>
        </div>

        <div className='formulario-datos-barbero'>
          <div className='separador-cabecera-formulario'>
            <img className='imagenTijeras-perfilU' alt='no aparece' src='/img/tijera.png'></img>
            <h1 className='titulo-datos-barbero'>
              <span className='negro1-perfilU'>Mis</span> <span className='ama1-perfilU'>Datos</span>
            </h1>
          </div>

          <div className='seccion-formulario'>
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
            <div className='campo-formulario-56'>
              <label>Número de teléfono:</label>
              <input type='text' />
            </div>
            <div className='campo-formulario-56'>
              <label>Nombre:</label>
              <input type='number' />
            </div>
            <div className='campo-formulario-56'>
              <label>Primer Apellido:</label>
              <input type='number' />
            </div>
            <div className='campo-formulario-56'>
              <label>Segundo Apellido:</label>
              <input type='number' />
            </div>
          </div>
          <button className='boton-guardar-cambios'>Guardar cambios</button>
        </div>
      </div>       
    </div>
  )
}

export default perfilBarbero;
