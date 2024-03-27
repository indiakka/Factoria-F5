import './formulario.css';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3000/results';
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [cuidadosEspeciales, setCuidadosEspeciales] = useState('');
  const [edad, setEdad] = useState(0);
  const [imagen, setImagen] = useState('');

  const storeAnimal = async (event) => {
    event.preventDefault();
    console.log(event);
    await axios.post(baseURL, {
      tipo: tipo,
      nombre: nombre,
      raza: raza,
      tamaño: tamaño,
      cuidadosEspeciales: cuidadosEspeciales,
      ubicacion: 'Barcelona',
      edad: edad,
      gastosDeGestion: '500€',
      imagen: imagen,
    });
    alert('Tu peludito se ha guardado correctamente');
    navigate('/adoptar');
  };

  return (
    <>
      <div className="contenedor--formulario">
        <form onSubmit={storeAnimal} className="formulario">
          <p>
            <b>Seleccione el tipo de animal: </b>
          </p>
          <div className="formulario--tipo">
            <label>
              <input
                value="Perro"
                checked={tipo === 'Perro'}
                type="radio"
                id="Perro"
                name="tipo"
                onChange={(event) => setTipo(event.target.value)}
              />
              Perro
            </label>
            <label>
              <input
                value="Gato"
                checked={tipo === 'Gato'}
                type="radio"
                id="Gato"
                name="tipo"
                onChange={(event) => setTipo(event.target.value)}
              />
              Gato
            </label>
          </div>
          <div className="contenedor--entradas--formulario">
            <div className="contenedor--entradas--divs">
              <div>
                <input
                  value={nombre}
                  type="text"
                  placeholder="Nombre"
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>
              <div>
                <input value={raza} type="text" placeholder="Raza" onChange={(event) => setRaza(event.target.value)} />
              </div>
              <div>
                <input
                  value={edad}
                  type="number"
                  placeholder="Edad"
                  onChange={(event) => setEdad(event.target.value)}
                />
              </div>
            </div>
            <div className="contenedor--entradas--divs">
              <div>
                <input
                  value={imagen}
                  type="text"
                  placeholder="Enlace de la foto"
                  onChange={(event) => setImagen(event.target.value)}
                />
              </div>
              <div>
                <select value={tamaño} name="tamaño" id="tamaño" onChange={(event) => setTamaño(event.target.value)}>
                  <option hidden selected className="select--option">
                    Tamaño
                  </option>
                  <option value="grande" className="select--option">
                    Grande
                  </option>
                  <option value="mediano" className="select--option">
                    Mediano
                  </option>
                  <option value="pequeño" className="select--option">
                    Pequeño
                  </option>
                </select>
              </div>
              <div>
                <input
                  value={cuidadosEspeciales}
                  type="text"
                  placeholder="Cuidados del animal"
                  onChange={(event) => setCuidadosEspeciales(event.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="boton-adopta">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};

export default Formulario;
