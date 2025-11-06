import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/historialAdmin.css';
import moment from 'moment';

function normalizarEstado(cita) {
  const raw = cita?.estado_cita;
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const n = parseInt(raw.trim(), 10);
    if (!Number.isNaN(n)) return n;
  }
  const txt = (cita?.estado_cita_texto || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (txt.includes('cancel')) return 0;
  if (txt.includes('final') || txt.includes('realiz') || txt.includes('complet') || txt.includes('termin') || txt.includes('hecha')) return 2;
  if (txt.includes('pend')) return 1;
  return 1;
}

function HistorialAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState('');
  const [accionando, setAccionando] = useState(new Set()); // ids en proceso

  // --- NUEVO: estado de modales ---
  const [confirmModal, setConfirmModal] = useState({
    open: false, // visible
    tipo: null,  // 'finalizar' | 'cancelar'
    id_cita: null,
    mensaje: ''
  });
  const [successModal, setSuccessModal] = useState({
    open: false,
    mensaje1: '',
    mensaje2: 'con éxito!' // línea dorada
  });

  const abrirConfirm = (tipo, id_cita) => {
    const msg = tipo === 'finalizar'
      ? '¿Desea marcar como realizada esta cita?'
      : '¿Desea cancelar esta cita?';
    setConfirmModal({ open: true, tipo, id_cita, mensaje: msg });
  };
  const cerrarConfirm = () => setConfirmModal({ open: false, tipo: null, id_cita: null, mensaje: '' });
  const abrirSuccess = (linea1, linea2 = 'con éxito!') => setSuccessModal({ open: true, mensaje1: linea1, mensaje2: linea2 });
  const cerrarSuccess = () => setSuccessModal({ open: false, mensaje1: '', mensaje2: 'con éxito!' });

  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/logintrabajador/sesion-activa', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.sesion && data.trabajador) {
          if (data.trabajador.tipo === "1") {
            setAdmin(data.trabajador);
            obtenerCitas();
          } else {
            navigate('/');
          }
        } else {
          navigate('/iniciosesion');
        }
      })
      .catch(() => navigate('/iniciosesion'));
  }, [navigate]);

  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', { credentials: 'include' })
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
      if (!res.ok) throw new Error('No se pudo obtener el listado de citas');
      const data = await res.json();
      if (data.citas) setCitas(data.citas);
    } catch (err) {
      console.error('Error al obtener citas:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Acciones usando modales ---
  async function finalizarCita(id_cita) {
    const cita = citas.find(c => c.id_cita === id_cita);
    if (!cita) return;
    const est = normalizarEstado(cita);
    if (est !== 1) return;

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
      // Optimistic update
      setCitas(prev =>
        prev.map(c => c.id_cita === id_cita ? { ...c, estado_cita: 2, estado_cita_texto: 'Realizada' } : c)
      );
      abrirSuccess('¡La cita ha sido marcada como realizada,');
    } catch (e) {
      console.error(e);
      abrirSuccess('No se pudo completar la acción,', 'intenta nuevamente');
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
    if (est !== 1) return;

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
      // Optimistic update
      setCitas(prev =>
        prev.map(c => c.id_cita === id_cita ? { ...c, estado_cita: 0, estado_cita_texto: 'Cancelada' } : c)
      );
      abrirSuccess('¡La cita ha sido cancelada,');
    } catch (e) {
      console.error(e);
      abrirSuccess('No se pudo completar la acción,', 'intenta nuevamente');
    } finally {
      const fin = new Set(accionando);
      fin.delete(id_cita);
      setAccionando(fin);
    }
  }

  // Confirmar desde el modal
  const onConfirmarDesdeModal = () => {
    const { tipo, id_cita } = confirmModal;
    cerrarConfirm();
    if (tipo === 'finalizar') finalizarCita(id_cita);
    if (tipo === 'cancelar')  cancelarCita(id_cita);
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
          <span className='negro-historial-Admin'>Registro de las</span>{' '}
          <span className='amarillo-historial-Admin'>citas de hoy</span>
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

                  const disabled = enProceso || est !== 1;

                  return (
                    <tr key={index}>
                      <td style={{ display: 'none' }}>{cita.id_cita ?? '—'}</td>
                      <td>{moment(cita.fecha_cita).format('DD/MM/YYYY')}</td>
                      <td>{cita.hora_cita}</td>
                      <td>{cita.cliente_nombre_completo}</td>
                      <td style={{ color: 'black', width: '10px' }}>{cita.servicios_solicitados}</td>
                      <td>{cita.personal_a_cargo}</td>
                      <td>{cita.estado_cita_texto}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="ha-btn-finalizar"
                            disabled={disabled}
                            onClick={() => !disabled && abrirConfirm('finalizar', cita.id_cita)}
                            aria-disabled={disabled}
                            title={est === 1 ? 'Marcar como realizada' : 'Acción no disponible'}
                          >
                            {textoFinalizar}
                          </button>

                          <button
                            className="ha-btn-cancelar"
                            disabled={disabled}
                            onClick={() => !disabled && abrirConfirm('cancelar', cita.id_cita)}
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
                <tr><td colSpan={8}>No hay citas registradas</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ====== MODAL CONFIRMACIÓN ====== */}
      {confirmModal.open && (
        <div className="ha-overlay" role="dialog" aria-modal="true" onClick={cerrarConfirm}>
          <div className="ha-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="ha-title">{confirmModal.mensaje}</h2>
            <div className="ha-mustache">
              {/* Usa la ruta real de tu bigote con líneas */}
              <img src="/img/BBigote.png" alt="moustache" />
            </div>
            <div className="ha-actions">
              <button type="button" className="ha-btn ha-btn-danger" onClick={onConfirmarDesdeModal} autoFocus>Si</button>
              <button type="button" className="ha-btn ha-btn-secondary" onClick={cerrarConfirm}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ====== MODAL ÉXITO ====== */}
      {successModal.open && (
        <div className="ha-overlay" role="dialog" aria-modal="true" onClick={cerrarSuccess}>
          <div className="ha-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="ha-title">{successModal.mensaje1}</h2>
            <div className="ha-subtitle">{successModal.mensaje2}</div>
            <div className="ha-mustache">
              <img src="/img/BBigote.png" alt="moustache" />
            </div>
            <button className="ha-btn ha-btn-primary" type="button" onClick={cerrarSuccess} autoFocus>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistorialAdmin;
