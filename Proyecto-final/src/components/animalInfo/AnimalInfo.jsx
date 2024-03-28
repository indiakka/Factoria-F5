import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './animalInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AnimalInfo = ({ animal }) => {
  const [estadoAnimal, setEstadoAnimal] = useState([]);
  const { id } = useParams();
  const [animalesCasita, setAnimalesCasita] = useState([]);
  const navigate = useNavigate();
  const [estaAbierta, setEstaAbierta] = useState(true); // Estado para controlar la visibilidad de la tarjeta

  useEffect(() => {
    const animalInfo = async () => {
      const respuesta = await axios.get(`http://localhost:3000/results/${id}`);
      setEstadoAnimal(respuesta.data);
    };
    animalInfo();
  }, [id]);

  const anadirAnimal = () => {
    const listadoAnimales = [...animalesCasita, { ...animal, id: animal.id }];
    setAnimalesCasita(listadoAnimales);
    alert('Animal añadido a tu casita');
  };

  useEffect(() => {
    const animalesAlmacenados = localStorage.getItem('animalesCasita');
    if (animalesAlmacenados) {
      setAnimalesCasita(JSON.parse(animalesAlmacenados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('animalesCasita', JSON.stringify(animalesCasita));
  }, [animalesCasita]);

  const manejarEnvio = async (id) => {
    const conf = window.confirm('¿Quieres realmente borrar este animal?');
    if (conf) {
      await axios.delete(`http://localhost:3000/results/${id}`);
      alert('Este animal ha sido borrado correctamente');
      navigate('/adoptar');
    }
  };

  const manejarCerrar = () => {
    setEstaAbierta(false); // Cambiar el estado para ocultar la tarjeta
  };

  // Verificar si la tarjeta está abierta
  if (!estaAbierta) {
    return null; // Si está cerrada, no renderizamos nada
  }

  return (
    <div className="animalInfoOverlay">
      <div className="contenedor--animalInfo">
        <div className="contenedor--imagen--animalInfo">
          <img src={animal.imagen} alt={animal.nombre} className="animalInfo--img" />
        </div>
        <div className="contenedor--texto--animalInfo">
          <h2>Información sobre {animal.nombre}</h2>
          <p>
            <strong>Tipo:</strong> {animal.tipo}
          </p>
          <p>
            <strong>Raza:</strong> {animal.raza}
          </p>
          <p>
            <strong>Tamaño:</strong> {animal.tamano}
          </p>
          <p>
            <strong>Cuidados Especiales:</strong> {animal.cuidadosEspeciales}
          </p>
          <p>
            <strong>Ubicación:</strong> {animal.ubicacion}
          </p>
          <p>
            <strong>Edad:</strong> {animal.edad}
          </p>
          <p>
            <strong>Gastos de Gestión:</strong> {animal.gastosDeGestion}
          </p>
          <div className="contenedor--boton">
            <button onClick={anadirAnimal} className="boton-adopta btn--conoceme">
              <FontAwesomeIcon icon={faPaw} /> Conóceme
            </button>
          </div>
        </div>
        <div className="contenedor--botones--editar">
          <div className="contenedor-cerrar-tarjeta" onClick={manejarCerrar}>
            <FontAwesomeIcon icon={faTimes} className="cerrar-tarjeta" />
          </div>
          <NavLink to={`/editarInfo/${animal.id}`}>
            <button onClick={manejarCerrar} className="botones--editar">
              <img src="../src/assets/images/Edit.png" alt="editar" />
            </button>
          </NavLink>
          <button
            onClick={() => {
              manejarEnvio(animal.id);
              manejarCerrar();
            }}
            className="botones--editar"
          >
            <img src="../src/assets/images/Delete.png" alt="borrar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;
