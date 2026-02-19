import { Icon } from "@iconify/react/dist/iconify.js";
import s from '../page/VolverMenu.module.css';

export const VolverMenu = ({ setVistaActual }) => {

    return (
    <div className={s.volver__menu} onClick={()=> setVistaActual('menu')}> 
        <Icon icon="solar:arrow-left-linear" width="24" height="24" className={s.arrow__volver}/>
    </div>
    )
}