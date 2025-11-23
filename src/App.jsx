import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
          {/* =================================================== */}
          {/* RUTAS PÚBLICAS (Sin protección)           */}
          {/* =================================================== */}
          <Route path='/iniciosesion' element={<Iniciarsesion/>}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/preguntas' element={<Preguntas/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/iniciosesionBarbero' element={<IniciosesionBarbero/>}/>

          {/* ------------------- RUTAS DE CLIENTE ------------------- */}
          <Route path='/principalUsuario' element={<ProtectedRoute rolesPermitidos={['cliente']}><PrincipalUsuario/></ProtectedRoute>}/>
          <Route path='/reservarCita' element={<ProtectedRoute rolesPermitidos={['cliente']}><ReservarCita/></ProtectedRoute>}/>
          <Route path='/perfilUsuario' element={<ProtectedRoute rolesPermitidos={['cliente']}><PerfilUsuario/></ProtectedRoute>}/>
          <Route path='/tablaUsuario' element={<ProtectedRoute rolesPermitidos={['cliente']}><TablaUsuario/></ProtectedRoute>}/>
          {/* Las rutas /agendar* y /base son asumidas como de cliente logueado */}
          <Route path='/agendarC' element={<ProtectedRoute rolesPermitidos={['cliente']}><AgendarC/></ProtectedRoute>}/>
          <Route path='/agendar' element={<ProtectedRoute rolesPermitidos={['cliente']}><Agendar/></ProtectedRoute>}/>
          <Route path='/base' element={<ProtectedRoute rolesPermitidos={['cliente']}><Base/></ProtectedRoute>}/>

          {/* ------------------ RUTAS DE TRABAJADOR ----------------- */}
          {/* Acceso para Barbero (0) y Admin (1) */}
          <Route path='/baseBarbero' element={<ProtectedRoute rolesPermitidos={['0', '1']}><BaseBarbero/></ProtectedRoute>}/>
          <Route path='/tablaBarbero' element={<ProtectedRoute rolesPermitidos={['0', '1']}><TablaBarbero/></ProtectedRoute>}/>
          <Route path='/estadisticasBarbero' element={<ProtectedRoute rolesPermitidos={['0', '1']}><EstadisticasBarbero/></ProtectedRoute>}/>
          <Route path='/perfilBarbero' element={<ProtectedRoute rolesPermitidos={['0', '1']}><PerfilBarbero/></ProtectedRoute>}/>
          <Route path='/historialAdmin' element={<ProtectedRoute rolesPermitidos={['0', '1']}><HistorialAdmin/></ProtectedRoute>}/>

          {/* ------------------- RUTAS DE ADMINISTRADOR ----------------- */}
          {/* Solo acceso para Admin (1) */}
          <Route path='/principalAdmin' element={<ProtectedRoute rolesPermitidos={['1']}><PrincipalAdmin/></ProtectedRoute>}/>
          <Route path='/configuracionAdmin' element={<ProtectedRoute rolesPermitidos={['1']}><ConfiguracionAdmin/></ProtectedRoute>}/>
          <Route path='/perfilAdmin' element={<ProtectedRoute rolesPermitidos={['1']}><PerfilAdmin/></ProtectedRoute>}/>
          <Route path='/estadisticasAdmin' element={<ProtectedRoute rolesPermitidos={['1']}><EstadisticasAdmin/></ProtectedRoute>}/>
             
          {/* RUTAS CRÍTICAS DE ADMINISTRADOR */}
          <Route path='/agregarBarbero' element={<ProtectedRoute rolesPermitidos={['1']}><AgregarBarbero/></ProtectedRoute>}/>
          <Route path='/listaTrabajadores' element={<ProtectedRoute rolesPermitidos={['1']}><ListaTrabajadores/></ProtectedRoute>}/>
       </Routes> 
    </Router>
  );
}

export default App;
