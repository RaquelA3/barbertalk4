import React from "react";
import './BaseHeader.css';

function BaseHeader() {
 return (
    <nav className="baseheader-encabezado">
       <div className="logo">
          <img src='/img/Encabezado.png' alt='Logo encabezado'></img>
       </div>

       <ul className="baseheader-links"> 
            <li><a href='/agendarC'>MIS CITAS</a></li>
            <li><a href='/preguntas'>PREGUNTAS</a></li>
            <li><a href='/contacto'>CONTACTO</a></li>
            <li><a className='boton-agendar' href="agendarC">AGENDAR</a></li>

            <a href='agendarC'><img src="/img/calendario.png" alt="Logo calendario" className="calendario"></img></a>
            
       </ul>
    </nav>
  );
}

export default BaseHeader;
