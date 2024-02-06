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

async function agregarProducto(nombre, precio, cantidad, minimo,proveedor) {
    const res = await pool.query('INSERT INTO productos (nombre, precio, cantidad, minimo,proveedor) VALUES ($1, $2, $3, $4,$5)', [nombre, precio, cantidad, minimo,proveedor]);
    return res.rows;
}
async function eliminarProducto(id) {
    const res = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}
async function editarProducto(id, nombre, precio, cantidad, minimo,proveedor) {
    const res = await pool.query('UPDATE productos SET nombre = $2, precio = $3, cantidad = $4, minimo = $5, proveedor=$6 WHERE id = $1 RETURNING *', [id, nombre, precio, cantidad, minimo,proveedor]);
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

async function verificarCredenciales(correo, password) {
    const res = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND password = $2', [correo, password]);
    return res.rows.length > 0 ? res.rows[0] : null;
}
async function agregarProveedor(nombre) {
    const res = await pool.query('INSERT INTO proveedores (nombre) VALUES ($1) RETURNING *', [nombre]);
    return res.rows[0];
}
async function editarProveedor(id, nombre) {
    const res = await pool.query('UPDATE proveedores SET nombre = $2 WHERE id = $1 RETURNING *', [id, nombre]);
    return res.rows[0];
}
async function eliminarProveedor(id) {
    const res = await pool.query('DELETE FROM proveedores WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
}
async function obtenerProveedores() {
    const res = await pool.query('SELECT * FROM proveedores');
    return res.rows;
}




module.exports = {
    obtenerProductos,
    agregarProducto,
    editarProducto,
    obtenerUsuarios,
    agregarUsuario,
    eliminarProducto,
    editarUsuario,
    eliminarUsuario,
    verificarCredenciales,
    agregarProveedor,
    editarProveedor,
    eliminarProveedor,
    obtenerProveedores
};
