import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/perfilAdmin.css';
import { useNavigate } from 'react-router-dom';

function perfilAdmin() {
  const navigate = useNavigate();

  return (
    <div className='container-perfilAdmin'>
      {/* Aqui va el encabezado */} 
       <HeaderAdmin/>

       {/* Aqui va el componente de la barra de admin */}
       <div className='acomodo-perfil-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-perfilAdmin'>
         <img className='logo-perfilAdmin' alt='no aparece' src='/img/Perfil-PU.png'></img>
         <h1 className='titulo1-perfilAdmin'>
           <span className='negro-perfil-Admin'>Mi perfil de</span> <span className='amarillo-perfil-Admin'>administrador</span>
         </h1>
         <img className='bigote-perfil-Admin' alt='no aparece' src='/img/BBigote.png'></img>
       </div>

       {/* Sosa aqui programa lo que falta de esta pantalla de perfilAdmin */}

       
    </div>
  )
}

export default perfilAdmin;
