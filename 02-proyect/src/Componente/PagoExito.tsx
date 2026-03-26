import { useNavigate } from "react-router-dom"
import type React from "react";

export const PagoExito: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className=''>
            <div>
                <h2>Pedido Confirmado</h2>
                <p>
                    Gracias por tu compra. Hemos enviado los detalles a tu Correo. 
                </p>
                <div>
                    <p>
                        Tu pedido llegara en un periodo de 3 a 5 dias habiles.
                    </p>
                </div>
            </div>
            <button onClick={()=> navigate('/')}>Volver a la tienda</button>
        </div>
    )
}