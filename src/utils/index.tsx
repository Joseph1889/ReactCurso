import { ItemCarrito } from "../types/ItemCarrito"
import { Producto } from "../types/Producto"
import { Empleado } from "../types/Empleado"
import { ItemSeleccionado } from "../types/ItemSeleccionado"

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

export const agregarEmpleado = (empleado: Empleado, cantidad: number) => {
    const itemSeleccionado: ItemSeleccionado= {
        idempleado: empleado.idempleado,
        apellidos: empleado.apellidos,
        nombres: empleado.nombres,
        cargo: empleado.cargo,
        foto: empleado.foto,
        cantidad: cantidad,
    }
    let seleccionado: ItemSeleccionado[] = []

    if(sessionStorage.getItem("seleccionados")){
        seleccionado = JSON.parse(sessionStorage.getItem("seleccionados") || '[]')
        const index = seleccionado.findIndex(item => item.idempleado == itemSeleccionado.idempleado)
        if(index === -1){
            seleccionado.push(itemSeleccionado)
        }else{
            seleccionado[index].cantidad += itemSeleccionado.cantidad
        }
    }
    else{
        seleccionado.push(itemSeleccionado)
    }
    //locaStorage es un objeto que permite almacenar datos en el navegador en forma permanente
    //sessionStorage es un objeto que permite almacenar datos en el navegador en la pestaña actual
    sessionStorage.setItem("seleccionados", JSON.stringify(seleccionado))
    //setItem es un método que permite almacenar datos en el navegador
    //JSON.stringify convierte un objeto en una cadena de texto

}