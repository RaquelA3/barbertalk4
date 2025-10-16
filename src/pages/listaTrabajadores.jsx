import React, { useState, useEffect} from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import styles from '../styles/listaTrabajadores.module.css';
import { useNavigate } from 'react-router-dom';

function listaTrabajadores() {
  const navigate = useNavigate();

  const trabajadores = [
    'Juan Jose Aguirre Barragan.',
    'Mario Jorge Saucedo Moralez.',
    'Pedro Castañeda Villa.',
    'Saul Carlos Vazquez Campo.',
    'Saul Carlos Vazquez Campo.'
  ];

  return (
     <div className={styles['container-lista-Trabajadores']}>
      {/* Cabecera */}
      <HeaderAdmin />

      {/* Menú lateral */}
      <div className={styles['acomodo-lista-Trabajadores']}>
        <MenuAdmin />
      </div>

      {/* Contenido principal */}
      <div className={styles['cuadro-datos-Barbero']}>
        {/* Columna izquierda: listado y acciones */}
        <div className={styles['formulario-datos-barbero']}>

          <div className={styles['lista-trabajadores-contenido']}>
            <h3 className={styles['subtitulo-trabajadores-barberia']}>
              Trabajadores de la barbería
            </h3>

            <ul className={styles['grupo-trabajadores-lista']}>
              {trabajadores.map((nombre, idx) => (
                <li key={idx} className={styles['trabajador-item-fila']}>
                  <span className={styles['texto-nombre-trabajador']}>{nombre}</span>
                  <button
                    type="button"
                    className={styles['boton-editar-datos']}
                    onClick={() => navigate(`/admin/trabajadores/${idx + 1}/editar`)}
                  >
                    Editar datos
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles['agregar-nuevo-barbero']}>
              <p className={styles['texto-agregar-barbero']}>
                ¿Deseas añadir un nuevo barbero?
              </p>
              <button
                type="button"
                className={styles['boton-anadir-barbero']}
                onClick={() => navigate('/admin/trabajadores/nuevo')}
              >
                Sí, añadir
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha: imagen lateral */}
        <div className={styles['panel-citas-barbero']}>
          <img
            src="/img/Datos-perfilU.png"
            alt="Barbershop"
            className={styles['imagen-panel-barbero']}
          />
        </div>
      </div>
    </div>
  )
}

export default listaTrabajadores;
