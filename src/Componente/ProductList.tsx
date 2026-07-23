import { ProductCard } from "./ProductCard"
import type { Producto } from "../Types";

interface PropsProductList {
    products: Producto[];
    addToCart: (product: Producto) => void;
    favorito: Producto[];  // Array de productos favoritos
    toggleFavorito: (product: Producto) => void;
}

export const ProductList = ({ products, addToCart, favorito, toggleFavorito }: PropsProductList) => {
    return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 h-full'>
        {products.map(product => (<ProductCard key={product.id} products={product} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} /> ))}
    </div>
    )
}