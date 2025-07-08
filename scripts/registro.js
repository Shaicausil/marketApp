const nameInput = document.getElementById('nameInput'); // Campo de texto
const contraseñaInput = document.getElementById('contraseña'); // Campo de contraseña
const usuario = document.getElementById('usuario'); // Campo adicional si lo usas
const botonCuenta = document.getElementById('botonCuenta'); // Botón de crear cuenta
const savedNameDisplay = document.getElementById('savedNameDisplay'); // Mostrar nombre guardado
const messageElement = document.getElementById('message'); // Para mensajes temporales

// Función para mostrar mensajes
function showMessage(msg, isError = false) {
    messageElement.textContent = msg;
    messageElement.style.color = isError ? 'red' : 'green';
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

// Función para guardar datos (registro)
function saveName() {
    const correo = nameInput.value.trim();
    const contraseña = contraseñaInput.value.trim();

    if (correo === '') {
        showMessage('Por favor, ingresa tu nombre.', true);
        return;
    }
    if (contraseña === '') {
        showMessage('Ingresa una contraseña', true);
        return;
    }

    const existente = localStorage.getItem('userName');
    if (existente === correo) {
        showMessage('Esta cuenta ya existe. Redirigiendo al dashboard...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        return;
    }

    localStorage.setItem('userName', correo);
    localStorage.setItem('Password', contraseña);
    showMessage('Se ha creado la cuenta con éxito...', false);
    setTimeout (() => {
        window.location.href = '../index.html';
    }, 3000);



    nameInput.value = '';
    contraseñaInput.value = '';
}

// Mostrar el nombre guardado
function displaySavedName() {
    const savedName = localStorage.getItem('userName');

    if (savedName) {
        savedNameDisplay.textContent = `Hola de nuevo, ${savedName}!`;
    } else {
        savedNameDisplay.textContent = 'No hay nombre guardado todavía.';
    }
}

// Escuchador de evento del botón
botonCuenta.addEventListener('click', saveName);

// Mostrar nombre al cargar
document.addEventListener('DOMContentLoaded', displaySavedName);
document.getElementById("nameInput").textContent = nameInput;
