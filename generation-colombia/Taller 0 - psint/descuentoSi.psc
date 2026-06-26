Algoritmo descuentoSi
	Definir precio_compra Como Entero
	Definir precio_con_descuento Como Real
	
	Escribir 'Cual es el total de la compra?'
	Leer precio_compra
	
	Si precio_compra > 500000 Entonces
		precio_con_descuento <- precio_compra * 0.85
		Escribir 'Descuento del 15%'
	Sino
		Si precio_compra >= 200000 Y precio_compra <= 500000 Entonces
			precio_con_descuento <- precio_compra * 0.90
			Escribir 'Descuento del 10%'
		Sino
			precio_con_descuento <- precio_compra
			Escribir 'Sin descuento'
		FinSi
	FinSi
	
	Escribir 'El precio final con descuento es: ', precio_con_descuento
	
FinAlgoritmo