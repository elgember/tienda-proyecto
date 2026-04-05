import { useState } from 'react';
import { Producto, Usuario } from '../Types';
import { Busqueda } from './Busqueda';
import { IrToCart } from './page/IrToCart';
import { BarraMenuPrincipal } from './page/BarraMenuPrincipal';

interface HeaderProps {
    cart: Producto[];
    usuario: Usuario;
    products: Producto[];
    addToCart: (products: Producto) => void;
    agregarBusqueda: (titulo: string) => void;
    favorito?: Producto[]; // Array de productos favoritos
    toggleFavorito?: (products: Producto) => void;
    vistaActual: string;
    setVistaActual: (vista: string) => void;
    buscarProduct: string;
    setBuscarProduct: (value: string) => void;
}

export const Header = ({ buscarProduct, setBuscarProduct, cart, usuario, products, addToCart, agregarBusqueda, favorito, toggleFavorito, vistaActual, setVistaActual }: HeaderProps) => {

        //estado para menu
        const [mostrarMenu, setMostrarMenu] = useState(false);

    return (
    <div className='relative w-full bg-[#eee]'>
        <div className='w-full h-30'>
            <Busqueda buscarProduct={buscarProduct} setBuscarProduct={setBuscarProduct} products={products} addToCart={addToCart} agregarBusqueda={agregarBusqueda} favorito={favorito} toggleFavorito={toggleFavorito} />
        </div>
        <div className={`${mostrarMenu ? 'flex' : 'absolute'} top-15 right-2 px-20`}>
            <div className={`${buscarProduct ? 'hidden' : 'flex'} z-10 w-full `}>
                <BarraMenuPrincipal setVistaActual={setVistaActual} usuario={usuario} vistaActual={vistaActual} mostrarMenu={mostrarMenu} setMostrarMenu={setMostrarMenu} />
            </div>
        </div>
        <div className={`${(mostrarMenu || buscarProduct) ? 'hidden' : 'absolute'} top-19 right-5 z-30`} onClick={() => setVistaActual('carrito')}>
            <IrToCart totalItems={cart.length} />
        </div>  
    </div>
    )
}