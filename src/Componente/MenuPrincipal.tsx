import { Icon } from '@iconify/react';
import { IrToProfile } from './page/IrToProfile'; 
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../Types';

interface MenuPrinciapalProps {
    setVistaActual: (vista: string) => void;
    usuario: Usuario;
}

export const MenuPrinciapal = ({ setVistaActual, usuario }: MenuPrinciapalProps) => {

    //Inicia la funcion de navegacion 
    const navigate = useNavigate();

    return (
    <div className='w-screen h-screen relative bg-white'>
            <div>
                <div className='flex w-full items-center px-8 p-4 gap-4'>
                    <Icon icon="gg:profile" width="28" height="28" />
                    <h2 className=''>{usuario.name} {usuario.firstName}</h2>
                </div>
                <div>
                    <IrToProfile />
                </div>
            </div>
        {/* lista de opciones */}
            <div className='px-8 py-4'>
                <div className='menu-option' onClick={() => navigate('/inicio')}>
                    <Icon icon="mingcute:home-4-line" width="26" height="28" />
                    <p className=''>Inicio</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('notificaciones')}>
                    <Icon icon="mi:notification" width="24" height="24" />
                    <p className=''>Notificaciones</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('ayuda')}>
                    <Icon icon="weui:help-outlined" width="24" height="24" />
                    <p className=''>Ayuda</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('misCompras')}>
                    <Icon icon="material-symbols-light:shopping-bag-outline" width="24" height="24" />
                    <p className=''>Mis compras</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('misOpiniones')}>
                    <Icon icon="material-symbols-light:reviews-outline" width="24" height="24" />
                    <p className=''>Mis opiniones</p>
                </div>
                <div className='menu-option' onClick={()=> navigate('/favoritos')}>
                    <Icon icon="iconamoon:heart-light" width="24" height="24" />
                    <p className=''>Favoritos</p>
                </div>
                <div className='menu-option relative' onClick={()=> setVistaActual('oferta')}>
                    <Icon icon="ic:outline-local-offer" width="28" height="28" />
                    <p className=''>Ofertas</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('cupones')}>
                    <Icon icon="lsicon:coupon-outline" width="24" height="24" />
                    <p className=''>Cupones</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('seguroGarantia')}>
                    <Icon icon="ic:outline-shield" width="24" height="24" />
                    <p className=''>Seguro y garantias</p>
                </div>
                <div className='menu-option' onClick={()=> setVistaActual('historial')}>
                    <Icon icon="ic:outline-watch-later" width="24" height="24" />
                    <p className=''>Historial</p>
                </div>
            </div>
            <div className='w-full'>     
                    <p className='text-center absolute bottom-0 p-4'>Terminos y condiciones</p>
            </div>
        </div>
    );
}