async function descargarProductosBajoMinimo() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const productos = await response.json();
        const productosBajoMinimo = productos.filter(p => parseInt(p.cantidad) < parseInt(p.minimo));

        let contenido = productosBajoMinimo.map(p => `${p.nombre}: Cantidad actual ${p.cantidad}, mínimo requerido ${p.minimo}`).join('\n');
        descargarArchivo(contenido, 'productos_bajo_minimo.txt');
    } catch (error) {
        console.error('Error al descargar productos bajo mínimo:', error);
    }
}
async function descargarConteoProveedores() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const productos = await response.json();
        let conteoProveedores = productos.reduce((conteo, p) => {
            conteo[p.proveedor] = (conteo[p.proveedor] || 0) + 1;
            return conteo;
        }, {});

        let contenido = Object.entries(conteoProveedores).map(([proveedor, cantidad]) => `${proveedor}: ${cantidad} veces`).join('\n');
        descargarArchivo(contenido, 'conteo_proveedores.txt');
    } catch (error) {
        console.error('Error al descargar conteo de proveedores:', error);
    }
}
function descargarArchivo(contenido, nombreArchivo) {
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido));
    elemento.setAttribute('download', nombreArchivo);

    elemento.style.display = 'none';
    document.body.appendChild(elemento);

    elemento.click();

    document.body.removeChild(elemento);
}
