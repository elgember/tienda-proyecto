export const MisCompras = ({ misCompras }) => {
    console.log('misCopras', misCompras);

    if (MisCompras.length === 0) {
        return <p>No has realizado ninguna compra</p>
    }

    return (
    <div>
        <h2>Mis compras realizadas</h2>
        {misCompras.map((compra) => (
            <div key={compra.id}>
                <div>
                    <span>{compra.fecha}</span>
                    <span>Compras: ${compra.total.toFixed(2)}</span>
                </div>
                <div>
                    {compra.items.map((prod) => (
                        <div key={prod.id}>
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

