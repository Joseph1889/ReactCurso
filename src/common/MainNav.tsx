import './MainNav.css'
import { Link, useLocation } from "react-router-dom"
import { navList, navListRight } from "../data/MainNavData"

function MainNav() {
    const location = useLocation()
    console.log(location)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">SO+</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {
                            navList.map((item, index) =>
                                <li className="nav-item" key={index}>
                                    <Link className={"nav-link" + (location.pathname === item.url ? " active" : "")} 
                                        to={item.url} title={item.tooltip}>{item.etiqueta}</Link>
                                </li>
                            )
                        }
                    </ul>
                    <ul className="navbar-nav">
                        {
                            navListRight.map((item, index) =>
                                <li className="nav-item" key={index}>
                                    <Link className={"nav-link" + (location.pathname === item.url ? " active" : "")} 
                                        to={item.url} title={item.tooltip}>
                                        <i className={item.icon}></i> {item.etiqueta}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNav