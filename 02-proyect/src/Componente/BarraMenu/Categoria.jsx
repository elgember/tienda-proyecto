import { useState } from "react";
import s from '../BarraMenu/Categoria.module.css';
import { ProductCard } from "../ProductCard";

export const Categoria = ({ products = [], addToCart, favorito, toggleFavirito }) => {

    if (!Array.isArray(products)) {
        console.error('Error: "products" no es un array. Valor resivido:', products);
        return <p>Cargando Categoria...</p>;
    }

    // Obtenemos las categorias unicas de tus productos
    const listaCategoria = ['todos', ...new Set(products.map(p => p.category))];

    const [catSelecionada, SetCatSelecionada] = useState('todos');

    const productoFiltado = catSelecionada === 'todos' ? products : products.filter(p => p.category === catSelecionada);

    return (
    <div className={s.conatiner__categoria}>
        <div>
            {listaCategoria.map(cat => (
                <button key={cat} className={`${s.btn__cat} ${catSelecionada === cat ? s.active : ''}`} onClick={()=> SetCatSelecionada(cat)} >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            ))}
        </div>
        <div>
            {productoFiltado.map(item => (
                <ProductCard key={item.id} products={item} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavirito} />
            ))}
        </div>
    </div>
    )
}