import '../styles/agendar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

// Tema y estilos personalizados para React Select
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    borderColor: state.isFocused ? '#007bff' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 1px #007bff' : null,
    minHeight: '38px',
    borderRadius: '6px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    color: '#333',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? '#e6f0ff'
      : state.isSelected
      ? '#007bff'
      : 'white',
    color: state.isSelected ? 'white' : '#333',
    cursor: 'pointer',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#007bff',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0056b3',
      color: 'white',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999',
  }),
};

function AgendarC() {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [idSucursal, setIdSucursal] = useState('');
  const [trabajadores, setTrabajadores] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [barberoSeleccionado, setBarberoSeleccionado] = useState('');
  const [bloques, setBloques] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // Obtener token CSRF
  useEffect(() => {
    fetch('http://localhost:3000/api/csrf-token', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/cita/sucursales')
      .then(res => res.json())
      .then(data => {
        if (data.sucursales) setSucursales(data.sucursales);
      })
      .catch(console.error);
  }, []);

  // Obtener trabajadores
    useEffect(() => {
    if (!csrfToken || !idSucursal) return;

    fetch('http://localhost:3000/cita/trabajadores-por-sucursal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ idSucursal }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.trabajadores) setTrabajadores(data.trabajadores);
      })
      .catch(console.error);
  }, [csrfToken, idSucursal]);

  // Obtener horarios disponibles
  useEffect(() => {
    if (!fecha || !barberoSeleccionado || !csrfToken) return;

    fetch('http://localhost:3000/cita/bloques-disponibles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        id_trabajador: barberoSeleccionado,
        fecha,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.bloques) setBloques(data.bloques);
      })
      .catch(console.error);
  }, [fecha, barberoSeleccionado, csrfToken]);

  // Obtener servicios
  useEffect(() => {
    if (!csrfToken || !idSucursal) return;

    fetch('http://localhost:3000/cita/servicios-por-sucursal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ idSucursal }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.servicios) setServicios(data.servicios);
      })
      .catch(console.error);
  }, [csrfToken, idSucursal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !idSucursal ||
      !fecha ||
      !hora ||
      !barberoSeleccionado ||
      serviciosSeleccionados.length === 0
    ) {
      alert('Completa todos los campos y selecciona al menos un servicio.');
      return;
    }

    fetch('http://localhost:3000/cita/agendar', {
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
        id_servicios: serviciosSeleccionados.map((s) => s.value),
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensaje);
        if (data.resultado) {
          navigate('/agendarC');
        }
      })
      .catch(err => {
        console.error('Error al agendar cita:', err);
        alert('Error al agendar cita');
      });
  };

  return (
    <div className="barber-container">
      <div className="cuadro-agendar">
        <div className="encabezado">
          <h2>Registra tu cita</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-formulario">

            <div className="cuadro-sucursal">
              <label>Sucursal:</label>
              <select
                required
                value={idSucursal}
                onChange={(e) => setIdSucursal(e.target.value)}
              >
                <option value="">Selecciona una sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.idsucursal} value={sucursal.idsucursal}>
                    {sucursal.nombre}
                  </option>
                ))}
              </select>
            </div>



            <div className="cuadro-fecha">
              <label className="fechaCita">Fecha de la cita:</label>
              <input
                type="date"
                className="fechaCita"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="cuadro-hora">
              <label className="horaCita">Hora de la cita:</label>
              <select
                className="horaC"
                required
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              >
                <option value="">Selecciona un horario disponible</option>
                {bloques.map((bloque) => (
                  <option key={bloque.id_bloque} value={bloque.id_bloque}>
                    {bloque.hora_inicio}
                  </option>
                ))}
              </select>
            </div>

            <div className="cuadro-barbero">
              <p>Elige tu barbero:</p>
              <select
                className="barbero-seleccionado"
                required
                value={barberoSeleccionado}
                onChange={(e) => setBarberoSeleccionado(e.target.value)}
              >
                <option value="">Selecciona un barbero</option>
                {trabajadores.map((trabajador) => (
                  <option
                    key={trabajador.id_trabajador}
                    value={trabajador.id_trabajador}
                  >
                    {trabajador.nombre_completo}
                  </option>
                ))}
              </select>
            </div>

            <div className="cuadro-servicio">
              <p>Elige uno o más servicios:</p>
              <Select
                isMulti
                options={servicios.map((servicio) => ({
                  value: servicio.id_servicio,
                  label: servicio.nombre,
                }))}
                value={serviciosSeleccionados}
                onChange={(selected) => setServiciosSeleccionados(selected || [])}
                className="servicio-multiselect"
                classNamePrefix="select"
                styles={customStyles}
                placeholder="Selecciona uno o más servicios"
              />
            </div>

            <button className="Agendar" type="submit">
              Agendar cita
            </button>
          </div>
        </form>
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Barber Talk</h1>
          {/* <img className='logo' alt='no aparece' href='/faviconC.ico'></img> */}
        </div>

        <h3>Menu</h3>

        <div className="sidebar-item">
          <span className="Home" onClick={() => navigate('/')}>
            Inicio
          </span>
          <span className="Perfil" onClick={() => navigate('/contacto')}>
            Mi perfil
          </span>
          <span className="RegistroC" onClick={() => navigate('/agendarC')}>
            Mis citas
          </span>
          <span className="AgendarC" onClick={() => navigate('/agendar')}>
            Agendar citas
          </span>
          <span className="HistorialC" onClick={() => navigate('/agendarC')}>
            Historial citas
          </span>
        </div>
      </div>
    </div>
  );
}

export default AgendarC;
