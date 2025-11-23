import React, { useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import styles from '../styles/listaTrabajadores.module.css';
import { useNavigate } from 'react-router-dom';

function listaTrabajadores() {
  const navigate = useNavigate();

  // Lista en estado para poder eliminar visualmente
  const [trabajadores, setTrabajadores] = useState([
    'Juan Jose Aguirre Barragan.',
    'Mario Jorge Saucedo Moralez.',
    'Pedro Castañeda Villa.',
    'Saul Carlos Vazquez Campo.',
    'Saul Carlos Vazquez Campo.'
  ]);

  // --- Estado del modal de confirmación ---
  const [confirmData, setConfirmData] = useState({
    open: false,
    index: null,
    nombre: ''
  });

  // --- Estado del modal de éxito ---
  const [showSuccess, setShowSuccess] = useState(false);

  const openConfirm = (idx, nombre) => {
    setConfirmData({ open: true, index: idx, nombre });
  };

  const closeConfirm = () => {
    setConfirmData({ open: false, index: null, nombre: '' });
  };

  const closeSuccess = () => setShowSuccess(false);

  // Simulación de eliminación (aquí podrías llamar a tu API DELETE)
  const confirmarEliminacion = async () => {
    // Si tuvieras una API, harías la petición aqui y, al resolver OK:
    setTrabajadores(prev => prev.filter((_, i) => i !== confirmData.index));
    closeConfirm();
    setShowSuccess(true);
  };

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
                    onClick={() => openConfirm(idx, nombre)}
                  >
                    Eliminar
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

      {/* ---------------- MODAL CONFIRMACIÓN ---------------- */}
      {confirmData.open && (
        <div
          className="mini-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closeConfirm}
        >
          <div
            className="mini-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mini-modal-title">
              ¿Desea dar de baja/eliminar a este trabajador?
            </h2>

            <div className="mini-modal-mustache" style={{ marginTop: 6, marginBottom: 10 }}>
              <img src="/img/BBigote.png" alt="moustache" />
            </div>

            <div className="mini-modal-actions">
              <button
                type="button"
                className="mini-modal-cta mini-modal-cta--danger"
                onClick={confirmarEliminacion}
                autoFocus
              >
                Sí
              </button>
              <button
                type="button"
                className="mini-modal-cta mini-modal-cta--secondary"
                onClick={closeConfirm}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MODAL ÉXITO ---------------- */}
      {showSuccess && (
        <div
          className="mini-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closeSuccess}
        >
          <div
            className="mini-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mini-modal-title">¡Se ha eliminado a ese trabajador,</h2>
            <div className="mini-modal-subtitle">con éxito!</div>

            <div className="mini-modal-mustache">
              <img src="/img/BBigote.png" alt="moustache" />
            </div>

            <button
              className="mini-modal-cta"
              type="button"
              onClick={closeSuccess}
              autoFocus
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default listaTrabajadores;
