import '../styles/iniciosesion.css';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';

//Componente de inicio de sesión
function Iniciosesion() {
  const [form, setForm] = useState({ usuario: '', contraseña: '' });
  const [csrfToken, setCsrfToken] = useState('');

  //Obtener el token CSRF al cargar el componente
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', { 
      credentials: 'include', 
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(err => console.error('Error al obtener token CSRF:', err));
  }, []); //

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(prevForm => {
      const updatedForm = { ...prevForm };
      updatedForm[name] = value;
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { //Enviar el formulario al servidor
      const res = await fetch('https://barbertalk-back.onrender.com/iniciosesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.mensaje || 'Inicio de sesión exitoso');
        //Enviar o guardar sesion aquí
      } else {
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error del servidor');
    }
  };

  //Formulario de inicio de sesiones
  return (
    <div className='container3'>
      <Navbar />
      <div className='cuadro-inicioS'>
        <div className='encabezado'>
          <h1>¡Bienvenido de nuevo!</h1>
          <h2>Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='grid-formulario2'>
            <div className='campo-formulario'>
              <label htmlFor='usuario'>Nombre de usuario o correo:</label>
              <input type='text' id='usuario' name='usuario' value={form.usuario} onChange={handleChange} required />
            </div>
            <div className='campo-formulario'>
              <label htmlFor='contraseña'>Ingrese su contraseña:</label>
              <input type='password' id='contraseña' name='contraseña' value={form.contraseña} onChange={handleChange} required />
            </div>
          </div>
          <button type='submit' className='boton-inicioS'>COMENZAR</button>
          <br />
          <div className='no-cuenta'>
            <a href='/registro'>¿Aún no tienes cuenta?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Iniciosesion;