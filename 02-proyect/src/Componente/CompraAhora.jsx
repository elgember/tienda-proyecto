export const CompraAhora = () => {
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
                <span>$ {product.price}</span>
            </div>
            <div>
                <p>18 meses de Garantia extendida</p>
                <div>
                    <span>$ {product.price}</span>
                    
                </div>
            </div>
        </div>
    </div>
    )
}