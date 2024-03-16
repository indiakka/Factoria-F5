// AnimalCard.js
import React, { useState } from 'react';
import './animalCard.css';
import AnimalInfo from '../../pages/animalInfo/AnimalInfo';

const AnimalCard = ( { animal } ) =>
{
  const [ isOpen, setIsOpen ] = useState( false );
  const [ isHovered, setIsHovered ] = useState( false );

  const handleToggleInfo = () =>
  {
    setIsOpen( !isOpen );
  };

  const handleHover = () =>
  {
    setIsHovered( !isHovered );
  };

  return (
    <div className="card" onClick={handleToggleInfo} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <img src={animal.imagen} alt={animal.nombre} className="card--imagen" />
      <div className={`card--componentes ${isHovered ? 'hovered' : ''}`}>
        <div>
          <h2 className="card--componentes--nombre">{animal.nombre}</h2>
          <p className="card--componentes--descripcion">
            Edad: {animal.años}, {animal.raza}, {animal.ubicacion}.
          </p>
        </div>
        <div>
          <img src="src/assets/images/iconoInfo.png" alt="iconInfo" className="card--componentes--icono" />
        </div>
      </div>
      {isOpen && <AnimalInfo animal={animal} />} {/* Renderizar AnimalInfo solo si isOpen es true */}
    </div>
  );
};

export default AnimalCard;
