import React, { useState, useEffect} from 'react';
import HeaderBarbero from '../components/HeaderBarbero';
import '../styles/tablaBarbero.css';
import BarraMini from '../components/BarraMini';

function tablaBarbero() {
  return (
    <div className='container-Tabla-Barbero'>
       {/*  Aqui puse el componente del encabezado simple */}
       <HeaderBarbero/>
       <BarraMini/>

      
    </div>
  )
}

export default tablaBarbero;
