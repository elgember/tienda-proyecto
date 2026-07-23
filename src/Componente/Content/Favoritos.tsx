import { ProductCard } from "../ProductCard";
import { Producto } from "../../Types";

interface FavoritosProps {
    favorito: Producto[];
    toggleFavorito: (producto: Producto) => void;
    addToCart: (producto: Producto) => void;
    products: Producto[];
}

export const Favoritos = ({ favorito, toggleFavorito, addToCart, products }: FavoritosProps) => {

    return (
    <div className="p-4">
        <h2>Mis Favoritos ({favorito.length})</h2>
        {favorito.length === 0 ? (
            <p>Aun no tienes productos Favoritos.</p>
        ) : ( 
            <div>
                {favorito.map(prod => 
                    <ProductCard key={prod.id} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} products={prod} />
                )}
            </div>
        )}
    </div>
    );
};