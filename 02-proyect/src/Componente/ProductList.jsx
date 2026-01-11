import { ProductCard } from "./ProductCard"

export const ProductList = ({ products, addToCart}) => {
    return (
    <div className="producto__lista">
        {products.map(product => (<ProductCard key={product.id} product={product} addToCart={addToCart} /> ))}
    </div>
    )
}