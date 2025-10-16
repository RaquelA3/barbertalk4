import React, { useState, useEffect } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/perfilAdmin.css';
import { useNavigate } from 'react-router-dom';

function PerfilAdmin() {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');

  const [usuario, setUsuario] = useState({
    nom_usuario: '',
    correo_electronico: '',
    num_telefono: '',
    nombre_trabajador: '',
    primer_apellido: '',
    segundo_apellido: ''
  });

  // Obtener CSRF token
  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        const res = await fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
          credentials: 'include'
        });
        const data = await res.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error al obtener CSRF token:', error);
      }
    };
    fetchCsrf();
  }, []);

  // Obtener datos del perfil
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const res = await fetch('https://barbertalk-back.onrender.com/perfiltrabajador', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();

        if (data.perfil) {
          const t = data.perfil;
          setUsuario({
            nom_usuario: t.nom_usuario || '',
            correo_electronico: t.correo_electronico || '',
            num_telefono: t.num_telefono || '',
            nombre_trabajador: t.nombre_trabajador || '',
            primer_apellido: t.primer_apellido || '',
            segundo_apellido: t.segundo_apellido || ''
          });
        } else {
          console.log('No se obtuvo perfil');
          navigate('/'); // Redirigir al login si no hay perfil
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    obtenerDatosUsuario();
  }, [navigate]);

  // Función para actualizar datos
  const handleGuardarCambios = async () => {
    try {
      const bodyData = {
        nom_usuario: usuario.nom_usuario,
        correo_electronico: usuario.correo_electronico,
        num_telefono: usuario.num_telefono.toString(),
        nombre_trabajador: usuario.nombre_trabajador,
        primer_apellido: usuario.primer_apellido,
        segundo_apellido: usuario.segundo_apellido
      };

      const res = await fetch('https://barbertalk-back.onrender.com/perfiltrabajador', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.mensaje || 'Datos actualizados con éxito');
      } else {
        alert(data.mensaje || 'Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      alert('Error del servidor al actualizar datos');
    }
  };

  return (
    <div className='container-perfilAdmin'>
      <HeaderAdmin />
      <div className='acomodo-perfil-Admin'>
        <MenuAdmin />
      </div>
      <div className='general-perfilAdmin'>
        <h1 className='titulo1-perfilAdmin'>
          <span className='negro-perfil-Admin'>Mi perfil de</span>{' '}
          <span className='amarillo-perfil-Admin'>administrador</span>
        </h1>
      </div>

      <div className='cuadro-datos-Admin'>
        <div className='formulario-datos-Admin'>
          {/* Información básica */}
          <div className='seccion-formulario-Admin'>
            <h3>Información básica</h3>
            <div className='campo-formulario-56'>
              <label>Nombre de usuario:</label>
              <input
                type='text'
                value={usuario.nom_usuario}
                style={{ color: 'black' }}
                onChange={(e) => setUsuario({ ...usuario, nom_usuario: e.target.value })}
              />
            </div>
            <div className='campo-formulario-56'>
              <label>Correo electrónico:</label>
              <input
                type='email'
                value={usuario.correo_electronico}
                style={{ color: 'black' }}
                onChange={(e) => setUsuario({ ...usuario, correo_electronico: e.target.value })}
              />
            </div>
          </div>

          {/* Información adicional */}
          <div className='seccion-formulario' style={{ color: 'black' }}>
            <h3>Información adicional</h3>
            <div className='campo-formulario-57'>
              <label>Número de teléfono:</label>
              <input
                type='text'
                value={usuario.num_telefono}
                style={{ color: 'black' }}
                onChange={(e) => setUsuario({ ...usuario, num_telefono: e.target.value })}
              />
            </div>
            <div className='campo-formulario-57'>
              <label>Nombre:</label>
              <input
                type='text'
                value={usuario.nombre_trabajador}
                style={{ color: 'black' }}
                onChange={(e) => setUsuario({ ...usuario, nombre_trabajador: e.target.value })}
              />
            </div>
            <div className='campo-formulario-57'>
              <label>Primer Apellido:</label>
              <input
                type='text'
                value={usuario.primer_apellido}
                style={{ color: 'black' }}
                onChange={(e) => setUsuario({ ...usuario, primer_apellido: e.target.value })}
              />
            </div>
            <div className='campo-formulario-57'>
              <label>Segundo Apellido:</label>
              <input
                type='text'
                value={usuario.segundo_apellido}
                style={{ color: 'black' }}
                onChange={(e) => setUsuario({ ...usuario, segundo_apellido: e.target.value })}
              />
            </div>
          </div>

          <button
            className='boton-guardar-cambios-Admin'
            type='button'
            onClick={handleGuardarCambios}
          >
            Guardar cambios
          </button>
        </div>

        <div className='panel-citas-Admin'>
          <img
            src='/img/Datos-perfilU.png'
            alt='barbero'
            className='imagen-panel-Admin'
          />
        </div>
      </div>
    </div>
  );
}

export default PerfilAdmin;
