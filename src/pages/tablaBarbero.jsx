import React, { useState, useEffect } from 'react';
import '../styles/tablaBarbero.css';
import TituloTB from '../components/TituloTB';
import BarraMini from '../components/BarraMini';

function formatearFecha(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function formatearHora(horaHHMMSS) {
  if (!horaHHMMSS) return '—';
  const [h='00', m='00', s='00'] = horaHHMMSS.split(':');
  const d = new Date();
  d.setHours(parseInt(h, 10), parseInt(m, 10), parseInt(s, 10), 0);
  return d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function TablaBarbero() {
  const [csrfToken, setCsrfToken] = useState('');
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Nombre del barbero (para "Personal a cargo")
  const nombreBarbero = (() => {
    try {
      // intenta primero en "trabajador", luego en "usuario"
      const t = JSON.parse(localStorage.getItem('trabajador'));
      if (t?.nombre) return t.nombre;
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u?.nombre) return u.nombre;
    } catch { /* ignore */ }
    return 'Tú';
  })();

  // 1) Obtener CSRF Token (texto oculto en URL)
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((e) => {
        console.error(e);
        setError('No se pudo inicializar la sesión (CSRF).');
        setCargando(false);
      });
  }, []);

  // 2) Obtener citas del trabajador cuando haya CSRF
  useEffect(() => {
    if (!csrfToken) return;
    fetch('https://barbertalk-back.onrender.com/perfiltrabajador/citas-historial', {
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrfToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.citas)) {
          setCitas(data.citas);
          setError('');
        } else {
          setCitas([]);
          setError('No se encontraron citas.');
        }
      })
      .catch((e) => {
        console.error(e);
        setError('No se pudieron obtener las citas.');
      })
      .finally(() => setCargando(false));
  }, [csrfToken]);

  return (
    <div className='container-Tabla-Barbero'>
      {/* Encabezado simple */}
      <TituloTB/>

      {/* Barra lateral mini */}
      <div className='componente-BarraMini'>
        <BarraMini/>
      </div>

      <div className='cuadro-tablaBarbero'>
        {/* Título */}
        <div className='contenido-tituloTB'>
          <img className='imagen-tablaTB' alt='no aparece' src='/img/Registro-PU.png' />
          <h1 className='Titulo-tablaTB'>
            <span className='negro1-tablaTB'>Citas por</span> <span className='ama1-tablaTB'>atender</span>
          </h1>
          <img className='Bigote1-tablaTB' alt='no aparece' src='/img/BBigote.png' />
        </div>

        {/* Tabla */}
        <div className='contenedor-tabla-citasTB'>
          <table className='tabla-citasTB'>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicios</th>
                <th>Estado de la cita</th>
              </tr>
            </thead>
            <tbody>
              {cargando && (
                <tr><td colSpan={6}>Cargando citas…</td></tr>
              )}

              {!!error && !cargando && (
                <tr><td colSpan={6} style={{ color: 'crimson' }}>{error}</td></tr>
              )}

              {!cargando && !error && citas.length === 0 && (
                <tr><td colSpan={6}>No hay citas para mostrar.</td></tr>
              )}

              {!cargando && !error && citas.map((cita, idx) => (
                <tr key={`${cita.fecha_cita}-${cita.hora_cita}-${idx}`}>
                  <td>{formatearFecha(cita.fecha_cita)}</td>
                  <td>{formatearHora(cita.hora_cita)}</td>
                  <td>{cita.cliente_nombre_completo || '—'}</td>
                  <td>{cita.servicios_solicitados || '—'}</td>
                  <td>{cita.estado_cita_texto || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{/* fin contenedor tabla */}
      </div>{/* fin cuadro-tablaBarbero */}
    </div>
  );
}