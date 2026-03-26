import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Usuario } from "@/Types";
import { useNavigate } from "react-router-dom";

interface BarraMenuPrincipalProps {
    usuario: Usuario;
    setVistaActual: (vista: string) => void;
    mostrarMenu: boolean;
    setMostrarMenu: (mostrar: boolean) => void;
}

export const BarraMenuPrincipal = ( { usuario, setVistaActual, mostrarMenu, setMostrarMenu } : BarraMenuPrincipalProps) => {

    const navigate = useNavigate();

    const menuRef = useRef<HTMLDivElement>(null);

    const irA = (destino: string) => {
        const rutasCuenta = ['notificaciones', 'misCompras', 'misOpiniones', 'oferta', 'cupones', 'seguroGarantia', 'historial', 'ayuda',];
        if (destino === 'inicio') {
            setMostrarMenu(false);
            setVistaActual('inicio');
            return;
        }
        if (rutasCuenta.includes(destino)) {
            navigate('/miCuenta', { state: { vista: destino } }); // Navega a inicio para mostrar el menú principal
            setVistaActual(destino); // Luego cambia la vista actual al destino seleccionado
        }
        else {
            const rutaLimpia = destino.startsWith('/') ? destino : `/${destino}`;
            navigate(rutaLimpia);
        }
        setMostrarMenu(false);
    }

    return (
    <div className="w-full pt-4 sm:block hidden">
        <div className="flex justify-end w-full px-4">
            <Icon icon={mostrarMenu ? 'hugeicons:sort-by-up-02' : 'ic:round-menu'} width="26" height="26" className="cursor-pointer transition-all" onClick={() => setMostrarMenu(!mostrarMenu)} />
        </div>
            <div ref={menuRef} className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${mostrarMenu ? 'max-h-screen' : 'max-h-0 opacity-0'}`}>
                <div className='grid grid-cols-2 gap-4 p-4 shadow-md rounded-md'>
                <div className='menu-option' onClick={() => irA('inicio')}>
                    <Icon icon="mingcute:home-4-line" width="26" height="28" />
                    <p className=''>Inicio</p>
                </div>
                <div className='menu-option' onClick={()=> irA('notificaciones')}>
                    <Icon icon="mi:notification" width="24" height="24" />
                    <p className=''>Notificaciones</p>
                </div>
                <div className='menu-option' onClick={()=> irA('ayuda')}>
                    <Icon icon="weui:help-outlined" width="24" height="24" />
                    <p className=''>Ayuda</p>
                </div>
                <div className='menu-option' onClick={()=> irA('misCompras')}>
                    <Icon icon="material-symbols-light:shopping-bag-outline" width="24" height="24" />
                    <p className=''>Mis compras</p>
                </div>
                <div className='menu-option' onClick={()=> irA('misOpiniones')}>
                    <Icon icon="material-symbols-light:reviews-outline" width="24" height="24" />
                    <p className=''>Mis opiniones</p>
                </div>
                <div className='menu-option' onClick={()=> irA('/favoritos')}>
                    <Icon icon="iconamoon:heart-light" width="24" height="24" />
                    <p className=''>Favoritos</p>
                </div>
                <div className='menu-option' onClick={()=> irA('oferta')}>
                    <Icon icon="ic:outline-local-offer" width="24" height="24" />
                    <p className=''>%</p>
                    <p className=''>Ofertas</p>
                </div>
                <div className='menu-option' onClick={()=> irA('cupones')}>
                    <Icon icon="lsicon:coupon-outline" width="24" height="24" />
                    <p className=''>Cupones</p>
                </div>
                <div className='menu-option' onClick={()=> irA('seguroGarantia')}>
                    <Icon icon="ic:outline-shield" width="24" height="24" />
                    <p className=''>Seguro y garantias</p>
                </div>
                <div className='menu-option' onClick={()=> irA('historial')}>
                    <Icon icon="ic:outline-watch-later" width="24" height="24" />
                    <p className=''>Historial</p>
                </div>
            </div>
            </div>
    </div>
    );
};