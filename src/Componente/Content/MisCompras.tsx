import { Compra } from '../../Types';

interface MisComprasProps {
    misCompras: Compra[];
}

export const MisCompras = ({ misCompras }: MisComprasProps) => {

    if (misCompras.length === 0) return <p>No has realizado ninguna compra.</p>

    return (
    <div>
        <h2>Mis compras realizadas</h2>
        {misCompras.map((compra, indexCompra) => (
            <div key={`compra-${compra.id}-${indexCompra}`}>
                <div>
                    <span>{compra.fecha}</span>
                    <span>Total: ${compra.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                </div>
                <div>
                    {compra.items.map((prod, indexProd) => (
                        <div key={`item-${compra.id}-${prod.id}-${indexProd}`}>
                            <img src={prod.image} alt={prod.title} />
                            <p>{prod.title} (x{prod.quantity})</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
    )
}

