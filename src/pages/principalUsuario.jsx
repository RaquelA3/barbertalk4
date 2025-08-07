import '../styles/principalUsuario.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function principalUsuario() {
  const navigate = useNavigate();

  return (
    <div className='container-PrincipalU'>
       {/* Aqui puse el componente, el encabezado */}
       <BaseHeader/>

      <div className='cuadro-PU'>
        <img className='logo-principalPU' alt='no aparece' src='/img/P-Base.png'></img>
        <h2 className='Titulo-PU'>Bienvenido a</h2>
        <h1 className='Subtitulo-PU'>
          <span className='blancoPU'>Barber </span> <span className='amarilloPU'> Talk</span>
        </h1>
        <img className='bigote-principalPU' alt='no aparece' src='/img/BBigote.png'></img>
        <h3 className='Sub2-PU'>¿Listo para lucir un nuevo look?</h3>
        <a className='botonPU' href='/reservarCita'>AGENDAR CITA</a>  

        <h4 className='Sub3-PU'>
          <span className='negroPU'>Resumen de </span><span className='amaPU'>Actividad</span>
          <img className='bigotePU' alt='no aparece' src='/img/BBigote.png'></img>
        </h4>


        {/* Esto son los 3 cuadros del resumen */}
        <div className='resumen'>
            <div className='cardPU' onClick={() => navigate('/perfilUsuario')}>
               <img className='logo-perfil' alt='no aparece' src='/img/Perfil-PU.png'></img>
               <p className='tituloP'>Mi perfil</p>
            </div> 
            <div className='cardPU'>
               <img className='logo-perfil' alt='no aparece' src='/img/Registro-PU.png'></img>
               <p className='tituloP'>Registro de mis citas</p>
            </div> 
            <div className='cardPU'>
               <img className='logo-perfil' alt='no aparece' src='/img/Estadisticas-PU.png'></img>
               <p className='tituloP'>Estadisticas de mis citas</p>
            </div> 
        </div>

        <div className='lista'>
          <h5 className='Titulo-2'>Nuestros Servicios</h5>
          <h6 className='Sub4-PU'>
             <span className='negro2'>Barber</span><span className='ama2'>Talk</span>
             <img className='Bigote2' alt='no aparece' src='/img/BBigote.png'></img>
          </h6>
       

          <div className='serviciosPU'>
              <div className='card-Usuario cardPU1'>
                  <img className='logo-corte-PU' alt='no aparece' src='/img/tijera.png'></img>
                  <p className='titulo2-PU'>Corte de Pelo</p>
                  <p className='decoracionX-PU'>x x x x</p>
                  <p className='descripcion-PU'>Renueva tu estilo con precisión. Que tu imagen habla por si misma.</p>
              </div>
              <div className='card-Usuario cardPU2'>
                  <img className='logo-corte-PU' alt='no aparece' src='/img/Diseño.png'></img>
                  <p className='titulo2-PU'>Diseño de Corte</p>
                  <p className='decoracionX-PU'>x x x x</p>
                  <p className='descripcion-PU'>Detalles que definen tu estilo. Líneas únicas para cada personalidad.</p>
              </div>
              <div className='card-Usuario cardPU3'>
                  <img className='logo-corte-PU' alt='no aparece' src='/img/Rastrillo.png'></img>
                  <p className='titulo2-PU'>Afeitado de Barba</p>
                  <p className='decoracionX-PU'>x x x x</p>
                  <p className='descripcion-PU'>Cuidado de expertos para tu barba. Estilo limpio, carácter fuerte.</p>
              </div>
              <div className='card-Usuario cardPU4'>
                  <img className='logo-corte-PU' alt='no aparece' src='/img/Tinte.png'></img> 
                  <p className='titulo2-PU'>Tintes de Cabello</p>
                  <p className='decoracionX-PU'>x x x x</p>
                  <p className='descripcion-PU'>Transforma tu look con color. Sé audaz, se diferente siempre.</p>
              </div>
              <div className='card-Usuario cardPU5'>
                  <img className='logo-corte-PU' alt='no aparece' src='/img/Silla.png'></img>
                  <p className='titulo2-PU'>Limpieza Facial</p>
                  <p className='decoracionX-PU'>x x x x</p>
                  <p className='descripcion-PU'>Refresca tu piel con limpieza total. Rostro sano, confianza completa.</p>
              </div>    
          </div>

          <div className='cantidad'>
             <h7 className='Titulo-3'>
                <span className='negro3'>Total de Servicios</span> <span className='ama3'>Realizados</span>
                <img className='Bigote3' alt='no aparece' src='/img/BBigote.png'></img>
             </h7>

             <div className='totalS-PU'>
                <div className='card-Total'>
                   <img className='logo-total' alt='no aparece' src='/img/tijera.png'></img>  
                </div>
                <div className='card-Total'>
                   <img className='logo-total' alt='no aparece' src='/img/Diseño.png'></img> 
                </div>
                <div className='card-Total'>
                   <img className='logo-total' alt='no aparece' src='/img/Rastrillo.png'></img>
                </div>
                <div className='card-Total'>
                   <img className='logo-total' alt='no aparece' src='/img/Tinte.png'></img> 
                </div>
                <div className='card-Total ct5'>
                   <img className='logo-total' alt='no aparece' src='/img/Silla.png'></img>
                </div>
             </div>

             <div className='texto'>
               <div className='grupo-numeros'>
                   <p className='numero n1'>120</p>
                   <p className='numero n2'>50</p>
                   <p className='numero n3'>100</p>
                   <p className='numero n4'>25</p>
                   <p className='numero n5'>90</p>
               </div>

               <div className='grupo-nombres'>
                   <p className='nombre-servicio s1'>Corte de Pelo</p>
                   <p className='nombre-servicio s2'>Diseños de Corte</p>
                   <p className='nombre-servicio s3'>Afeitadas</p>
                   <p className='nombre-servicio s4'>Tintes</p>
                   <p className='nombre-servicio s5'>Limpiezas Faciales</p>
               </div>
             </div>

             <div className='precios'>
                <h8 className='Titulo-4'>Lista de precios</h8>       
                <h9 className='Sub5-PU'>
                   <span className='negro4'>Barber</span><span className='ama4'>Talk</span>
                   <img className='Bigote4' alt='no aparece' src='/img/BBigote.png'></img>
                </h9>

                {/* Esto es del cuadro de precios */}
               <div className='cuadro-precios'>
                   <div className='imagen-barberia'>
                      <img className='barberia' alt='no aparece' src='/img/Barberia-precios.png'></img>
                   </div>

                   <div className='lista-precios'>
                      <h9 className='Sub6-PU'>Lista de Precios</h9>
                      <img className='Bigote5' alt='no aparece' src='/img/BBigote.png'></img>
                      <p className='precio-descripcion'>Luce increíble, siéntete único y lleno de confianza. Conoce nuestros precios pensados para ti.</p>
                   
                      <div className='servicio-precios'> 
                         <span className='N-Servicio s1'>Corte de Pelo</span>
                         <span className='Precio p1'>$50</span>
                      </div>
                      <div className='linea-decorativa'></div>

                      <div className='servicio-precios'> 
                         <span className='N-Servicio s2'>Diseño de Cortes</span>
                         <span className='Precio p2'>$50</span>
                      </div>
                      <div className='linea-decorativa'></div>

                      <div className='servicio-precios'> 
                         <span className='N-Servicio s3'>Afeitado de Barba</span>
                         <span className='Precio p3'>$50</span>
                      </div>
                      <div className='linea-decorativa'></div>

                      <div className='servicio-precios'> 
                         <span className='N-Servicio s4'>Tinte de Pelo</span>
                         <span className='Precio p4'>$50</span>
                      </div>
                      <div className='linea-decorativa'></div>

                      <div className='servicio-precios'> 
                         <span className='N-Servicio s5'>Limpieza Facial</span>
                         <span className='Precio p5'>$50</span>
                      </div>
                      <div className='linea-decorativa'></div>

                      <a className='boton-citaPU' href='reservarCita'>AGENDAR CITA</a>
                   </div>
               </div> {/* Este cierra el de cuadro precios */}
             </div> {/* Este cierra lo de precios */}



               <footer className='final-pagina'>
                   <img className='fondo-imagen-final' alt='no aparece' src='/img/final-PU.jpg'></img>
                   <div className='Logo-descripcion-F '>
                      <img className='final-logo' alt='no aparece' src='/img/Encabezado.png'></img>
                      <p className='final-descripcion'>La barberia es un lugar muy especial donde te atenderemos muy bien, ven agenda con nosotros.</p>
                   </div>

                   <div className='horario-F'>
                     <h10 className='sub-horario'>
                        <span className='blanco5'>Horario de</span><span className='ama5'>Trabajo</span>
                     </h10>
                     <div className='linea-horario'></div>

                      <p>Lunes-Viernes 8:00-20:00</p>
                      <p>Sabado 9:00-15:00</p>
                      <p>Domingo 9:00-12:00</p>
                   </div>

                   <div className='contacto-F'>
                      <h11 className='sub-contacto'>Contactanos</h11>
                      <div className='linea-contacto'></div>
                      <p>123 La Sierra, Nuevo Milenio.</p>
                      <p>Teléfono: 312 150 789 654</p>
                      <p>Email: barbertalk@gmail.com</p>
                   </div>

                   <div className='linea-autor'></div>

                   <div className='autor-F'>
                      <p>©Derechos de autor a Axobit.</p>
                   </div>
               </footer> {/* Este es el final de la pagina */}



          </div>


        </div> {/* Este cierra el div de lista */}


      </div>
    </div>
  )
}

export default principalUsuario;
