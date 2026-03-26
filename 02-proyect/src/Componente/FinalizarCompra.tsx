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
    <div className=''>
        <div className=''>
             <h3 className=''>Tu informacion</h3>
            <div className=''>
                <p><strong>Nombre: </strong>{cliente.name} {cliente.firstName} {cliente.lastName}</p>
                <p><strong>Direccion: </strong>{cliente.direccion}</p>
                <p><strong>Telefono: </strong>{cliente.telefono}</p>
            </div>
            <div className=''>
                <button onClick={manejarEdicion}>Editar</button>
            </div>
        </div>
        <div>
            <strong>{totalApagar.toFixed(2)}</strong>
        </div>
        <div>
            <button className='' onClick={()=> finalizarCompra(cart, totalApagar)} disabled={cart.length === 0}>Confirmar y pagar</button>
        </div>
    </div>
    )
}