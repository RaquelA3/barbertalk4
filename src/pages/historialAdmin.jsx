import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/historialAdmin.css';
import moment from 'moment';

function normalizarEstado(cita) {
  const raw = cita?.estado_cita;

  // 1) numérico directo
  if (typeof raw === 'number') return raw;

  // 2) string numérico: "0","1","2"
  if (typeof raw === 'string') {
    const n = parseInt(raw.trim(), 10);
    if (!Number.isNaN(n)) return n;
  }

  // 3) texto: Cancelada / Realizada / Finalizada / Completada / Terminada / Hecha / Pendiente
  const txt = (cita?.estado_cita_texto || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (txt.includes('cancel')) return 0;
  if (
    txt.includes('final') ||
    txt.includes('realiz') ||
    txt.includes('complet') ||
    txt.includes('termin') ||
    txt.includes('hecha')
  ) return 2;
  if (txt.includes('pend')) return 1;

  return 1; // por defecto: pendiente
}

function HistorialAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState('');
  const [accionando, setAccionando] = useState(new Set()); // ids en proceso

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

  // Obtener CSRF token (para PUT)
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then(r => r.json())
      .then(d => setCsrfToken(d?.csrfToken || ''))
      .catch(() => setCsrfToken(''));
  }, []);

  const obtenerCitas = async () => {
    try {
      const res = await fetch('https://barbertalk-back.onrender.com/citaadmin', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Respuesta no OK:', text);
        throw new Error('No se pudo obtener el listado de citas');
      }

      const data = await res.json();
      if (data.citas) setCitas(data.citas);
    } catch (err) {
      console.error('Error al obtener citas:', err);
      alert('Error del servidor al cargar las citas.');
    } finally {
      setLoading(false);
    }
  };

  async function finalizarCita(id_cita) {
    const cita = citas.find(c => c.id_cita === id_cita);
    if (!cita) return;

    const est = normalizarEstado(cita);
    if (est !== 1) return; // solo si está pendiente

    const confirmar = window.confirm('¿Finalizar esta cita? Esta acción marcará la cita como realizada.');
    if (!confirmar) return;

    const nuevo = new Set(accionando);
    nuevo.add(id_cita);
    setAccionando(nuevo);

    try {
      const res = await fetch('https://barbertalk-back.onrender.com/citaadmin/finalizar', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        body: JSON.stringify({ id_cita }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`Error al finalizar (HTTP ${res.status}): ${t || 'sin detalle'}`);
      }

      // Optimistic update: marcar como realizada
      setCitas(prev =>
        prev.map(c =>
          c.id_cita === id_cita
            ? { ...c, estado_cita: 2, estado_cita_texto: 'Realizada' }
            : c
        )
      );
    } catch (e) {
      console.error(e);
      alert('No se pudo finalizar la cita. Intenta nuevamente.');
    } finally {
      const fin = new Set(accionando);
      fin.delete(id_cita);
      setAccionando(fin);
    }
  }

  async function cancelarCita(id_cita) {
    const cita = citas.find(c => c.id_cita === id_cita);
    if (!cita) return;

    const est = normalizarEstado(cita);
    if (est !== 1) return; // solo si está pendiente

    const confirmar = window.confirm('¿Cancelar esta cita? Esta acción marcará la cita como cancelada.');
    if (!confirmar) return;

    const nuevo = new Set(accionando);
    nuevo.add(id_cita);
    setAccionando(nuevo);

    try {
      const res = await fetch('https://barbertalk-back.onrender.com/citaadmin/cancelar', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        body: JSON.stringify({ id_cita }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`Error al cancelar (HTTP ${res.status}): ${t || 'sin detalle'}`);
      }

      // Optimistic update: marcar como cancelada
      setCitas(prev =>
        prev.map(c =>
          c.id_cita === id_cita
            ? { ...c, estado_cita: 0, estado_cita_texto: 'Cancelada' }
            : c
        )
      );
    } catch (e) {
      console.error(e);
      alert('No se pudo cancelar la cita. Intenta nuevamente.');
    } finally {
      const fin = new Set(accionando);
      fin.delete(id_cita);
      setAccionando(fin);
    }
  }

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
                {/* Columna oculta ID */}
                <th style={{ display: 'none' }}>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicios</th>
                <th>Personal a cargo</th>
                <th>Estado de la cita</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.length > 0 ? (
                citas.map((cita, index) => {
                  const est = normalizarEstado(cita);
                  const enProceso = accionando.has(cita.id_cita);

                  const textoFinalizar =
                    enProceso ? 'Procesando…' :
                    est === 2 ? 'Realizada' :
                    est === 0 ? 'Cancelada' : 'Finalizar';

                  const textoCancelar =
                    enProceso ? 'Procesando…' :
                    est === 0 ? 'Cancelada' :
                    est === 2 ? 'Realizada' : 'Cancelar';

                  const disabled = enProceso || est !== 1; // ambos comparten la misma regla

                  return (
                    <tr key={index}>
                      {/* Celda oculta ID */}
                      <td style={{ display: 'none' }}>{cita.id_cita ?? '—'}</td>

                      <td>{moment(cita.fecha_cita).format('DD/MM/YYYY')}</td>
                      <td>{cita.hora_cita}</td>
                      <td>{cita.cliente_nombre_completo}</td>
                      <td style={{ color: 'black', width: '10px' }}>
                        {cita.servicios_solicitados}
                      </td>
                      <td>{cita.personal_a_cargo}</td>
                      <td>{cita.estado_cita_texto}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn-finalizar-cita"
                            disabled={disabled}
                            onClick={() => {
                              if (disabled) return;
                              finalizarCita(cita.id_cita);
                            }}
                            aria-disabled={disabled}
                            title={est === 1 ? 'Marcar como realizada' : 'Acción no disponible'}
                          >
                            {textoFinalizar}
                          </button>

                          <button
                            className="btn-cancelar-cita"
                            disabled={disabled}
                            onClick={() => {
                              if (disabled) return;
                              cancelarCita(cita.id_cita);
                            }}
                            aria-disabled={disabled}
                            title={est === 1 ? 'Marcar como cancelada' : 'Acción no disponible'}
                          >
                            {textoCancelar}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>No hay citas registradas</td>
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
