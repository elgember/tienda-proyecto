import { Icon } from '@iconify/react';
import { Usuario } from '../../Types';

interface AyudaProps {
    usuario: Usuario;
    setVistaActual: (vista: string) => void;
}

export const Ayuda = ({ usuario, setVistaActual }: AyudaProps) => {
    return (
    <div className=''>
                {/* nombre de usuario y parrafo */}
        <div className=''>
            <p>Hola, {usuario.name} {usuario.firstName}</p>
            <h2>¿Con que te ayudamos?</h2>
                        {/* contenedor de input de buscar ayuda */}
            <div className=''>
                <Icon icon="mingcute:search-ai-line" width="24" height="24" className='' />
                <input type="text" name="" id="" className='' />
            </div>
        </div>
                        {/* contendor atajos y de las preguntas frecuentes  */}
        <div className=''>
            <p>Atajos personalizados</p>
            <div className=''>
                <div className='' onClick={()=> setVistaActual('misCompras')}>
                    <p>Devolver una compra</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className='' onClick={()=> setVistaActual('misCompras')}>
                    <p>Iniciar o seguir un reclamo</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className='' onClick={()=> setVistaActual('misCompras')}>
                    <p>Cuando llegan mis compras</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className=''>
                    <p>Cupones disponibles</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className=''>
                    <p>Explorar las preguntas frecuentes</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
            </div>
        </div>
                    {/* div del contact */}
        <div className=''>
            <p className=''>¿Necesitas mas ayuda?</p>
                <button className=''>
                    <Icon icon="tabler:message" width="24" height="24" className='' />
                    Contactanos
                </button>
        </div>
    </div>
    )
}