import React, { useEffect, useState } from 'react';
import '../styles/perfilBarbero.css';
import TituloTB from '../components/TituloTB';
import BarraMini from '../components/BarraMini';

export default function PerfilBarbero() {
  // CSRF
  const [csrfToken, setCsrfToken] = useState('');

  // Estadísticas
  const [citasTotales, setCitasTotales] = useState(0);
  const [citasRealizadas, setCitasRealizadas] = useState(0);
  const [citasCanceladas, setCitasCanceladas] = useState(0);
  const [citasPendientes, setCitasPendientes] = useState(0);

  // Perfil
  const [nomUsuario, setNomUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreTrabajador, setNombreTrabajador] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');

  // UI
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Guardado
  const [guardando, setGuardando] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const [errorGuardado, setErrorGuardado] = useState('');

  // 1) Obtener CSRF (texto oculto en lugar del endpoint real)
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data?.csrfToken || ''))
      .catch((e) => {
        console.error(e);
        setError('No se pudo inicializar la sesión (CSRF).');
        setCargando(false);
      });
  }, []);

  // 2) Estadísticas del trabajador (cuando haya token)
  useEffect(() => {
    if (!csrfToken) return;
    fetch('https://barbertalk-back.onrender.com/perfiltrabajador/estadisticas', {
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrfToken },
    })
      .then((res) => res.json())
      .then((data) => {
        const est = data?.estadisticas || {};
        setCitasTotales(Number(est.citas_totales ?? 0));
        setCitasRealizadas(Number(est.citas_realizadas ?? 0));
        setCitasCanceladas(Number(est.citas_canceladas ?? 0));
        setCitasPendientes(Number(est.citas_pendientes ?? 0));
      })
      .catch((e) => {
        console.error(e);
        setError((prev) => prev || 'No se pudieron obtener las estadísticas.');
      });
  }, [csrfToken]);

  // 3) Perfil del trabajador (cuando haya token)
  useEffect(() => {
    if (!csrfToken) return;
    fetch('https://barbertalk-back.onrender.com/perfiltrabajador/', {
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrfToken },
    })
      .then((res) => res.json())
      .then((data) => {
        const p = data?.perfil || {};
        setNomUsuario(p.nom_usuario || '');
        setCorreoElectronico(p.correo_electronico || '');
        setTelefono(p.num_telefono || '');
        setNombreTrabajador(p.nombre_trabajador || '');
        setPrimerApellido(p.primer_apellido || '');
        setSegundoApellido(p.segundo_apellido || '');
        setError('');
      })
      .catch((e) => {
        console.error(e);
        setError((prev) => prev || 'No se pudo obtener el perfil.');
      })
      .finally(() => setCargando(false));
  }, [csrfToken]);

  // 4) Guardar cambios (PUT/POST con CSRF)
  async function handleGuardarCambios(e) {
    e.preventDefault();
    setMensajeGuardado('');
    setErrorGuardado('');

    // Validaciones básicas
    if (
      !nomUsuario.trim() ||
      !correoElectronico.trim() ||
      !telefono.trim() ||
      !nombreTrabajador.trim() ||
      !primerApellido.trim() ||
      !segundoApellido.trim()
    ) {
      setErrorGuardado('Por favor, completa todos los campos requeridos.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico.trim());
    if (!emailOk) {
      setErrorGuardado('El correo electrónico no tiene un formato válido.');
      return;
    }
    const telOk = /^\d{10}$/.test(telefono.trim());
    if (!telOk) {
      setErrorGuardado('El número de teléfono debe contener 10 dígitos.');
      return;
    }
    if (!csrfToken) {
      setErrorGuardado('No hay token CSRF disponible. Recarga la página.');
      return;
    }

    // Payload con los NOMBRES EXACTOS que requiere el backend
    const payload = {
      nom_usuario: nomUsuario.trim(),
      correo_electronico: correoElectronico.trim(), // exactamente este nombre de clave
      num_telefono: telefono.trim(),
      nombre_trabajador: nombreTrabajador.trim(),
      primer_apellido: primerApellido.trim(),
      segundo_apellido: segundoApellido.trim(),
    };

    try {
      setGuardando(true);
      const res = await fetch('https://barbertalk-back.onrender.com/perfiltrabajador/', {
        method: 'PUT', // Si tu backend espera POST, cambia a 'POST'
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.mensaje || data?.message || 'No se pudieron guardar los datos.');
      }

      setMensajeGuardado(data?.mensaje || 'Datos guardados correctamente.');
      setErrorGuardado('');
    } catch (err) {
      console.error(err);
      setErrorGuardado(err.message || 'Ocurrió un error al guardar.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className='container-perfilBarbero'>
      {/* Encabezado simple y centrado */}
      <TituloTB />

      {/* Barra lateral mini */}
      <div className='componente-BarraMini-PF'>
        <BarraMini />
      </div>

      {/* Contenido principal */}
      <div className='cuadro-datos-Barbero'>
        {/* Panel de estadísticas */}
        <div className='panel-citas-barbero'>
          <img src='/img/Datos-perfilU.png' alt='barbero' className='imagen-panel-barbero' />
          <h3>Detalles de las citas:</h3>

          {cargando && <p style={{ marginTop: 8 }}>Cargando…</p>}
          {!!error && !cargando && <p style={{ marginTop: 8, color: 'crimson' }}>{error}</p>}

          <p>Realizadas <span>{citasRealizadas}</span></p>
          <p>Total <span>{citasTotales}</span></p>
          <p>Canceladas <span>{citasCanceladas}</span></p>
        </div>

        {/* Formulario de datos */}
        <form className='formulario-datos-barbero' onSubmit={handleGuardarCambios}>
          <div className='separador-cabecera-formulario'>
            <img className='imagenTijeras-perfilU' alt='no aparece' src='/img/tijera.png' />
            <h1 className='titulo-datos-barbero'>
              <span className='negro1-perfilU'>Mis</span> <span className='ama1-perfilU'>Datos</span>
            </h1>
          </div>

          <div className='seccion-formulario'>
            <h3>Información básica</h3>
            <div className='campo-formulario-56'>
              <label>Nombre de usuario:</label>
              <input
                type='text'
                value={nomUsuario}
                onChange={(e) => setNomUsuario(e.target.value)}
                required
              />
            </div>
            <div className='campo-formulario-56'>
              <label>Correo electrónico:</label>
              <input
                type='email'
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='seccion-formulario'>
            <h3>Información adicional</h3>
            <div className='campo-formulario-56'>
              <label>Número de teléfono:</label>
              <input
                type='tel'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                pattern='[0-9]{10}'
                required
              />
            </div>
            <div className='campo-formulario-56'>
              <label>Nombre:</label>
              <input
                type='text'
                value={nombreTrabajador}
                onChange={(e) => setNombreTrabajador(e.target.value)}
                required
              />
            </div>
            <div className='campo-formulario-56'>
              <label>Primer Apellido:</label>
              <input
                type='text'
                value={primerApellido}
                onChange={(e) => setPrimerApellido(e.target.value)}
                required
              />
            </div>
            <div className='campo-formulario-56'>
              <label>Segundo Apellido:</label>
              <input
                type='text'
                value={segundoApellido}
                onChange={(e) => setSegundoApellido(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Estado de guardado */}
          {mensajeGuardado && <p style={{ color: 'green', marginTop: 8 }}>{mensajeGuardado}</p>}
          {errorGuardado && <p style={{ color: 'crimson', marginTop: 8 }}>{errorGuardado}</p>}

          <button
            className='boton-guardar-cambios'
            type='submit'
            disabled={guardando || !csrfToken}
            title={!csrfToken ? 'Esperando token CSRF…' : 'Guardar cambios'}
          >
            {guardando ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}