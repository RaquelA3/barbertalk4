import React, { useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/agregarBarbero.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

function AgregarBarbero() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState(false);

  // Estados para inputs
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [contrasena2, setContrasena2] = useState('');
  const [tipo, setTipo] = useState('0'); // 0 = Barbero, 1 = Admin

  // Función para enviar el formulario
  const handleAgregar = async () => {
    try {
      // 1. Obtener CSRF token
      const csrfRes = await fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
        credentials: 'include' // importante
      });
      const csrfData = await csrfRes.json();
      const csrfToken = csrfData.csrfToken;

      // 2. Enviar petición POST con datos
      const res = await fetch('https://barbertalk-back.onrender.com/registrotrabajador', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          nombre,
          primer_apellido: primerApellido,
          segundo_apellido: segundoApellido,
          nom_usuario: usuario,
          correo,
          num_telefono: telefono,
          contrasena,
          contrasena2,
          tipo,
          idsucursal: 1
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registro exitoso. ID trabajador: ' + data.id_trabajador);
        navigate('/listaTrabajadores'); // redirige si quieres
      } else {
        alert('Error: ' + (data.mensaje || data.error));
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className='container-agregar-Admin'>
      <HeaderAdmin/>
      <div className='acomodo-agregar-Admin'><MenuAdmin/></div>

      <div className='general-agregar-Admin'>
        <img className='logo-agregar-Admin' alt='logo' src='/img/AgregarB.png'></img>
        <h1 className='titulo1-agregar-Admin'>
          <span className='negro-agregar-Admin'>Añadir nuevo</span> <span className='amarillo-agregar-Admin'>barbero</span>
        </h1>
        <img className='bigote-agregar-Admin' alt='bigote' src='/img/BBigote.png'></img>
      </div>

      <div className='cuadro-agregar-Admin'>
        <h2 className='titulo2-agregar-Admin'>Escribe los datos del nuevo barbero.</h2>

        <div className='cuadro-datos'>
          <div className="campo-AA">
            <p>Nombre del barbero:</p>
            <input type='text' className='input-AA' value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>

          <div className="campo-AA">
            <p>Apellido paterno:</p>
            <input type='text' className='input-AA' value={primerApellido} onChange={e => setPrimerApellido(e.target.value)} />
          </div>

          <div className="campo-AA">
            <p>Apellido materno:</p>
            <input type='text' className='input-AA' value={segundoApellido} onChange={e => setSegundoApellido(e.target.value)} />
          </div>

          <div className="campo-AA">
            <p>Nombre de usuario:</p>
            <input type='text' className='input-AA' value={usuario} onChange={e => setUsuario(e.target.value)} />
          </div>

          <div className="campo-AA">
            <p>Tipo de acceso:</p>
            <select className="input-AA" value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="0">Barbero</option>
              <option value="1">Administrador</option>
            </select>
          </div>

          <div className="campo-AA">
            <p>Contraseña:</p>
            <input type={mostrar ? 'text' : 'password'} className='input-AA' value={contrasena} onChange={e => setContrasena(e.target.value)} />
            
          </div>

          <div className="campo-AA">
            <p>Confirma la contraseña:</p>
            <input type='password' className='input-AA' value={contrasena2} onChange={e => setContrasena2(e.target.value)} />
          </div>

          <div className="campo-AA">
            <p>Correo electrónico:</p>
            <input type='email' className='input-AA' value={correo} onChange={e => setCorreo(e.target.value)} />
          </div>

          <div className="campo-AA">
            <p>Número de teléfono:</p>
            <input type='number' className='input-AA' value={telefono} onChange={e => setTelefono(e.target.value)} />
          </div>

          <div className="campo-AA">
            <button className='boton-agregar-barbero' onClick={handleAgregar}>Añadir barbero</button>
          </div>

          <img className='fondo-agregar-Admin' alt='fondo' src='/img/Fondo-AA.png' />
        </div>
      </div>
    </div>
  );
}

export default AgregarBarbero;
