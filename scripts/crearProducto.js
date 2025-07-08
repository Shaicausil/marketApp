console.log('ingresando al js');

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnAgregarp');
    if (btn) {
        btn.addEventListener('click', () => {
            console.log('Botón clickeado');
            crearProducto();
        });
    }
});

function crearProducto() {
    const nombre = document.getElementById('nombre').value.trim();
    const tipo = document.getElementById('tipo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = document.getElementById('precio').value.trim();
    const Inputcantidad = document.getElementById('cantidad').value.trim();
    const imgInput = document.getElementById('imgp');
    const imgFile = imgInput.files[0];

    if (!nombre || !tipo || !descripcion || !precio || !imgFile) {
        alert('Por favor, llene todos los campos requeridos.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const urlImagen = e.target.result;

        const nuevoProducto = {
            nombre,
            tipo,
            descripcion,
            precio,
            Inputcantidad,
            imagen: urlImagen
        };

        // Obtener productos actuales o iniciar vacío
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

        // Agregar nuevo producto
        productosGuardados.push(nuevoProducto);

        // Guardar de nuevo
        localStorage.setItem('productos', JSON.stringify(productosGuardados));

        // Redirigir a productos.html
        window.location.href = 'productos.html';
    };

    reader.readAsDataURL(imgFile);
}
