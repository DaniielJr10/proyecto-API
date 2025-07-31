const API = 'http://localhost:3000/api/productos';

async function buscarProducto() {
    const id = document.getElementById('buscarId').value;

    try {
        const res = await fetch(API);
        const productos = await res.json();

        const producto = productos.find(p => p.id === parseInt(id));
        if (!producto) {
            alert("Producto no encontrado.");
            document.getElementById('productoFormContainer').style.display = "none";
            return;
        }

        document.getElementById('id').value = producto.id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('productoFormContainer').style.display = "block";
    } catch (error) {
        alert('Error al buscar producto: ' + error.message);
    }
}

async function actualizarProducto() {
    const id = document.getElementById('id').value;
    const precio = document.getElementById('precio').value;

    try {
        const res = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ precio })
        });

        if (res.ok) {
            alert('Producto actualizado correctamente.');
            document.getElementById('productoFormContainer').style.display = "none";
            document.getElementById('buscarForm').reset();
        } else {
            const msg = await res.text();
            alert('Error: ' + msg);
        }
    } catch (error) {
        alert('Error al actualizar producto: ' + error.message);
    }
}