import { useEffect, useState } from "react"
import { API_URL } from "../utils";

interface Envio {
    idempresaenvio: number;
    nombre: string;
    telefono: string;
    latitud: string;
    longitud: string;
}

function Envios() {
    const [listaEnvios, setListaEnvios] = useState<Envio[]>([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        fetch(API_URL + "envios.php")
        .then(response => response.json())//formato de los datos recibidos
        .then((data: Envio[]) => {
            console.log(data)
            setListaEnvios(data)
        })
    }

    return (
        <section id='envios' className='padded'>
            <div className="container">
                <h2>Empresas de envío</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Empresa</th>
                            <th>Teléfono</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                        </tr>
                    </thead>
                    <tbody>

                    {listaEnvios.map(item => 
                        <tr key={item.idempresaenvio}>
                            <td>{item.idempresaenvio}</td>
                            <td>{item.nombre}</td>
                            <td>{item.telefono}</td>
                            <td>{item.latitud}</td>
                            <td>{item.longitud}</td>
                        </tr>
                    )}

                    </tbody>
                </table>                    
            </div>
        </section>
    )
}

export default Envios