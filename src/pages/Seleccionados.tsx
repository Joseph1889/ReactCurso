import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader";
import { ItemSeleccionado } from "../types/ItemSeleccionado";
import { API_URL } from "../utils";

function Seleccionados() {

  const [listaItems, setListaItems] = useState<ItemSeleccionado[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    leerServicio()
  }, [])

  const leerServicio = () => {
    const datosSeleccionados = JSON.parse(sessionStorage.getItem("seleccionados") || '[]')
    setListaItems(datosSeleccionados)
  }

  const eliminarItem = (item: ItemSeleccionado) => {
    const seleccionadoMenos = listaItems.filter(i => i.idempleado !== item.idempleado)
    setListaItems(seleccionadoMenos)
    sessionStorage.setItem("seleccionados", JSON.stringify(seleccionadoMenos))
  }

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {listaItems.length > 0 && listaItems !== null
            ? listaItems.map(item =>
              <tr key={item.idempleado}>
                <td>{item.idempleado}</td>
                <td>{item.apellidos}</td>
                <td>{item.nombres}</td>
                <td>{item.cargo}</td>
                <td> <img src={API_URL + "fotos/" + item.foto} className="card-img-top" alt="..." style={{ width: "40px", borderRadius: "50%" }} /></td>
                <td><i className="bi bi-x-lg icono-eliminar"
                  title="Eliminar"
                  onClick={() => eliminarItem(item)}></i></td>
              </tr>
            ) : <tr><td colSpan={6}>No hay empleados seleccionados</td></tr>}
        </tbody>
      </table>
    )
  }

  const vaciarCarrito = () => {
    sessionStorage.removeItem("seleccionados")
    setListaItems([])
    setTotal(0)
  }

  return (
    <>
      <PageHeader titulo="Empleados Seleccionados" />
      <section className="padded">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              {dibujarTabla()}
              <button className="btn btn-primary"
                onClick={() => vaciarCarrito()}>Vaciar lista</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Seleccionados;