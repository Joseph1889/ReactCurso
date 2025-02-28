import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { ItemCarrito } from "../types/ItemCarrito"

function Carrito() {

    const [listaItems, setListaItems] = useState<ItemCarrito[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras") || '[]')
        setListaItems(datosCarrito)
        calcularTotal(datosCarrito)
    }

    const eliminarItem = (item: ItemCarrito) => {
        const carritoMenos = listaItems.filter(i => i.idproducto !== item.idproducto)
        setListaItems(carritoMenos)
        sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos))
        calcularTotal(carritoMenos)
    }

    const actualizarCantidad = (cantidad: number, idproducto: number) => {
        const carritoActualizado = listaItems.map(item => {
            if(item.idproducto === idproducto){
                item.cantidad = cantidad
            }
            return item
        })
        setListaItems(carritoActualizado)
        sessionStorage.setItem("carritocompras", JSON.stringify(carritoActualizado))
        calcularTotal(carritoActualizado)
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th className="text-end">Precio</th>
                        <th className="text-end">Cantidad</th>
                        <th className="text-end">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaItems.length > 0 && listaItems !== null 
                        ? listaItems.map(item =>
                        <tr key={item.idproducto}>
                            <td>{item.idproducto}</td>
                            <td>{item.nombre}</td>
                            <td className="text-end">{Number(item.precio).toFixed(2)}</td>
                            <td className="text-end">
                                <input type="number"
                                    className="form-control text-end"
                                    value={item.cantidad}
                                    onChange={(event) => actualizarCantidad(Number(event.target.value), item.idproducto)}
                                />
                            </td>
                            <td className="text-end">{(item.precio * item.cantidad).toFixed(2)}</td>
                            <td><i className="bi bi-x-lg icono-eliminar" 
                                title="Eliminar"
                                onClick={() => eliminarItem(item)}></i></td>
                        </tr>
                    ): <tr><td colSpan={6}>No hay productos en el carrito</td></tr>}
                </tbody>
            </table>
        )
    }

    const vaciarCarrito = () => {
        sessionStorage.removeItem("carritocompras")
        setListaItems([])
        setTotal(0)
    }

    const calcularTotal = (datosCarrito: ItemCarrito[]) => {
        const sumaTotal = datosCarrito.reduce((acumulador:number , item:ItemCarrito) => acumulador + (item.precio * item.cantidad), 0)
        setTotal(sumaTotal)
    }

    return (
        <>
            <PageHeader titulo="Carrito de compras" />
            <section className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            {dibujarTabla()}
                            <button className="btn btn-primary"
                                onClick={() => vaciarCarrito()}>Vaciar carrito</button>
                        </div>
                        <div className="col-md-2">
                            <div className="card border-dark mb-3">
                                <div className="card-header">Total del carrito</div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Total</th>
                                                <td className="text-end">S/ {total.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Carrito