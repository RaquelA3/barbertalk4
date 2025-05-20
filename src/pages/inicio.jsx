import '../styles/inicio.css';
import Navbar from '../components/Navbar';

function Inicio() {
  return (
    <div className='container'>
       {/* Aqui puse el componente, que es el encabezado */}
       <Navbar/> 

       <div className='subtitulos'>
          <h2>Tu look habla por ti.</h2>
          <p>Dale forma a tu estilo con nostros y sal con la mejor versión de ti mismo.</p>
          <a href='/agendar' className='boton-agendarSub'>AGENDAR CITA</a>
       </div>

      {/*  <div className='servicios-container'>
         <h2 className='titulo-S'>SERVICIOS</h2> 
         <div className='servicios-grid'>
           <div className='servicios-card'>Corte de Barba -$110</div>
           <div className='servicios-card'>Arreglo de Barba -$120</div>
           <div className='servicios-card'>Limpieza Facial -$200</div>
           <div className='servicios-card'>Corte + Barba +Bigote -$250</div>
           <div className='servicios-card'>Corte de Bigote -$80</div>
           <div className='servicios-card'>Corte de Cabello -$150</div>
         </div>
       </div> */}


    </div>
  );
}

export default Inicio;
