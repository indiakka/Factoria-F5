// Importa React y el hook useState
import React, { useState } from 'react';

// Importa el componente Formulario desde el archivo Formulario.jsx
import Formulario from './Formulario';

// Importa el componente ListaTareas desde el archivo ListaTareas.jsx
import ListaTareas from './ListaTareas';

// Define el componente Container
const Container = () =>
{
    // Define el estado 'list' y la función para actualizarlo 'setList'
    const [ list, setList ] = useState( [] );

    // Define la función 'handleAddItem' para agregar elementos a la lista
    const handleAddItem = ( addItem ) =>
    {
        setList( [ ...list, addItem ] );
    };

    // Retorna la estructura JSX del Container
    return (
        <div>
            {/* Renderiza el componente Formulario y pasa la función 'handleAddItem' como prop */}
            <Formulario handleAddItem={handleAddItem} />
            {/* Renderiza el componente ListaTareas y pasa el estado 'list' y la función 'setList' como props */}
            <ListaTareas list={list} setList={setList} />
        </div>
    );
};

// Exporta el componente Container
export default Container;
