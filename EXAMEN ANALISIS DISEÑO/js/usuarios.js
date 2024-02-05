window.onload = function() {
    cargarUsuarios();
};

async function cargarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
            throw new Error('Error al cargar usuarios');
        }
        const usuarios = await response.json();
        const tbody = document.getElementById('lista-usuarios');
        tbody.innerHTML = ''; 
        usuarios.sort((a, b) => a.id - b.id);
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.id = `fila-${usuario.id}`;
            fila.innerHTML = `
                <td class="id">${usuario.id}</td>
                <td class="nombre">${usuario.nombre}</td>
                <td class="permiso">${usuario.permiso}</td>
                <td class="correo">${usuario.correo}</td>
                <td>
                    <button class="boton-editar" onclick="habilitarEdicionUsuario(event, ${usuario.id})">Editar</button>
                    <button class="boton-eliminar" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }
}


async function agregarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const permiso = document.getElementById('permiso').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value; // Obtener la contraseña del formulario

    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, permiso, correo, password })
        });

        if (!response.ok) {
            throw new Error('Error al agregar usuario');
        }

        alert('Usuario agregado con éxito');
        cargarUsuarios(); 
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        alert('Error al agregar el usuario');
    }
}


function editarUsuario(id) {
    const fila = document.querySelector(`#fila-${id}`);
    if (!fila) return;

    fila.querySelectorAll('td').forEach((celda, index) => {
        if (index < 4) {
            const texto = celda.textContent;
            const input = document.createElement('input');
            input.value = texto;
            celda.innerHTML = '';
            celda.appendChild(input);
        }
    });

    const botonEditar = fila.querySelector('.boton-editar');
    botonEditar.textContent = 'Guardar';
    botonEditar.onclick = function() { guardarCambios(id); };
}

function guardarCambios(id) {
    const fila = document.querySelector(`#fila-${id}`);
    if (!fila) return;

    const inputs = fila.querySelectorAll('input');
    const nombre = inputs[0].value;
    const permiso = inputs[1].value;
    const correo = inputs[2].value;
    console.log('Guardar cambios:', { id, nombre, permiso, correo });
}


async function eliminarUsuario(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar usuario: ${response.statusText}`);
        }

        alert('Usuario eliminado con éxito');
        cargarUsuarios();
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        alert('Error al eliminar el usuario');
    }
}



function habilitarEdicionUsuario(e, id) {
    const fila = e.target.closest('tr');
    const celdaNombre = fila.querySelector('.nombre');
    const celdaPermiso = fila.querySelector('.permiso');
    const celdaCorreo = fila.querySelector('.correo');
    celdaNombre.innerHTML = `<input type='text' value='${celdaNombre.textContent}' />`;
    celdaCorreo.innerHTML = `<input type='email' value='${celdaCorreo.textContent}' />`;
    const selectPermiso = document.createElement('select');
    selectPermiso.innerHTML = `
        <option value="1" ${celdaPermiso.textContent === '1' ? 'selected' : ''}>Dueño</option>
        <option value="2" ${celdaPermiso.textContent === '2' ? 'selected' : ''}>Vendedor</option>
    `;
    celdaPermiso.innerHTML = '';
    celdaPermiso.appendChild(selectPermiso);

    const botonEditar = fila.querySelector('.boton-editar');
    botonEditar.textContent = 'Guardar';
    botonEditar.onclick = function() { guardarCambiosUsuario(fila, id); };
}


async function guardarCambiosUsuario(fila, id) {
    const inputNombre = fila.querySelector('.nombre input');
    const selectPermiso = fila.querySelector('.permiso select');
    const inputCorreo = fila.querySelector('.correo input');

    const nombre = inputNombre.value;
    const permiso = selectPermiso.value;
    const correo = inputCorreo.value;

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, permiso, correo })
        });

        if (!response.ok) throw new Error(`Error al guardar los cambios: ${response.status}`);
        cargarUsuarios();
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
    }
}
