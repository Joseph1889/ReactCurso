import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import { useParams } from "react-router-dom";
import { API_URL } from "../utils";
import { ProductoPedido } from '../types/ProductoPedido';

function PedidoDetalle() {
  const { idpedido } = useParams(); // Obtener idpedido desde la URL
  const [productosPedido, setProductosPedido] = useState<ProductoPedido[]>([]);

  useEffect(() => {
      if (idpedido) {
          fetch(API_URL + "pedidosdetalle.php?idpedido=" + idpedido)
              .then(response => response.json())
              .then((data: ProductoPedido[]) => {
                  console.log(data);
                  setProductosPedido(data);
              })
              .catch(error => console.error("Error cargando detalles del pedido:", error));
      }
  }, [idpedido]);

  return (
    <>
      <PageHeader titulo="Pedido Detalle" />
      <div className="container mt-4">
            <h3>Detalle de Pedido {idpedido}</h3>
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4" style={{marginBottom: "20px"}}>
                {productosPedido.map((item) => (
                    <div className="col" key={item.idproducto}>
                        <div className="card h-100" style={{ width: "200px" }}>
                            <img src={API_URL + item.imagenchica} className="card-img-top" alt={item.nombre} style={{ width: "200px", height: "auto", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre}</h5>
                                <p className="card-text">{item.detalle}</p>
                                <p className="card-text">
                                    <strong>Precio:</strong> S/ {Number(item.precio).toFixed(2)}
                                </p>
                                <p className="card-text">
                                    <strong>Cantidad:</strong> {item.cantidad}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default PedidoDetalle