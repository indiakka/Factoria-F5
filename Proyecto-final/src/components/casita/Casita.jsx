import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./casita.css";

const Casita = () =>
{
  const [ casita, setCasita ] = useState( [] );

  useEffect( () =>
  {
    const dataCasita = JSON.parse( localStorage.getItem( 'animalesCasita' ) ) || [];
    setCasita( dataCasita );

    const cerrarCasita = ( e ) =>
    {
      if ( !document.getElementById( 'contenedor-casita' ).contains( e.target ) )
      {
        // Cerrar la casita si el clic no ocurrió dentro de la casita
        setCasitaAbierta( false );
      }
    };

    document.addEventListener( "click", cerrarCasita );

    return () =>
    {
      document.removeEventListener( "click", cerrarCasita );
    };
  }, [] );

  const eliminarAnimal = ( animalId ) =>
  {
    const animalesAlmacenados = JSON.parse( localStorage.getItem( 'animalesCasita' ) ) || [];
    const nuevosAnimales = animalesAlmacenados.filter( animal => animal.id !== animalId );
    localStorage.setItem( 'animalesCasita', JSON.stringify( nuevosAnimales ) );
    const dataCasita = JSON.parse( localStorage.getItem( 'animalesCasita' ) ) || [];
    setCasita( dataCasita );
  };

  return (
    <div id='contenedor-casita' className='contenedor-casita-card'>
      {casita.map( ( a ) => (
        <div key={a.id} className='casita-card'>
          <div className='contenedor-x-card'>
            <img src='src/assets/images/x_card.svg' onClick={e => eliminarAnimal( a.id )} className='x-card' alt='descartar-animal' />
          </div>
          <img className='casita-imagen'
            src={a.imagen}
            alt={a.nombre}
          />
          <div className='casita-texto'>
            <h4>{a.nombre}</h4>
            <h5>{a.años},{a.ubicacion}</h5>
          </div>
        </div>
      ) )}
      <NavLink to='/contacto'><button type='submit' className='casita-boton'>Reservar cita</button></NavLink>
    </div>
  );
}

export default Casita;
