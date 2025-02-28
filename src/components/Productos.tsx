import './Productos.css'
import { useEffect, useState } from "react";
import { agregarCarrito, API_URL } from "../utils";
import { Producto } from "../types/Producto";
import { Link } from 'react-router-dom';

interface ProductoProps {
    codigoCategoria?: number;
}
function Productos(props: ProductoProps) {
    console.log(props.codigoCategoria)

    const [listaProductos, setListaProductos] = useState<Producto[]>([])
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>()

    useEffect(() => {
        leerServicio(props.codigoCategoria === undefined ? 0 : props.codigoCategoria)
    }, [props.codigoCategoria])

    const leerServicio = (idcategoria: number) => {
        fetch(API_URL + "productos.php?idcategoria=" + idcategoria)
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Producto[]) => {
                console.log(data)
                setListaProductos(data)
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4" id="cards-productos">

                {listaProductos.map(item =>
                    <div className="col" key={item.idproducto}>
                        <div className="card h-100">
                            
                            <Link to={"/productodetalle/" + item.idproducto}>
                            <img src={item.imagenchica === null
                                ? API_URL + "imagenes/nofoto.jpg"
                                : API_URL + item.imagenchica
                            } className="card-img-top" alt="..." />
                            </Link>

                            {Number(item.preciorebajado) === 0
                                ? ""
                                : <div className="porcentaje-descuento">-{
                                    Math.round((1 - item.preciorebajado / item.precio) * 100)
                                }%</div>}

                            <i className="bi bi-eye icono-vista-rapida"
                                title="Vista rápida"
                                data-bs-toggle="modal" data-bs-target="#vistaRapidaModal"
                                onClick={() => seleccionarProducto(item.idproducto)}></i>

                            <div className="card-body">
                                <h6 className="card-title">{item.nombre}</h6>
                                <p className="card-text">S/ {
                                    Number(item.preciorebajado) === 0
                                        ? Number(item.precio).toFixed(2)
                                        : Number(item.preciorebajado).toFixed(2)
                                } <span className='precio-anterior'>
                                        {Number(item.preciorebajado) === 0
                                            ? ""
                                            : "S/ " + Number(item.precio).toFixed(2)}
                                    </span>
                                    <i className="bi bi-basket icono-carrito" 
                                        title="Añadir al carrito"
                                        onClick={() => agregarCarrito(item, 1)}></i>
                                    </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const seleccionarProducto = (idproducto: number) => {
        console.log(idproducto)
        fetch(API_URL + "productos.php?idproducto=" + idproducto)
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Producto[]) => {
                console.log(data)
                setProductoSeleccionado(data[0])
            })
    }

    const dibujarModalVistaRapida = () => {
        return (
            <div className="modal fade" id="vistaRapidaModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">{productoSeleccionado?.nombre}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                <img src={productoSeleccionado?.imagengrande === null
                                    ? API_URL + "imagenes/nofoto.jpg"
                                    : API_URL + productoSeleccionado?.imagengrande
                                    } className="img-fluid" alt="..." />
                                </div>
                                <div className="col">
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
                                                <th>Categoría</th>
                                                <td>{productoSeleccionado?.categoria}</td>
                                            </tr>
                                            <tr>
                                                <th>Proveedor</th>
                                                <td>{productoSeleccionado?.proveedor}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {dibujarCuadricula()}
            {dibujarModalVistaRapida()}
        </>
    )
}

export default Productos