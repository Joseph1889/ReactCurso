import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { Categoria } from "../types/Categoria"
import { API_URL } from "../utils"
import Productos from "../components/Productos"

function Tienda() {

const [listaCategorias, setListaCategorias] = useState<Categoria[]>([])
const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null)

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        fetch(API_URL + "categorias.php")
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Categoria[]) => {
                console.log(data)
                setListaCategorias(data)
                setCategoriaSeleccionada(data[0])
            })
    }

    const seleccionarCategoria = (item: Categoria) => {
        console.log(item)
        setCategoriaSeleccionada(item)
    }

    const dibujarLista = () => {
        return(
            <ul className="list-group">
                {listaCategorias.map(item =>
                    <li className={"list-group-item" + (categoriaSeleccionada?.idcategoria === item.idcategoria ? " active" : "")} 
                        key={item.idcategoria}
                        title={item.descripcion}
                        onClick={() => seleccionarCategoria(item)}>
                        {item.nombre} <span>({item.total})</span>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <>
            <PageHeader titulo="Tienda" />
            <section className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-2 col-lg-3">
                            <h3>Categorías</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-xxl-10 col-lg-9">
                            <h3>{categoriaSeleccionada?.nombre}</h3>
                            <p>Total: {categoriaSeleccionada?.total}</p>
                            <Productos codigoCategoria={categoriaSeleccionada?.idcategoria}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tienda