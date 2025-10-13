import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/listaTrabajadores.css';
import { useNavigate } from 'react-router-dom';

function listaTrabajadores() {
  const navigate = useNavigate();

  return (
    <div className='container-lista-Trabajadores'>
      {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-lista-Trabajadores'>
         <MenuAdmin/>
       </div>
       
      
    </div>
  )
}

export default listaTrabajadores;
