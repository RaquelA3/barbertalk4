import '../styles/iniciosesion.css';
import Navbar from '../components/Navbar'; 

function iniciosesion() {
  return (
    <div className='container3'>
      {/* Aquí va el encabezado */}
      <Navbar />

      <div className='cuadro-inicioS'>
        <div className='encabezado'>
          <h1>¡Bienvenido de nuevo!</h1>
          <h2>Iniciar Sesión</h2>
        </div>


          <div className='grid-formulario2'>
              <div className='campo-formulario'>
                <label htmlFor='nombre'>Nombre de usuario o correo:</label>
                <input type='text' id='nombre' name='nombre' required />
              </div>

              <div className='campo-formulario'>
                <label htmlFor='contraseña'>Ingrese su contraseña:</label>
                <input type='password' id='contraseña' name='contraseña' required />
              </div>
          </div>

          {/* Botón y enlace fuera de la grid */}
          <button type='submit' className='boton-inicioS'>COMENZAR</button>
          <br />
          <div className='no-cuenta'>
            <a href='/registro'>¿Aún no tienes cuenta?</a>
          </div>


      </div>
    </div>
  );
}

export default iniciosesion;