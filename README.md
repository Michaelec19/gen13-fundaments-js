# gen13-fundaments-js
# Sistema de Pedidos de Comida (CLI) pedidos rappi

Un script en línea de comandos (CLI) para simular el proceso de confirmación, modificación y facturación de un pedido de comida a domicilio.

## Características

* **Confirmación de pedido:** Permite al usuario revisar su lista actual de productos antes de ser enviados.
* **Modificación en tiempo real:** Si el cliente no está de acuerdo con el pedido inicial, el sistema permite **AGREGAR** o **QUITAR** productos del carrito de forma interactiva.
* **Cálculo de facturación:** Genera un recibo al confirmar la orden que incluye:
  * Subtotal de los productos.
  * Costo de envío (con lógica para envíos gratuitos si el cliente es *Premium*).
  * Cálculo sugerido de propina (10%).
* **Validaciones:** Evita procesar envíos si el carrito queda vacío y alerta si se ingresan productos que no existen en el menú.


## Instalación y Ejecución

1. Clona este repositorio o descarga el archivo principal **pedidoRappi.js**.
2. Abre tu terminal o línea de comandos.
3. Navega hasta el directorio donde guardaste el archivo.
4. Ejecuta el script con el siguiente comando:

```bash
node pedidoRappi.js
```
## Guía de Uso
Al iniciar el script, recibirás un saludo personalizado y verás los productos actuales en tu carrito. 

Se te preguntará si la lista es correcta:
Si respondes **SI**: El pedido pasa a estado **"ENVIADO"** y la consola imprimirá tu factura final con el total a pagar.
Si respondes **NO**: Entrarás al menú de modificación, el sistema te preguntará si deseas **AGREGAR** o **QUITAR** un producto:

**AGREGAR:** Te mostrará el menú disponible para que escribas el producto que deseas sumar a tu orden.

**QUITAR:** Te mostrará tu orden actual para que escribas el producto que deseas eliminar.

El ciclo se repetirá hasta que confirmes que tu pedido es correcto respondiendo **SI**
