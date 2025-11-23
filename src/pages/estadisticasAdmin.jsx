// src/pages/estadisticasAdmin.jsx
import React, { useEffect, useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/estadisticasAdmin.css';
import { useNavigate } from 'react-router-dom';

function estadisticasAdmin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    citasAgendadasMes: 0,
    horasTrabajadasSemana: 0,
    clientesNuevosMes: 0,
    statsMensuales: {
      total_citas: 0,
      realizadas: 0,
      canceladas: 0,
      pendientes: 0,
    },
    topServicios: [],
    tendenciaMensual: [],
  });

  useEffect(() => {
    const obtenerDatosDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        // 1. Obtener CSRF token
        const csrfResponse = await fetch(
          'https://barbertalk-back.onrender.com/api/csrf-token',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (csrfResponse.status === 401 || csrfResponse.status === 403) {
          navigate('/');
          return;
        }

        if (!csrfResponse.ok) {
          throw new Error('No se pudo obtener el token CSRF');
        }

        const csrfJson = await csrfResponse.json();
        const csrfToken =
          csrfJson.csrfToken ||
          csrfJson.token ||
          csrfJson.csrf ||
          '';

        // 2. Obtener estadísticas del dashboard
        const statsResponse = await fetch(
          'https://barbertalk-back.onrender.com/estadisticas',
          {
            method: 'GET',
            credentials: 'include',
            headers: csrfToken ? { 'X-CSRF-Token': csrfToken } : {},
          }
        );

        if (statsResponse.status === 401 || statsResponse.status === 403) {
          navigate('/');
          return;
        }

        if (!statsResponse.ok) {
          throw new Error('No se pudieron obtener las estadísticas');
        }

        const statsJson = await statsResponse.json();
        const data = statsJson.data || {};

        setDashboardData({
          citasAgendadasMes: data.citas_agendadas_mes ?? 0,
          horasTrabajadasSemana: data.horas_trabajadas_semana ?? 0,
          clientesNuevosMes: data.clientes_nuevos_mes ?? 0,
          statsMensuales: data.stats_mensuales || {
            total_citas: 0,
            realizadas: 0,
            canceladas: 0,
            pendientes: 0,
          },
          topServicios: Array.isArray(data.top_servicios)
            ? data.top_servicios
            : [],
          tendenciaMensual: Array.isArray(data.tendencia_mensual)
            ? data.tendencia_mensual
            : [],
        });
      } catch (err) {
        console.error(err);
        setError(
          err.message || 'Ocurrió un error al cargar el dashboard'
        );
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosDashboard();
  }, [navigate]);

  // ==== Helpers para la gráfica ====

  const { tendenciaMensual } = dashboardData;

  const buildPolylinePoints = () => {
    if (!tendenciaMensual || tendenciaMensual.length === 0) return '';

    const valores = tendenciaMensual.map(
      (item) => Number(item.total_citas) || 0
    );

    // Valor de referencia para escalar (30 citas como "tope" por ahora)
    const baseMax = 30;
    const maxValor = Math.max(...valores, baseMax);

    const minY = 10; // parte alta del svg
    const maxY = 55; // parte baja del svg
    const rangoY = maxY - minY;

    if (valores.length === 1) {
      // Solo el mes actual: dibujamos una línea horizontal
      const valorNorm = valores[0] / maxValor;
      const y = maxY - valorNorm * rangoY; // entre 10 y 55
      return `0,${y} 100,${y}`;
    }

    // Cuando el backend devuelva más meses, esto los repartirá de 0 a 100 en X
    return valores
      .map((valor, index) => {
        const x =
          valores.length === 1
            ? 50
            : (index / (valores.length - 1)) * 100;
        const valorNorm = valor / maxValor;
        const y = maxY - valorNorm * rangoY;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const obtenerEtiquetaMes = (mesAnio) => {
    if (!mesAnio) return '';
    const [anio, mes] = mesAnio.split('-');
    const nombresMes = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    const idx = parseInt(mes, 10) - 1;
    const nombre = nombresMes[idx] || mesAnio;
    return `${nombre} ${anio}`;
  };

  const polylinePoints =
    !loading && tendenciaMensual.length > 0
      ? buildPolylinePoints()
      : '';

  const etiquetasMeses =
    !loading && tendenciaMensual.length > 0
      ? tendenciaMensual.map((item) =>
          obtenerEtiquetaMes(item.mes_anio)
        )
      : [];

  // ==== otros datos ====

  const {
    citasAgendadasMes,
    horasTrabajadasSemana,
    clientesNuevosMes,
    statsMensuales,
    topServicios,
  } = dashboardData;

  const realizadasNum = Number(statsMensuales.realizadas) || 0;
  const canceladasNum = Number(statsMensuales.canceladas) || 0;
  const totalNum =
    Number(statsMensuales.total_citas) ||
    realizadasNum + canceladasNum;

  const porcentajeRealizadas = totalNum
    ? ((realizadasNum / totalNum) * 100).toFixed(0)
    : 0;
  const porcentajeCanceladas = totalNum
    ? ((canceladasNum / totalNum) * 100).toFixed(0)
    : 0;

  return (
    <div className="container-estadisticas-Admin">
      {/* Encabezado negro superior */}
      <HeaderAdmin />

      {/* Menú lateral izquierdo */}
      <div className="acomodo-estadisticas-Admin">
        <MenuAdmin />
      </div>

      {/* Título de la pantalla */}
      <div className="general-estadisticasAdmin">
        <img
          className="logo-e-Admin"
          alt="Icono estadísticas"
          src="/img/Estadisticas-PU.png"
        />
        <h1 className="titulo1-estadisticas-Admin">
          <span className="negro-estadisticas-Admin">Estadísticas de</span>{' '}
          <span className="amarillo-estadisticas-Admin">la barbería</span>
        </h1>
        <img
          className="bigote-estadisticas-Admin"
          alt="Bigote barbería"
          src="/img/BBigote.png"
        />
      </div>

      {/* Cuadro principal del dashboard */}
      <div className="dashboard-contenedor-Admin">
        {error && (
          <p style={{ color: '#ffdddd', marginBottom: '8px' }}>
            {error}
          </p>
        )}

        {/* FILA SUPERIOR DE MÉTRICAS */}
        <div className="dashboard-fila-superior-Admin">
          <div className="metricas-caja-Admin">
            <p className="metricas-etiqueta-Admin">
              Citas agendadas este mes
            </p>
            <div className="metricas-valor-caja-Admin">
              <span className="metricas-valor-Admin">
                {loading ? '...' : citasAgendadasMes}
              </span>
            </div>
          </div>

          <div className="metricas-caja-Admin">
            <p className="metricas-etiqueta-Admin">
              Horas trabajadas por semana
            </p>
            <div className="metricas-valor-caja-Admin">
              <span className="metricas-valor-Admin">
                {loading ? '...' : horasTrabajadasSemana}
              </span>
            </div>
          </div>

          <div className="metricas-caja-Admin">
            <p className="metricas-etiqueta-Admin">
              Clientes nuevos este mes
            </p>
            <div className="metricas-valor-caja-Admin">
              <span className="metricas-valor-Admin">
                {loading ? '...' : clientesNuevosMes}
              </span>
            </div>
          </div>
        </div>

        {/* FILA INFERIOR */}
        <div className="dashboard-fila-inferior-Admin">
          {/* Columna izquierda */}
          <div className="dashboard-columna-izquierda-Admin">
            <div className="tarjeta-citas-Admin">
              <h3 className="tarjeta-titulo-Admin">
                Citas completadas vs. citas canceladas
              </h3>

              <div className="tarjeta-leyenda-Admin">
                <div className="tarjeta-leyenda-item-Admin">
                  <span>
                    Citas completadas:{' '}
                    {loading ? '...' : realizadasNum} (
                    {porcentajeRealizadas}%)
                  </span>
                </div>
                <div className="tarjeta-leyenda-item-Admin">
                  <span>
                    Citas canceladas:{' '}
                    {loading ? '...' : canceladasNum} (
                    {porcentajeCanceladas}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="tarjeta-servicios-Admin">
              <h3 className="tarjeta-titulo-Admin">
                Servicios más solicitados
              </h3>
              <ol className="lista-servicios-Admin">
                {loading && <li>Cargando...</li>}
                {!loading && topServicios.length === 0 && (
                  <li>No hay datos disponibles</li>
                )}
                {!loading &&
                  topServicios.map((servicio) => (
                    <li key={servicio.nombre_servicio}>
                      {servicio.nombre_servicio} (
                      {servicio.total_solicitudes})
                    </li>
                  ))}
              </ol>
            </div>
          </div>

          {/* Columna derecha - gráfica */}
          <div className="dashboard-columna-derecha-Admin">
            <div className="tarjeta-grafica-Admin">
              <h3 className="tarjeta-titulo-Admin grafica-titulo-Admin">
                Registro histórico
              </h3>

              <div className="grafica-contenido-Admin">
                <span className="grafica-eje-y-Admin">Citas</span>

                <svg
                  className="grafica-svg-Admin"
                  viewBox="0 0 100 60"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="10"
                    x2="100"
                    y2="10"
                    className="grafica-grid-Admin"
                  />
                  <line
                    x1="0"
                    y1="25"
                    x2="100"
                    y2="25"
                    className="grafica-grid-Admin"
                  />
                  <line
                    x1="0"
                    y1="40"
                    x2="100"
                    y2="40"
                    className="grafica-grid-Admin"
                  />
                  <line
                    x1="0"
                    y1="55"
                    x2="100"
                    y2="55"
                    className="grafica-grid-Admin"
                  />

                  {polylinePoints && (
                    <polyline
                      className="grafica-linea-Admin"
                      points={polylinePoints}
                      fill="none"
                    />
                  )}
                </svg>

                {/* Etiquetas de los meses / meses-año */}
                {!loading && etiquetasMeses.length > 0 && (
                  <div className="grafica-meses-Admin">
                    {etiquetasMeses.map((mes) => (
                      <span key={mes}>{mes}</span>
                    ))}
                  </div>
                )}

                {/* Resumen numérico debajo (opcional) */}
                {!loading && tendenciaMensual.length > 0 && (
                  <ul
                    style={{
                      marginTop: '8px',
                      fontSize: '11px',
                      paddingLeft: '16px',
                    }}
                  >
                    {tendenciaMensual.map((item) => (
                      <li key={item.mes_anio}>
                        {item.mes_anio}: {item.total_citas} citas
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default estadisticasAdmin;
