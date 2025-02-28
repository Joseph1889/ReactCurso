import { useState } from "react"
import PageHeader from "../components/PageHeader"

function Login() {
    const [correotelefono, setCorreotelefono] = useState("")
    const [clave, setClave] = useState("")
    const [mostrarClave, setMostrarClave] = useState(false)


    return (
        <>
            <PageHeader titulo="Iniciar sesión" />
            <section className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" 
                                        value={correotelefono} onChange={e => setCorreotelefono(e.target.value)}
                                        placeholder="Correo electrónico o teléfono"/>
                                </div>
                                <div className="mb-3">
                                    <input type={mostrarClave ? "text" : "password"} 
                                        className="form-control"
                                        value={clave} onChange={e => setClave(e.target.value)}
                                        placeholder="Contraseña"/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" 
                                        checked={mostrarClave} onChange={e => setMostrarClave(e.target.checked)}/>
                                    <label className="form-check-label">Mostrar clave</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                            </form>
                        </div>
                        <div className="col-md-8">

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login