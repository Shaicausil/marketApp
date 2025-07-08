let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const inputBuscar = document.getElementById("buscarProducto");
    const resultadoBusqueda = document.getElementById("resultadoBusqueda");

    if (inputBuscar && resultadoBusqueda) {
        inputBuscar.addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            resultadoBusqueda.innerHTML = "";

            if (query.length > 0) {
                const coincidencias = productos.filter(p =>
                    p.nombre.toLowerCase().startsWith(query)
                );

                if (coincidencias.length > 0) {
                    coincidencias.forEach(p => {
                        const div = document.createElement("div");
                        div.classList.add("producto-encontrado");

                        const imagenURL = p.imagen || "https://via.placeholder.com/60";

                        div.innerHTML = `
                            <img src="${imagenURL}" alt="${p.nombre}" class="img-producto">
                            <div>
                                <p><strong>${p.nombre}</strong></p>
                                <p>$${Number(p.precio).toFixed(2)}</p>
                            </div>
                        `;
                        div.addEventListener("click", () => {
                            agregarProducto(p);
                            resultadoBusqueda.innerHTML = "";
                            inputBuscar.value = "";
                        });
                        resultadoBusqueda.appendChild(div);
                    });
                } else {
                    resultadoBusqueda.textContent = "Sin coincidencias.";
                }
            }
        });
    }

    renderCarrito(); // por si hay venta temporal guardada
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

        const div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" class="img-carrito">
            <div class="info-carrito">
                <p><strong>${p.nombre}</strong></p>
                <p>$${Number(p.precio).toFixed(2)}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarProducto(${index})">eliminar</button>
        `;
        contenedor.appendChild(div);
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
    const historial = JSON.parse(localStorage.getItem("historialVentas")) || [];

    const total = carrito.reduce((acc, p) => acc + Number(p.precio), 0);

    const nuevaVenta = {
        productos: [...carrito],
        total,
        metodo: metodoPago,
        fecha: new Date().toISOString()
    };

    historial.push(nuevaVenta);
    localStorage.setItem("historialVentas", JSON.stringify(historial));
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
