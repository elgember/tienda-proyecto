import { Icon } from '@iconify/react/dist/iconify.js';
import s from './Ayuda.module.css';
import { Btn__volver } from '../page/btn__volver';

export const Ayuda = ({ usuario, setVistaActual }) => {
    return (
    <div className={s.container__ayuda}>
        <div className={s.icon__ayuda}>
            <Btn__volver />
        </div>
        <div className={s.title__ayuda}>
            <p>Hola, {usuario.name} {usuario.firstName}</p>
            <h2>¿Con que te ayudamos?</h2>
            <div>
                <input type="text" name="" id="" className={s.input__ayuda} />
            </div>
        </div>
        <div className={s.ayuda}>
            <p>Atajos personalizados</p>
            <div className={s.opcion}>
                <div className={s.opcion__ayuda} onClick={()=> setVistaActual('misCompras')}>
                    <p>Devolver una compra</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className={s.opcion__ayuda} onClick={()=> setVistaActual('misCompras')}>
                    <p>Iniciar o seguir un reclamo</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className={s.opcion__ayuda} onClick={()=> setVistaActual('misCompras')}>
                    <p>Cuando llegan mis compras</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className={s.opcion__ayuda}>
                    <p>Cupones disponibles</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className={s.opcion__ayuda}>
                    <p>Explorar las preguntas frecuentes</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
            </div>
        </div>
        <div>
            <p>¿Necesitas mas ayuda?</p>
            <button>
                Contactanos
            </button>
        </div>
    </div>
    )
}