//FUNCIONES EJERCICIO JS//
function isPalindrome(text){
    var originalText = text.toLowerCase();
    var reversedText = originalText.split('').reverse().join(''); // documentación: indicar que aquí utilizamos primero split porque la función reverse solo se aplica a arrays
    if(reversedText == originalText){
        document.getElementById("texto-solucion-1").innerHTML = "Sí es palíndromo";
    } else {
        document.getElementById("texto-solucion-1").innerHTML = "No es palíndromo";
    }
}

function checkLarger(number1, number2){
    if (Number(number1) == Number(number2)){
        document.getElementById("texto-solucion-2").innerHTML = "Ambos números son iguales.";
    }else if(Number(number1) > Number(number2)){
        document.getElementById("texto-solucion-2").innerHTML = "El primer número (" + number1 + ") es mayor que el segundo (" + number2 + ").";
    }else{
        document.getElementById("texto-solucion-2").innerHTML = "El segundo número (" + number2 + ") es mayor que el primero (" + number1 + ").";
    }
    return true;
}

function getVowels(longText){
    var originalText1 = longText.toLowerCase();
    var vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
    var vowelsInText = [];
    for(i=0;i<originalText1.length;i++){
        if(vowels.includes(originalText1[i])){
            vowelsInText.push(originalText1[i]);
        }
    }
    if (vowelsInText.length > 0){
        document.getElementById("texto-solucion-3").innerHTML = vowelsInText.join(" ");
    } else {
        document.getElementById("texto-solucion-3").innerHTML = "No se ha encontrado ninguna vocal en el texto introducido.";
    }
}

function getNumberVowels(longText2){
    var originalText2 = longText2.toLowerCase();
    var vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
    var vowelA = [];
    var vowelE = [];
    var vowelI = [];
    var vowelO = [];
    var vowelU = [];
    var vowelsInText1 = [];
    for(i=0;i<originalText2.length;i++){
        if(vowels.includes(originalText2[i])){
            vowelsInText1.push(originalText2[i]);
            if(originalText2[i] == "a" || originalText2[i] == "á"){
                vowelA.push(originalText2[i]);
            } else if (originalText2[i] == "e" || originalText2[i] == "é"){
                vowelE.push(originalText2[i]);
            } else if (originalText2[i] == "i" || originalText2[i] == "í"){
                vowelI.push(originalText2[i]);
            } else if (originalText2[i] == "o" || originalText2[i] == "ó"){
                vowelO.push(originalText2[i]);
            } else {
                vowelU.push(originalText2[i]);
            }
        }
    }
    if (vowelsInText1.length > 0){
        document.getElementById("texto-solucion-4").innerHTML = "A: " + vowelA.length + " // E: " + vowelE.length + " // I: " + vowelI.length + " // O: " + vowelO.length + " // U: " + vowelU.length;
    }else {
        document.getElementById("texto-solucion-4").innerHTML = "No se ha encontrado ninguna vocal en el texto introducido.";
    }
}
//CÓDIGO AJAX//
String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
        replace(/%0A/g, '<br/>').
        replace(/%3C/g, '&lt;').
        replace(/%3E/g, '&gt;'));
}

var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
var tiempoInicial = 0;

//Ejercicio 1
window.onload = function() {
    // Cargar en el input text la URL de la página
    var recurso = document.getElementById('recurso');
    recurso.value = location.href;

    // Cargar el recurso solicitado cuando se pulse el botón MOSTRAR CONTENIDOS
    document.getElementById('enviar').onclick = cargaContenido;
}

function cargaContenido() {
// Borrar datos anteriores
document.getElementById('contenidos').innerHTML = "";
document.getElementById('estados').innerHTML = "";

// Instanciar objeto XMLHttpRequest
if(window.XMLHttpRequest) {
    peticion = new XMLHttpRequest();
}
else {
    peticion = new ActiveXObject("Microsoft.XMLHTTP");
}

// Preparar función de respuesta
peticion.onreadystatechange = muestraContenido;

// Realizar petición
tiempoInicial = new Date();
var recurso = document.getElementById('recurso').value;
peticion.open('GET', recurso+'?nocache='+Math.random(), true);
peticion.send(null);
}

// Función de respuesta
function muestraContenido() {
    var tiempoFinal = new Date();
    var milisegundos = tiempoFinal - tiempoInicial;

    var estados = document.getElementById('estados');
    estados.innerHTML += "[" + milisegundos + " mseg.] " + estadosPosibles[peticion.readyState] + "<br/>";

    if(peticion.readyState == 4) {
        if(peticion.status == 200) {
        var contenidos = document.getElementById('contenidos');
        contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
        }
        muestraCabeceras();
        muestraCodigoEstado();
    }
}

function muestraCabeceras() {
    var cabeceras = document.getElementById('cabeceras');
    cabeceras.innerHTML = peticion.getAllResponseHeaders().transformaCaracteresEspeciales();
}

function muestraCodigoEstado() {
    var codigo = document.getElementById('codigo');
    codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;
}