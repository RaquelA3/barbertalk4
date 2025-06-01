import '../styles/iniciosesion.css';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Iniciosesion() {
  const [form, setForm] = useState({ usuario: '', contraseña: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener token CSRF
    fetch('http://localhost:3000/api/csrf-token', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(err => console.error('Error al obtener token CSRF:', err));

    // Verificar sesión activa
    fetch('http://localhost:3000/login/sesion-activa', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.sesion) {
          setCliente(data.cliente);
          navigate('/agendarC'); // Redirige si ya está logueado
        }
      })
      .catch(err => console.error('Error al verificar sesión:', err));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.mensaje || 'Inicio de sesión exitoso');
        setCliente(data.cliente);

        // Espera breve antes de redirigir para asegurar que la cookie se guarde
        setTimeout(() => {
          navigate('/agendarC');
        }, 100); // 100 ms suele ser suficiente
      }

    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error del servidor');
    }
  };

  if (cliente) {
    return (
      <div className="container3">
        <Navbar />
        <div className="cuadro-inicioS">
          <h2>Ya estás logueado como {cliente.nombre || cliente.nom_usuario}. Redirigiendo...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container3">
      <Navbar />
      <div className="cuadro-inicioS">
        <div className="encabezado">
          <h1>¡Bienvenido de nuevo!</h1>
          <h2>Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid-formulario2">
            <div className="campo-formulario">
              <label htmlFor="usuario">Nombre de usuario o correo:</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campo-formulario">
              <label htmlFor="contraseña">Ingrese su contraseña:</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={form.contraseña}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="boton-inicioS">COMENZAR</button>
          <br />
          <div className="no-cuenta">
            <a href="/registro">¿Aún no tienes cuenta?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Iniciosesion;
