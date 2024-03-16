import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import "./animalInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";


const AnimalInfo = ( { animal } ) =>
{
  const [ estadoAnimal, setEstadoAnimal ] = useState( [] );
  const { id } = useParams();
  const [ animalesCasita, setAnimalesCasita ] = useState( [] );
  const navigate = useNavigate()
  const [ isOpen, setIsOpen ] = useState( true ); // Estado para controlar la visibilidad de la tarjeta

  useEffect( () =>
  {
    const animalInfo = async () =>
    {
      const response = await axios.get( `http://localhost:3000/results/${id}` );
      setEstadoAnimal( response.data );
    };
    animalInfo();
  }, [ id ] );

  const anadirAnimal = () =>
  {
    const listadoAnimales = [ ...animalesCasita, { ...animal, id: animal.id } ];
    setAnimalesCasita( listadoAnimales );
    alert( "Animal añadido a tu casita" )
  };

  useEffect( () =>
  {
    const animalesAlmacenados = localStorage.getItem( 'animalesCasita' );
    if ( animalesAlmacenados )
    {
      setAnimalesCasita( JSON.parse( animalesAlmacenados ) );
    }
  }, [] );

  useEffect( () =>
  {
    localStorage.setItem( 'animalesCasita', JSON.stringify( animalesCasita ) );
  }, [ animalesCasita ] );

  const handleSubmit = async ( id ) =>
  {
    const conf = window.confirm( '¿Quieres realmente borrar este animal?' )
    if ( conf )
    {
      await axios.delete( `http://localhost:3000/results/${id}` )
      alert( 'Este animal ha sido borrado correctamente' )
      navigate( '/adoptar' )
    }
  }

  const handleClose = () =>
  {
    setIsOpen( false ); // Cambiar el estado para ocultar la tarjeta
  };

  // Verificar si la tarjeta está abierta
  if ( !isOpen )
  {
    return null; // Si está cerrada, no renderizamos nada
  }

  return (
    <div className="animalInfoOverlay">
      <div className="animalInfocontainer">
        <div className="animalInfoImg--container">
          <img
            src={animal.imagen}
            alt={animal.nombre}
            className="animalInfo--img"
          />
        </div>
        <div className="animalInfoTxt--container">
          <h2>Información sobre {animal.nombre}</h2>
          <p>Tipo: {animal.tipo}</p>
          <p>Raza: {animal.raza}</p>
          <p>Tamaño: {animal.tamaño}</p>
          <p>Cuidados Especiales: {animal.cuidadosEspeciales}</p>
          <p>Ubicación: {animal.ubicacion}</p>
          <p>Años: {animal.años}</p>
          <p>Gastos de Gestión: {animal.gastosDeGestion}</p>
          <div className="container--button">
            <button onClick={anadirAnimal} className="button-adopta btn--conoceme">
              <FontAwesomeIcon icon={faPaw} /> Conóceme
            </button>
          </div>
        </div>
        <div className="contenedor--botones--editar">
          <div className='contenedor-cerrar-card' onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} className='cerrar-card' />
          </div>
          <NavLink to={`/editarInfo/${animal.id}`}>
            <button onClick={handleClose} className="botones--editar">
              <img src="../src/assets/images/Edit.png" alt="editar" /></button>
          </NavLink>
          <button onClick={() => { handleSubmit( animal.id ); handleClose(); }} className="botones--editar">
            <img src="../src/assets/images/Delete.png" alt="borrar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;