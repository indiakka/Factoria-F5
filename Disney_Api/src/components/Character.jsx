import React from 'react';

function Character ( { character } )
{
    // Verificar si character es undefined antes de intentar acceder a sus propiedades
    if ( !character )
    {
        console.error( 'character es undefined:', character );
        return null; // O puedes renderizar un mensaje indicando que no hay datos
    }

    console.log( 'Datos del personaje:', character );

    return (
        <div>
            <h2>{character.name}</h2>
            <img src={character.imageUrl} alt={character.name} />
        </div>
    );
}

export default Character;
