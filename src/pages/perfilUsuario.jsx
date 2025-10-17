import '../styles/perfilUsuario.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function perfilUsuario() {
  const navigate = useNavigate();

  // Campos de formulario
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [calle, setCalle] = useState('');
  const [colonia, setColonia] = useState('');

  // Otros estados
  const [csrfToken, setCsrfToken] = useState('');
  const [citasPendientes, setCitasPendientes] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Guardado
  const [guardando, setGuardando] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const [errorGuardado, setErrorGuardado] = useState('');

  // 1) Obtener CSRF token
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((e) => {
        console.error(e);
        setError('No se pudo inicializar la sesión (CSRF).');
      });
  }, []);

  // 2) Obtener PERFIL
  useEffect(() => {
    if (!csrfToken) return;

    fetch('https://barbertalk-back.onrender.com/perfilCliente', {
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrfToken },
    })
      .then((res) => res.json())
      .then((data) => {
        const c = data?.cliente || {};
        setNombreUsuario(c.nom_usuario || '');
        setCorreo(c.correo_electronico || '');
        setTelefono(c.num_telefono || '');
        setEdad(
          typeof c.edad === 'number' ? String(c.edad) :
          typeof c.edad === 'string' ? c.edad : ''
        );
        setCalle(c.nombre_calle || '');
        setColonia(c.nombre_colonia || '');
        setError('');
      })
      .catch((e) => {
        console.error(e);
        setError('No se pudo obtener tu perfil.');
      })
      .finally(() => setCargando(false));
  }, [csrfToken]);

  // 3) Obtener CONTEO de citas pendientes
  useEffect(() => {
    if (!csrfToken) return;

    fetch('https://barbertalk-back.onrender.com/perfilCliente/citas-pendientes', {
      credentials: 'include',
      headers: { 'X-CSRF-Token': csrfToken },
    })
      .then((res) => res.json())
      .then((data) => {
        const n = Number(data?.citas_pendientes);
        setCitasPendientes(Number.isFinite(n) ? n : 0);
      })
      .catch((e) => {
        console.error(e);
        setCitasPendientes(0);
      });
  }, [csrfToken]);

  // 4) Guardar cambios (POST/PUT con CSRF)
  async function handleGuardarDatos(e) {
    e.preventDefault();
    setMensajeGuardado('');
    setErrorGuardado('');

    // Validaciones básicas
    if (!nombreUsuario.trim() || !correo.trim() || !telefono.trim() || !calle.trim() || !colonia.trim()) {
      setErrorGuardado('Por favor, completa todos los campos requeridos.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
    if (!emailOk) {
      setErrorGuardado('El correo no tiene un formato válido.');
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

    const payload = {
      nom_usuario: nombreUsuario.trim(),
      correo: correo.trim(),
      num_telefono: telefono.trim(),
      calle: calle.trim(),
      colonia: colonia.trim(),
    };

    try {
      setGuardando(true);
      const res = await fetch('https://barbertalk-back.onrender.com/perfilCliente', {
        method: 'PUT', // Si tu backend espera POST, cambia aquí a 'POST'
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
    <div className='container-perfilUsuario'>
      <BaseHeader/>

      <div className='cuadro-datos-U'>
        <img className='imagen-datosU' alt='no aparece' src='/img/Datos-perfilU.png' />

        <div className='resumen-perfilU'>
          <div className='cabecera-interior'>
          <img className='imagenTijeras-perfilU' alt='no aparece' src='/img/tijera.png' />
          <h1 className='Titulo-perfilU'>
            <span className='negro1-perfilU'>Mis</span> <span className='ama1-perfilU'>Datos</span>
            
          </h1>
          </div>

          {cargando && <p style={{ margin: '8px 0' }}>Cargando información…</p>}
          {!!error && !cargando && <p style={{ margin: '8px 0', color: 'crimson' }}>{error}</p>}

          <form className='contenido-perfilU' onSubmit={handleGuardarDatos}>
            <div className='nombre-perfilU'>
              <label className='label-nombre-perfilU' htmlFor='username'>Nombre de usuario:</label>
              <input
                type='text'
                id='username'
                className='input-nombre-perfilU'
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>

            <div className='correo-perfilU'>
              <label className='label-correo-perfilU' htmlFor='correo'>Correo electrónico:</label>
              <input
                type='email'
                id='correo'
                className='input-correo-perfilU'
                name='correo'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className='telefono-perfilU'>
              <label className='label-telefono-perfilU' htmlFor='telefono'>Número de teléfono:</label>
              <input
                type='tel'
                id='telefono'
                className='input-telefono-perfilU'
                name='telefono'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                pattern='[0-9]{10}'
                required
              />
            </div>

            <div className='edad-perfilU'>
              <label className='label-edad-perfilU' htmlFor='edad'>Edad:</label>
              <input
                type='number'
                id='edad'
                className='input-edad-perfilU'
                name='edad'
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                min='0'
                max='120'
              />
            </div>

            <div className='calle-perfilU'>
              <label className='label-calle-perfilU' htmlFor='calle'>Nombre de la calle:</label>
              <input
                type='text'
                id='calle'
                className='input-calle-perfilU'
                name='calle'
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                required
              />
            </div>

            <div className='colonia-perfilU'>
              <label className='label-colonia-perfilU' htmlFor='colonia'>Nombre de la colonia:</label>
              <input
                type='text'
                id='colonia'
                className='input-colonia-perfilU'
                name='colonia'
                value={colonia}
                onChange={(e) => setColonia(e.target.value)}
                required
              />
            </div>

            {/* Estado de guardado */}
            {mensajeGuardado && (
              <p style={{ color: 'green', marginTop: 8 }}>{mensajeGuardado}</p>
            )}
            {errorGuardado && (
              <p style={{ color: 'crimson', marginTop: 8 }}>{errorGuardado}</p>
            )}

            <button
              className='boton-guardar-perfilU'
              type='submit'
              disabled={guardando || !csrfToken}
              title={!csrfToken ? 'Esperando token CSRF…' : 'Guardar datos'}
            >
              {guardando ? 'Guardando…' : 'Guardar datos'}
            </button>
          </form>

          <div className='detalles-perfilU'>
            <h2 className='sub1-perfilU'>Detalles de las citas:</h2>
            <div className='num-detalles-perfilU'>
              <p className='numD-U'>{citasPendientes}</p>
            </div>
            <div className='texto-detalles-perfilU'>
              <p className='textoD-U'>Pendientes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default perfilUsuario;