const readline = require('readline');
let menu = ["HAMBURGUESA", "PAPAS", "GASEOSA", "POSTRE"];

const cliente = {
    nombre: "Michael",
    ciudad: "Itagüí",
    premium: false,
    productos: ["HAMBURGUESA", "PAPAS", "GASEOSA"],
    estado: "EN PREPARACION"
};

const preciosMenu = {
    "HAMBURGUESA": 25000,
    "PAPAS": 8000,
    "GASEOSA": 4000,
    "POSTRE": 6000
};

const saludo = `Hola ${cliente.nombre}, tu pedido a domicilio en la ciudad de ${cliente.ciudad} está pronto a salir.\n`;

const leer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function confirmarPedido() {

    leer.question(`Confírmanos si tu lista de pedidos [${cliente.productos}] es correcta (SI o NO):\n > `, (input) => {
        
        if (input.toUpperCase() === 'SI') {
            if (cliente.productos.length === 0) {

                console.log('El carrito está vacío, grega productos antes de confirmar.');
                confirmarPedido();
                return;
            }
            cliente.estado = "ENVIADO";
            let totalProductos = 0;
            let costoDomicilio = 0;
            
            cliente.productos.forEach((producto) => {
                totalProductos += preciosMenu[producto];
            });

            if (!cliente.premium) { 
                costoDomicilio = 4000; 
            }

            const total = totalProductos + costoDomicilio;
            const PROPINA = total * 1.10;
            let propinaRedondeada = Math.round(PROPINA);

            console.log(`\nGracias por confirmar tu pedido, la orden paso a estado  ${cliente.estado}, ten el dinero listo ante que llegue el domiciliario\n`);

            console.log(`---------------------------------`);
            console.log(`       Factura                      `);
            console.log(`---------------------------------`);
            console.log(`Subtotal productos: $${totalProductos}`);
            console.log(`Costo de envío: ${cliente.premium ? 'Rappi Prime' : '$' + costoDomicilio}`);
            console.log(`---------------------------------`);
            console.log(`TOTAL A PAGAR:      $${total}`);
            console.log(`Con Propina 10%    $${propinaRedondeada}`);
            console.log(`---------------------------------\n`);

            leer.close();

        } else if (input.toUpperCase() === 'NO') {
                leer.question('¿Deseas AGREGAR o QUITAR un producto?\n> ', (accion) => {
                    const accionUpper = accion.toUpperCase();
                
                if (accionUpper === 'AGREGAR') {
                    console.log('\nMENU DISPONIBLE\n');
                    console.log(`------------------\n`)
                    menu.forEach((item, index) => {
                        console.log(`${item}`);
                    });
                    console.log(`------------------\n`)

                    leer.question('\nEscribe el NOMBRE del producto que deseas AGREGAR:\n > ', (producto) => {
                        const productoMayuscula = producto.toUpperCase();
    
                        if (menu.includes(productoMayuscula)) {
                            cliente.productos.push(productoMayuscula);
                            console.log(`\nPRODUCTO AGREGADO, Tu nueva orden es: [${cliente.productos}]\n`);
                        } else {
                            console.log('\nLo sentimos, ese producto no está en el menú o escríbelo correctamente.\n');
                        }
                        confirmarPedido();
                    });
                } else if (accionUpper === 'QUITAR') {
                    console.log(cliente.productos)
                    leer.question('\nEscribe el NOMBRE del producto que deseas QUITAR:\n> ', (producto) => { 
                        const productoMayuscula = producto.toUpperCase();
                        const index = cliente.productos.indexOf(productoMayuscula);
                        
                        if (index > -1) {
                            cliente.productos.splice(index, 1);
                            console.log(`\nProducto eliminado. Tu nueva orden es: [${cliente.productos}]\n`);
                        } else {
                            console.log('\nEse producto no estaba en tu pedido original o lo escribiste mal.\n');
                        }
                        confirmarPedido();
                    });
                } else {
                    console.log('\nAccion invalida\n');
                    confirmarPedido()
                }
            });
        }
    });
   
}

console.log(saludo);
confirmarPedido();