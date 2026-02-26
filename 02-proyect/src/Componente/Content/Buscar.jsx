import { useState } from "react"
import { ProductCard } from "../ProductCard";

export const Buscar = ({ products, addToCart, agregarBusqueda }) => {

    // busqueda de los productos
    const [buscarPorduct, setBuscarProduct] = useState('');

    //para mostrar sugerencias de los productos que buscamos
    const [mostrarSugerencia, setMostrarSugerencia] = useState(false);

    //filtramos los productos 
    const productosFiltrados = products.filter(p => 
        p.title.toLowerCase().includes(buscarPorduct.toLowerCase())
     );

     // logica para las sugerencias (solo mostramos los titulos que coinciden)                          solo mostramos las primeras 5
     const sugerencia = products.filter(p => p.title.toLowerCase().includes(buscarPorduct.toLowerCase())).slice(0, 5);

     const seleccionarSugerencia = (titulo) => {
        setBuscarProduct(titulo);
        setMostrarSugerencia(false);
        agregarBusqueda(titulo);
     };
 
     

    return (
    <div>
        <div>
            <input type="text" value={buscarPorduct} onChange={(e) => { setBuscarProduct(e.target.value); setMostrarSugerencia(true); }} onFocus={()=> setMostrarSugerencia(true)} placeholder="Buscar Productos " />
        </div>
        <div>
            {mostrarSugerencia && buscarPorduct.length > 1 && (
                <ul>
                    {sugerencia.map(p => (
                        <li key={p.id} onClick={seleccionarSugerencia(p.title)}>
                            {p.title}
                        </li>
                    ))}
                </ul>
            )} 
        </div>
        <div>
            {buscarPorduct && productosFiltrados.length > 0 ? (productosFiltrados.map(p => (
                <ProductCard key={p.id} products={p} addToCart={addToCart} /> 
                )) 
            ) : buscarPorduct ? (
                <p>No se encontraron productos con '{buscarPorduct}'</p>
            ) : (
                <p>Escribe el nombre de un producto para comenzar</p>
            )}
        </div>
    </div>
    );
};

