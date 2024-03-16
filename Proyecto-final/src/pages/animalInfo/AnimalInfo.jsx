import React, { useState } from 'react';
import "./animalInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaw, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AnimalInfo = ( { animal } ) =>
{
  const [ isOpen, setIsOpen ] = useState( true ); // Estado para controlar la visibilidad de la tarjeta

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
            <button className="button-adopta btn--conoceme">
              <FontAwesomeIcon icon={faPaw} /> Conóceme
            </button>
          </div>
        </div>
        <div className="contenedor--botones--editar">
          <div className='contenedor-cerrar-card' onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} className='cerrar-card' />
          </div>
          <button onClick={handleClose} className="botones--editar">
            <img src="../src/assets/images/Edit.png" alt="editar" />
          </button>
          <button onClick={handleClose} className="botones--editar">
            <img src="../src/assets/images/Delete.png" alt="borrar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;