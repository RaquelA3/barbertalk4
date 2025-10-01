import "../styles/iniciosesionBarbero.css";
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function IniciosesionBarbero() {
  const [form, setForm] = useState({ usuario: '', contraseña: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [barbero, setBarbero] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener token CSRF desde la ruta global
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(err => console.error('Error al obtener token CSRF:', err));

    // Verificar sesión activa del trabajador
    fetch('https://barbertalk-back.onrender.com/logintrabajador/sesion-activa', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.sesion && data.trabajador) {
          setBarbero(data.trabajador);
          navigate('/baseBarbero'); // Redirige si ya está logueado
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
      const res = await fetch('https://barbertalk-back.onrender.com/logintrabajador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.trabajador) {
        alert(data.mensaje || 'Inicio de sesión exitoso');
        setBarbero(data.trabajador);

        setTimeout(() => {
          navigate('/baseBarbero');
        }, 100);
      } else {
        alert(data.mensaje || 'Los datos ingresados son incorrectos');
        setForm({ usuario: '', contraseña: '' }); // Limpia el formulario
      }

    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error del servidor');
    }
  };

  if (barbero) {
    return (
      <div className="container-inicioS-Barbero">
        <Navbar />
        <div className="cuadro-inicioS-Barbero">
          <h2>Ya estás logueado como {barbero.nombre || barbero.nom_usuario}. Redirigiendo...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container-inicioS-Barbero">
      <Navbar />
      <div className="cuadro-inicioS-Barbero">
        <div className="encabezado-SB">
          <h1 className="titulo-inicio-SB">Iniciar sesión</h1>
          <h2 className="subtitulo-SB">Hola, Barbero</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-formulario-SB">
            <div className="campo-formulario-SB">
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

            <div className="campo-formulario-SB">
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

          <button className="boton-inicio-SB" type="submit">COMENZAR</button>
        </form>
      </div>
    </div>
  );
}

export default IniciosesionBarbero;
