import { useState } from "react";
import "./Filtro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrash } from "@fortawesome/free-solid-svg-icons";

const Filtro = ( { onClick } ) =>
{
    const [ isAnimalListOpen, setAnimalListOpen ] = useState( false );
    const [ isTamanoListOpen, setTamanoListOpen ] = useState( false );
    const [ isEdadListOpen, setEdadListOpen ] = useState( false );

    // State for selected filtros
    const [ selectedAnimal, setSelectedAnimal ] = useState( null );
    const [ selectedTamano, setSelectedTamano ] = useState( null );
    const [ selectedEdad, setSelectedEdad ] = useState( null );

    const toggleAnimal = () =>
    {
        setAnimalListOpen( !isAnimalListOpen );
        setTamanoListOpen( false );
        setEdadListOpen( false );
    };

    const toggleTamano = () =>
    {
        setTamanoListOpen( !isTamanoListOpen );
        setAnimalListOpen( false );
        setEdadListOpen( false );
    };

    const toggleEdad = () =>
    {
        setEdadListOpen( !isEdadListOpen );
        setAnimalListOpen( false );
        setTamanoListOpen( false );
    };

    const handleAnimalClick = ( tipo ) =>
    {
        console.log( "Selected Animal:", tipo );
        setSelectedAnimal( tipo );
        onClick( "tipo", tipo );
    };

    const handleTamanoClick = ( tamano ) =>
    {
        console.log( "Selected Tamano:", tamano );
        setSelectedTamano( tamano );
        onClick( "tamano", tamano );
    };

    const handleEdadClick = ( edad ) =>
    {
        console.log( "Selected Edad:", edad );
        setSelectedEdad( edad );
        onClick( "edad", edad );
    };

    const clearFiltros = () =>
    {
        setSelectedAnimal( null );
        setSelectedTamano( null );
        setSelectedEdad( null );
        onClick( "" );
    };

    return (
        <div className="filtro">
            {/* Animal filtro */}
            <button className="filtroField filtroFieldRadiusLeft" onClick={toggleAnimal}>
                Animales {selectedAnimal && <span className="selected-option">{selectedAnimal}</span>} <FontAwesomeIcon icon={faCaretDown} />
                {isAnimalListOpen ? (
                    <ul className="filtro-ul">
                        <li className={`filtro-li ${selectedAnimal === "Perro" ? "selected" : ""}`} onClick={() => handleAnimalClick( "Perro" )}>
                            Perros
                        </li>
                        <li className={`filtro-li ${selectedAnimal === "Gato" ? "selected" : ""}`} onClick={() => handleAnimalClick( "Gato" )}>
                            Gatos
                        </li>
                    </ul>
                ) : null}
            </button>

            {/* Tamaño filtro */}
            <button className="filtroField" onClick={toggleTamano}>
                Tamaño {selectedTamano && <span className="selected-option">{selectedTamano}</span>} <FontAwesomeIcon icon={faCaretDown} />
                {isTamanoListOpen ? (
                    <ul className="filtro-ul">
                        <li className={`filtro-li ${selectedTamano === "Pequeño" ? "selected" : ""}`} onClick={() => handleTamanoClick( "Pequeño" )}>
                            Pequeño
                        </li>
                        <li className={`filtro-li ${selectedTamano === "Mediano" ? "selected" : ""}`} onClick={() => handleTamanoClick( "Mediano" )}>
                            Mediano
                        </li>
                        <li className={`filtro-li ${selectedTamano === "Grande" ? "selected" : ""}`} onClick={() => handleTamanoClick( "Grande" )}>
                            Grande
                        </li>
                    </ul>
                ) : null}
            </button>

            {/* Edad filtro */}
            <button className="filtroField" onClick={toggleEdad}>
                Edad {selectedEdad && <span className="selected-option">{selectedEdad}</span>} <FontAwesomeIcon icon={faCaretDown} />
                {isEdadListOpen ? (
                    <ul className="filtro-ul">
                        <li className={`filtro-li ${selectedEdad === "Cachorrito" ? "selected" : ""}`} onClick={() => handleEdadClick( "Cachorrito" )}>
                            Cachorrito
                        </li>
                        <li className={`filtro-li ${selectedEdad === "Adulto" ? "selected" : ""}`} onClick={() => handleEdadClick( "Adulto" )}>
                            Adulto
                        </li>
                    </ul>
                ) : null}
            </button>
            {/* Delete Filtro */}
            <button className="filtroField filtroFieldRadiusRight" onClick={clearFiltros}>
                Borrar filtros <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default Filtro;