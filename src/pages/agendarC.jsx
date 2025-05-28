import '../styles/agendarC.css';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgendarC() {
  return (
        <div className='container5'>
       {/* Aqui puse el componente, que es el encabezado */}
       <Navbar/> 

        <div className='cuadro-agendar'>
        <div className='encabezado'>
          <h1>BIENVENIDO</h1>
        </div>

        <form>
          <div className="grid-formulario">
           <h2 className='TituloI' >Inicio correcto</h2>
          </div>
        </form>
      </div>


    </div>
  );
}

export default AgendarC;
