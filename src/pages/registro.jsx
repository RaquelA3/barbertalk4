import '../styles/registro.css';
import Navbar from '../components/Navbar'; 
import React, { useState, useEffect } from 'react';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    apellido1: '',
    apellido2: '',
    genero: '',
    calle: '',
    colonia: '',
    correo: '',
    telefono: '',
    contraseña: '',
    contraseña2: '',
    apodo: ''
  });

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',  // importante para enviar y recibir cookies
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

    if (form.contraseña !== form.contraseña2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('https://barbertalk-back.onrender.com/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // enviar token CSRF
        },
        credentials: 'include',  // enviar cookies
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.mensaje || 'Registro exitoso');
        // aquí podrías redirigir si quieres
      } else {
        alert(data.mensaje || 'Error en el registro');
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
          <h1>REGISTRATE</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-formulario">
            <div className='campo-formulario'>
              <label htmlFor='nombre'>Nombre:</label>
              <input type='text' id='nombre' name='nombre' onChange={handleChange} required autoFocus />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='edad'>Edad:</label>
              <input type='number' id='edad' name='edad' onChange={handleChange} />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apellido1'>1er Apellido:</label>
              <input type='text' id='apellido1' name='apellido1' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='genero'>Género:</label>
              <select id='genero' name='genero' onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apellido2'>2do Apellido:</label>
              <input type='text' id='apellido2' name='apellido2' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='calle'>Nombre de la calle:</label>
              <input type='text' id='calle' name='calle' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='correo'>Correo electrónico:</label>
              <input type='email' id='correo' name='correo' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='colonia'>Nombre de la colonia:</label>
              <input type='text' id='colonia' name='colonia' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='telefono'>Número de teléfono:</label>
              <input type='number' id='telefono' name='telefono' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='contraseña'>Contraseña:</label>
              <input type='password' id='contraseña' name='contraseña' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='apodo'>Nombre de usuario:</label>
              <input type='text' id='apodo' name='apodo' onChange={handleChange} required />
            </div>

            <div className='campo-formulario'>
              <label htmlFor='contraseña2'>Confirme su contraseña:</label>
              <input type='password' id='contraseña2' name='contraseña2' onChange={handleChange} required />
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
