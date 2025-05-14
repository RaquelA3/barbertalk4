import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
     <nav className='navbar-encabezado'>
        <div className='logo'>
             <img src='/public/img/Encabezado.png' alt='Logo encabezado'></img>
        </div>

        <ul className='nav-links'>
            <li><a href='/registro'>REGISTRO</a></li>
            <li><a href='/iniciosesion'>INICIAR SESIÓN</a></li>
            <li><a href='/preguntas'>PREGUNTAS</a></li>
            <li><a href='/contacto'>CONTACTO</a></li>
            <li><a className='boton-agendar' href='/agendarCita'>AGENDAR <span>📅</span></a></li>
        </ul>
     </nav>
  );
}

export default Navbar;
