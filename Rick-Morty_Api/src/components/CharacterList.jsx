import React,
{
    useState,

    useEffect
} from "react";

import Character from "./Character";

const url =  'https://rickandmortyapi.com/api/character' 

function CharacterList ()
{
    //se crea un array de caracteres vacio para guardar los personajes llamados characters
    const [ characters, setCharacters ] = useState( [] )

    // useffect nos permite poder ejecutar código cuando el componente es creado
    useEffect( () =>
    {
        async function fetchData ()
        {
            const response = await fetch( 'https://rickandmortyapi.com/api/character' )
            const data = await response.json()
            setCharacters( data.results )
        }
        fetchData()
    }, [] );
    
    return (
        <div >
            {
                characters.map( (character) =>
                {
                    return (
                        // character={character} aquí se le pasan todos los datos dentro de character (name, id, etc)
                        <Character key={character.id} character={character}  />
                    )
                } )
            }
        </div>
    );
}

export default CharacterList; 

