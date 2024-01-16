//estructuramos el props como {character} para no tener que ir poniendo props.character.id, props.character.name, etc
function Character ( { character } )
{
    // Verificar si character es undefined antes de intentar acceder a sus propiedades
    if ( !character )
    {
        return null; // O puedes renderizar un mensaje indicando que no hay datos
    }
    return (
        <div>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
        </div>
    )
}

export default Character;