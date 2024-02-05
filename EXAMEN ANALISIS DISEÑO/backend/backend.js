const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'bazarpiolin',
    password: '1234',
    port: 5432,
});

async function obtenerProductos() {
    const res = await pool.query('SELECT * FROM productos');
    return res.rows;
}

async function agregarProducto(nombre, precio, cantidad, minimo) {
    const res = await pool.query('INSERT INTO productos (nombre, precio, cantidad, minimo) VALUES ($1, $2, $3, $4)', [nombre, precio, cantidad, minimo]);
    return res.rows;
}
async function eliminarProducto(id) {
    const res = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}
async function editarProducto(id, nombre, precio, cantidad, minimo) {
    const res = await pool.query('UPDATE productos SET nombre = $2, precio = $3, cantidad = $4, minimo = $5 WHERE id = $1 RETURNING *', [id, nombre, precio, cantidad, minimo]);
    return res.rows[0];
}

async function obtenerUsuarios() {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
}

async function agregarUsuario(nombre, permiso, correo,password) {
    const res = await pool.query('INSERT INTO usuarios (nombre, permiso, correo,password) VALUES ($1, $2, $3,$4)', [nombre, permiso, correo,password]);
    return res.rowCount;
}

async function editarUsuario(id, nombre, permiso, correo) {
    const res = await pool.query('UPDATE usuarios SET nombre = $2, permiso = $3, correo = $4 WHERE id = $1 RETURNING *', [id, nombre, permiso, correo]);
    return res.rows[0];
}

async function eliminarUsuario(id) {
    const res = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}



module.exports = {
    obtenerProductos,
    agregarProducto,
    editarProducto,
    obtenerUsuarios,
    agregarUsuario,
    eliminarProducto,
    editarUsuario,
    eliminarUsuario
};
