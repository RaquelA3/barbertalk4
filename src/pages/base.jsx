import '../styles/base.css';
import BaseHeader from '../components/BaseHeader';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Base() {
  const navigate = useNavigate();

  return (
    <div className='container5'>
       {/* Aqui puse el componente, el encabezado */}
       <BaseHeader/>
       
       <div className='principal-h'>
          <img className='logo-principal' alt='no aparece' src='/img/P-Base.png'></img>
          <h2 className='Titulo-Base'>Bienvenido a</h2>
          <h1 className='Subtitulo-Base'>
              <span class="blanco">Barber</span> <span class="amarillo">Talk</span>
          </h1>
          <img className='bigote-principal' alt='no aparece' src='/img/BBigote.png'></img>
          <h3 className='Sub2-Base'>¿Listo para lucir un nuevo look?</h3>
          <a className='boton' href='/registro'>AGENDAR CITA</a>   

          <h4 className='Sub3-Base'>
              <span class="negro">Nuestros</span> <span class="ama">servicios</span>
              <img className='bigote2' alt='no aparece' src='/img/BBigote.png'></img>
          </h4>

        <div className='servicios'>
            <div className='card card1'>
                 <img className='logo-corte' alt='no aparece' src='/img/tijera.png'></img>
                 <p className='titulo'>Corte de Pelo</p>
                 <p className='decoracionX'>x x x x</p>
                 <p className='descripcion'>Suspendisse a blandit leo. Ut malesuada, enim sed malesuada</p>
            </div>
            <div className='card card2'>
                 <img className='logo-corte' alt='no aparece' src='/img/Diseño.png'></img>
                 <p className='titulo'>Diseño de Corte</p>
                 <p className='decoracionX'>x x x x</p>
                 <p className='descripcion'>Suspendisse a blandit leo. Ut malesuada, enim sed malesuada</p>
            </div>
            <div className='card card3'>
                 <img className='logo-corte' alt='no aparece' src='/img/Rastrillo.png'></img>
                 <p className='titulo'>Afeitado de Barba</p>
                 <p className='decoracionX'>x x x x</p>
                 <p className='descripcion'>Suspendisse a blandit leo. Ut malesuada, enim sed malesuada</p>
            </div>
            <div className='card card4'>
                 <img className='logo-corte' alt='no aparece' src='/img/Tinte.png'></img> 
                 <p className='titulo'>Tintes de Cabello</p>
                 <p className='decoracionX'>x x x x</p>
                 <p className='descripcion'>Suspendisse a blandit leo. Ut malesuada, enim sed malesuada</p>
            </div>
            <div className='card card5'>
                 <img className='logo-corte' alt='no aparece' src='/img/Silla.png'></img>
                 <p className='titulo'>Limpieza Facial</p>
                 <p className='decoracionX'>x x x x</p>
                 <p className='descripcion'>Suspendisse a blandit leo. Ut malesuada, enim sed malesuada</p>
            </div>    
        </div>

       </div>
     </div>
  )
}
export default Base;

