import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filtro from '../components/filtro/Filtro';
import TarjetaAnimal from '../components/tarjeta/TarjetaAnimal';
import Paginacion from '../components/pagination/Paginacion';

const Adoptar = () => {
  const [animalesOriginales, setAnimalesOriginales] = useState([]);
  const [animalesFiltradosYMezclados, setAnimalesFiltradosYMezclados] = useState([]);
  const [criteriosFiltro, setCriteriosFiltro] = useState({ tipo: [], tamano: [], edad: [] });
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/results');
        const info = response.data;
        setAnimalesOriginales(info);
      } catch (error) {
        console.error('Error al obtener datos: ', error);
      }
    };

    fetchData();
  }, []);

  const manejarCambioFiltro = (filtroSeleccionado, valor) => {
    setCriteriosFiltro((filtroActual) => ({
      ...filtroActual,
      [filtroSeleccionado]: valor,
    }));
  };

  useEffect(() => {
    let animalesFiltrados = animalesOriginales.filter((animal) => {
      if (criteriosFiltro.tipo.length > 0 && !criteriosFiltro.tipo.includes(animal.tipo)) {
        return false;
      }
      if (criteriosFiltro.tamano.length > 0 && !criteriosFiltro.tamano.includes(animal.tamano)) {
        return false;
      }
      if (criteriosFiltro.edad.length > 0) {
        const edad = animal.edad;
        if (criteriosFiltro.edad.includes('Cachorrito')) {
          if (!(edad >= 0 && edad <= 1)) {
            return false;
          }
        }
        if (criteriosFiltro.edad.includes('Adulto')) {
          if (!(edad > 1 && edad < 5)) {
            return false;
          }
        }
      }
      return true;
    });

    animalesFiltrados = mezclarAnimales(animalesFiltrados);

    setAnimalesFiltradosYMezclados(animalesFiltrados);
  }, [animalesOriginales, criteriosFiltro]);

  const mezclarAnimales = (array) => {
    // Verificar si el array es undefined o null
    if (!array || array.length === 0) {
      return []; // Devolver un array vacío si no hay elementos
    }

    // Filtrar los animales
    let animalesFiltrados = array.filter((animal) => {
      // Lógica de filtrado
      return true; // Puedes modificar esto según tu lógica de filtro
    });

    // Mezclar los animales filtrados
    let indiceActual = animalesFiltrados.length;
    let valorTemporal, indiceAleatorio;

    while (0 !== indiceActual) {
      indiceAleatorio = Math.floor(Math.random() * indiceActual);
      indiceActual -= 1;

      valorTemporal = animalesFiltrados[indiceActual];
      animalesFiltrados[indiceActual] = animalesFiltrados[indiceAleatorio];
      animalesFiltrados[indiceAleatorio] = valorTemporal;
    }

    return animalesFiltrados;
  };

  const manejarCambioPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const borrarFiltros = () => {
    setCriteriosFiltro({ tipo: [], tamano: [], edad: [] });
  };

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const elementosActuales =
    animalesFiltradosYMezclados && animalesFiltradosYMezclados.length > 0
      ? animalesFiltradosYMezclados.slice(indicePrimerElemento, indiceUltimoElemento)
      : [];

  return (
    <>
      <Filtro onClick={manejarCambioFiltro} onClearFilters={borrarFiltros} />
      {elementosActuales.map((animal) => (
        <TarjetaAnimal key={animal.id} animal={animal} />
      ))}
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
