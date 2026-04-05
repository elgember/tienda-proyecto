import { useNavigate } from "react-router-dom"
import type React from "react";

export const PagoExito: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-4'>
                <h2 className="text-lg font-semibold pt-4">Pedido Confirmado</h2>
                <p className="text-center font-medium">
                    Gracias por tu compra. Hemos enviado los detalles a tu Correo. 
                </p>
                <div>
                    <p className="text-center font-medium">
                        Tu pedido llegara en un periodo de 3 a 5 dias habiles.
                    </p>
                </div>
            </div>
                <button className="px-8 py-2 my-6 border rounded-md cursor-pointer" onClick={()=> navigate('/')}> Volver a la tienda</button>
        </div>
    )
}