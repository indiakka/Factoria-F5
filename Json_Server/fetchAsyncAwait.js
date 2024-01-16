let estudiantes = []; // Almacenar la lista completa de estudiantes

document.addEventListener( 'DOMContentLoaded', () =>
{
    obtenerDataAsyncAwait();
} );

const mostrarDatos = ( estudiante ) =>
{
    const titleElement = document.getElementById( 'title' );
    const bodyElement = document.getElementById( 'body' );

    if ( estudiante )
    {
        titleElement.textContent = `Nombre: ${estudiante.nombre} ${estudiante.apellido}`;
        bodyElement.innerHTML = `
            <p>Edad: ${estudiante.edad}</p>
            <p>Dirección: ${estudiante.dirección}</p>
            <p>Curso: ${estudiante.curso}</p>
        `;
    } else
    {
        titleElement.textContent = "No se encontraron datos";
        bodyElement.innerHTML = "";
    }
}

const obtenerDataAsyncAwait = async () =>
{
    try
    {
        const response = await fetch( "http://localhost:3000/estudiantes" );
        estudiantes = await response.json();

        console.log( "Con async/await:", estudiantes );

        // Mostrar el primer estudiante al cargar la página
        mostrarDatos( estudiantes[ 0 ] );
    } catch ( error )
    {
        console.error( 'Error al obtener los datos con async/await:', error );
    }
}

let indiceEstudianteActual = 0;

const mostrarSiguienteEstudiante = () =>
{
    indiceEstudianteActual = ( indiceEstudianteActual + 1 ) % estudiantes.length;
    mostrarDatos( estudiantes[ indiceEstudianteActual ] );
}
