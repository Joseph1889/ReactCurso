import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import { Pedido } from "../types/Pedido";
import { API_URL } from "../utils";
import { Link } from "react-router-dom";


function Pedidos() {
    const [listaPedidos, setListaPedidos] = useState<Pedido[]>([])
    const [listaPedidosFiltrados, setListaPedidosFiltrados] = useState<Pedido[]>([])
    const [filtro, setFiltro] = useState("")
    const [filasPagina,] = useState(10)
    const [paginaActual, setPaginaActual] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [, setTotalFilas] = useState(0)
    const [columnaSeleccionada, setColumnaSeleccionada] = useState("")
    const [orden, setOrden] = useState(1)


    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        fetch(API_URL + "pedidos.php")
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Pedido[]) => {
                console.log(data)
                setListaPedidos(data)
                setListaPedidosFiltrados(data)
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
                        <th onClick={() => seleccionarColumna("fechapedido")}>Fecha</th>
                        <th onClick={() => seleccionarColumna("usuario")}>Usuario</th>
                        <th onClick={() => seleccionarColumna("nombres")}>Nombres</th>
                        <th onClick={() => seleccionarColumna("total")}>Total</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidosFiltrados.slice(paginaActual * filasPagina, (paginaActual + 1) * filasPagina).map(item =>
                        <tr key={item.idpedido}>
                            <td>{item.idpedido}</td>
                            <td>{item.fechapedido}</td>
                            <td>{item.usuario}</td>
                            <td>{item.nombres}</td>
                            <td>{item.total}</td>
                            <td>
                                <Link to={`/pedidodetalle/${item.idpedido}`} className="btn btn-primary">
                                    Ver detalle
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    const seleccionarColumna = (columna: keyof Pedido) => {

        let ascendente = orden
        if (columnaSeleccionada === columna) {
            ascendente = -ascendente
        } else {
            ascendente = 1
        }

        const listaOrdenada = [...listaPedidosFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente)
        setListaPedidosFiltrados(listaOrdenada)
        setColumnaSeleccionada(columna)
        setOrden(ascendente)
    }

    const buscarTexto = (texto: string) => {
        setPaginaActual(0)
        setFiltro(texto)

        const listaFiltrada = listaPedidos.filter(item => {
            return (item.fechapedido.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.usuario.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.nombres.toLocaleUpperCase().includes(texto.toUpperCase()) ||
                item.total.toString().toUpperCase().includes(texto.toUpperCase())
            )
        })
        /*
        const listaFiltrada = listaProveedores.filter(item => 
             Object.values(item).some(value => value?.toString().toLocaleUpperCase().includes(texto.toUpperCase()))
        )
        */
        setListaPedidosFiltrados(listaFiltrada)
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
        const paginasPorBloque = 15;
        const bloqueActual = Math.floor(paginaActual / paginasPorBloque);
        const inicio = bloqueActual * paginasPorBloque;
        const fin = Math.min(inicio + paginasPorBloque, totalPaginas);

        return (
            <>
                {Array.from({ length: fin - inicio }, (_, i) => i + inicio).map((index) => (
                    <li className="page-item" key={index}>
                        <a onClick={() => setPaginaActual(index)}
                            className={`page-link ${index === paginaActual ? "active" : ""}`}
                            href="#">
                            {index + 1}
                        </a>
                    </li>
                ))}
            </>
        );
    };

    const retroceder = () => {
        if (paginaActual > 0) setPaginaActual(paginaActual - 1)
    }
    const avanzar = () => {
        if (paginaActual < totalPaginas - 1) setPaginaActual(paginaActual + 1)
    }

    return (
        <>
            <PageHeader titulo="Pedidos" />
            <section className="padded">
                <div className="container">
                    <div className="mb-3">
                        <input type="text" className="form-control"
                            value={filtro} onChange={(event) => buscarTexto(event.target.value)} />
                    </div>
                    {dibujarPaginacion()}
                    {dibujarTabla()}
                </div>
            </section>
        </>
    )
}

export default Pedidos