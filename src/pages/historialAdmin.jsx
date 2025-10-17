import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/historialAdmin.css';
import moment from 'moment';

function HistorialAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificar sesión activa al cargar la pantalla
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/logintrabajador/sesion-activa', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.sesion && data.trabajador) {
          if (data.trabajador.tipo === "1") { // tipo 1 = admin
            setAdmin(data.trabajador);
            obtenerCitas();
          } else {
            alert('No tienes permisos de administrador.');
            navigate('/');
          }
        } else {
          navigate('/iniciosesion');
        }
      })
      .catch(err => {
        console.error('Error al verificar sesión:', err);
        navigate('/iniciosesion');
      });
  }, [navigate]);

  const obtenerCitas = async () => {
    try {
      const res = await fetch('https://barbertalk-back.onrender.com/citaadmin', {
        method: 'GET',
        credentials: 'include', // importante para la sesión
      });

      console.log('Status respuesta:', res.status);

      if (!res.ok) {
        const text = await res.text();
        console.error('Respuesta no OK:', text);
        throw new Error('No se pudo obtener el listado de citas');
      }

      const data = await res.json();
      console.log('Datos de citas:', data);

      if (data.citas) {
        setCitas(data.citas);
      }
    } catch (err) {
      console.error('Error al obtener citas:', err);
      alert('Error del servidor al cargar las citas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-historial-Admin'>
      <HeaderAdmin />
      <div className='acomodo-historial-Admin'>
        <MenuAdmin />
      </div>

      <div className='general-historial-Admin'>
        <img className='logo-historial-Admin' alt='no aparece' src='/img/Registro-PU.png' />
        <h1 className='titulo1-historial-Admin'>
          <span className='negro-historial-Admin'>Registro de las</span> <span className='amarillo-historial-Admin'>citas de hoy</span>
        </h1>
        <img className='bigote-historial-Admin' alt='no aparece' src='/img/BBigote.png' />
      </div>

      <div className='contenedor-tabla-historial-Admin'>
        {loading ? (
          <p>Cargando citas...</p>
        ) : (
          <table className='tabla-historial-HA'>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicios</th>
                <th>Personal a cargo</th>
                <th>Estado de la cita</th>
              </tr>
            </thead>
            <tbody>
              {citas.length > 0 ? (
                citas.map((cita, index) => (
                  <tr key={index}>
                    <td>{moment(cita.fecha_cita).format('DD/MM/YYYY')}</td>
                    <td>{cita.hora_cita}</td>
                    <td>{cita.cliente_nombre_completo}</td>
                    <td style={{
                      color: 'black',
                      width: '10px'
                    }}>
                      {cita.servicios_solicitados}
                    </td>
                    <td>{cita.personal_a_cargo}</td>
                    <td>{cita.estado_cita_texto}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No hay citas registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HistorialAdmin;
