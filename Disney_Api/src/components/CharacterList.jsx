import React, { useEffect, useState } from 'react';
import Character from './Character';

const url = 'https://api.disneyapi.dev/character';

function CharacterList ()
{
    const [ characters, setCharacters ] = useState( [] );

    useEffect( () =>
    {
        async function fetchData ()
        {
            try
            {
                const response = await fetch( url );
                if ( !response.ok )
                {
                    throw new Error( `Error al obtener datos de la API: ${response.status}` );
                }

                const data = await response.json();
                console.log( 'Datos de la API:', data );

                // Ajustamos la lógica para manejar la estructura de la respuesta
                const charactersData = data.data || [];
                console.log( 'Datos de personajes:', charactersData );
                setCharacters( charactersData );
            } catch ( error )
            {
                console.error( error.message );
            }
        }

        fetchData();
    }, [] );

    if ( !Array.isArray( characters ) )
    {
        console.error( 'characters no es un array:', characters );
        return null;
    }

    return (
        <div>
            {characters.map( character => (
                <Character key={character._id} character={character} />
            ) )}
        </div>
    );
}

export default CharacterList;
