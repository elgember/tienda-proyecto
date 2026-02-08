import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";
import s from './IrToProfile.module.css';
import logo from '@/assets/logo.png';


export const IrToProfile = () => {

    const location = useLocation();

    if (location.pathname === '/miPerfil') {
        return null;
    }

    return (
    <div className={s.container__perfil}>
        <Link to={'/miPerfil'} className={s.perfil}>
            <div className={s.perfil__div}>
                <img src={logo} alt="loco Personal" className={s.logo}/>
                <p className={s.perfil__mi}>Mi Perfil</p>
            </div>
            <p className={s.perfil__mi}><Icon icon="weui:arrow-filled" width="38" height="24" /></p>
        </Link>
    </div>
    )
}