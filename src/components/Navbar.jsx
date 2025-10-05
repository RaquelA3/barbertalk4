import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
     <nav className='navbar-encabezado'>
        <div className='logo'>
             <img src='/img/Encabezado.png' alt='Logo encabezado'></img>
        </div>

        <ul className='nav-links'>
            <li><a href='/registro'>REGISTRARSE</a></li>
            <li><a href='/iniciosesion'>INICIAR SESIÓN</a></li>
            <li><a href='/preguntas'>PREGUNTAS</a></li>
            <li><a href='/principalAdmin'>CONTACTO</a></li>
            <li><a className='boton-agendar' href='/registro'>AGENDAR </a></li>
            
            <a href='/iniciosesionBarbero'><img src="/img/calendario.png" alt="Logo calendario" className="calendario" /></a>
            

        </ul>
     </nav>
  );
}

export default Navbar;
