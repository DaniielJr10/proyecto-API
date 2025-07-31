let productoActual = null;

async function buscarProducto() {
    const id = document.getElementById('buscarId').value;

    try {
        const response = await fetch('http://localhost:3000/api/productos');
        const productos = await response.json();

        const producto = productos.find(p => p.id === parseInt(id));
        if (!producto) {
            alert("Producto no encontrado.");
            document.getElementById('productoInfo').style.display = "none";
            return;
        }

        productoActual = producto;

        // Mostrar información del producto con conversión segura de precio
        document.getElementById('infoId').textContent = producto.id;
        document.getElementById('infoNombre').textContent = producto.nombre;
        document.getElementById('infoDescripcion').textContent = producto.descripcion;
        const precioNumerico = parseFloat(producto.precio);
        document.getElementById('infoPrecio').textContent = isNaN(precioNumerico)
            ? producto.precio
            : precioNumerico.toFixed(2);
        document.getElementById('productoInfo').style.display = "block";
    } catch (error) {
        alert('Error al buscar producto: ' + error.message);
    }
}

async function eliminarProducto() {
    if (!productoActual) {
        alert('No hay producto seleccionado.');
        return;
    }

    const confirmacion = confirm(`¿Estás seguro de eliminar el producto "${productoActual.nombre}"?`);
    if (!confirmacion) return;

    try {
        const response = await fetch(`http://localhost:3000/api/productos/${productoActual.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado correctamente.');
            document.getElementById('productoInfo').style.display = "none";
            document.getElementById('buscarForm').reset();
            productoActual = null;
        } else {
            const errorMsg = await response.text();
            alert('Error al eliminar: ' + errorMsg);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
}