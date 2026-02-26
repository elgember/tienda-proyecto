import { Icon } from '@iconify/react/dist/iconify.js';
import { IrToProfile } from './page/IrToProfile'; 
import s  from '@/Componente/MenuPrinciapal.module.css';
import { useNavigate } from 'react-router-dom';

export const MenuPrinciapal = ({ setVistaActual, usuario }) => {

    //Inicia la funcion de navigacion 
    const navigate = useNavigate();

    return (
    <div className={s.container__profile}>
            <div className={s.profile__nav}>
                <div className={s.profile}>
                    <Icon icon="gg:profile" width="24" height="26" className={s.icon__profile} />
                    <h2 className={s.hola}>{usuario.name} {usuario.firstName}</h2>
                </div>
                <div>
                    <IrToProfile />
                </div>
            </div>
            <div className={s.container__datos}>
                <div className={s.datos__cuenta} onClick={() => navigate('/inicio')}>
                    <Icon icon="mingcute:home-4-line" width="26" height="28" />
                    <p className={s.datos__p}>Inicio</p>
                </div>
                <div className={s.datos__cuenta} onClick={() => navigate('/buscar')}>
                    <Icon icon="bitcoin-icons:search-filled" width="26" height="24" />
                    <p className={s.datos__p}>Buscar</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('notificaciones')}>
                    <Icon icon="mi:notification" width="24" height="24" />
                    <p className={s.datos__p}>Notificaciones</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('ayuda')}>
                    <Icon icon="weui:help-outlined" width="24" height="24" />
                    <p className={s.datos__p}>Ayuda</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('misCompras')}>
                    <Icon icon="material-symbols-light:shopping-bag-outline" width="24" height="24" />
                    <p className={s.datos__p}>Mis compras</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('misOpiniones')}>
                    <Icon icon="material-symbols-light:reviews-outline" width="24" height="24" />
                    <p className={s.datos__p}>Mis opiniones</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> navigate('/favoritos')}>
                    <Icon icon="iconamoon:heart-light" width="24" height="24" />
                    <p className={s.datos__p}>Favoritos</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('oferta')}>
                    <Icon icon="ic:outline-local-offer" width="24" height="24" />
                    <p className={s.datos__por}>%</p>
                    <p className={s.datos__p}>Ofertas</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('cupones')}>
                    <Icon icon="lsicon:coupon-outline" width="24" height="24" />
                    <p className={s.datos__p}>Cupones</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('seguroGarantia')}>
                    <Icon icon="ic:outline-shield" width="24" height="24" />
                    <p className={s.datos__p}>Seguro y garantias</p>
                </div>
                <div className={s.datos__cuenta} onClick={()=> setVistaActual('historial')}>
                    <Icon icon="ic:outline-watch-later" width="24" height="24" />
                    <p className={s.datos__p}>Historial</p>
                </div>
            </div>
            <div>
                <div>
                    <p>Terminos y condiciones</p>
                </div>
            </div>
        </div>
    );
}