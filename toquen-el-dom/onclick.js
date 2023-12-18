    let instrumentosBateria = document.querySelectorAll('.grid-item');

    instrumentosBateria.forEach(function(instrumento) {

        instrumento.addEventListener('click', function() {

            /* SONIDO */

            // Obtiene el ID del sonido asociado al elemento
            let idSonido = instrumento.querySelector('audio').id;
            
            // Reproduce el sonido
            let sonido = document.getElementById(idSonido);
            sonido.currentTime = 0;  // Reinicia la reproducción si ya está en curso
            sonido.play();

            /* ANIMACIÓN */

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
        });
    });