import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Iniciarsesion from './pages/iniciosesion';
import Registro from './pages/registro';
import Preguntas from './pages/preguntas';
import Contacto from './pages/contacto';
import AgendarC from './pages/agendarC';

function App() {
  return (
    <Router>
       <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/iniciosesion' element={<Iniciarsesion/>}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/preguntas' element={<Preguntas/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/agendarC' element={<AgendarC/>}/>
       </Routes> 
    </Router>
  )
}

export default App;