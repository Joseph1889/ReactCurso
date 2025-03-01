import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";
import {Pais} from "../types/Pais";

function Paises() {

  const [listaPaises, setListaPaises] = useState<Pais[]>([])

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
          {dibujarTabla()}
        </div>
      </section>
    </>
  )
}

export default Paises;