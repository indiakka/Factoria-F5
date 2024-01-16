import Amiibo from './Amiibo';
import React, { useState, useEffect } from 'react';

const url = 'https://www.amiiboapi.com/api/amiibo';

function AmiiboList ()
{
    const [ amiibos, setAmiibos ] = useState( [] );

    useEffect( () =>
    {
        async function fetchData ()
        {
            try
            {
                
                const response = await fetch( url );

                if ( !response.ok )
                {
                    throw new Error( `Network response was not ok: ${response.status}` );
                }

                const contentType = response.headers.get( 'content-type' );
                if ( !contentType || !contentType.includes( 'application/json' ) )
                {
                    throw new Error( `Invalid content type: ${contentType}` );
                }

                const data = await response.json();
                console.log( data ); // Agrega este log para verificar la respuesta completa
                setAmiibos( data.amiibo );
            } catch ( error )
            {
                console.error( 'Error fetching data:', error );
            }
        }

        fetchData();
    }, [] );


    return (
        <div>
            <ul className="amiibo-list">
                {amiibos.map( ( amiibo ) => (
                    <li key={amiibo.tail} className="amiibo">
                        <Amiibo amiibo={amiibo} />
                    </li>
                ) )}
            </ul>
        </div>
    );

}

export default AmiiboList;
