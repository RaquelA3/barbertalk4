import '../styles/perfilUsuario.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function perfilUsuario() {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] =  useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [calle, setCalle] = useState('');
  const [colonia, setColonia] = useState('');

  return (
    <div className='container-perfilUsuario'>
       {/* Aqui puse el componente, encabezado */}
       <BaseHeader/>

      <div className='cuadro-datos-U'>
           <img className='imagen-datosU' alt='no aparece' src='/img/Datos-perfilU.png'></img>
             <div className='resumen-perfilU'>
               <img className='imagenTijeras-perfilU' alt='no aparece' src='/img/tijera.png'></img>
               <h1 className='Titulo-perfilU'>
                   <span className='negro1-perfilU'>Mis</span> <span className='ama1-perfilU'>Datos</span>
               </h1>
               
               <div className='contenido-perfilU'>
                 <div className='nombre-perfilU'>
                   <label className='label-nombre-perfilU' htmlFor='username'>Nombre de usuario:</label>
                   <input
                     type='text'
                     id='username'
                     className='input-nombre-perfilU'
                     value={nombreUsuario}
                     onChange={(e) => setNombreUsuario(e.target.value)}
                   />
                 </div>

                 <div className='correo-perfilU'>
                   <label className='label-correo-perfilU' htmlFor='correo'>Correo electronico:</label> 
                   <input
                     type='email'
                     id='correo'
                     className='input-correo-perfilU'
                     name='correo'
                     value={correo}
                     onChange={(e) => setCorreo(e.target.value)}
                   />
                 </div>

                 <div className='telefono-perfilU'>
                   <label className='label-telefono-perfilU' htmlFor='telefono'>Número de teléfono:</label> 
                   <input
                     type='tel'
                     id='telefono'
                     className='input-telefono-perfilU'
                     name='telefono'
                     value={telefono}
                     onChange={(e) => setTelefono(e.target.value)}
                     pattern='[0-9]{10}'
                   />
                 </div>

                 <div className='edad-perfilU'>
                   <label className='label-edad-perfilU' htmlFor='edad'>Edad:</label> 
                   <input
                     type='number'
                     id='edad'
                     className='input-edad-perfilU'
                     name='edad'
                     value={edad}
                     onChange={(e) => setEdad(e.target.value)}
                     min='0'
                     max='120'
                   />
                 </div>

                 <div className='calle-perfilU'>
                   <label className='label-calle-perfilU' htmlFor='calle'>Nombre de la calle:</label> 
                   <input
                     type='text'
                     id='calle'
                     className='input-calle-perfilU'
                     name='calle'
                     value={calle}
                     onChange={(e) => setCalle(e.target.value)}
                   />
                 </div>

                 <div className='colonia-perfilU'>
                   <label className='label-colonia-perfilU' htmlFor='colonia'>Nombre de la colonia:</label> 
                   <input
                     type='text'
                     id='colonia'
                     className='input-colonia-perfilU'
                     name='colonia'
                     value={colonia}
                     onChange={(e) => setColonia(e.target.value)}
                   />
                 </div>
               </div> {/* Este cierra el cuadro de contenido-perfilU*/}

               <button className='boton-guardar-perfilU'>Guardar datos</button>  

               <div className='detalles-perfilU'>
                 <h2 className='sub1-perfilU'>Detalles de las citas:</h2>
                  <div className='num-detalles-perfilU'> 
                    <p className='numD-U'>10</p>
                    <p className='numD-U'>20</p>
                    <p className='numD-U'>30</p>
                  </div>

                  <div className='texto-detalles-perfilU'>
                    <p className='textoD-U'>Realizadas</p>
                    <p className='textoD-U'>Canceladas</p>
                    <p className='textoD3-U'>Total</p>
                  </div>
               </div> {/* Este cierra el div de detalles-perfilU */}


             </div> {/* Este cierra el div de resumen-perfil */}
      </div> {/* Este cierra el div de cuadro-datos-U */}
    </div> /* Este cierra el div del container-perfilUsuario */
  )
}

export default perfilUsuario;
