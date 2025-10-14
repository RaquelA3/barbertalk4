import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/agregarBarbero.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

function AgregarBarbero() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className='container-agregar-Admin'>
       {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-agregar-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-agregar-Admin'>
         <img className='logo-agregar-Admin' alt='no aparece' src='/img/AgregarB.png'></img>
         <h1 className='titulo1-agregar-Admin'>
           <span className='negro-agregar-Admin'>Añadir nuevo</span> <span className='amarillo-agregar-Admin'>barbero</span>
         </h1>
         <img className='bigote-agregar-Admin' alt='no aparece' src='/img/BBigote.png'></img>
       </div>

      <div className='cuadro-agregar-Admin'>
        <h2 className='titulo2-agregar-Admin'>Escribe los datos del nuevo barbero.</h2>
       
        <div className='cuadro-datos'>
        <div className="campo-AA">
          <p>Nombre del barbero:</p>
          <input type='text' className='input-AA' />
        </div>

        <div className="campo-AA">
          <p>Apellido paterno:</p>
          <input type='text' className='input-AA' />
        </div>

        <div className="campo-AA">
          <p>Apellido materno:</p>
          <input type='text' className='input-AA' />
        </div>

        <div className="campo-AA">
          <p>Nombre de usuario:</p>
          <input type='text' className='input-AA' />
        </div>

        <div className="campo-AA">
          <p>Correo electrónico:</p>
          <input type='email' className='input-AA' />
        </div>

        <div className="campo-AA">
          <p>Número de teléfono:</p>
          <input type='number' className='input-AA' />
        </div>

        <div className="campo-AA">
          <button className='boton-agregar-barbero'>Añadir barbero</button>
        </div>



        <img className='fondo-agregar-Admin' alt='no aparece' src='/img/Fondo-AA.png' />
      </div>
      </div>

    </div>
  )
}

export default AgregarBarbero;
