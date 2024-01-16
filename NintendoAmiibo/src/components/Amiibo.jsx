// En tu componente Amiibo.jsx
import React from 'react';
import './Amiibo.css';

function Amiibo ( { amiibo } )
{
    if ( !amiibo || !amiibo.amiiboSeries )
    {
        return null;
    }

    const { name, image, amiiboSeries, gameSeries } = amiibo;

    return (
        <div className="amiibo" key={amiibo.tail}>
            <h2>{name}</h2>
            <p>Amiibo Series: {amiiboSeries}</p>
            <p>Game Series: {gameSeries}</p>
            <img src={image} alt={name} />
        </div>
    );
}

export default Amiibo;
