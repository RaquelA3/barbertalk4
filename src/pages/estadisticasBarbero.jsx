import React from 'react'
import '../styles/estadisticasBarbero.css';
import TItuloTB from '../components/TituloTB';
import BarraMini from '../components/BarraMini';
import TituloTB from '../components/TituloTB';

function estadisticasBarbero() {
  return (
    <div className='container-graficaB'>
       {/*  Aqui puse el componente del encabezado simple */}
       <TituloTB/>
       
       
       {/* Aqui puse el componente de la barra lateral mini */}
         <div className='componente-BarraMini-graficaB'>
             <BarraMini/>
         </div> 


      
    </div>
  ) 
}
export default estadisticasBarbero;
