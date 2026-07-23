import { Icon } from '@iconify/react';
import type React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Producto } from '../Types';

interface MenuItem {
    id: string;
    label: string;
    IconoOff: React.ReactNode;
    IconoOn: React.ReactNode;
}

interface MenuBarraProps {
    totalItems: number;
    favorito: Producto[];
}


const menu: MenuItem[] = [
    {id: 'inicio', label: 'Inicio', IconoOff: <Icon icon="mingcute:home-4-fill" width="26" height="28" />, IconoOn: <Icon icon="mingcute:home-4-line" width="26" height="28" />},
    {id: 'favoritos', label: 'Favoritos', IconoOff: <Icon icon="streamline-ultimate:tags-favorite-bold" width="24" height="28" />, IconoOn: <Icon icon="streamline-ultimate:tags-favorite" width="24" height="28" />},
    {id: 'categoria', label: 'Categoria', IconoOff: <Icon icon="tabler:category-filled" width="24" height="28" />, IconoOn: <Icon icon="tabler:category" width="24" height="28" />},
    {id: 'cart', label: 'Carrito', IconoOff: <Icon icon="fluent:cart-16-filled" width="26" height="28" />, IconoOn: <Icon icon="fluent:cart-16-regular" width="26" height="28" />},
    {id: 'miCuenta', label: 'Cuenta', IconoOff: <Icon icon="mdi:account" width="26" height="28" />, IconoOn: <Icon icon="mdi:account-outline" width="26" height="28" />}
]

export const MenuBarra = ({ totalItems, favorito }: MenuBarraProps) => {

    //para navegar
    const navigate = useNavigate();

    //detecta cambios en la url automaticamente
    const location = useLocation();

    //lista de rutas que no aparecen la barra
    const ocultarRuta = ['/cart', '/miCuenta', '/product', '/compraAhora', '/miPerfil'];

    //comprobamos si las rutas actuales enpiezan con alguna de la lista
    const deberiaOcultar = ocultarRuta.some(ruta => location.pathname.startsWith(ruta));

    if (deberiaOcultar) {
        return null;
    }

    const menuClick = (id: string)  => {
        //esto te manda fisicamente al componente, pero no recarga la pagina, solo cambia la url y renderiza el componente correspondiente
    if (id === 'inicio') {
        navigate('/inicio');
    } else {
        navigate(`/${id}`);
    }
}

    return (
        <nav className='m-2 sm:hidden fixed bottom-0 left-0 right-0 z-20'>
            <div className='flex justify-around items-center h-15 bg-white rounded-md'>
                {menu.map((item) => {
                const inicioYSubRuta = item.id === 'inicio' && (location.pathname === '/' || location.pathname === '/inicio' || location.pathname.startsWith('/product'));

                const rutaHija = item.id !== 'inicio' && location.pathname.startsWith(`/${item.id}`);

                const menuSelecionado = inicioYSubRuta || rutaHija;

                const carrito = item.id === 'cart';

                const fav = item.id === 'favoritos';

                return (
                        <div key={item.id} className={`${'relative'} ${'cursor-pointer'} ${menuSelecionado ? 'active' : '' } `} onClick={()=> menuClick(item.id)}>
                                {menuSelecionado ? item.IconoOff : item.IconoOn}
                                {carrito && totalItems > 0 && (
                                    <span className='absolute top-[-15px] right-0'>{totalItems}</span>
                                )}
                                {fav && favorito?.length > 0 && (
                                    <span className='absolute top-[-15px] right-[-5px]'>{favorito.length}</span>
                                )}
                        </div>
                    );
                })}
            </div>
        </nav>
    )
}



