import "../styles/iniciosesionBarbero.css";
import Navbar from '../components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";


function iniciosesionBarbero() {
  const navigate = useNavigate();

  return (
     <div className="container-inicioS-Barbero">
       {/*  Aqui puse el encabezado del componente Navbar */}
       <Navbar/>

       <div className="cuadro-inicioS-Barbero">
           <div className="encabezado-SB">
             <h1 className="titulo-inicio-SB">Iniciar sesión</h1>
             <h2 className="subtitulo-SB">Hola, Barbero</h2>
           </div> 

           <form>
             <div className="grid-formulario-SB">

               <div className="campo-formulario-SB">
                 <label htmlFor="usuario-SB">Nombre de usuario o correo:</label>
                 <input
                     type="text"
                     id="usuario-SB"
                     name="usuario-SB"
                     required
                 />
               </div> 

               <div className="campo-formulario-SB">
                 <label htmlFor="contraseña-SB">Ingrese su contraseña:</label>
                 <input
                     type="password"
                     id="contraseña-SB"
                     name="contraseña-SB"
                     required
                 />
               </div> 
             </div>

             <button className="boton-inicio-SB" type="submit">COMENZAR</button>

           </form> {/* Este cierra el formulario */}

       </div> {/* Este cierra el cuadro de inicioS-Barbero */}
     </div>/*  Este cierra el div de container-inicioS-Barbero */
  );
}

export default iniciosesionBarbero;
