// Agrega un event listener para detectar eventos de teclado en el documento
document.addEventListener( 'keydown', function ( event )
{
    // Define un array con las teclas que se van a verificar
    const keysToCheck = [ 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'x' ];

    // Verifica si la tecla presionada está en el array
    if ( keysToCheck.includes( event.key ) )
    {
        // Si la tecla está en el array, llama a la función playSound con la tecla como argumento
        playSound( event.key );
        animacionBateria ( event.key )
    }
} );

// Función para reproducir el sonido asociado a una tecla
function playSound ( key )
{
    // Obtiene el elemento de audio correspondiente a la tecla
    let audioElement = document.getElementById( 'sound' + key.toUpperCase() );

    // Verifica si el elemento de audio existe
    if ( audioElement )
    {
        // Reinicia la reproducción al inicio y reproduce el sonido
        audioElement.currentTime = 0;
        audioElement.play();
    }
}

function animacionBateria (key) {

    let instrumento = document.getElementById('bateria-sound' + key.toUpperCase());

    let numVibraciones = 5;
    // Distancia y dirección del desplazamiento en píxeles
    let distancia = 5;

    // Realizar la animación de vibración
    for (let i = 0; i < numVibraciones; i++) {
        setTimeout(function() {
            // Desplazamiento a la izquierda
            instrumento.style.transform = 'translateX(' + -distancia + 'px)';
        }, i * 100);

        setTimeout(function() {
            // Regresar a la posición original
            instrumento.style.transform = 'translateX(0)';
        }, (i * 100) + 50);
    }
}