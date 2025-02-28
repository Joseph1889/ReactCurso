import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import { API_URL } from "../utils";
import { Director } from "../types/Director";
import './Directores.css'

function Directores() {

    const [listaDirectores, setListaDirectores] = useState<Director[]>([])
    const [iddirector, setIddirector] = useState(0)
    const [nombres, setNombres] = useState("")
    const [peliculas, setPeliculas] = useState("")

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        fetch(API_URL + "directores.php")
            .then(response => response.json())//formato de los datos recibidos
            .then((data: Director[]) => {
                console.log(data)
                setListaDirectores(data)
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table" id="tabla-directores">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombres</th>
                        <th>Películas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaDirectores.map(item =>
                        <tr key={item.iddirector}>
                            <td>{item.iddirector}</td>
                            <td>{item.nombres}</td>
                            <td>{item.peliculas}</td>
                            <td><i className="bi bi-pencil" title="Editar"
                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasUpdate"
                                onClick={() => selectDirector(item)}></i></td>
                            <td><i className="bi bi-x-lg" title="Eliminar"
                                data-bs-toggle="modal" data-bs-target="#deleteModal"
                                onClick={() => selectDirector(item)}></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const selectDirector = (director: Director) => {
        console.log(director)
        setIddirector(director.iddirector)
        setNombres(director.nombres)
        setPeliculas(director.peliculas)
    }

    const insertDirector = (event: React.SyntheticEvent) => {
        event.preventDefault()//Evita que el formulario recargue la página
        console.log(nombres, peliculas)
        const rutaServicio = API_URL + "directoresinsert.php"
        const formData = new FormData()
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then((data: string) => {
                console.log(data)
                leerServicio()
                const botonCerrar = document.querySelector("#offcanvasInsert .btn-close") as HTMLElement
                botonCerrar.click()
                setNombres("")
                setPeliculas("")
            })
    }

    const dibujarInsertModal = () => {
        return (
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasInsert" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Nuevo director</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(event) => insertDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                value={nombres} onChange={event => setNombres(event.target.value)}
                                placeholder="Nombre completo" required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                value={peliculas} onChange={event => setPeliculas(event.target.value)}
                                placeholder="Películas" required />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const updateDirector = (event: React.SyntheticEvent) => {
        event.preventDefault()//Evita que el formulario recargue la página
        //console.log(nombres, peliculas)
        const rutaServicio = API_URL + "directoresupdate.php"
        const formData = new FormData()
        formData.append("iddirector", iddirector.toString())
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then((data: string) => {
                console.log(data)
                leerServicio()
                const botonCerrar = document.querySelector("#offcanvasUpdate .btn-close") as HTMLElement
                botonCerrar.click()
                setIddirector(0)
                setNombres("")
                setPeliculas("")
            })
    }

    const dibujarUpdateModal = () => {
        return (
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasUpdate" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Actualizar director</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(event) => updateDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                value={iddirector} readOnly />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                value={nombres} onChange={event => setNombres(event.target.value)}
                                placeholder="Nombre completo" required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                value={peliculas} onChange={event => setPeliculas(event.target.value)}
                                placeholder="Películas" required />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    const deleteDirector = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const rutaServicio = API_URL + "directoresdelete.php"
        const formData = new FormData()
        formData.append("iddirector", iddirector.toString())

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then((data: string) => {
                console.log(data)
                leerServicio()
                const botonCerrar = document.querySelector("#deleteModal .btn-close") as HTMLElement
                botonCerrar.click()
                setNombres("")
                setPeliculas("")
            })
    }

    const dibujarDeleteModal = () => {
        return (
            <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Eliminar director</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => deleteDirector(event)}>
                            <div className="modal-body">
                                ¿Está seguro de eliminar al director <strong>{nombres}</strong>?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <PageHeader titulo="Directores" />
            <section className="padded">
                <div className="container">
                    <div className="mb-3">
                        <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasInsert" aria-controls="offcanvasRight">
                            Nuevo director</button>
                    </div>
                    {dibujarTabla()}
                </div>
            </section>

            {dibujarInsertModal()}
            {dibujarUpdateModal()}
            {dibujarDeleteModal()}
        </>
    )
}

export default Directores