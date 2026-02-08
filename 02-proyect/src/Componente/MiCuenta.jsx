import { Icon } from "@iconify/react/dist/iconify.js"
import s from './MiCuenta.module.css';
import { IrToProfile } from "./page/IrToProfile";

export const MiCuenta = () => {
    return (
    <div className={s.container__profile}>
        <div className={s.profile__nav}>
            <div className={s.profile}>
                <Icon icon="gg:profile" width="24" height="26" className={s.icon__profile} />
                <p className={s.hola}>Hola, alex</p>
            </div>
            <div>
                <IrToProfile/>
            </div>
        </div>
        <div className={s.container__datos}>
            <div className={s.datos__cuenta}>
                <Icon icon="mingcute:home-4-line" width="26" height="28" />
                <p className={s.datos__p}>Inicio</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="bitcoin-icons:search-filled" width="26" height="24" />
                <p className={s.datos__p}>Buscar</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="mi:notification" width="24" height="24" />
                <p className={s.datos__p}>Notificaciones</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="weui:help-outlined" width="24" height="24" />
                <p className={s.datos__p}>Ayuda</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="material-symbols-light:shopping-bag-outline" width="24" height="24" />
                <p className={s.datos__p}>Mis compras</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="material-symbols-light:reviews-outline" width="24" height="24" />
                <p className={s.datos__p}>Mis opiniones</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="iconamoon:heart-light" width="24" height="24" />
                <p className={s.datos__p}>Favoritos</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="ic:outline-local-offer" width="24" height="24" />
                <p className={s.datos__por}>%</p>
                <p className={s.datos__p}>Ofertas</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="lsicon:coupon-outline" width="24" height="24" />
                <p className={s.datos__p}>Cupones</p>
            </div>
            <div className={s.datos__cuenta}>
                <Icon icon="ic:outline-shield" width="24" height="24" />
                <p className={s.datos__p}>Seguro y garantias</p>
            </div>
            <div className={s.datos__cuenta}>
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
    )
}