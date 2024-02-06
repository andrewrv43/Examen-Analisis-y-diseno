const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const SECRET_KEY = '12345';
const {obtenerProveedores,agregarProveedor,editarProveedor,eliminarProveedor,verificarCredenciales,eliminarUsuario,eliminarProducto,editarProducto, obtenerProductos, agregarProducto, obtenerUsuarios, agregarUsuario,editarUsuario } = require('./backend');

app.use(cors());
app.use(express.json());
/*PRODUCTOS*/
app.post('/productos', async (req, res) => {
    try {
        const { nombre, precio, cantidad, minimo ,proveedor} = req.body;
        const producto = await agregarProducto(nombre, precio, cantidad, minimo,proveedor);
        res.status(201).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await eliminarProducto(id);
        if (productoEliminado) {
            res.json(productoEliminado);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, cantidad, minimo,proveedor } = req.body;
        const producto = await editarProducto(id, nombre, precio, cantidad, minimo,proveedor);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al editar el producto');
    }
});

app.get('/productos', async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

//USUARIOS

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
});
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, permiso, correo } = req.body;
        const usuarioActualizado = await editarUsuario(id, nombre, permiso, correo);

        if (usuarioActualizado) {
            res.json(usuarioActualizado);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
});


app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, permiso, correo, password } = req.body;
        const resultado = await agregarUsuario(nombre, permiso, correo, password);
        if (resultado > 0) {
            res.status(201).send('Usuario agregado con éxito');
        } else {
            res.status(400).send('No se pudo agregar el usuario');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el usuario');
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await eliminarUsuario(id);

        if (usuarioEliminado) {
            res.json({ mensaje: 'Usuario eliminado con éxito', usuario: usuarioEliminado });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el usuario');
    }
});


app.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await verificarCredenciales(correo, password);

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales no válidas' });
        }
        const token = jwt.sign({ id: usuario.id, permiso: usuario.permiso }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, permiso: usuario.permiso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

//PROVEEDORES
app.post('/proveedores', async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevoProveedor = await agregarProveedor(nombre);
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el proveedor' });
    }
});

app.put('/proveedores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const proveedorEditado = await editarProveedor(id, nombre);

        if (proveedorEditado) {
            res.json(proveedorEditado);
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar el proveedor' });
    }
});

app.delete('/proveedores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const proveedorEliminado = await eliminarProveedor(id);

        if (proveedorEliminado) {
            res.json({ mensaje: 'Proveedor eliminado con éxito', proveedor: proveedorEliminado });
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
});

app.get('/proveedores', async (req, res) => {
    try {
        const proveedores = await obtenerProveedores();
        res.json(proveedores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los proveedores' });
    }
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
