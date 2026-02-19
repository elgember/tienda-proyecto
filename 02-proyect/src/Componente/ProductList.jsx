import { ProductCard } from "./ProductCard"

export const ProductList = ({ products, addToCart, favorito, toggleFavorito }) => {
    return (
    <div className="producto__lista">
        {products.map(products => (<ProductCard key={products.id} products={products} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} /> ))}
    </div>
    )
}