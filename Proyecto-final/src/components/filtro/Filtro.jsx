import { useState } from 'react';
import './Filtro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons';

const Filtro = ({ onClick, onClearFilters }) => {
  const [estaListaAnimalesAbierta, setEstaListaAnimalesAbierta] = useState(false);
  const [estaListaTamanosAbierta, setEstaListaTamanosAbierta] = useState(false);
  const [estaListaEdadesAbierta, setEstaListaEdadesAbierta] = useState(false);

  const [especiesSeleccionadas, setEspeciesSeleccionadas] = useState([]);
  const [tamanosSeleccionados, setTamanosSeleccionados] = useState([]);
  const [edadesSeleccionadas, setEdadesSeleccionadas] = useState([]);

  const alternarListaAnimales = () => {
    setEstaListaAnimalesAbierta(!estaListaAnimalesAbierta);
    setEstaListaTamanosAbierta(false);
    setEstaListaEdadesAbierta(false);
  };

  const alternarListaTamanos = () => {
    setEstaListaTamanosAbierta(!estaListaTamanosAbierta);
    setEstaListaAnimalesAbierta(false);
    setEstaListaEdadesAbierta(false);
  };

  const alternarListaEdades = () => {
    setEstaListaEdadesAbierta(!estaListaEdadesAbierta);
    setEstaListaAnimalesAbierta(false);
    setEstaListaTamanosAbierta(false);
  };

  const manejarClicAnimal = (tipo) => {
    console.log('Animal seleccionado:', tipo);
    setEspeciesSeleccionadas(tipo);
    onClick('tipo', [tipo]);
  };

  const manejarClicTamano = (tamano) => {
    console.log('Tamaño seleccionado:', tamano);
    setTamanosSeleccionados(tamano);
    onClick('tamano', [tamano]);
  };

  const manejarClicEdad = (edad) => {
    console.log('Edad seleccionada:', edad);
    setEdadesSeleccionadas(edad);
    onClick('edad', [edad]);
  };

  const borrarFiltros = () => {
    setEspeciesSeleccionadas([]);
    setTamanosSeleccionados([]);
    setEdadesSeleccionadas([]);
    if (typeof onClearFilters === 'function') {
      onClearFilters();
    }
  };

  return (
    <div className="filtro">
      {/* Filtro de animales */}
      <button className="campoFiltro campoFiltroRadioIzquierda" onClick={alternarListaAnimales}>
        Especies {especiesSeleccionadas && <span className="opcionSeleccionada">{especiesSeleccionadas}</span>}{' '}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaAnimalesAbierta ? (
          <ul className="listaFiltro">
            <li
              className={`elementoListaFiltro ${especiesSeleccionadas.includes('Perro') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicAnimal('Perro')}
            >
              Perros
            </li>
            <li
              className={`elementoListaFiltro ${especiesSeleccionadas.includes('Gato') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicAnimal('Gato')}
            >
              Gatos
            </li>
          </ul>
        ) : null}
      </button>

      {/* Filtro de tamaño */}
      <button className="campoFiltro" onClick={alternarListaTamanos}>
        Tamaño {tamanosSeleccionados && <span className="opcionSeleccionada"></span>}{' '}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaTamanosAbierta ? (
          <ul className="listaFiltro">
            <li
              className={`elementoListaFiltro ${tamanosSeleccionados.includes('Pequeño') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicTamano('Pequeño')}
            >
              Pequeño
            </li>
            <li
              className={`elementoListaFiltro ${tamanosSeleccionados.includes('Mediano') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicTamano('Mediano')}
            >
              Mediano
            </li>
            <li
              className={`elementoListaFiltro ${tamanosSeleccionados.includes('Grande') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicTamano('Grande')}
            >
              Grande
            </li>
          </ul>
        ) : null}
      </button>

      {/* Filtro de edad */}
      <button className="campoFiltro" onClick={alternarListaEdades}>
        Edad {edadesSeleccionadas && <span className="opcionSeleccionada"></span>}{' '}
        <FontAwesomeIcon icon={faCaretDown} />
        {estaListaEdadesAbierta ? (
          <ul className="listaFiltro">
            <li
              className={`elementoListaFiltro ${edadesSeleccionadas.includes('Cachorrito') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicEdad('Cachorrito')}
            >
              Cachorrito
            </li>
            <li
              className={`elementoListaFiltro ${edadesSeleccionadas.includes('Adulto') ? 'seleccionado' : ''}`}
              onClick={() => manejarClicEdad('Adulto')}
            >
              Adulto
            </li>
          </ul>
        ) : null}
      </button>
      {/* Borrar filtros */}
      <button className="campoFiltro campoFiltroRadioDerecha" onClick={borrarFiltros}>
        Borrar filtros <FontAwesomeIcon className="iconoPapelera" icon={faTrash} />
      </button>
    </div>
  );
};

export default Filtro;
