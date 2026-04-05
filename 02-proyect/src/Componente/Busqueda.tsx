import { useState } from "react"
import { ProductCard } from "./ProductCard";
import { Producto, Usuario } from "../Types";
import { Icon } from "@iconify/react";

interface BuscarProps {
    products: Producto[];
    addToCart: (products: Producto) => void;
    agregarBusqueda: (titulo: string) => void;
    favorito?: Producto[];  // Array de productos favoritos
    toggleFavorito?: (product: Producto) => void;
    buscarProduct: string;
    setBuscarProduct: (value: string) => void;
}

export const Busqueda = ({ buscarProduct, setBuscarProduct, products, addToCart, agregarBusqueda, favorito = [], toggleFavorito = () => {} }: BuscarProps) => {

    //para mostrar sugerencias de los productos que buscamos
    const [mostrarSugerencia, setMostrarSugerencia] = useState(false);

    //filtramos los productos 
    const productosFiltrados = products.filter(p => 
        p.title.toLowerCase().includes(buscarProduct.toLowerCase())
     );

     // logica para las sugerencias (solo mostramos los titulos que coinciden)                          solo mostramos las primeras 5
     const sugerencia = products.filter(p => p.title.toLowerCase().includes(buscarProduct.toLowerCase())).slice(0, 5);

     const seleccionarSugerencia = (titulo: string) => {
        setBuscarProduct(titulo);
        setMostrarSugerencia(false);
        agregarBusqueda(titulo);
     };
     

    return (
    <div className="flex justify-center flex-col w-full text-center mb-6 relative">
        <div>
            <Icon icon="weui:search-filled" width="24" height="24" className="absolute top-6 left-6 text-mauve-600" />
            <input className="py-3 pl-10 mt-3 w-[95%] bg-white rounded-md" type="text" value={buscarProduct} onChange={(e) => { setBuscarProduct(e.target.value); setMostrarSugerencia(true); }} onFocus={()=> setMostrarSugerencia(true)} placeholder="Buscar Productos " /> 
        </div>
        <div className='w-full h-70 absolute top-16 left-0'>
        <div>
            {mostrarSugerencia && buscarProduct.length > 0 && (
                <ul className="w-full text-left z-10">
                    {sugerencia.map(p => (
                        <li className="p-2 text-str" key={p.id} onClick={() => seleccionarSugerencia(p.title)}>
                            {p.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className="absolute top-0 left-0 w-full z-10">
            {buscarProduct && productosFiltrados.length > 0 ? (productosFiltrados.map(p => (
                <ProductCard key={p.id} products={p} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} /> 
                )) 
            ) : buscarProduct ? (
                <p className="bg-white py-10 shadow-md">No se encontraron productos con '{buscarProduct}'</p>
            ) : (
                null
            )}
        </div>
    </div>
    </div>
    );
};

