import '../styles/reservarCita.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReservarCita() {
  const navigate = useNavigate(); 

  const [csrfToken, setCsrfToken] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [idSucursal, setIdSucursal] = useState('');
  const [trabajadores, setTrabajadores] = useState([]);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [bloques, setBloques] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // Obtener token CSRF
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(console.error);
  }, []);

  // Obtener sucursales
  useEffect(() => {
    fetch('https://barbertalk-back.onrender.com/cita/sucursales', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.sucursales) setSucursales(data.sucursales);
      })
      .catch(console.error);
  }, []);

  // Obtener trabajadores según sucursal
  useEffect(() => {
    if (!csrfToken || !idSucursal) return;

    fetch('https://barbertalk-back.onrender.com/cita/trabajadores-por-sucursal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ idSucursal: parseInt(idSucursal) }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.trabajadores) setTrabajadores(data.trabajadores);
      })
      .catch(console.error);
  }, [csrfToken, idSucursal]);

  // Obtener bloques de horarios disponibles
  useEffect(() => {
    if (!fecha || !barberoSeleccionado || !csrfToken) return;

    fetch('https://barbertalk-back.onrender.com/cita/bloques-disponibles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ id_trabajador: parseInt(barberoSeleccionado), fecha }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.bloques) setBloques(data.bloques);
      })
      .catch(console.error);
  }, [fecha, barberoSeleccionado, csrfToken]);

  const handleSubmit = () => {
    if (!idSucursal || !fecha || !hora || !barberoSeleccionado || serviciosSeleccionados.length === 0) {
      alert('Completa todos los campos y selecciona al menos un servicio.');
      return;
    }

    fetch('https://barbertalk-back.onrender.com/cita/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        idSucursal: parseInt(idSucursal),
        id_trabajador: parseInt(barberoSeleccionado),
        id_bloque_inicio: parseInt(hora),
        id_servicios: serviciosSeleccionados.map(v => parseInt(v)),
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensaje);
        if (data.resultado) navigate('/tablaUsuario');
      })
      .catch(err => {
        console.error('Error al agendar cita:', err);
        alert('Error al agendar cita');
      });
  };

  return (
    <div className='container-Reservar'>
      <BaseHeader/>

      <div className='Reservar'>
        <h1 className='Titulo1-R'>Registre su cita</h1>
        <h2 className='Sub1-R'>
          <span className='negro1-R'>Barber</span> <span className='ama1-R'>Talk</span>
          <img className='Bigote1-R' alt='no aparece' src='/img/BBigote.png'></img>
        </h2>
        <img className='imagen1-R' alt='no aparece' src='/img/Reservar1-R.png'></img>
        <img className='imagen2-R' alt='no aparece' src='/img/Reservar2-R.png'></img>

        <div className='formularioReservar'>
          <div className='cuadroReservar'>
            <img className='imagenSilla-R' alt='no aparece' src='/img/Silla.png'></img>
            <h3 className='Sub2-R'>
              <span className='negro2-R'>Barber</span> <span className='ama2-R'>Talk</span>
            </h3>
            <h4 className='Sub3-R'>Agenda tu cita con nosotros.</h4>

            <div className='contenido-formulario'>

              <div className='cuadro-sucursal-R'>
                <labe className='sucursal-titulo' >Sucursal:</labe>
                <select className='selecciona-sucursal-R'
                  required
                  value={idSucursal}
                  onChange={(e) => setIdSucursal(e.target.value)}
                >
                  <option value="">Selecciona una sucursal</option>
                  {sucursales.map(s => (
                    <option key={s.idsucursal} value={s.idsucursal}>{s.nombre}</option>
                  ))}
                </select>
              </div>

              <div className='cuadro-fecha-R'>
                <label className='fechaCita-R'>Fecha de la cita:</label>
                <input type='date' className='fecha-R' required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div className='cuadro-hora-R'>
                <label className='horaCita-R'>Hora de la cita:</label>
                <select className='horaC-R' required value={hora} onChange={(e) => setHora(e.target.value)}>
                  <option value="">Seleccione un horario</option>
                  {bloques.map(b => (
                    <option key={b.id_bloque} value={b.id_bloque}>{b.hora_inicio}</option>
                  ))}
                </select>
              </div>

              <div className='cuadro-barbero-R'>
                <p className='barberoE-R'>Elije un barbero:</p>
                <select className='barbero-seleccionado-R' required value={barberoSeleccionado} onChange={(e) => setBarberoSeleccionado(e.target.value)}>
                  <option value="">Seleccione un barbero</option>
                  {trabajadores.map(t => (
                    <option key={t.id_trabajador} value={t.id_trabajador}>{t.nombre_completo}</option>
                  ))}
                </select>
              </div>

              <div className='cuadro-servicios-R'>
                <p className='servicio-RC'>Elije uno o más servicios:</p>
                <div className='checkbox-servicios-R'>
                  {[{id:'1', nombre:'Corte de cabello'}, {id:'2', nombre:'Corte de barba'}, {id:'3', nombre:'Corte de bigote'}].map(s => (
                    <label key={s.id}>
                      <input
                        type='checkbox'
                        value={s.id}
                        checked={serviciosSeleccionados.includes(s.id)}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) setServiciosSeleccionados([...serviciosSeleccionados, value]);
                          else setServiciosSeleccionados(serviciosSeleccionados.filter(v => v !== value));
                        }}
                      />
                      {s.nombre}
                    </label>
                  ))}
                </div>
              </div>

              <button className='boton-Reservar-R' type='button' onClick={handleSubmit}>
                AGENDAR CITA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservarCita;
