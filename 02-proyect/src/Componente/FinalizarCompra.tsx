import { useLocation, useNavigate } from "react-router-dom"
import { Producto } from "../Types";

interface NavigateState {
    cliente: {
        name: string;
        firstName: string;
        lastName: string;
        direccion: string;
        telefono: string;
    };
    totalApagar: number;
}

interface FinalizarCompraProps {
    setCart: React.Dispatch<React.SetStateAction<Producto[]>>;
    cart: Producto[];
    finalizarCompra: (cart: Producto[], totalApagar: number) => void;
}

export const FinalizarCompra = ({ setCart, cart, finalizarCompra }: FinalizarCompraProps) => {

    //para recuperar la info
    const location = useLocation();

    const navigate = useNavigate();

    const state = location.state as NavigateState | null;

   // extraemos los datos del estado de navegacion
   // agregamos un objeto vacio por defecto para evitar que 'cliente.name' rompa la app state es null
    const { cliente, totalApagar } = state || { cliente: {}, totalApagar: 0 };

    // al navegar de vuelta, el componente direccion leera el localStorage 
    const manejarEdicion = () => {
        navigate('/direccion');
    }


    return (
    <div className='p-4'>
        <div className=''>
             <h3 className='text-lg font-semibold text-center py-2'>Tu informacion</h3>
            <div className='flex flex-col gap-2'>
                <p><strong>Nombre: </strong>{cliente.name} {cliente.firstName} {cliente.lastName}</p>
                <p><strong>Direccion: </strong>{cliente.direccion}</p>
                <p><strong>Telefono: </strong>{cliente.telefono}</p>
            </div>
            <div className='flex justify-end mt-2'>
                <button className="bg-red-500 text-white px-6 py-2 rounded" onClick={manejarEdicion}>Editar</button>
            </div>
        </div>
        <div className="my-2">
            <strong>total a pagar </strong> <p>${totalApagar.toFixed(2)}</p>
            <button className='bg-[#48e] text-white px-6 py-2 my-2 rounded' onClick={()=> finalizarCompra(cart, totalApagar)} disabled={cart.length === 0}>Confirmar y pagar</button>
        </div>
    </div>
    )
}