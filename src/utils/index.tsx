import { ItemCarrito } from "../types/ItemCarrito"
import { Producto } from "../types/Producto"

export const API_URL = "https://servicios.campus.pe/"

export const agregarCarrito = (producto: Producto, cantidad: number) => {
    const itemCarrito: ItemCarrito = {
        idproducto: producto.idproducto,
        nombre: producto.nombre,
        precio: producto.preciorebajado == 0
            ? producto.precio : producto.preciorebajado,
        cantidad: cantidad
    }
    let carrito: ItemCarrito[] = []

    if(sessionStorage.getItem("carritocompras")){
        carrito = JSON.parse(sessionStorage.getItem("carritocompras") || '[]')
        const index = carrito.findIndex(item => item.idproducto == itemCarrito.idproducto)
        if(index === -1){
            carrito.push(itemCarrito)
        }else{
            carrito[index].cantidad += itemCarrito.cantidad
        }
    }
    else{
        carrito.push(itemCarrito)
    }
    //locaStorage es un objeto que permite almacenar datos en el navegador en forma permanente
    //sessionStorage es un objeto que permite almacenar datos en el navegador en la pestaña actual
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
    //setItem es un método que permite almacenar datos en el navegador
    //JSON.stringify convierte un objeto en una cadena de texto

}