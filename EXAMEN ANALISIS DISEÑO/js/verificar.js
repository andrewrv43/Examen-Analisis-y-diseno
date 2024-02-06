function verificarAcceso() {
    const token = sessionStorage.getItem('token');
    const permiso = sessionStorage.getItem('permiso');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    if ((window.location.href.includes('usuarios.html')||
     window.location.href.includes('proveedores.html')||
     window.location.href.includes('reportes.html'))&& permiso !== '1') {
        window.location.href = 'productos.html';
    }
}
verificarAcceso();

function cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('permiso');
    window.location.href = 'index.html';
}
