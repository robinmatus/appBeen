// Se obtiene los datos del archivo data.json
function ajax_get_json(usuarioIngresado) {

    var resultado = document.getElementById("info");
    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = ActiveXObject("Microsoft.XMLHTTP");
    }

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var datos = JSON.parse(xmlhttp.responseText);
                var x = encontrarEmail(datos, usuarioIngresado);
                var mensaje = (x === true) ? "Sí fue encontrado" : "No fue encontrado";
                //resultado.innerHTML = mensaje;
                //console.log(datos);
            }
        }
        xmlhttp.open("GET", "data.json", true);
        xmlhttp.send();
    
}

// Buscamos si el correo existe en el JSON
function encontrarEmail(objectoJSON, usuario) {

    for (i = 0; i < objectoJSON['data'].length; i++) {

        if (objectoJSON['data'][i]['email'] == usuario) {

            // Variables para los arreglos de phones y relatives
            var phones = '';
            var relatives = '';

            for (x = 0; x < objectoJSON['data'][i]['phoneNumbers'].length; x++) {
                if (objectoJSON['data'][i]['phoneNumbers'][x]['phone']) {
                    phones += objectoJSON['data'][i]['phoneNumbers'][x]['phone'] + '<br>';
                }
            }

            for (y = 0; y < objectoJSON['data'][i]['relatives'].length; y++) {
                if (objectoJSON['data'][i]['relatives'][y]['name']) {
                    relatives += objectoJSON['data'][i]['relatives'][y]['name'] + '<br>';
                }
            }

            $('#phoneNumbers').html(phones)
            $('#relatives').html(relatives);
            $('#address').html(objectoJSON['data'][i]['address']);
            $('#emailUsuario').html(objectoJSON['data'][i]['email']);
            $('#name').html(objectoJSON['data'][i]['name'] + ", " + objectoJSON['data'][i]['age']);
            $('#notes').html(objectoJSON['data'][i]['notes']);


            return aux = true;
        } else {

            aux = false;

        }
    }
    return aux;
}

// Obtenemos los datos del URL 
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

// Evento para hacer las funciones de busquedas del email
$('#myForm').submit(function (evt) {

    $('#email').removeClass("error");
    evt.preventDefault();
    var email = $('#email').val();
    if (email.length > 0) {
        location.href = 'result.html?email=' + email;
    } else {
        $('#email').addClass("error");
        $('#email').attr("placeholder", "Please add a valid email address");
    }

});