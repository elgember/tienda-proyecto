import { useLocation } from "react-router-dom"

export const FinalizarCompra = ({ finalizarCompra, totalFinal }) => {
    const location = useLocation();

    const { cliente, totalApagar } = location.state || { Cliente: {}, totalFinal: 0 }

    return (
    <div className="section__info">
        <div className="container__informacion">
             <h3 className="title__informacion">Tu informacion</h3>
            <div className="usuario__informacion">
                    <p><strong>Nombre: </strong>{cliente.name} {cliente.firstName} {cliente.lastName}</p>
                <p><strong>Direccion: </strong>{cliente.direccion}</p>
                <p><strong>Telefono:</strong>{cliente.telefono}</p>
            </div>
            <div className="editar__informacion">
                <button>Editar</button>
            </div>
        </div>
        <div>
            <strong>{totalFinal.toFixed(2)}</strong>
        </div>
        <div>
            <button className="compra__pagar">Confirmar y pagar</button>
        </div>
    </div>
    )
}