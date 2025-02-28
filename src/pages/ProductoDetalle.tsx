import { useParams } from "react-router-dom"
import { Producto } from "../types/Producto"
import { useEffect, useState } from "react"
import { agregarCarrito, API_URL } from "../utils"

function ProductoDetalle() {
    const params = useParams()
    console.log(params)

    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>()
    const [cantidad, setCantidad] = useState(1)

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        fetch(API_URL + "productos.php?idproducto=" + params.idproducto)
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Producto[]) => {
                console.log(data)
                setProductoSeleccionado(data[0])
            })
    }

    return (
        <section className="padded">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={productoSeleccionado?.imagengrande === null
                            ? API_URL + "imagenes/nofoto.jpg"
                            : API_URL + productoSeleccionado?.imagengrande
                        } className="img-fluid" alt="..." />
                    </div>
                    <div className="col">
                        <h2>{productoSeleccionado?.nombre}</h2>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <th>Precio</th>
                                    <td>S/ {
                                        Number(productoSeleccionado?.preciorebajado) === 0
                                            ? Number(productoSeleccionado?.precio).toFixed(2)
                                            : Number(productoSeleccionado?.preciorebajado).toFixed(2)
                                    } <span className='precio-anterior'>
                                            {Number(productoSeleccionado?.preciorebajado) === 0
                                                ? ""
                                                : "S/ " + Number(productoSeleccionado?.precio).toFixed(2)}
                                        </span></td>
                                </tr>
                                <tr>
                                    <th>Cantidad</th>
                                    <td><input type="number" className="form-control" value={cantidad}
                                            min="1"
                                            onChange={(event) => setCantidad(Number(event.target.value))}/>
                                        <button className="btn btn-primary mt-1"
                                        onClick={() => agregarCarrito(productoSeleccionado!, cantidad)}>
                                        Añadir al carrito</button>    
                                    </td>
                                </tr>
                                <tr>
                                    <th>Categoría</th>
                                    <td>{productoSeleccionado?.categoria}</td>
                                </tr>
                                <tr>
                                    <th>Proveedor</th>
                                    <td>{productoSeleccionado?.proveedor}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{productoSeleccionado?.unidadesenexistencia}</td>
                                </tr>
                                <tr>
                                    <th>Detalle</th>
                                    <td>{productoSeleccionado?.detalle}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>Descripción</h3>
                        <div dangerouslySetInnerHTML={{__html: productoSeleccionado?.descripcion || "" }}></div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductoDetalle