// Importa React
import React from 'react';

// Importa el componente Checkbox desde el archivo Checkbox.jsx
import Checkbox from './Checkbox';

// Define el componente ListaTareas
const ListaTareas = ( props ) =>
{
    // Desestructura las props para obtener 'list' y 'setList'
    const { list, setList } = props;

    // Define la función 'onChangeStatus' para manejar cambios en el estado de una tarea
    const onChangeStatus = ( e ) =>
    {
        const { name, checked } = e.target;
        // Actualiza la lista de tareas cambiando el estado 'done' de la tarea específica
        const updateList = list.map( ( item ) => ( {
            ...item,
            done: item.id === name ? checked : item.done,
        } ) );
        setList( updateList );
    };

    // Define la función 'onClickRemoveItem' para eliminar las tareas completadas
    const onClickRemoveItem = ( e ) =>
    {
        // Filtra la lista, dejando solo las tareas no completadas
        const updateList = list.filter( ( item ) => !item.done );
        setList( updateList );
    };

    // Mapea cada tarea en la lista a un componente Checkbox
    const checkboxes = list.map( ( item ) => (
        <Checkbox key={item.id} data={item} onChange={onChangeStatus} />
    ) );

    // Retorna la estructura JSX de la lista de tareas
    return (
        <div className="todo-list">
            {list.length ? checkboxes : 'No hay tareas'}
            {/* Renderiza un botón para eliminar tareas completadas si hay tareas en la lista */}
            {list.length ? (
                <p>
                    <button className="button blue" onClick={onClickRemoveItem}>
                        Borrar las tareas completadas
                    </button>
                </p>
            ) : null}
        </div>
    );
};

// Exporta el componente ListaTareas
export default ListaTareas;
