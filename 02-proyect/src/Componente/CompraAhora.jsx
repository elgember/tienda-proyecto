import { useEffect, useState } from "react"

export const CompraAhora = ({descuento, totalFinal, finalizarCompra }) => {

    const [costoEnvio, setCostoEnvio] = useState();

    useEffect(() => {
        if (totalFinal < 200) {
            setCostoEnvio(80)
        }
    },[totalFinal],[costoEnvio]);


    return (
    <div>
        <h2>Agrega una proteccion para este producto</h2>
        <div>
            <div>
                <img src={product.image} alt={product.title} />
                <div>
                    <h5>proteccion para:</h5>
                    <p>{product.title}</p>
                </div>
            </div>
            <div>
                <p>12 meses de Garantia extendida</p>
                <span>$ {setCostoEnvio}</span>
            </div>
            <div>
                <p>18 meses de Garantia extendida</p>
                <div>
                    <span>$ {setCostoEnvio}</span>
                    <span>{descuento}</span>
                </div>
            </div>
            <div>
                <p>24 meses de Garantia extendida</p>
                <p>$ {product.price}</p>
            </div>
        </div>
        <div>
            <button>No, gracias</button>
            <button>Agregar</button>
        </div>
    </div>
    )
}