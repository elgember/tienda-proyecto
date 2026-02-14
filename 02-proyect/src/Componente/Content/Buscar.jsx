import { useState } from "react"
import { ProductCard } from "../ProductCard";

export const Buscar = ({ products, addToCart }) => {

    const [termino, setTermino] = useState('');

    const buscarProduct = products.filter(p => 
        p.title.toLowerCase().includes(termino.toLowerCase())
     );

    return (
    <div>
        <div>
            <input type="text" value={termino} onChange={(e) => setTermino(e.target.value)} placeholder="Buscar Productos " />
        </div>
        <div>
            {termino && buscarProduct.length > 0 ? (buscarProduct.map(p => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} /> 
                )) 
            ) : termino ? (
                <p>No se encontraron productos con '{termino}'</p>
            ) : (
                <p>Escribe el nombre de un producto para comenzar</p>
            )}
        </div>
    </div>
    );
};