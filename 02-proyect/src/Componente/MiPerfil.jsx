import { Icon } from "@iconify/react/dist/iconify.js"
import s from './MiPerfil.module.css';
import { Btn__volver } from "./page/btn__volver";

export const MiPerfil = ({ usuario }) => {



    return (
    <section className={s.section}>
            <Btn__volver />
        <div className={s.perfil__usuario}>
            <Icon icon="gg:profile" width="24" height="24" className={s.icon__usuario} />
            <h2 className={s.usuario__name}>{usuario.name} {usuario.firstName}</h2>
            <p className={s.usuario__correo}>correo</p>
        </div>
        <div>
            <div className={s.info__parrafo}>
                <p>hola</p>
            </div>
        </div>
    </section>
    )
}