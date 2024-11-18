// Obtenemos elementos del DOM
const ventaForm = document.getElementById('ventaForm');
const ventasTabla = document.getElementById('ventasTabla').getElementsByTagName('tbody')[0];
const totalGlobalElement = document.getElementById('totalGlobal');
const limpiarVentasBtn = document.getElementById('limpiarVentas');
// Recuperar las ventas almacenadas del localStorage
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
// Función para renderizar las ventas en la tabla
function renderizarVentas() {
   // Limpiar tabla
   ventasTabla.innerHTML = '';
   let totalGlobal = 0;
   // Agregar filas a la tabla por cada venta
   ventas.forEach(venta => {
       const fila = ventasTabla.insertRow();
       const celdaProducto = fila.insertCell(0);
       const celdaCantidad = fila.insertCell(1);
       const celdaTotal = fila.insertCell(2);
       const celdaFecha = fila.insertCell(3);
       celdaProducto.textContent = venta.producto;
       celdaCantidad.textContent = venta.cantidad;
       celdaTotal.textContent = `₡${venta.precioTotal.toFixed(2)}`;
       celdaFecha.textContent = new Date(venta.fecha).toLocaleString();
       totalGlobal += venta.precioTotal;
   });
   // Actualizar total global
   totalGlobalElement.textContent = totalGlobal.toFixed(2);
}
// Función para manejar el registro de ventas
function registrarVenta(event) {
   event.preventDefault();
   // Obtener valores del formulario
   const producto = document.getElementById('producto').value;
   const precio = parseFloat(document.getElementById('precio').value);
   const cantidad = parseInt(document.getElementById('cantidad').value);
   // Validar datos
   if (!producto || precio <= 0 || cantidad <= 0) {
       alert('Por favor, ingrese valores válidos para todos los campos.');
       return;
   }
   // Crear el objeto de venta
   const venta = {
       producto,
       precioUnitario: precio,
       cantidad,
       precioTotal: precio * cantidad,
       fecha: new Date().toISOString(),
   };
   // Almacenar la venta en el arreglo
   ventas.push(venta);
   // Guardar las ventas en localStorage
   localStorage.setItem('ventas', JSON.stringify(ventas));
   // Limpiar formulario
   ventaForm.reset();
   // Renderizar las ventas actualizadas
   renderizarVentas();
}
// Función para limpiar el historial de ventas
function limpiarVentas() {
   if (confirm('¿Estás seguro de que deseas limpiar el historial de ventas?')) {
       ventas = [];
       localStorage.removeItem('ventas');
       renderizarVentas();
   }
}
// Evento para registrar venta
ventaForm.addEventListener('submit', registrarVenta);
// Evento para limpiar ventas
limpiarVentasBtn.addEventListener('click', limpiarVentas);
// Inicializar la página
renderizarVentas();