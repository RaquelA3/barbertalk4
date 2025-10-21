import '../styles/tablaUsuario.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect } from 'react';

const ESTADO_MAP = {
  '1': 'Pendiente',
  '2': 'Confirmada',
  '3': 'Cancelada',
};

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
  const [h = '00', m = '00', s = '00'] = horaHHMMSS.split(':');
  const d = new Date();
  d.setHours(parseInt(h, 10), parseInt(m, 10), parseInt(s, 10), 0);
  return d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function TablaUsuario() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const clienteNombre = (() => {
    try {
      const u = JSON.parse(localStorage.getItem('usuario'));
      return u?.nombre || 'Tú';
    } catch {
      return 'Tú';
    }
  })();

  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!csrfToken) return;
    fetch('https://barbertalk-back.onrender.com/citacliente', {
      credentials: 'include',
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.citas) setCitas(data.citas);
        setError('');
      })
      .catch((e) => {
        console.error(e);
        setError('No se pudieron obtener tus citas. Intenta más tarde.');
      })
      .finally(() => setCargando(false));
  }, [csrfToken]);

  return (
    <div className="container-tablaUsuario">
      <BaseHeader />

      <div className="cuadro-tablaUsuario">
        <div className="contenido-tituloRU">
          <img className="imagen-tablaRU" alt="no aparece" src="/img/Registro-PU.png" />
          <h1 className="Titulo-tablaRU">
            <span className="negro1-tablaRU">Registro de</span>{' '}
            <span className="ama1-tablaRU">sus citas</span>
          </h1>
          <img className="Bigote1-tablaRU" alt="no aparece" src="/img/BBigote.png" />
        </div>

        <div className="contenedor-tabla-citasRU">
          <table className="tabla-citasRU">
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
              {cargando && (
                <tr>
                  <td colSpan={6}>Cargando citas…</td>
                </tr>
              )}

              {!!error && !cargando && (
                <tr>
                  <td colSpan={6}>{error}</td>
                </tr>
              )}

              {!cargando && !error && citas.length === 0 && (
                <tr>
                  <td colSpan={6}>No tienes citas registradas.</td>
                </tr>
              )}

              {!cargando &&
                !error &&
                citas.map((cita, idx) => (
                  <tr key={`${cita.fecha_cita}-${cita.hora_cita}-${idx}`}>
                    <td>{formatearFecha(cita.fecha_cita)}</td>
                    <td>{formatearHora(cita.hora_cita)}</td>
                    <td>{clienteNombre}</td>
                    <td>
                      {cita.servicios_solicitados
                        ? cita.servicios_solicitados
                         .split(',')
                         .map((servicio, index) => (
                            <span key={index}>
                              {servicio.trim()}
                              <br />
                            </span>
                          ))
                      : '—'}
                    </td>
                    <td>{cita.personal_a_cargo || '—'}</td>
                    <td>{ESTADO_MAP[cita.estado_cita] || 'N/D'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}