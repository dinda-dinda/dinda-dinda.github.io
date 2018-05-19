/*Dinda Daiana Indaburo
TP2 - MemoTest 

ADA BootCamp FrontEnd
3era Generacion TM 2018 

Profesora Belen Alegre
Adjunta Estefania
*/

/*
*Escondo el tablero y el aside, creo dinamicamente una pantalla de entrada
donde Cargo el Nombre y el tipo de juego que sera utilizado en la siguiente.
**/
function newGame() {

    let infoJuego = $('#infoJuego').hide();
    let tablero = $('#play').hide();

    function crearEntrada() {

        let backgroundEntrada = document.createElement('div');
        backgroundEntrada.setAttribute('id', 'backgroundEntrada');
        $('#todo').append(backgroundEntrada);

        let newGameWindow = document.createElement('div');
        newGameWindow.classList.add('Entrada');
        newGameWindow.setAttribute('id', 'newGameWindow');
        backgroundEntrada.append(newGameWindow);

        $('#newGameWindow').append('<h2 class="Titulo">MemoTest</h2>');
        $('#newGameWindow').append('<h2 class="Titulo">GREEN</h2>');

        let labelJugador = document.createElement('label');
        labelJugador.innerHTML = '<label>Ingrese Nombre Jugador</label>';
        newGameWindow.append(labelJugador);
        $('#newGameWindow').append('<label id="obligatorio"></label>');

        let jugador = document.createElement('input'); //para poner nombre    
        jugador.setAttribute('id', 'jugador');
        newGameWindow.append(jugador);

        let labelArray = document.createElement('label'); //etiqueta
        labelArray.innerHTML = '<label>Elija el juego</label>';
        newGameWindow.append(labelArray);

        let array = document.createElement('select'); //para elegir juego    
        array.setAttribute('id', 'tipoJuego');
        newGameWindow.append(array);
        $('#newGameWindow').append('<h3>Dificultad: 45 intentos</h3>');

        let optionArboles = document.createElement('option'); //para elegir juego    
        optionArboles.innerHTML = "arboles";
        optionArboles.setAttribute('val', 'arboles');
        array.append(optionArboles);

        let optionFlores = document.createElement('option'); //para elegir juego    
        optionFlores.innerHTML = "flores";
        optionFlores.setAttribute('value', 'flores');
        array.append(optionFlores);

        let readyToPlay = document.createElement('button'); //submit boton
        readyToPlay.id = "readyToPlay";
        readyToPlay.innerHTML = "Ready";
        newGameWindow.append(readyToPlay);

        readyToPlay.addEventListener('click', validarNombre);

    }
    setTimeout(crearEntrada, 1000);
}

newGame();

/*
*Cargo los valores Ingresados al memoTest y le doy play
*/
function cargarNuevoJuego() {
    let presentacion = $('#backgroundEntrada').hide();
    let infoJuego = $('#infoJuego').show();
    let tablero = $('#play').show();

    let nombreJugador = $('input').val();
    $('#nombreJugador').text(nombreJugador); //guardo el nombre del imput

    let tipoJuego = $('select option:selected').val(); //me traigo el valor del select
    MemoTest(tipoJuego);

}

/*
*Valido que el campo de Nombre este completo.
*/
function validarNombre() {
    let obligatorio = $('#obligatorio');
    let nombreJugador = $('input').val();
    
    if (nombreJugador == ""||nombreJugador == undefined) {
        obligatorio.text("* Campo obligatorio");
        return false;
    } else {
        obligatorio.text("");
    	cargarNuevoJuego();    
    }
}