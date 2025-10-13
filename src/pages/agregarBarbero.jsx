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
          <p className='nombre-agregar-Admin'>Nombre del barbero:</p>
          <input type='text' className='input-nombre-AA'></input>
 {/*
          <p className='apellido1-agregar-Admin'>Apellido paterno:</p>
          <input type='text' className='input-apellido1-AA'></input>

          <p className='apellido2-agregar-Admin'>Apellido materno:</p>
          <input type='text' className='input-apellido2-AA'></input>

          <p className='nusaurio-agregar-Admin'>Nombre de usuario:</p>
          <input type='text' className='input-nusuario-AA'></input>

          <p className='correo-agregar-Admin'>Correo electronico:</p>
          <input type='email' className='input-correo-AA'></input>

          <p className='telefono-agregar-Admin'>Numero de telefono:</p>
          <input type='number' className='input-telefono-AA'></input>
 */}
{/*           <div className="campo-contraseña-AA" style={{ position: "relative", width: "45%" }}>
          <p className="contraseña-agregar-Admin">Nueva contraseña:</p>
          <input
            type={mostrar ? "text" : "password"}
            className="input-contraseña-AA"
            style={{ width: "100%", paddingRight: "35px" }}
          />
          <button
            type="button"
            onClick={() => setMostrar(!mostrar)}
            style={{
              position: "absolute",
              right: "10px",
              top: "55%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "black",
            }}
          >
            {mostrar ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div> */}

         <img className='fondo-agregar-Admin' alt='no aparece' src='/img/Fondo-AA.png'></img>
       </div>

    </div>
  )
}

export default AgregarBarbero
