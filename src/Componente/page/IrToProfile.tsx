import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import logo from '@/assets/logo.png';


export const IrToProfile = () => {

    const location = useLocation();

    if (location.pathname === '/miPerfil') {
        return null;
    }

    return (
    <div className='w-full'>
        <Link to={'/miPerfil'} className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-4'>
                <img src={logo} alt="logo Personal" className='w-14'/>
                <p className=''>Mi Perfil</p>
            </div>
            <p className='w-10'><Icon icon="weui:arrow-filled" width="24" height="24" /></p>
        </Link>
    </div>
    )
}