const nameInput = document.getElementById('nameInput'); 
const contraseña = document.getElementById('contraseña'); 
const usuario = document.getElementById('usuario'); 
const saveButton = document.getElementById('saveButton'); 
const savedNameDisplay = document.getElementById('savedNameDisplay');
const messageElement = document.getElementById('message');


function showMessage(msg, isError = false) {
    messageElement.textContent = msg;
    messageElement.style.color = isError ? 'red' : 'green';
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}


function loginUser() {
    const name = nameInput.value.trim();
    const pass = contraseña.value.trim();

    if (name === '' || pass === '') {
        showMessage('Debes llenar ambos campos.', true);
        return;
    }

    const savedName = localStorage.getItem('userName');
    const savedPass = localStorage.getItem('Password');

    if (name === savedName && pass === savedPass) {
        showMessage('Inicio de sesión exitoso. Redirigiendo...');
        setTimeout(() => {
            window.location.href = '../templates/dashboard.html';
        }, 2000);
    } else {
        showMessage('Correo o contraseña incorrectos.', true);
    }
}


function displaySavedName() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        savedNameDisplay.textContent = `Hola de nuevo, ${savedName}!`;
    } else {
        savedNameDisplay.textContent = 'No hay nombre guardado todavía.';
    }
}


saveButton.addEventListener('click', loginUser);


document.addEventListener('DOMContentLoaded', displaySavedName);
