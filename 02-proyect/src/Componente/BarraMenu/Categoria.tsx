import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { Producto } from "../../Types";

interface CategoriaProps {
    products: Producto[];
    addToCart: (product: Producto) => void;
    favorito: number[];
    toggleFavorito: (productId: number) => void;
}

export const Categoria = ({ products = [], addToCart, favorito, toggleFavorito }: CategoriaProps) => {

    if (!Array.isArray(products)) {
        console.error('Error: "products" no es un array. Valor resivido:', products);
        return <p>Cargando Categoria...</p>;
    }

    // Obtenemos las categorias unicas de tus productos
    const listaCategoria = ['todos', ...new Set(products.map(p => p.category))];

    const [catSelecionada, SetCatSelecionada] = useState('todos');

    const productoFiltado = catSelecionada === 'todos' ? products : products.filter(p => p.category === catSelecionada);

    return (
    <div className=''>
        <div>
            {listaCategoria.map(cat => (
                <button key={cat} className={` ${catSelecionada === cat ? '' : ''}`} onClick={()=> SetCatSelecionada(cat)} >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            ))}
        </div>
        <div>
            {productoFiltado.map(item => (
                <ProductCard key={item.id} products={item} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} />
            ))}
        </div>
    </div>
    )
}