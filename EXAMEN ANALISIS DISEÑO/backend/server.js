const cors = require('cors');
const express = require('express');
const app = express();
const {eliminarProducto,editarProducto, obtenerProductos, agregarProducto, obtenerUsuarios, agregarUsuario } = require('./backend');

app.use(cors());
app.use(express.json());
/*PRODUCTOS*/
app.post('/productos', async (req, res) => {
    try {
        const { nombre, precio, cantidad, minimo } = req.body;
        const producto = await agregarProducto(nombre, precio, cantidad, minimo);
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
        const { nombre, precio, cantidad, minimo } = req.body;
        const producto = await editarProducto(id, nombre, precio, cantidad, minimo);
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

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
