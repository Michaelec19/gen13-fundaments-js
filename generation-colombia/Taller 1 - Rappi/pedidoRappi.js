const readline = require('readline');
let menu = ["HAMBURGUESA", "PAPAS", "GASEOSA", "POSTRE"];

const CLIENTE = {
    nombre: "Michael",
    ciudad: "Itagüí",
    premium: false,
    productos: ["HAMBURGUESA", "PAPAS", "GASEOSA"],
    estado: "EN PREPARACION"
};

const PRECIOS_MENU = {
    "HAMBURGUESA": 25000,
    "PAPAS": 8000,
    "GASEOSA": 4000,
    "POSTRE": 6000
};

const SALUDO = `Hola ${CLIENTE.nombre}, tu pedido a domicilio en la ciudad de ${CLIENTE.ciudad} está pronto a salir.\n`;

const LEER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function confirmarPedido() {

    LEER.question(`Confírmanos si tu lista de pedidos [${CLIENTE.productos}] es correcta (SI o NO):\n > `, (input) => {
        
        if (input.toUpperCase() === 'SI') {
            if (CLIENTE.productos.length === 0) {

                console.log('El carrito está vacío, grega productos antes de confirmar.');
                confirmarPedido();
                return;
            }
            CLIENTE.estado = "ENVIADO";
            let totalProductos = 0;
            let costoDomicilio = 0;
            
            CLIENTE.productos.forEach((producto) => {
                totalProductos += PRECIOS_MENU[producto];
            });

            if (!CLIENTE.premium) { 
                costoDomicilio = 4000; 
            }

            const TOTAL = totalProductos + costoDomicilio;
            const PROPINA = TOTAL * 1.10;
            let propinaRedondeada = Math.round(PROPINA);

            console.log(`\nGracias por confirmar tu pedido, la orden paso a estado  ${CLIENTE.estado}, ten el dinero listo ante que llegue el domiciliario\n`);

            console.log(`---------------------------------`);
            console.log(`       Factura                      `);
            console.log(`---------------------------------`);
            console.log(`Subtotal productos: $${totalProductos}`);
            console.log(`Costo de envío: ${CLIENTE.premium ? 'Rappi Prime' : '$' + costoDomicilio}`);
            console.log(`---------------------------------`);
            console.log(`TOTAL A PAGAR:      $${TOTAL}`);
            console.log(`Con Propina 10%    $${propinaRedondeada}`);
            console.log(`---------------------------------\n`);

            LEER.close();

        } else if (input.toUpperCase() === 'NO') {
                LEER.question('¿Deseas AGREGAR o QUITAR un producto?\n> ', (accion) => {
                    const ACCION_UPPER = accion.toUpperCase();
                
                if (ACCION_UPPER === 'AGREGAR') {
                    console.log('\nMENU DISPONIBLE\n');
                    console.log(`------------------\n`)
                    menu.forEach((item, INDEX) => {
                        console.log(`${item}`);
                    });
                    console.log(`------------------\n`)

                    LEER.question('\nEscribe el NOMBRE del producto que deseas AGREGAR:\n > ', (producto) => {
                        const PRODUCTO_MAYUSCULA = producto.toUpperCase();
    
                        if (menu.includes(PRODUCTO_MAYUSCULA)) {
                            CLIENTE.productos.push(PRODUCTO_MAYUSCULA);
                            console.log(`\nPRODUCTO AGREGADO, Tu nueva orden es: [${CLIENTE.productos}]\n`);
                        } else {
                            console.log('\nLo sentimos, ese producto no está en el menú o escríbelo correctamente.\n');
                        }
                        confirmarPedido();
                    });
                } else if (ACCION_UPPER === 'QUITAR') {
                    console.log(CLIENTE.productos)
                    LEER.question('\nEscribe el NOMBRE del producto que deseas QUITAR:\n> ', (producto) => { 
                        const PRODUCTO_MAYUSCULA = producto.toUpperCase();
                        const INDEX = CLIENTE.productos.indexOf(PRODUCTO_MAYUSCULA);
                        
                        if (INDEX > -1) {
                            CLIENTE.productos.splice(INDEX, 1);
                            console.log(`\nProducto eliminado. Tu nueva orden es: [${CLIENTE.productos}]\n`);
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

console.log(SALUDO);
confirmarPedido();