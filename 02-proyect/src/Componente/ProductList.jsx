import { ProductCard } from "./ProductCard"
import s from './ProductCart.module.css';

export const ProductList = ({ products, addToCart, favorito, toggleFavorito }) => {
    return (
    <div className={s.producto__lista}>
        {products.map(products => (<ProductCard key={products.id} products={products} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} /> ))}
    </div>
    )
}