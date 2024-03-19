// TarjetaAnimal.js
import React, { useState } from 'react';
import './TarjetaAnimal.css';
import AnimalInfo from '../animalInfo/AnimalInfo';
import Paginacion from '../pagination/Paginacion'; // Importa el componente de paginación

const TarjetaAnimal = ( { animal } ) =>
{
  const [ estaAbierto, setEstaAbierto ] = useState( false );
  const [ estaSobre, setEstaSobre ] = useState( false );
  const [ mostrarPaginacion, setMostrarPaginacion ] = useState( true ); // Estado para controlar la visibilidad de la paginación

  const cambiarEstadoInfo = () =>
  {
    setEstaAbierto( !estaAbierto );
    // Oculta la paginación cuando se abre la ventana emergente de AnimalInfo
    setMostrarPaginacion( !estaAbierto );
  };

  const cambiarEstadoSobre = () =>
  {
    setEstaSobre( !estaSobre );
  };

  return (
    <div className="tarjeta" onClick={cambiarEstadoInfo} onMouseEnter={cambiarEstadoSobre} onMouseLeave={cambiarEstadoSobre}>
      <img src={animal.imagen} alt={animal.nombre} className="tarjeta--imagen" />
      <div className={`tarjeta--componentes ${estaSobre ? 'sobre' : ''}`}>
        <div>
          <h2 className="tarjeta--componentes--nombre">{animal.nombre}</h2>
          <p className="tarjeta--componentes--descripcion">
            Edad: {animal.años}, {animal.raza}, {animal.ubicacion}.
          </p>
        </div>
        <div>
          <img src="src/assets/images/iconoInfo.png" alt="iconoInformacion" className="tarjeta--componentes--icono" />
        </div>
      </div>
      {estaAbierto && <AnimalInfo animal={animal} />} {/* Renderizar AnimalInfo solo si estáAbierto es true */}
      {mostrarPaginacion && <Paginacion />} {/* Renderizar la paginación solo si mostrarPaginacion es true */}
    </div>
  );
};

export default TarjetaAnimal;
