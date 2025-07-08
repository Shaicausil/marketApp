
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById("buscarProducto");
    if (inputBuscar) {
        inputBuscar.addEventListener("input", function () {
            const query = this.value.toLowerCase();
            const resultado = productos.find(p =>
                p.nombre.toLowerCase().includes(query)
            );
            if (resultado) {
                agregarProducto(resultado);
                this.value = "";
            }
        });
    }
});

function agregarProducto(producto) {
    carrito.push(producto);
    renderCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    renderCarrito();
}

function renderCarrito() {
    const contenedor = document.getElementById("productosSeleccionados");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((p, index) => {
        subtotal += Number(p.precio);

        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");

        productoDiv.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" class="img-carrito">
            <div class="info-carrito">
                <p><strong>${p.nombre}</strong></p>
                <p>$${Number(p.precio).toFixed(2)}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarProducto(${index})">❌</button>
        `;

        contenedor.appendChild(productoDiv);
    });

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("descuento").textContent = "0.00";
    document.getElementById("domicilio").textContent = "0.00";
    document.getElementById("total").textContent = subtotal.toFixed(2);
}

function limpiarVenta() {
    carrito = [];
    renderCarrito();
}

function ventaTemporal() {
    if (carrito.length === 0) {
        alert("No hay productos para guardar.");
        return;
    }
    localStorage.setItem("ventaTemporal", JSON.stringify(carrito));
    alert("Venta guardada temporalmente.");
}

//  Guardar venta en historial
function guardarVentaEnHistorial(metodoPago) {
    const ventasGuardadas = JSON.parse(localStorage.getItem("historialVentas")) || [];

    const total = carrito.reduce((acc, p) => acc + Number(p.precio), 0);

    const nuevaVenta = {
        productos: [...carrito],
        total: total,
        metodo: metodoPago,
        fecha: new Date().toISOString()
    };

    ventasGuardadas.push(nuevaVenta);
    localStorage.setItem("historialVentas", JSON.stringify(ventasGuardadas));
}


function pagoCredito() {
    if (carrito.length === 0) {
        alert("No hay productos en la venta.");
        return;
    }
    guardarVentaEnHistorial("credito");
    alert("Venta guardada a crédito.");
    limpiarVenta();
}


function pagoContado() {
    if (carrito.length === 0) {
        alert("No hay productos en la venta.");
        return;
    }
    guardarVentaEnHistorial("contado");
    alert("Pago en efectivo registrado.");
    limpiarVenta();
}
