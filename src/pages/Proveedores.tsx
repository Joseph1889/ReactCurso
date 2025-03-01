import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import { Proveedor } from "../types/Proveedor";
import { API_URL } from "../utils";
import './Proveedores.css'

function Proveedores() {

    const [listaProveedores, setListaProveedores] = useState<Proveedor[]>([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState<Proveedor[]>([])
    const [filtro, setFiltro] = useState("")
    const [filasPagina,] = useState(10)
    const [paginaActual, setPaginaActual] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [, setTotalFilas] = useState(0)
    const [columnaSeleccionada, setColumnaSeleccionada] = useState("")
    const [orden, setOrden] = useState(1)

    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor>()


    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        fetch(API_URL + "proveedores.php")
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Proveedor[]) => {
                console.log(data)
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
                setTotalFilas(data.length)
                setTotalPaginas(Math.ceil(data.length / filasPagina))
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th onClick={() => seleccionarColumna("nombreempresa")}>Empresa</th>
                        <th onClick={() => seleccionarColumna("nombrecontacto")}>Contacto</th>
                        <th onClick={() => seleccionarColumna("cargocontacto")}>Cargo</th>
                        <th onClick={() => seleccionarColumna("ciudad")}>Ciudad</th>
                        <th onClick={() => seleccionarColumna("pais")}>País</th>
                        <th className="text-center">Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(paginaActual * filasPagina, (paginaActual + 1) * filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td className="text-center">
                                <i className="bi bi-eye icono-vista-rapida-proveedor"
                                    title="Vista rápida"
                                    data-bs-toggle="modal" data-bs-target="#vistaRapidaModal"
                                    onClick={() => seleccionarProveedor(item.idproveedor)}></i>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const seleccionarProveedor = (idproveedor: number) => {
        console.log(idproveedor)
        fetch(API_URL + "proveedores.php?idproveedor=" + idproveedor)
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Proveedor[]) => {
                console.log(data)
                setProveedorSeleccionado(data[0])
            })
    }

    const dibujarModalVistaRapida = () => {
        return (
            <div className="modal fade" id="vistaRapidaModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Proveedor {proveedorSeleccionado?.nombreempresa}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <th>Nombre del contacto</th>
                                                <td>{proveedorSeleccionado?.nombrecontacto}</td>
                                            </tr>
                                            <tr>
                                                <th>Cargo del contacto</th>
                                                <td>{proveedorSeleccionado?.cargocontacto}</td>
                                            </tr>
                                            <tr>
                                                <th>Dirección</th>
                                                <td>{proveedorSeleccionado?.direccion}</td>
                                            </tr>
                                            <tr>
                                                <th>Código postal</th>
                                                <td>{proveedorSeleccionado?.codigopostal}</td>
                                            </tr>
                                            <tr>
                                                <th>Ciudad</th>
                                                <td>{proveedorSeleccionado?.ciudad}</td>
                                            </tr>
                                            <tr>
                                                <th>País</th>
                                                <td>{proveedorSeleccionado?.pais}</td>
                                            </tr>
                                            <tr>
                                                <th>Teléfono</th>
                                                <td>{proveedorSeleccionado?.telefono}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const seleccionarColumna = (columna: keyof Proveedor) => {

        let ascendente = orden
        if (columnaSeleccionada === columna) {
            ascendente = -ascendente
        } else {
            ascendente = 1
        }

        const listaOrdenada = [...listaProveedoresFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente)
        setListaProveedoresFiltrados(listaOrdenada)
        setColumnaSeleccionada(columna)
        setOrden(ascendente)
    }

    const buscarTexto = (texto: string) => {
        setPaginaActual(0)
        setFiltro(texto)

        const listaFiltrada = listaProveedores.filter(item => {
            return (item.nombreempresa.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.nombrecontacto.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.cargocontacto.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.ciudad.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.pais.toLocaleUpperCase().includes(texto.toUpperCase())
            )
        })
        /*
        const listaFiltrada = listaProveedores.filter(item => 
             Object.values(item).some(value => value?.toString().toLocaleUpperCase().includes(texto.toUpperCase()))
        )
        */
        setListaProveedoresFiltrados(listaFiltrada)
        setTotalFilas(listaFiltrada.length)
        setTotalPaginas(Math.ceil(listaFiltrada.length / filasPagina))
    }

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#" onClick={() => retroceder()}>Anterior</a></li>
                    {dibujarNumerosPagina()}
                    <li className="page-item"><a className="page-link" href="#" onClick={() => avanzar()}>Siguiente</a></li>
                </ul>
            </nav>
        )
    }

    const dibujarNumerosPagina = () => {
        return (
            //Array(totalPaginas).fill(0).map((item, index) =>
            <>
                {
                    [...Array(totalPaginas)].map((_, index) =>
                        <li className="page-item" key={index}><a onClick={() => setPaginaActual(index)}
                            className={"page-link " + (index == paginaActual ? "active" : "")} href="#">{index + 1}</a></li>
                    )
                }
            </>
        )
    }

    const retroceder = () => {
        if (paginaActual > 0) setPaginaActual(paginaActual - 1)
    }
    const avanzar = () => {
        if (paginaActual < totalPaginas - 1) setPaginaActual(paginaActual + 1)
    }

    return (
        <>
            <PageHeader titulo="Proveedores" />
            <section className="padded">
                <div className="container">
                    <div className="mb-3">
                        <input type="text" className="form-control"
                            value={filtro} onChange={(event) => buscarTexto(event.target.value)} />
                    </div>
                    {dibujarPaginacion()}
                    {dibujarTabla()}
                    {dibujarModalVistaRapida()}
                </div>
            </section>
        </>
    )
}

export default Proveedores