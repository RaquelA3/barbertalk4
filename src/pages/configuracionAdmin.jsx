import React, { useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/configuracionAdmin.css';
import { useNavigate } from 'react-router-dom';

function configuracionAdmin() {
  const navigate = useNavigate();

  // Estados para inputs
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [idSucursal, setIdSucursal] = useState(1); // Siempre es 1

  const handleGuardarHorario = async () => {
    if (!fecha) {
      alert('Seleccione una fecha');
      return;
    }

    try {
      // 1. Obtener CSRF token
      const csrfRes = await fetch('https://barbertalk-back.onrender.com/api/csrf-token', {
        credentials: 'include'
      });
      const csrfData = await csrfRes.json();
      const csrfToken = csrfData.csrfToken;

      // 2. Construir body según si se bloquea hora específica o todo el día
      const body = {
        id_sucursal: idSucursal,
        fecha,
        hora_inicio: hora ? hora : null // null si bloquea todo el día
      };

      // 3. Petición PUT
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
        // Limpiar inputs
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
           ></input>

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

        <div className='parte2-cuadro-CA'>
           <h3 className='titulo3-config-Admin'>Configuración de precios por cada servicio.</h3>
           <p className='precio-pelo-CA'>Corte de pelo:</p>
           <input type='number' className='input-corte-CA'></input>

           <p className='precio-barba-CA'>Corte de barba:</p>
           <input type='number' className='input-barba-CA'></input>

           <p className='precio-diseño-CA'>Diseño de barba:</p>
           <input type='number' className='input-diseño-CA'></input>

           <button className='boton-guardar-precio'>Aplicar cambios</button>
        </div>

        <img className='imagen-config-Admin' alt='no aparece' src='/img/fondo-CA.jpg'></img>
        <img className='relleno-config-Admin' alt='no aparece' src='/img/Relleno-CA.png'></img>
        <hr className='linea-vertical-CA'></hr>
     </div> {/* Este div es del cuadro-config-Admin */}

  </div>
  )
}

export default configuracionAdmin;
