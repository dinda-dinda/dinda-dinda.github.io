/*Dinda Daiana Indaburo
TP2 - MemoTest 

ADA BootCamp FrontEnd
3era Generacion TM 2018 

Profesora Belen Alegre
Adjunta Estefania
*/

/*
 *arma el memoTest dependiendo del tipo de juego, carga las imagenes correspondientes
 *param tipo de juego
 *
 */

function MemoTest(tipoJuego) {
    var paresEncontrados = 0;
    var intentos = 0;
    var limiteIntentos = 45;

    var primerImagen = {
        'imagen': null,
        'id': ''
    };

    var segundaImagen = {
        'imagen': null,
        'id': ''
    };

    var arrayJuego;

/*cambia el valor de la variable arrayJuego (con los src de las imagenes) teniendo en cuenta la eleccion en el select del home
*/
    function definirArraydeJuego() {
        if (tipoJuego == "arboles") {
            arrayJuego = [
                "img/arboles/0.jpg",
                "img/arboles/1.jpg",
                "img/arboles/2.jpg",
                "img/arboles/3.jpg",
                "img/arboles/4.jpg",
                "img/arboles/5.jpg",
                "img/arboles/0.jpg",
                "img/arboles/1.jpg",
                "img/arboles/2.jpg",
                "img/arboles/3.jpg",
                "img/arboles/4.jpg",
                "img/arboles/5.jpg"
            ];
        } else {
            arrayJuego = [
                "img/flores/0.jpg",
                "img/flores/1.jpg",
                "img/flores/2.jpg",
                "img/flores/3.jpg",
                "img/flores/4.jpg",
                "img/flores/5.jpg",
                "img/flores/0.jpg",
                "img/flores/1.jpg",
                "img/flores/2.jpg",
                "img/flores/3.jpg",
                "img/flores/4.jpg",
                "img/flores/5.jpg"
            ];

        }

    }

/*en cada intento, actualiza el numero de intentos restantes*/
    $('#intentos').text(limiteIntentos);

/*
*Quito las clases checked y agrego las notChecked - Principio del juego
*/
    function agregarClases() {
        for (var i = arrayJuego.length - 1; i >= 0; i--) {

            $("#" + i).first().addClass('notChecked'); //le agrego la clase notChecked
            $("#" + i).first().removeClass('checked'); //le quita la clase notChecked
        }
    }

    /*        todos los img que estan en el figure les pone el attributo src default
                que les corresponde segun la eleccion del input. (guardado en variable backImg)    
     *        @param  -  return 
     */
    function voltarCartas() {
        let backImg;
        if (tipoJuego == "arboles") {
            backImg = "img/arboles/backImg.jpg";

        } else {
            backImg = "img/flores/backImg.jpg";
        }

        $('img').attr("src", backImg).delay(800).fadeIn(400);
    }

/*      Cambia el mensaje de Finalizado del Juego
*       Redirecciona segun el click
*/
    function finPartida(gano) {
        let mensaje;
        let icono;

        if (gano) {
            mensaje = "Yeah, Ganaste!";
            icono = "success"
        } else {
            mensaje = "Awww, perdiste!";
            icono = "error"
        }

        swal(mensaje, {
                buttons: {
                    no: "Salir del Juego",
                    si: "Jugar de Nuevo"
                }
            })
            .then((value) => {
                switch (value) {
                    case "no":
                        location.reload();
                        break;

                    case "si":
                        intentos = 0;
                        paresEncontrados = 0;
                        limiteIntentos = 45;
                        MemoTest(tipoJuego);
                        break;
                }
            });
    }

    /*
     *Guardo el ID de la segunda carta y modifico los intentos restantes.
     *param ID
     */

    function guardarIDsSegundaCarta(id) {
        if (intentos == limiteIntentos) {
            finPartida(false);
        } else {
            intentos++; //suma de intentos fallidos
            $('#intentos').text(limiteIntentos - intentos); //Display de intentos
            segundaImagen.imagen = arrayJuego[id]; //pongo src en objeto segundaImagen.imagen el numero de index que corresponde con el id del figure
            segundaImagen.id = id; //me guardo el id del figure en primerImagen
        }
    }

    
    /*
    *Limpia los objetos llevando a null
    */
    function borrarIDsPrimerSegundaImagenNull() {
        primerImagen.imagen = null;
        primerImagen.id = null;
        segundaImagen.imagen = null;
        segundaImagen.id = null;
    }

    /*        las imagenes que tienen la img del array las vuelve a la default        
     *        @param  segundaImg -  return 
     */
    function chequearCartas(id) {
        if (primerImagen.imagen == null) { //si no tengo nada guardado como 1era imagen,
            primerImagen.imagen = arrayJuego[id]; //pongo src en objeto primerImagen.imagen el numero de index que corresponde con el id del figure
            primerImagen.id = id; //me guardo el id del figure en primerImagen.
        } else {
            if (primerImagen.imagen == arrayJuego[id] && //Si el src guardada en primerImagen es igual al numero de index
                primerImagen.id != id) { //comparo el nuevo id de la segunda imagen con el guardado en primera imagen

                paresEncontrados++;

                guardarIDsSegundaCarta(id, arrayJuego);

                $("#" + primerImagen.id).off(); //quito evento ;1era imagen
                $("#" + segundaImagen.id).off(); //quito el evento a la segunda imagen

                $("#" + primerImagen.id).first().removeClass('notChecked'); //le quito la clase notChecked
                $("#" + segundaImagen.id).first().removeClass('notChecked'); //le quito la clase notChecked
                $("#" + primerImagen.id).first().addClass('checked'); //agrego nueva clase checked
                $("#" + segundaImagen.id).first().addClass('checked'); //agrego nueva clase checked

                if (paresEncontrados == arrayJuego.length / 2) { //si se encontraron todos los pares, termina partida
                    finPartida(true);

                }
                borrarIDsPrimerSegundaImagenNull(primerImagen, segundaImagen);

            } else {                                //si todavia quedan pares por encontrar y tengo guardada una primera imagen que es distinta al id, Guardo el ID.
                if (primerImagen.id != id) {
                    guardarIDsSegundaCarta(id, arrayJuego);

                    function showNext() {
                        $("#" + segundaImagen.id).show(1000);
                        $("#" + primerImagen.id).show(1000);
                    }
                    window.setTimeout(darVuelta, 1000);
                }
            }
        }
    }

    /*        vuelve a la default las imagenes que ya tienen un src seteado con la img del array        
     *        @param  segundaImg -  primerImagen null
     *
     */
    function darVuelta() {
        let backImg;
        if (tipoJuego == "arboles") {
            backImg = "img/arboles/backImg.jpg";

        } else {
            backImg = "img/flores/backImg.jpg";
        }
        $("#" + primerImagen.id).find(':first-child').attr("src", backImg); //vuelta 1er imagen
        $("#" + segundaImagen.id).find(':first-child').attr("src", backImg); //vuelta 2da imagen
        $("#" + primerImagen.id).removeClass("mirando");
        $("#" + segundaImagen.id).removeClass("mirando").delay(2000).fadeIn();
        borrarIDsPrimerSegundaImagenNull();
    }

    /*        trae el atributo ID del Figure, lo compara con el Index del array arboles
     *     donde esta el src que le corresponde, cambiando la imagen de default.
     *        @param  -  return id
     */
    function verCarta() {
        if (segundaImagen.imagen == null) {
            var id = $(this).attr("id");
            $(this).find(':first-child').attr("src", arrayJuego[id]);
            $(this).addClass("mirando"); //    
            chequearCartas(id);
        }
    }

    /*        cambia los index del contenido de un array
     *        @param array  -  return array(con el mismo contenido en distinto index)
     */
    function mezclarArray(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    $('figure').on('click', verCarta);

    definirArraydeJuego();
    agregarClases();
    mezclarArray(arrayJuego);
    voltarCartas();
}