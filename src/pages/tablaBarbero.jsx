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

// --- Normaliza el estado a número, soportando variantes de texto del backend ---
function estadoNormalizado(cita) {
  const raw = cita?.estado_cita;

  // numérico o string numérico: "0","1","2"
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const n = parseInt(raw.trim(), 10);
    if (!Number.isNaN(n)) return n;
  }

  // texto: soportar "Cancelada", "Pendiente", "Finalizada", "Realizada", etc.
  const txt = (cita?.estado_cita_texto || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // cancelada
  if (txt.includes('cancel')) return 0;

  // finalizada / realizada / completada / terminada / hecha
  if (
    txt.includes('final') ||
    txt.includes('realiz') ||    // "realizada"
    txt.includes('complet') ||  // "completada"
    txt.includes('termin') ||   // "terminada"
    txt.includes('hecha')
  ) return 2;

  // pendiente
  if (txt.includes('pend')) return 1;

  // por defecto: pendiente
  return 1;
}

export default function TablaBarbero() {
  const [csrfToken, setCsrfToken] = useState('');
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [accionando, setAccionando] = useState(new Set());

  const nombreBarbero = (() => {
    try {
      const t = JSON.parse(localStorage.getItem('trabajador'));
      if (t?.nombre) return t.nombre;
      const u = JSON.parse(localStorage.getItem('usuario'));
      if (u?.nombre) return u.nombre;
    } catch {}
    return 'Tú';
  })();

  // 1) CSRF
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken))
      .catch(() => {
        setError('No se pudo inicializar la sesión (CSRF).');
        setCargando(false);
      });
  }, []);

  // 2) Obtener citas
  useEffect(() => {
    if (!csrfToken) return;
    fetch('https://barbertalk-back.onrender.com/perfiltrabajador/citas-historial', {
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrfToken },
    })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.citas)) {
          setCitas(d.citas);
          setError('');
        } else {
          setCitas([]);
          setError('No se encontraron citas.');
        }
      })
      .catch(() => setError('No se pudieron obtener las citas.'))
      .finally(() => setCargando(false));
  }, [csrfToken]);

  async function finalizarCita(id_cita) {
    const cita = citas.find(c => c.id_cita === id_cita);
    if (!cita || estadoNormalizado(cita) !== 1) return; // solo si está pendiente

    const confirmar = window.confirm('¿Finalizar esta cita? Esta acción marcará la cita como finalizada.');
    if (!confirmar) return;

    const enCurso = new Set(accionando);
    enCurso.add(id_cita);
    setAccionando(enCurso);

    try {
      const res = await fetch('https://barbertalk-back.onrender.com/citaadmin/finalizar', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ id_cita }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`Error al finalizar (HTTP ${res.status}): ${t || 'sin detalle'}`);
      }

      // reflejar finalización local
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

  return (
    <div className='container-Tabla-Barbero'>
      <TituloTB />

      <div className='componente-BarraMini'>
        <BarraMini />
      </div>

      <div className='cuadro-tablaBarbero'>
        <div className='contenido-tituloTB'>
          <img className='imagen-tablaTB' alt='no aparece' src='/img/Registro-PU.png' />
          <h1 className='Titulo-tablaTB'>
            <span className='negro1-tablaTB'>Citas por</span> <span className='ama1-tablaTB'>atender</span>
          </h1>
          <img className='Bigote1-tablaTB' alt='no aparece' src='/img/BBigote.png' />
        </div>

        <div className='contenedor-tabla-citasTB'>
          <table className='tabla-citasTB'>
            <thead>
              <tr>
                {/* Columna oculta: id_cita */}
                <th style={{ display: 'none' }}>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicios</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando && <tr><td colSpan={7}>Cargando…</td></tr>}
              {error && !cargando && <tr><td colSpan={7} style={{ color: 'crimson' }}>{error}</td></tr>}
              {!cargando && !error && citas.length === 0 && (
                <tr><td colSpan={7}>No hay citas.</td></tr>
              )}

              {!cargando && !error && citas.map((cita, idx) => {
                const est = estadoNormalizado(cita);
                const enProceso = accionando.has(cita.id_cita);
                const textoBoton =
                  enProceso ? 'Procesando…' :
                  est === 2 ? 'Realizada' :
                  est === 0 ? 'Cancelada' : 'Finalizar';

                return (
                  <tr key={cita?.id_cita ?? `${cita.fecha_cita}-${cita.hora_cita}-${idx}`}>
                    {/* Celda oculta: id_cita */}
                    <td style={{ display: 'none' }}>{cita?.id_cita ?? '—'}</td>

                    <td>{formatearFecha(cita.fecha_cita)}</td>
                    <td>{formatearHora(cita.hora_cita)}</td>
                    <td>{cita.cliente_nombre_completo || '—'}</td>
                    <td>
                      {cita.servicios_solicitados
                        ? cita.servicios_solicitados.split(',').map((s, i) => (
                            <span key={i}>{s.trim()}<br/></span>
                          ))
                        : '—'}
                    </td>
                    <td>{cita.estado_cita_texto || (est === 0 ? 'Cancelada' : est === 2 ? 'Realizada' : 'Pendiente')}</td>
                    <td>
                      <button
                        className="btn-finalizar-cita"
                        disabled={enProceso || est !== 1}
                        onClick={() => {
                          if (enProceso || est !== 1) return; // seguridad extra
                          finalizarCita(cita.id_cita);
                        }}
                        aria-disabled={enProceso || est !== 1}
                        title={est === 1 ? 'Marcar como finalizada' : 'Acción no disponible'}
                      >
                        {textoBoton}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
