async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function habilitarEdicion(e) {
    const fila = e.target.closest('tr');
    const celdaCantidad = fila.querySelector('.cantidad');
    celdaCantidad.contentEditable = true;
    celdaCantidad.focus();
    const botonEditar = fila.querySelector('.boton-editar');
    botonEditar.textContent = 'Guardar';
    botonEditar.onclick = guardarEdicion;
}

async function guardarEdicion(e) {
    const fila = e.target.closest('tr');
    const id = fila.querySelector('.id').textContent;
    const nombre=fila.querySelector('.nombre').textContent;
    const precio=fila.querySelector('.precio').textContent;
    const minimo=fila.querySelector('.minimo').textContent;
    const cantidad = fila.querySelector('.cantidad').textContent;
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre:nombre,precio:precio,cantidad: cantidad,minimo:minimo })
        });
        if (!response.ok) throw new Error('Error al guardar la edición');
      
        cargarProductos();
    } catch (error) {
        console.error('Error al guardar los productos:', error);
    }
}

function mostrarProductos(productos) {
    productos.sort((a, b) => a.id - b.id);
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    const tabla = document.createElement('table');
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Mínimo</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = tabla.querySelector('tbody');
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        const claseCantidadBaja = parseInt(producto.cantidad,10) <= parseInt(producto.minimo,10) ? 'cantidad-baja' : '';
        fila.innerHTML = `
            <td class="id ${claseCantidadBaja}">${producto.id}</td>
            <td class="nombre">${producto.nombre}</td>
            <td class="precio">${producto.precio}</td>
            <td class="cantidad">${producto.cantidad}</td>
            <td class="minimo">${producto.minimo}</td>
            <td>
                <button class="boton-editar">Editar</button>
                <button class="boton-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
    contenedor.appendChild(tabla);
    contenedor.querySelectorAll('.boton-editar').forEach(boton => {
        boton.addEventListener('click', habilitarEdicion);
    });
}

document.addEventListener('DOMContentLoaded', cargarProductos);

async function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);
    const minimo = parseInt(document.getElementById('minimo').value, 10);

    try {
        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, precio, cantidad, minimo })
        });

        if (!response.ok) throw new Error(`Error al crear producto: ${response.status}`);
        let resultado = {};
        if (response.headers.get("content-type")?.includes("application/json")) {
            resultado = await response.json();
            console.log('Producto agregado:', resultado);
            alert('Producto agregado con éxito');
        } else {
            console.log('Producto agregado correctamente, sin respuesta JSON del servidor');
            alert('Producto agregado correctamente');
        }
        document.getElementById('nombre').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('minimo').value = '';
        cargarProductos();
    } catch (error) {
        console.error('Error al agregar el producto:', error.message);
        alert('Error al agregar el producto: ' + error.message);
    }
}
async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Error al eliminar producto: ${response.status}`);
        
        alert('Producto eliminado con éxito');
        cargarProductos();
    } catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        alert('Error al eliminar el producto: ' + error.message);
    }
}

