import React from 'react';
import '../styles/perfilBarbero.css';
import TituloTB from '../components/TituloTB';
import BarraMini from '../components/BarraMini';


function perfilBarbero() {
  return (
    <div className='container-perfilBarbero'>
       {/* Aqui puse el componente que es un encabezado simple y centrado */}
       <TituloTB/>

       {/* Aqui puse el componente de la barra lateral mini */}
       <div className='componente-BarraMini-PF'>
           <BarraMini/>
       </div>
       
    </div>
  )
}

export default perfilBarbero;
