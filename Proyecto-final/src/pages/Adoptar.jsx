import React, { useEffect, useState } from "react";
import axios from "axios";
import Filtro from "../components/filtro/Filtro";
import TarjetaAnimal from '../components/tarjeta/TarjetaAnimal';
import Paginacion from "../components/pagination/Paginacion";

const Adoptar = () =>
{
  const [ animalesOriginales, setAnimalesOriginales ] = useState( [] ); // Almacena todos los animales originales
  const [ animalesFiltradosYMezclados, setAnimalesFiltradosYMezclados ] = useState( [] ); // Almacena los animales filtrados y mezclados
  const [ criteriosFiltro, setCriteriosFiltro ] = useState( {} );
  const [ paginaActual, setPaginaActual ] = useState( 1 );
  const elementosPorPagina = 3; // Cambia esto según tu preferencia

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await axios.get( "http://localhost:3000/results" );
        const info = response.data;
        setAnimalesOriginales( info ); // Almacena todos los animales originales
      } catch ( error )
      {
        console.error( "Error fetching data: ", error );
      }
    };

    fetchData();
  }, [] );

  // Función para reorganizar aleatoriamente el array de animales
  const mezclarAnimales = ( array ) =>
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

  // Manejar cambios en los filtros
  const manejarCambioFiltro = ( categoria, valor ) =>
  {
    setCriteriosFiltro( ( criteriosFiltroAnterior ) => ( {
      ...criteriosFiltroAnterior,
      [ categoria ]: valor
    } ) );
  };

  // Manejar cambio de página
  const manejarCambioPagina = ( numeroPagina ) =>
  {
    setPaginaActual( numeroPagina );
  };

  useEffect( () =>
  {
    // Filtrar animales originales según los criterios de filtro
    let animalesFiltrados = animalesOriginales.filter( ( animal ) =>
    {
      if ( criteriosFiltro.tipo && animal.tipo !== criteriosFiltro.tipo )
      {
        return false;
      }
      if ( criteriosFiltro.tamano && animal.tamaño !== criteriosFiltro.tamano )
      {
        return false;
      }
      if ( criteriosFiltro.edad )
      {
        const edad = animal.años;
        switch ( criteriosFiltro.edad )
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

    // Mezclar los animales filtrados
    animalesFiltrados = mezclarAnimales( animalesFiltrados );

    setAnimalesFiltradosYMezclados( animalesFiltrados ); // Actualizar el estado con los animales filtrados y mezclados
  }, [ animalesOriginales, criteriosFiltro ] ); // Vuelve a ejecutar el efecto cuando cambien los animales originales o los criterios de filtro

  // Calcular los elementos actuales según la página actual
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const elementosActuales = animalesFiltradosYMezclados.slice(
    indicePrimerElemento,
    indiceUltimoElemento
  );

  return (
    <>
      <Filtro onClick={manejarCambioFiltro} />
      {elementosActuales.map( ( animal ) => (
        <TarjetaAnimal key={animal.id} animal={animal} />
      ) )}
      <div className="paginacion">
        <Paginacion
          totalItems={animalesFiltradosYMezclados.length}
          itemsPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          alCambiarPagina={manejarCambioPagina}
        />
      </div>
    </>
  );
};

export default Adoptar;
