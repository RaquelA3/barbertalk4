import '../styles/registro.css';
import Navbar from '../components/Navbar'; 

function Registro() {
  return(
    <div className='container2'>
       {/* Aqui puse el encabezado */}
       <Navbar/>

       <div className='cuadro-registro'>
         <div className='encabezado'>
             <h1>REGISTRARTE</h1>
         </div>

         <form>
          <div className="grid-formulario">
            <div className='campo-formulario'>
              <label htmlFor='nombre'>Nombre:</label>
              <input type='text' id='nombre' name='nombre' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='edad'>Edad:</label>
              <input type='number' id='edad' name='edad' />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apellido1'>1er Apellido:</label>
              <input type='text' id='apellido1' name='apellido1' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='genero'>Género:</label>
              <select id='genero' name='genero'>
                <option value="">Seleccione una opción</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
                <option value="3">Otro</option>
                <option value="4">Prefiero no decirlo</option>
              </select>
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apellido2'>2do Apellido:</label>
              <input type='text' id='apellido2' name='apellido2' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='calle'>Nombre de la calle:</label>
              <input type='text' id='calle' name='calle' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='correo'>Correo electrónico:</label>
              <input type='email' id='correo' name='correo' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='colonia'>Nombre de la colonia:</label>
              <input type='text' id='colonia' name='colonia' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='telefono'>Número de teléfono:</label>
              <input type='number' id='telefono' name='telefono' required />
            </div>


            <div className='campo-formulario'>
              <label htmlFor='contraseña'>Contraseña:</label>
              <input type='password' id='contraseña' name='contraseña' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apodo'>Nombre de usuario:</label>
              <input type='text' id='apodo' name='apodo' required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='contraseña2'>Confirme su contraseña:</label>
              <input type='password' id='contraseña2' name='contraseña2' required />
            </div>

            <button type='submit' className='boton-registrar'>REGISTRAR</button>
            <br></br>

             <div className='cuenta'>
                <a href='/iniciosesion'>¿Ya tienes cuenta?</a>
             </div>

          </div>
        </form>
       </div>
    </div>
   );
}

export default Registro;
