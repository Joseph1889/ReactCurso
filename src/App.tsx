import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import Inversiones from './pages/Inversiones'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import Pagina404 from './pages/Pagina404'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Directores from './pages/Directores'
import Futbol from './pages/Futbol'
import Pedidos from './pages/Pedidos'
import PedidoDetalle from './pages/PedidoDetalle'

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />

        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inversiones" element={<Inversiones />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path='/pedidos' element={<Pedidos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/directores" element={<Directores />} />
            <Route path="/futbol" element={<Futbol />} />
            <Route path="/productodetalle/:idproducto" element={<ProductoDetalle />} />
            <Route path="/pedidodetalle/:idpedido" element={<PedidoDetalle />} />
            <Route path="*" element={<Pagina404 />} /> {/* Si  la ruta no existe */}
          </Routes>
        </main>

        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App