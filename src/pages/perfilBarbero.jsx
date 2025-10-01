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

       <div className='cuadro-datos-Barbero'>
           <div className='cuadro-foto-detalles'>
             <img className='imagen-datosB' alt='no aparece' src='/img/Datos-perfilU.png'></img>
             <h1 className='Titulo-Detalles-C'>Detalles de las citas:</h1>
             <label className='num-realizadas-DC'>10</label>
             <label className='realizadas-DC'>Realizadas</label>

             <label className='num-total-DC'>9</label>
             <label className='total-DC'>Realizadas</label>

             <label className='num-canceladas-DC'>8</label>
             <label className='canceladas-DC'>Canceladas</label>
           </div> {/* Este cierra el cuadro de la foto y la cita */}

       </div>
       
    </div>
  )
}

export default perfilBarbero;
