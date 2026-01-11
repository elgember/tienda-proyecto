import { Link, useLocation } from "react-router-dom"

export const ProductCard = ({product, addToCart}) => {

    const location = useLocation();

    if (location.pathname === '/product') {
        return null
    }

    return (
    <div className="producto__card">
        <Link className="producto__to" to={`/product/${product.id}`}>
                <img className="card__image" src={product.image} alt={product.title} />
            <div>
                <h3 className="card__title">{product.title}</h3>
                <p className="prime">${product.price}</p>
            </div>
        </Link>
            <button className="btn__agregar" onClick={()=> addToCart(product)}>Agregar al Carrito</button>
    </div>
    )
}