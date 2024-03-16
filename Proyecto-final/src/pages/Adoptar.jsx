import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../components/filter/Filter";
import AnimalCard from '../components/card/AnimalCard'

const Adoptar = () =>
{
  const [ animales, setAnimales ] = useState( [] );
  const [ filterCriteria, setFilterCriteria ] = useState( {} );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await axios.get( "http://localhost:3000/results" );
        const info = response.data;
        setAnimales( info );
      } catch ( error )
      {
        console.error( "Error fetching data: ", error );
      }
    };

    fetchData();
  }, [] );

  // Función para reorganizar aleatoriamente el array de animales
  const shuffleAnimals = ( array ) =>
  {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // Mientras haya elementos a mezclar
    while ( 0 !== currentIndex )
    {
      // Selecciona un elemento restante
      randomIndex = Math.floor( Math.random() * currentIndex );
      currentIndex -= 1;

      // Intercambia con el elemento actual
      temporaryValue = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = temporaryValue;
    }

    return array;
  };

  // Renderizar animales filtrados y reorganizados aleatoriamente
  const renderAnimals = () =>
  {
    let filteredAndShuffledAnimals = animales.filter( ( animal ) =>
    {
      if ( filterCriteria.tipo && animal.tipo !== filterCriteria.tipo )
      {
        return false;
      }
      if ( filterCriteria.tamano && animal.tamaño !== filterCriteria.tamano )
      {
        return false;
      }
      if ( filterCriteria.edad )
      {
        const edad = animal.años;
        switch ( filterCriteria.edad )
        {
          case "Cachorrito":
            return edad >= 0 && edad <= 1;
          case "Adulto":
            return edad > 1 && edad < 5;
          default:
            return true;
        }
      }
      return true;
    } );

    // Reorganizar aleatoriamente los animales filtrados
    filteredAndShuffledAnimals = shuffleAnimals( filteredAndShuffledAnimals );

    return filteredAndShuffledAnimals.map( ( animal ) => (
      <AnimalCard key={animal.id} animal={animal} />
    ) );
  };

  // Manejar cambios en los filtros
  const handleFilterChange = ( category, value ) =>
  {
    setFilterCriteria( ( prevFilterCriteria ) => ( {
      ...prevFilterCriteria,
      [ category ]: value
    } ) );
  };

  return (
    <>
      <Filter onClick={handleFilterChange} />
      {renderAnimals()}
    </>
  );
};

export default Adoptar;
