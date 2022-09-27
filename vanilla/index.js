import { DateTime } from "./luxon.js";

const btnCalcularVida = document.querySelector('#calcular-vida');
btnCalcularVida.addEventListener('click', calcularVida);

const btnCalcularCumple = document.querySelector('#calcular-cumple');
btnCalcularCumple.addEventListener('click', calcularCumple);

const header = document.querySelector('#header');
const titulo = document.querySelector('#titulo-principal');
const contenedor = document.querySelector('#contenedor');
const formulario = document.querySelector('#formulario');
const tabla = document.querySelector('#tabla');
const divRegresar = document.querySelector('#regresar');

function calcularVida() {
    titulo.remove();
    formulario.remove();
    const newTitulo = document.createElement('h1');
    newTitulo.classList.add('text-center', 'text-white');
    newTitulo.textContent = 'TIEMPO DE VIDA';

    const newFormulario = document.createElement('section');
    newFormulario.classList.add('bg-light', 'container', 'mt-5');

    const h4Mensaje = document.createElement('h4');
    h4Mensaje.classList.add('text-center', 'my-4');
    h4Mensaje.textContent = 'Ingresa tu fecha y hora de nacimiento';

    const inputFecha = document.createElement('input');
    inputFecha.type = 'datetime-local';
    inputFecha.id = 'inputFecha';

    const buttonFecha = document.createElement('button');
    buttonFecha.classList.add('btn', 'btn-primary', 'btn-lg', 'col-md-3');
    buttonFecha.textContent = 'Calcular';
    buttonFecha.onclick = function () {
        calcularFecha();
    };

    const btnAtras = document.createElement('button');
    btnAtras.classList.add('btn', 'btn-secondary');
    btnAtras.textContent = 'Atrás';
    btnAtras.onclick = function () {
        regresar();
    }

    newFormulario.appendChild(h4Mensaje);
    newFormulario.appendChild(inputFecha);
    newFormulario.appendChild(buttonFecha);

    header.appendChild(newTitulo);
    divRegresar.appendChild(btnAtras);

    contenedor.appendChild(newFormulario);
}

function calcularCumple() {
    titulo.remove();
    formulario.remove();
    const newTitulo = document.createElement('h1');
    newTitulo.classList.add('text-center', 'text-white');
    newTitulo.textContent = 'PRÓXIMO CUMPLEAÑOS';

    const newFormulario = document.createElement('section');
    newFormulario.classList.add('bg-light');

    const h4Mensaje = document.createElement('h4');
    h4Mensaje.classList.add('text-center', 'my-4');
    h4Mensaje.textContent = 'Ingresa la fecha de tu próximo cumpleaños';

    const inputFecha = document.createElement('input');
    inputFecha.type = 'date';
    inputFecha.id = 'inputFechaCumple';

    const buttonFecha = document.createElement('button');
    buttonFecha.classList.add('btn', 'btn-primary', 'btn-lg')
    buttonFecha.textContent = 'Calcular';
    buttonFecha.onclick = function () {
        calcularFechaCumple();
    }
    const btnAtras = document.createElement('button');
    btnAtras.classList.add('btn', 'btn-secondary');
    btnAtras.textContent = 'Atrás';
    btnAtras.onclick = function () {
        regresar();
    }

    newFormulario.appendChild(h4Mensaje);
    newFormulario.appendChild(inputFecha);
    newFormulario.appendChild(buttonFecha);

    header.appendChild(newTitulo);
    divRegresar.appendChild(btnAtras);

    contenedor.appendChild(newFormulario);
}

function calcularFecha() {
    limpiarHTML();

    const datoFecha = document.querySelector('#inputFecha').value;
    const edad = DateTime.fromISO(datoFecha);
    const fechaActual = DateTime.now();

    if (edad < fechaActual) {
        const calculo = fechaActual.diff(edad, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

        const table = document.createElement('section');
        table.classList.add('bg-light', 'container', 'mt-5', 'p-4');
        table.id = 'table';
        table.innerHTML = `
        <h4> Tu tiempo de vida es: </h4> <br>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th scope="row">Años </th>
                    <td>${calculo.years}</td>
                </tr>
                <tr>
                    <th scope="row">Meses </th>
                    <td>${calculo.months}</td>
                </tr>
                <tr>
                    <th scope="row">D&iacute;as </th>
                    <td>${calculo.days}</td>
                </tr>
                <tr>
                    <th scope="row">Horas </th>
                    <td>${calculo.hours}</td>
                </tr>
                <tr>
                    <th scope="row">Minutos </th>
                    <td>${calculo.minutes}</td>
                </tr>
                <tr>
                    <th scope="row">Segundos </th>
                    <td>${parseInt(calculo.seconds)}</td>
                </tr>
            </tbody>
        </table>
                `;

        tabla.appendChild(table);

    } else {
        mostrarAlerta('Fecha invalida: Ingresa un fecha anterior al día de hoy');
    }
}

function mostrarAlerta(msg) {

    const divMensaje = document.createElement('div');
    divMensaje.classList.add('alert', 'alert-danger');
    divMensaje.textContent = msg;
    tabla.appendChild(divMensaje);

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}

function calcularFechaCumple() {
    limpiarHTML();
    const datoFecha = document.querySelector('#inputFechaCumple').value;
    const proximoCumple = DateTime.fromISO(datoFecha);
    const fechaActual = DateTime.now();
    if (fechaActual < proximoCumple) {
        const calculo = proximoCumple.diff(fechaActual, ['years', 'months', 'days']).toObject();
        const table = document.createElement('section');
        table.classList.add('bg-light', 'container', 'mt-5', 'p-4');
        table.id = 'table';
        table.innerHTML = `
        <h4> Esto falta para tu cumpleaños: </h4> <br>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th scope="row">Años </th>
                    <td>${calculo.years}</td>
                </tr>
                <tr>
                    <th scope="row">Meses </th>
                    <td>${calculo.months}</td>
                </tr>
                <tr>
                    <th scope="row">D&iacute;as </th>
                    <td>${Math.ceil(calculo.days)}</td>
                </tr>
            </tbody>
        </table>
        <br>
                `;

        tabla.appendChild(table);
    } else {
        mostrarAlerta('Fecha invalida: Ingresa una fecha posterior al día de hoy');
    }
}

function limpiarHTML() {
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }
}

function regresar() {
    location.reload();
}