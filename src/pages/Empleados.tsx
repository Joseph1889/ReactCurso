import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { Empleado } from "../types/Empleado"
import { agregarEmpleado, API_URL } from "../utils"

function Empleados() {

    const [listaEmpleados, setListaEmpleados] = useState<Empleado[]>([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        leerServicio()
    }, [])

    /*
    const leerServicio = () => {
        fetch(API_URL + "empleados.php")
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Empleado[]) => {
                console.log(data)
                setListaEmpleados(data)
                setCargando(false)
            })
    }
    */

    const leerServicio = async () => {
        const response = await fetch(API_URL + "empleados.php")
        const data: Empleado[] = await response.json()
        console.log(data)
        setListaEmpleados(data)
        setCargando(false)
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">

                {listaEmpleados.map(item =>
                    <div className="col" key={item.idempleado}>
                        <div className="card">
                            <img src={API_URL + "fotos/" + item.foto} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                                <i className="bi bi-person-raised-hand icono-carrito"
                                    title="Añadir a seleccionados"
                                    onClick={() => agregarEmpleado(item, 1)}> Seleccionar</i>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        )
    }

    const dibujarPrecarga = () => {
        return (
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }

    return (
        <>
            <PageHeader titulo="Empleados" />
            <section className="padded">
                <div className="container">
                    {cargando === true
                        ? dibujarPrecarga()
                        : dibujarCuadricula()}
                </div>
            </section>
        </>
    )
}

export default Empleados