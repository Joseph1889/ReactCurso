import './MainHeader.css'
import logo from './../assets/images/logo-odin.png'

function MainHeader() {
    return (
        <header id='main-header'>
            <div className="container">
                <figure id='logo'>
                    <img src={logo} alt="Logo Odin" className='img-fluid'/>                
                </figure>
            </div>
        </header>
    )
}

export default MainHeader