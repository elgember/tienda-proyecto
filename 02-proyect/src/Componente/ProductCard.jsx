import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom"

export const ProductCard = ({products, addToCart, favorito = [], toggleFavorito }) => {

    const location = useLocation();

    const like = products && favorito.some(fav => fav.id === products.id);

    if (!products) return null;

    if (location.pathname.startsWith('/product')) {
        return null
    }

    return (
    <div className="producto__card">
        <Link className="producto__to" to={`/product/${products.id}`}>
                <img className="card__image" src={products.image} alt={products.title} />
            <div>
                <h3 className="card__title">{products?.title?.length > 50 ? products.title.substring(0, 50) + '...' : products?.title}</h3>
                <p className="prime">${products.price}</p>
                        {/* para que no se active el link */}
                <button className='s' onClick={(e)=> {e.preventDefault(); toggleFavorito(products)}}><Icon icon={ like ? "mdi:heart" : "mdi:heart-outline"} width="24" height="24" /></button>
            </div>
        </Link>
            <button className="btn__agregar" onClick={()=> addToCart(products)}>Agregar al Carrito</button>
    </div>
    )
}