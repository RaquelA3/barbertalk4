import React, { useState, useEffect } from 'react';
import '../styles/tablaBarbero.css';
import TituloTB from '../components/TituloTB';
import BarraMini from '../components/BarraMini';

function formatearFecha(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', {
      day: '2-digit', month: '2-digit', year: 'numeric',
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
  return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function estadoNormalizado(cita) {
  const raw = cita?.estado_cita;
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const n = parseInt(raw.trim(), 10);
    if (!Number.isNaN(n)) return n;
  }
  const txt = (cita?.estado_cita_texto || '')
    .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (txt.includes('cancel')) return 0;
  if (txt.includes('final') || txt.includes('realiz') || txt.includes('complet') || txt.includes('termin') || txt.includes('hecha')) return 2;
  if (txt.includes('pend')) return 1;
  return 1;
}

export default function TablaBarbero() {
  const [csrfToken, setCsrfToken] = useState('');
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [accionando, setAccionando] = useState(new Set());

  // ---- NUEVO: estado de modales ----
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    id_cita: null,
    mensaje: '¿Finalizar esta cita? Esta acción marcará la cita como finalizada.'
  });
  const [successModal, setSuccessModal] = useState({
    open: false,
    linea1: '¡La cita ha sido marcada como realizada,',
    linea2: 'con éxito!'
  });

  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken))
      .catch(() => {
        setError('No se pudo inicializar la sesión (CSRF).');
        setCargando(false);
      });
  }, []);

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

  // Abrir/cerrar modales
  const abrirConfirm = (id_cita) => setConfirmModal((p) => ({ ...p, open: true, id_cita }));
  const cerrarConfirm = () => setConfirmModal((p) => ({ ...p, open: false, id_cita: null }));
  const abrirSuccess = () => setSuccessModal((p) => ({ ...p, open: true }));
  const cerrarSuccess = () => setSuccessModal((p) => ({ ...p, open: false }));

  // Acción real de finalizar (antes estaba dentro de window.confirm)
  async function finalizarCitaAPI(id_cita) {
    const cita = citas.find(c => c.id_cita === id_cita);
    if (!cita || estadoNormalizado(cita) !== 1) return; // solo si está pendiente

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

      abrirSuccess();
    } catch (e) {
      console.error(e);
      // Si quieres un modal de error, aquí puedes abrir otro.
      alert('No se pudo finalizar la cita. Intenta nuevamente.');
    } finally {
      const fin = new Set(accionando);
      fin.delete(id_cita);
      setAccionando(fin);
    }
  }

  // Confirmar desde modal
  const onConfirmarDesdeModal = () => {
    const id = confirmModal.id_cita;
    cerrarConfirm();
    if (id != null) finalizarCitaAPI(id);
  };

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
                          if (enProceso || est !== 1) return;
                          abrirConfirm(cita.id_cita);
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

      {/* ===== Modal Confirmación ===== */}
      {confirmModal.open && (
        <div className="tbm-overlay" role="dialog" aria-modal="true" onClick={cerrarConfirm}>
          <div className="tbm-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="tbm-title">{confirmModal.mensaje}</h2>
            <div className="tbm-mustache">
              <img src="/img/BBigote.png" alt="moustache" />
            </div>
            <div className="tbm-actions">
              <button className="tbm-btn tbm-btn-danger" type="button" onClick={onConfirmarDesdeModal} autoFocus>Si</button>
              <button className="tbm-btn tbm-btn-secondary" type="button" onClick={cerrarConfirm}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Modal Éxito ===== */}
      {successModal.open && (
        <div className="tbm-overlay" role="dialog" aria-modal="true" onClick={cerrarSuccess}>
          <div className="tbm-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="tbm-title">{successModal.linea1}</h2>
            <div className="tbm-subtitle">{successModal.linea2}</div>
            <div className="tbm-mustache">
              <img src="/img/BBigote.png" alt="moustache" />
            </div>
            <button className="tbm-btn tbm-btn-primary" type="button" onClick={cerrarSuccess} autoFocus>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}
