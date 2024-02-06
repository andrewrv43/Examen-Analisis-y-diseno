async function cargarProveedores() {
    try {
        const response = await fetch('http://localhost:3000/proveedores');
        const proveedores = await response.json();
        mostrarProveedores(proveedores);
    } catch (error) {
        console.error('Error al cargar los proveedores:', error);
    }
}

function mostrarProveedores(proveedores) {
    const contenedor = document.getElementById('proveedores');
    contenedor.innerHTML = '';
    const tabla = document.createElement('table');

    const encabezado = tabla.insertRow();
    encabezado.insertCell().textContent = 'ID';
    encabezado.insertCell().textContent = 'Nombre';

    proveedores.forEach(proveedor => {
        const fila = tabla.insertRow();
        fila.insertCell().textContent = proveedor.id;
        fila.insertCell().textContent = proveedor.nombre;
    });

    contenedor.appendChild(tabla);
}

async function agregarProveedor() {
    const nombre = document.getElementById('nombreProveedor').value;
    if(nombre!=""){
    try {
        const response = await fetch('http://localhost:3000/proveedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });

        if (!response.ok) {
            throw new Error('Error al agregar proveedor');
        }

        alert('Proveedor agregado con éxito');
        cargarProveedores();
    } catch (error) {
        console.error('Error al agregar el proveedor:', error);
        alert('Error al agregar el proveedor');
    }
}
alert("NO SE PERMITEN CAMPOS VACIOS")
}

// Cargar proveedores al iniciar
document.addEventListener('DOMContentLoaded', cargarProveedores);
