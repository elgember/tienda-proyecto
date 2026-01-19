import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const CompraAhora = ({descuento, totalFinal, finalizarCompra, product, irAGarantia }) => {

    const location = useLocation();

    const [costoEnvio, setCostoEnvio] = useState(0);

    const { misProductos } = location.state || { misProductos: []};

    useEffect(() => {
        if (totalFinal < 200) {
            setCostoEnvio(80)
        }
    },[totalFinal]);


    return (
    <div className="container__garantia">
        {misProductos.map((product) => {
            return (
        <div key={product.id} className="img__garantia">
            <h2 className="title__garantia">Agrega una proteccion para este producto</h2>
            <div>
                <img src={product.image} alt={product.title} />
                <div>
                    <h5>proteccion para:</h5>
                    <p>{product.title}</p>
                </div>
            </div>
            <div className="garantia__12">
                <p>12 meses de Garantia extendida</p>
                <span>$ {setCostoEnvio}</span>
            </div>
            <div className="garantia__18">
                <p>18 meses de Garantia extendida</p>
                <div>
                    <span>$ {setCostoEnvio}</span>
                    <span>{descuento}</span>
                </div>
            </div>
            <div className="garantia__24">
                <p>24 meses de Garantia extendida</p>
                <p>$ {product.price}</p>
            </div>
        </div>
            )
})}
        <div className="btn__garantia">
            <button className="no__garantia">No, gracias</button>
            <button className="agregar__garantia">Agregar</button>
        </div>
    </div>
    )
}