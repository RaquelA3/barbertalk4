import '../styles/registro.css';
import Navbar from '../components/Navbar'; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // 🔹 necesario para formatear la fecha

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    fechaNacimiento: '', // input controlado
    apellido1: '',
    apellido2: '',
    genero: '',
    calle: '',
    num_direccion: '', // 🔹 agregado
    colonia: '',
    correo: '',
    telefono: '',
    contraseña: '',
    contraseña2: '',
    apodo: ''
  });

  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  // Obtener token CSRF
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(err => console.error('Error al obtener token CSRF:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fechaNacimiento) {
      alert('Debes seleccionar tu fecha de nacimiento');
      return;
    }

    if (form.contraseña !== form.contraseña2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // 🔹 Convertir fecha a formato DD-MM-YYYY que espera tu backend
    const fnacimiento = moment(form.fechaNacimiento).format('DD-MM-YYYY');

    const datosAEnviar = {
      nombre: form.nombre,
      apellido1: form.apellido1,
      apellido2: form.apellido2,
      correo: form.correo,
      telefono: form.telefono,
      apodo: form.apodo,
      contraseña: form.contraseña, // el backend hace el hash
      contraseña2: form.contraseña2,
      fnacimiento,                 // clave exacta que espera backend
      genero: form.genero,
      calle: form.calle,
      num_direccion: form.num_direccion.toString(), 
      colonia: form.colonia
    };

    try {
      const res = await fetch('https://barbertalk-back.onrender.com/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(datosAEnviar)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.mensaje || 'Registro exitoso');
        navigate('/iniciosesion');
      } else {
        alert(data.error || 'Error en el registro');
      }
    } catch (err) {
      console.error('Error al registrar:', err);
      alert('Error del servidor');
    }
  };

  return (
    <div className='container2'>
      <Navbar/>
      <div className='cuadro-registro'>
        <div className='encabezado'>
          <h1>REGÍSTRATE</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-formulario">

            <div className='campo-formulario'>
              <label htmlFor='nombre'>Nombre:</label>
              <input 
                type='text' 
                id='nombre' 
                name='nombre' 
                value={form.nombre}
                onChange={handleChange} 
                required 
                autoFocus 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='fechaNacimiento'>Fecha de nacimiento:</label>
              <input 
                type='date' 
                id='fechaNacimiento' 
                name='fechaNacimiento' 
                value={form.fechaNacimiento}
                onChange={handleChange} 
                className='fecha-nacimiento-cliente' 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apellido1'>1er Apellido:</label>
              <input 
                type='text' 
                id='apellido1' 
                name='apellido1' 
                value={form.apellido1}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='genero'>Género:</label>
              <select 
                id='genero' 
                name='genero' 
                value={form.genero}
                onChange={handleChange} 
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apellido2'>2do Apellido:</label>
              <input 
                type='text' 
                id='apellido2' 
                name='apellido2' 
                value={form.apellido2}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='calle'>Nombre de la calle:</label>
              <input 
                type='text' 
                id='calle' 
                name='calle' 
                value={form.calle}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='num_direccion'>Número de dirección:</label>
              <input 
                type='text' 
                id='num_direccion' 
                name='num_direccion' 
                value={form.num_direccion}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='correo'>Correo electrónico:</label>
              <input 
                type='email' 
                id='correo' 
                name='correo' 
                value={form.correo}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='colonia'>Nombre de la colonia:</label>
              <input 
                type='text' 
                id='colonia' 
                name='colonia' 
                value={form.colonia}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='telefono'>Número de teléfono:</label>
              <input 
                type='number' 
                id='telefono' 
                name='telefono' 
                value={form.telefono}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='contraseña'>Contraseña:</label>
              <input 
                type='password' 
                id='contraseña' 
                name='contraseña' 
                value={form.contraseña}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apodo'>Nombre de usuario:</label>
              <input 
                type='text' 
                id='apodo' 
                name='apodo' 
                value={form.apodo}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='contraseña2'>Confirme su contraseña:</label>
              <input 
                type='password' 
                id='contraseña2' 
                name='contraseña2' 
                value={form.contraseña2}
                onChange={handleChange} 
                required 
              />
            </div>

            <button type='submit' className='boton-registrar'>REGISTRAR</button>
            <br />
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
