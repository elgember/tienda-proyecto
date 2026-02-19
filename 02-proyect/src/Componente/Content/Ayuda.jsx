import { Icon } from '@iconify/react/dist/iconify.js';
import s from './Ayuda.module.css';

export const Ayuda = ({ usuario, setVistaActual }) => {
    return (
    <div className={s.container__ayuda}>
                {/* nombre de usuario y parrafo */}
        <div className={s.title__ayuda}>
            <p>Hola, {usuario.name} {usuario.firstName}</p>
            <h2>¿Con que te ayudamos?</h2>
                        {/* contenedor de input de buscar ayuda */}
            <div className={s.buscar__ayuda}>
                <Icon icon="mingcute:search-ai-line" width="24" height="24" className={s.icon__search} />
                <input type="text" name="" id="" className={s.input__ayuda} />
            </div>
        </div>
                        {/* contendor atajos y de las preguntas frecuentes  */}
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
                    {/* div del contact */}
        <div className={s.ayuda__contact}>
            <p className={s.necesita__ayuda}>¿Necesitas mas ayuda?</p>
                <button className={s.boton__ayuda}>
                    <Icon icon="tabler:message" width="24" height="24" className={s.icon__boton} />
                    Contactanos
                </button>
        </div>
    </div>
    )
}