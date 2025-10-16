import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Cliente
import Inicio from './pages/inicio';
import Iniciarsesion from './pages/iniciosesion';
import Registro from './pages/registro';
import Preguntas from './pages/preguntas';
import Contacto from './pages/contacto';
import AgendarC from './pages/agendarC';
import Agendar from './pages/agendar';
import Base from './pages/base';
import PrincipalUsuario from './pages/principalUsuario';
import ReservarCita from './pages/reservarCita';
import PerfilUsuario from './pages/perfilUsuario';
import TablaUsuario from './pages/tablaUsuario';

// Trabajador
import BaseBarbero from './pages/baseBarbero';
import TablaBarbero from './pages/tablaBarbero';
import EstadisticasBarbero from './pages/estadisticasBarbero';
import PerfilBarbero from './pages/perfilBarbero';
import IniciosesionBarbero from './pages/iniciosesionBarbero';
import PrincipalAdmin from './pages/principalAdmin';
import ConfiguracionAdmin from './pages/configuracionAdmin';
import HistorialAdmin from './pages/historialAdmin';
import PerfilAdmin from './pages/perfilAdmin';
import EstadisticasAdmin from './pages/estadisticasAdmin';
import AgregarBarbero from './pages/agregarBarbero';
import ListaTrabajadores from './pages/listaTrabajadores';

function App() {
  useEffect(() => {
    if (window.console) {
      setTimeout(() => {
        console.log(
          '%c¡Advertencia de seguridad!',
          'color: red; font-size: 30px; font-weight: bold; text-shadow: 1px 1px black;'
        );
        console.log(
          '%cEsta consola del navegador es una función avanzada pensada para desarrolladores.',
          'color: #ffa500; font-size: 16px;'
        );
        console.log(
          '%cSi alguien te dijo que copies y pegues aquí algo para "hackear" cuentas, obtener regalos, o acceder a funciones ocultas: %cES UNA ESTAFA.',
          'color: black; font-size: 14px;', 'color: red; font-weight: bold;'
        );
        console.log(
          '%cPegar código aquí puede darle control total de tu cuenta a otra persona.',
          'color: black; font-size: 14px;'
        );
        console.log(
          '%cNO pegues nada aquí si no sabes exactamente lo que estás haciendo.',
          'color: black; font-size: 14px; font-weight: bold;'
        );
        console.log(
          '%cEste mensaje proviene de BarberTalk 🧔✂️',
          'color: #007bff; font-size: 14px; font-style: italic;'
        );
      }, 1000);
    }
  }, []);

  return (
    <Router>
       <Routes>
          <Route path='/' element={<Inicio/>}/>
          {/* // Cliente */}
          <Route path='/iniciosesion' element={<Iniciarsesion/>}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/preguntas' element={<Preguntas/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/agendarC' element={<AgendarC/>}/>
          <Route path='/agendar' element={<Agendar/>}/>
          <Route path='/agendar' element={<Agendar/>}/>
          <Route path='/base' element={<Base/>}/>
          <Route path='/principalUsuario' element={<PrincipalUsuario/>}/>
          <Route path='/reservarCita' element={<ReservarCita/>}/>
          <Route path='/perfilUsuario' element={<PerfilUsuario/>}/>
          <Route path='/tablaUsuario' element={<TablaUsuario/>}/>

          {/* // Trabajador */}
          <Route path='/baseBarbero' element={<BaseBarbero/>}/>
          <Route path='/tablaBarbero' element={<TablaBarbero/>}/>
          <Route path='/estadisticasBarbero' element={<EstadisticasBarbero/>}/>
          <Route path='/perfilBarbero' element={<PerfilBarbero/>}/>
          <Route path='/iniciosesionBarbero' element={<IniciosesionBarbero/>}/>
          <Route path='/principalAdmin' element={<PrincipalAdmin/>}/>
          <Route path='/configuracionAdmin' element={<ConfiguracionAdmin/>}/>
          <Route path='/historialAdmin' element={<HistorialAdmin/>}/>
          <Route path='/perfilAdmin' element={<PerfilAdmin/>}/>
          <Route path='/estadisticasAdmin' element={<EstadisticasAdmin/>}/>
          <Route path='/agregarBarbero' element={<AgregarBarbero/>}/>
          <Route path='/listaTrabajadores' element={<ListaTrabajadores/>}/>
          
       </Routes> 
    </Router>
  );
}

export default App;
