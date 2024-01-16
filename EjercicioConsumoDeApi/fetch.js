/* Buscar información en la web de la API JSONPlaceholder e intentar entender cómo funciona.
Buscar la URL de la API de JSONPlaceholder para obtener la información del post con id 1.
Utiliza fetch para consumir la API( solicitud GET ).
Convertir la respuesta a formato JSON.
 */

const title = document.getElementById( 'title' )
const body = document.getElementById( 'body' )

const url = 'https://jsonplaceholder.typicode.com/posts/1'

fetch( url )
    .then( ( respuesta ) => respuesta.json() )
    .then( ( data ) =>
    {
        console.log( data );
        title.textContent = data.title;
        body.textContent = data.body;
    } )
    .catch ( ( error ) => console.log( 'Hay un error al cargar la API', error ))  
    .finally( console.log( 'Se sigue cargando la API' ) )


