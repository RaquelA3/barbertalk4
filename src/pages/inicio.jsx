import '../styles/inicio.css';
import Navbar from '../components/Navbar';

function Inicio() {
  return (
    <div className='container'>
       {/* Aqui puse el componente, el encabezado */}
       <Navbar/> 

       <div className='subtitulos'>
          <h2>Tu look habla por ti.</h2>
          <p>Dale forma a tu estilo con nostros y sal con la mejor versión de ti mismo.</p>
          <a href='/agendarC' className='boton-agendarSub'>AGENDAR CITA</a>
       </div>


    </div>
  );
}

export default Inicio;
