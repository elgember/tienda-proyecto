import { ProductCard } from "../ProductCard"

export const Favoritos = ({ favorito, toggleFavorito, addToCart, products  }) => {

    return (
    <div>
        <h2>Mis Favoritos ({favorito.length})</h2>
        {favorito.length === 0 ? (
            <p>Aun no tienes productos Favoritos.</p>
        ) : ( 
            <div>
                {favorito.map(products => 
                    <ProductCard key={products.id} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} products={products} />
                )}
            </div>
        )}
    </div>
    );
};