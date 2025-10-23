import React, { useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/configuracionAdmin.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ConfiguracionAdmin() {
  const navigate = useNavigate();

  // Estados para horarios
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [idSucursal, setIdSucursal] = useState(1);
  

  const handleGuardarHorario = async () => {
    if (!fecha) {
      alert('Seleccione una fecha');
      return;
    }

    try {
      const csrfRes = await fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
        credentials: 'include'
      });
      const csrfData = await csrfRes.json();
      const csrfToken = csrfData.csrfToken;

      const body = {
        id_sucursal: idSucursal,
        fecha,
        hora_inicio: hora ? hora : null
      };

      const res = await fetch('https://barbertalk-back.onrender.com/informacioncitas/horario/bloque-deshabilitar', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Horario bloqueado exitosamente');
        setFecha('');
        setHora('');
      } else {
        alert('Error: ' + (data.mensaje || data.error));
      }

    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  };

  // Estados para precios
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [nuevoServicio, setNuevoServicio] = useState('');
  const [agregando, setAgregando] = useState(false);
  const [precio, setPrecio] = useState('');
  const [servicios, setServicios] = useState([
  { id: 1, nombre: 'Corte de barba' },
  { id: 2, nombre: 'Corte de cabello' },
  { id: 3, nombre: 'Peinado' },
]);


  const handleSelectChange = (e) => {
    const valor = e.target.value;
    setServicioSeleccionado(valor);
    setAgregando(valor === '4'); // mostrar input solo si selecciona "Agregar servicio nuevo"
  };

  const guardarNuevoServicio = async () => {
    if (!nuevoServicio.trim()) {
      alert('Por favor, escribe un nombre para el nuevo servicio.');
      return;
    }

    try {
      const res = await fetch('https://barbertalk-back.onrender.com/informacioncitas/servicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_servicio: nuevoServicio })
      });

      if (res.ok) {
        alert('✅ Nuevo servicio agregado correctamente');
        setNuevoServicio('');
        setAgregando(false);
      } else {
        const error = await res.json();
        alert(`Error al guardar: ${error.message || 'Intenta de nuevo'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor.');
    }
  };





  useEffect(() => {
  const cargarServicios = async () => {
    try {
      const res = await fetch('https://barbertalk-back.onrender.com/informacioncitas/servicios', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setServicios(data);
      }
    } catch (err) {
      console.error('Error cargando servicios:', err);
    }
  };
  cargarServicios();
}, []);





  return (
    <div className='container-config-Admin'>
       <HeaderAdmin/>
       <div className='acomodo-config-Admin'>
         <MenuAdmin/>
       </div>

       <div className='general-configAdmin'>
         <img className='logo-config-Admin' alt='no aparece' src='/img/configuracion.png'></img>
         <h1 className='titulo1-config-Admin'>
           <span className='negro-config-Admin'>Configuraciones</span> <span className='amarillo-config-Admin'>de la barberia</span>
         </h1>
         <img className='bigote-config-Admin' alt='no aparece' src='/img/BBigote.png'></img>
       </div>

       <div className='cuadro-config-Admin'>
         <div className='parte1-cuadro-CA'> 
           <h2 className='titulo2-config-Admin'>Configuración de horarios de la barberia.</h2>

           <p className='sucursal-nohabiles-CA'>Seleccione la sucursal:</p>
           <select 
             className="sucursal-CA"
             value={idSucursal}
             onChange={e => setIdSucursal(parseInt(e.target.value))}
           >
              <option value="1">Sucursal 1</option>
           </select>

           <p className='dia-nohabil-CA'>Ingrese el dia no habil:</p>
           <input 
             type='date'
             className='dia-input-nohabil-CA'
             value={fecha}
             onChange={e => setFecha(e.target.value)}
           />

           <p className='horario-nohabil-CA'>Horario no habil:</p>
           <select 
             className='horario-input-nohabil-CA'
             value={hora}
             onChange={e => setHora(e.target.value)}
           >
             <option value=''>Todo el día</option>
             <option value="09:00:00">09:00</option>
             <option value="09:30:00">09:30</option>
             <option value="10:00:00">10:00</option>
             <option value="10:30:00">10:30</option>
             <option value="11:00:00">11:00</option>
             <option value="11:30:00">11:30</option>
             <option value="12:00:00">12:00</option>
             <option value="12:30:00">12:30</option>
             <option value="13:00:00">13:00</option>
             <option value="13:30:00">13:30</option>
             <option value="14:00:00">14:00</option>
             <option value="14:30:00">14:30</option>
             <option value="15:00:00">15:00</option>
             <option value="15:30:00">15:30</option>
             <option value="16:00:00">16:00</option>
             <option value="16:30:00">16:30</option>
             <option value="17:00:00">17:00</option>
             <option value="17:30:00">17:30</option>
             <option value="18:00:00">18:00</option>
             <option value="18:30:00">18:30</option>
           </select>

           <button 
             className='boton-guardar-nohabil'
             onClick={handleGuardarHorario}
           >
             Guardar horario
           </button>
        </div>

        



       {/* --------------------------------------------------------------------------------------------- */}
       {/* Esta seccion es la de configuracion de precios y añadir nuevo servicio */}
<div className='parte2-cuadro-CA'>
  <h3 className='titulo3-config-Admin'>Configuración de precios por cada servicio.</h3>
  <p className='precio-pelo-CA'>Seleccione el servicio:</p>

  <select
    className='input-corte-CA'
    value={servicioSeleccionado}
    onChange={(e) => {
      const valor = e.target.value;
      setServicioSeleccionado(valor);
      setAgregando(valor === '4');
    }}
  >
    
    {servicios.map((s) => (
      <option key={s.id} value={s.id}>{s.nombre}</option>
    ))}
    <option value="4">Agregar servicio nuevo</option>
  </select>

  {agregando && (
    <div style={{ marginTop: '10px' }}>
      <input
        type='text'
        className='input-corte-CA'
        placeholder='Nombre del nuevo servicio'
        value={nuevoServicio}
        onChange={(e) => setNuevoServicio(e.target.value)}
      />
    </div>
  )}

  <p className='precio-barba-CA'>Nuevo precio:</p>
  <input
    type='number'
    className='input-barba-CA'
    value={precio}
    onChange={(e) => setPrecio(e.target.value)}
  />

  <button
    className='boton-guardar-precio'
    onClick={async () => {
      try {
        let csrfToken = '';
        try {
          const csrfRes = await fetch('https://barbertalk-back.onrender.com/api/csrf-token', { credentials: 'include' });
          if (csrfRes.ok) {
            const csrfData = await csrfRes.json();
            csrfToken = csrfData.csrfToken || '';
          }
        } catch {
          console.log('No se pudo obtener CSRF token, continuando sin él');
        }

        let servicioIdParaPrecio = servicioSeleccionado;

        // Agregar nuevo servicio si corresponde
        if (agregando && nuevoServicio.trim()) {
          if (!precio) {
            alert('Ingresa un precio válido para el nuevo servicio');
            return;
          }

          const resServicio = await fetch('https://barbertalk-back.onrender.com/informacioncitas/newservicio', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              ...(csrfToken && { 'CSRF-Token': csrfToken })
            },
            credentials: 'include',
            body: JSON.stringify({
              nombre: nuevoServicio,
              precio: Number(precio),
              duracion: "00:30:00"
            })
          });

          if (!resServicio.ok) {
            const error = await resServicio.json().catch(() => ({}));
            alert(`Error al guardar el nuevo servicio: ${error.message || 'Intenta de nuevo'}`);
            return;
          }

          // Recargar la lista completa de servicios
          const resLista = await fetch('https://barbertalk-back.onrender.com/informacioncitas/servicios', { credentials: 'include' });
          if (resLista.ok) {
            const data = await resLista.json();
            setServicios(data);
            const ultimo = data[data.length - 1]; // selecciona el último agregado
            setServicioSeleccionado(ultimo.id);
          }

          alert('✅ Nuevo servicio agregado correctamente');
          setAgregando(false);
          setNuevoServicio('');
          setPrecio('');
          return;
        }

        // Validaciones para actualizar precio
        if (!servicioIdParaPrecio || servicioIdParaPrecio === '4') {
          alert('Selecciona un servicio válido para asignarle precio');
          return;
        }
        if (!precio) {
          alert('Ingresa un precio válido');
          return;
        }

        // Actualizar precio
        const resPrecio = await fetch('https://barbertalk-back.onrender.com/informacioncitas/precio', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            ...(csrfToken && { 'CSRF-Token': csrfToken })
          },
          credentials: 'include',
          body: JSON.stringify({
            id_servicio: servicioIdParaPrecio,
            nuevo_precio: Number(precio)
          })
        });

        if (!resPrecio.ok) {
          const error = await resPrecio.json().catch(() => ({}));
          alert(`Error al actualizar precio: ${error.message || 'Intenta de nuevo'}`);
          return;
        }

        alert('💰 Precio actualizado correctamente');
        setPrecio('');
        setServicioSeleccionado('');

      } catch (err) {
        console.error('Error de conexión:', err);
        alert('Error al conectar con el servidor');
      }
    }}
  >
    Aplicar cambios
  </button>
</div>








        

        <img className='imagen-config-Admin' alt='no aparece' src='/img/fondo-CA.jpg' />
        <img className='relleno-config-Admin' alt='no aparece' src='/img/Relleno-CA.png' />
        <hr className='linea-vertical-CA' />
     </div> {/* cuadro-config-Admin */}
  </div>
  );
}

export default ConfiguracionAdmin;
