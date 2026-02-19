import { useLocation, useNavigate } from "react-router-dom"

export const FinalizarCompra = ({ setCart, cart, finalizarCompra }) => {

    //para recuperar la info
    const location = useLocation();

    const navigate = useNavigate();

   // extraemos los datos del estado de navegacion
   // agregamos un objeto vacio por defecto para evitar que 'cliente.name' rompa la app si location.state es null
    const { cliente = {}, totalApagar = 0 } = location.state || {};

    // al navegar de vuelta, el componente direccion leera el localStorage 
    const manejarEdicion = () => {
        navigate('/direccion');
    }


    return (
    <div className="section__info">
        <div className="container__informacion">
             <h3 className="title__informacion">Tu informacion</h3>
            <div className="usuario__informacion">
                <p><strong>Nombre: </strong>{cliente.name} {cliente.firstName} {cliente.lastName}</p>
                <p><strong>Direccion: </strong>{cliente.direccion}</p>
                <p><strong>Telefono: </strong>{cliente.telefono}</p>
            </div>
            <div className="editar__informacion">
                <button onClick={manejarEdicion}>Editar</button>
            </div>
        </div>
        <div>
            <strong>{totalApagar.toFixed(2)}</strong>
        </div>
        <div>
            <button className="compra__pagar" onClick={()=> finalizarCompra(cart, totalApagar)}>Confirmar y pagar</button>
        </div>
    </div>
    )
}