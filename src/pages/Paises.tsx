import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";
import { Pais } from "../types/Pais";

function Paises() {

  const [listaPaises, setListaPaises] = useState<Pais[]>([])

  //const [nombres, setNombres] = useState("")
  //const [peliculas, setPeliculas] = useState("")

  const [codpais, setCodPais] = useState("")
  const [pais, setPais] = useState("")
  const [capital, setCapital] = useState("")
  const [area, setArea] = useState("")
  const [poblacion, setPoblacion] = useState("")
  const [continente, setContinente] = useState("")

  useEffect(() => {
    leerServicio()
  }, [])

  const leerServicio = () => {
    fetch(API_URL + "paises.php")
      .then(response => response.json())//formato de los datos recibidos
      .then((data: Pais[]) => {
        console.log(data)
        setListaPaises(data)
      })
  }

  const dibujarInsertModal = () => {
    return (
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasInsert" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Nuevo País</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(event) => insertPais(event)}>
            <div className="mb-3">
              <input type="text" className="form-control"
                value={codpais} onChange={event => setCodPais(event.target.value)}
                placeholder="Código País" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control"
                value={pais} onChange={event => setPais(event.target.value)}
                placeholder="País" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control"
                value={capital} onChange={event => setCapital(event.target.value)}
                placeholder="Capital" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control"
                value={area} onChange={event => setArea(event.target.value)}
                placeholder="Área" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control"
                value={poblacion} onChange={event => setPoblacion(event.target.value)}
                placeholder="Población" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control"
                value={continente} onChange={event => setContinente(event.target.value)}
                placeholder="Continente" required />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const insertPais = (event: React.SyntheticEvent) => {
    event.preventDefault()//Evita que el formulario recargue la página
    console.log(codpais, pais, capital, area, poblacion, continente)
    const rutaServicio = API_URL + "paisesinsert.php"
    const formData = new FormData()
    formData.append("codpais", codpais)
    formData.append("pais", pais)
    formData.append("capital", capital)
    formData.append("area", area)
    formData.append("poblacion", poblacion)
    formData.append("continente", continente)

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
            setCodPais("")
            setPais("")
            setCapital("")
            setArea("")
            setPoblacion("")
            setContinente("")
        })
}

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código País</th>
            <th>País</th>
            <th>Capital</th>
            <th>Área</th>
            <th>Población</th>
            <th>Continente</th>
          </tr>
        </thead>
        <tbody>
          {listaPaises.map((item, index) =>
            <tr key={index}>
              <td>{item.idpais}</td>
              <td>{item.codpais}</td>
              <td>{item.pais}</td>
              <td>{item.capital}</td>
              <td>{item.area}</td>
              <td>{item.poblacion}</td>
              <td>{item.continente}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <PageHeader titulo="Paises" />
      <section className="padded">
        <div className="container">
          <div className="mb-3">
            <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasInsert" aria-controls="offcanvasRight">
              Nuevo País</button>
          </div>
          {dibujarTabla()}
        </div>
      </section>
      {dibujarInsertModal()}
    </>
  )
}

export default Paises;