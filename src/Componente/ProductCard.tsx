import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { Producto } from "../Types";

interface PropsProductCard {
    products: Producto;
    addToCart: (product: Producto) => void;
    favorito: Producto[];  // Array de productos favoritos
    toggleFavorito: (product: Producto) => void;
}

export const ProductCard = ({products, addToCart, favorito = [], toggleFavorito = () => {} }: PropsProductCard) => {

    const location = useLocation();

    const like = products && favorito.some(fav => fav.id === products.id);

    if (!products) return null;

    if (location.pathname.startsWith('/product')) {
        return null
    }

    return (
    <div className="bg-white rounded-md shadow-lg w-full flex flex-col justify-between overflow-hidden">
        <Link className='flex flex-col items-center relative' to={`/product/${products.id}`}>
                <img className="w-40 h-54 object-contain pt-8 " src={products.image} alt={products.title} />
            <div>
                <h3 className="truncate w-54 text-center p-4">{products?.title?.length > 50 ? products.title.substring(0, 50) + '...' : products?.title}</h3>
                <p className="m-2 text-center">${products.price.toFixed(2)}</p>
                        {/* para que no se active el link */}
                <button className="absolute top-2 right-4" onClick={(e)=> {e.preventDefault(); toggleFavorito(products)}}><Icon icon={ like ? "mdi:heart" : "mdi:heart-outline"} width="30" height="30" /></button>
            </div>
        </Link>
            <button className="bg-[#48e] text-white p-2 mx-6 mb-4 rounded-md" onClick={()=> addToCart(products)}>Agregar al Carrito</button>
    </div>
    )
}