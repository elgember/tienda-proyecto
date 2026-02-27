import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom"
import s from './ProductCart.module.css';

export const ProductCard = ({products, addToCart, favorito = [], toggleFavorito }) => {

    const location = useLocation();

    const like = products && favorito.some(fav => fav.id === products.id);

    if (!products) return null;

    if (location.pathname.startsWith('/product')) {
        return null
    }

    return (
    <div className={s.producto__card}>
        <Link className={s.producto__to} to={`/product/${products.id}`}>
                <img className={s.card__image} src={products.image} alt={products.title} />
            <div>
                <h3 className={s.card__title}>{products?.title?.length > 50 ? products.title.substring(0, 50) + '...' : products?.title}</h3>
                <p className={s.prime}>${products.price}</p>
                        {/* para que no se active el link */}
                <button className={s.s} onClick={(e)=> {e.preventDefault(); toggleFavorito(products)}}><Icon icon={ like ? "mdi:heart" : "mdi:heart-outline"} width="24" height="24" /></button>
            </div>
        </Link>
            <button className={s.btn__agregar} onClick={()=> addToCart(products)}>Agregar al Carrito</button>
    </div>
    )
}