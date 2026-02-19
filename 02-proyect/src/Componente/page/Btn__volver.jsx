import { Icon } from "@iconify/react/dist/iconify.js"
import { useNavigate } from "react-router-dom"
import s from '../page/Btn__volver.module.css';

export const Btn__volver = () => {
    const navegate = useNavigate();
    
    return (
    <div className={s.container__volver}>
        <button className={s.btn__volver} onClick={()=> navegate(-1)}>
            <Icon icon="solar:arrow-left-linear" width="24" height="24" className={s.arrow__volver}/> 
        </button>
    </div>
    )
}