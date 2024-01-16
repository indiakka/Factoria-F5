
// Importa React y el hook useState
import React, { useState } from 'react';



// Define el componente Formulario
const Formulario = ( props ) =>
{
    // Desestructura la prop 'handleAddItem' para obtener la función
    const { handleAddItem } = props;

    // Define el estado 'description' y la función para actualizarlo 'setDescription'
    const [ description, setDescription ] = useState( '' );

    // Define la función 'handleSubmit' para manejar la presentación del formulario
    const handleSubmit = ( e ) =>
    {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario
        // Llama a la función 'handleAddItem' con un nuevo objeto de tarea
        handleAddItem( {
            done: false,
            id: ( +new Date() ).toString(),
            description,
        } );
        setDescription( '' ); // Limpia el campo de descripción después de agregar una tarea
    };

    // Retorna la estructura JSX del formulario
    return ( 
        <form onSubmit={handleSubmit}>
            <h1>Mi lista de tareas :</h1>
            <div className="todo-list">
                {/* Input de texto controlado por el estado 'description' */}
                <input
                    type="text"
                    className="text"
                    value={description}
                    onChange={( e ) => setDescription( e.target.value )}
                />
                {/* Botón para agregar una tarea */}
                <button
                    className="button pink"
                    disabled={description ? '' : 'disabled'}
                >
                    Añadir
                </button>
            </div>
        </form>
    );
};

// Exporta el componente Formulario
export default Formulario;
