import { useNavigate } from "react-router-dom"
import s from './PagoExito.module.css';

export const PagoExito = () => {

    const navigate = useNavigate();

    return (
        <div className={s.container__pago}>
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