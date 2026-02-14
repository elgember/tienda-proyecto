import styles from './MenuBarra.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation, useNavigate } from 'react-router-dom';

const menu = [
    {id: 'inicio', label: 'Inicio', IconoOff: <Icon icon="mingcute:home-4-fill" width="26" height="28" />, IconoOn: <Icon icon="mingcute:home-4-line" width="26" height="28" />},
    {id: 'favoritos', label: 'Favoritos', IconoOff: <Icon icon="streamline-ultimate:tags-favorite-bold" width="24" height="28" />, IconoOn: <Icon icon="streamline-ultimate:tags-favorite" width="24" height="28" />},
    {id: 'categoria', label: 'Categoria', IconoOff: <Icon icon="tabler:category-filled" width="24" height="28" />, IconoOn: <Icon icon="tabler:category" width="24" height="28" />},
    {id: 'cart', label: 'Carrito', IconoOff: <Icon icon="fluent:cart-16-filled" width="26" height="28" />, IconoOn: <Icon icon="fluent:cart-16-regular" width="26" height="28" />},
    {id: 'miCuenta', label: 'Cuenta', IconoOff: <Icon icon="mdi:account" width="26" height="28" />, IconoOn: <Icon icon="mdi:account-outline" width="26" height="28" />}
]

export const MenuBarra = ({ totalItems }) => {

    //para navegar
    const navigate = useNavigate();

    //detecta cambios en la url automaticamente
    const location = useLocation();

    //lista de rutas que no aparecen la barra
    const ocultarMenu = ['/cart'];

    if (ocultarMenu.includes(location.pathname)) {
        return null;
    }

    const menuClick = (id)  => {
        //esto te manda fisicamente al componente   
    if (id.includes('inicio')) {
        navigate('/inicio');
    } else {
        navigate(`/${id}`);
    }
}

    return (
        <nav className={styles.menu__principal}>
            <div className={styles.menu}>
                {menu.map((item) => {
                const inicioYSubRuta = item.id === 'inicio' && (location.pathname === '/' || location.pathname === '/inicio' || location.pathname.startsWith('/product'));

                const rutaHija = item.id !== 'inicio' && location.pathname.startsWith(`/${item.id}`);

                const menuSelecionado = inicioYSubRuta || rutaHija;

                const carrito = item.id === 'cart';

                return (
                        <div key={item.id} className={`${styles.menu__item} ${menuSelecionado ? styles.active : '' } `} onClick={()=> menuClick(item.id)}>
                                {menuSelecionado ? item.IconoOff : item.IconoOn}
                                {carrito && totalItems > 0 && (
                                    <span className={styles.totalItems}>{totalItems}</span>
                                )}
                        </div>
                    );
                })}
            </div>
        </nav>
    )
}



