import { useState } from "react"
import { ProductCard } from "./ProductCard";
import { Producto, Usuario } from "../Types";
import { BarraMenuPrincipal } from "./page/BarraMenuPrincipal";
import { Icon } from "@iconify/react";
import { IrToCart } from "./page/IrToCart";

interface BuscarProps {
    products: Producto[];
    cart: Producto[];
    usuario: Usuario;
    addToCart: (products: Producto) => void;
    agregarBusqueda: (titulo: string) => void;
    favorito?: Producto[];  // Array de productos favoritos
    toggleFavorito?: (product: Producto) => void;
    vistaActual: string;
    setVistaActual: (vista: string) => void;
}

export const Buscar = ({cart, products, addToCart, agregarBusqueda, usuario, vistaActual, setVistaActual, favorito = [], toggleFavorito = () => {} }: BuscarProps) => {

    //estado para menu
    const [mostrarMenu, setMostrarMenu] = useState(false);

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

     const seleccionarSugerencia = (titulo: string) => {
        setBuscarProduct(titulo);
        setMostrarSugerencia(false);
        agregarBusqueda(titulo);
     };
     

    return (
    <div className="flex justify-center flex-col w-full text-center mb-6 relative">
        <div>
            <Icon icon="weui:search-filled" width="24" height="24" className="absolute top-6 left-6 text-mauve-600" />
            <input className="py-3 pl-10 mt-3 w-[95%] bg-white rounded-md" type="text" value={buscarPorduct} onChange={(e) => { setBuscarProduct(e.target.value); setMostrarSugerencia(true); }} onFocus={()=> setMostrarSugerencia(true)} placeholder="Buscar Productos " /> 
        </div>
        <div className='w-full h-70 absolute top-16 left-0'>
        <div className="">
            {mostrarSugerencia && buscarPorduct.length > 0 && (
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
            {buscarPorduct && productosFiltrados.length > 0 ? (productosFiltrados.map(p => (
                <ProductCard key={p.id} products={p} addToCart={addToCart} favorito={favorito} toggleFavorito={toggleFavorito} /> 
                )) 
            ) : buscarPorduct ? (
                <p className="bg-white py-10 shadow-md">No se encontraron productos con '{buscarPorduct}'</p>
            ) : (
                null
            )}
        </div>
    </div>
        <div className={`${buscarPorduct ? 'hidden' : 'flex'} mr-18`}>
            <BarraMenuPrincipal setVistaActual={setVistaActual} usuario={usuario} vistaActual={vistaActual} mostrarMenu={mostrarMenu} setMostrarMenu={setMostrarMenu} />
        </div>
        <div className={`${(mostrarMenu || buscarPorduct) ? 'hidden' : 'absolute'} top-19 right-5 z-30`} onClick={() => setVistaActual('carrito')}>
            <IrToCart totalItems={cart.length} />
        </div>    
    </div>
    );
};

