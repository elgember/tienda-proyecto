import { Icon } from '@iconify/react';
import { Usuario } from '../../Types';

interface AyudaProps {
    usuario: Usuario;
    setVistaActual: (vista: string) => void;
}

export const Ayuda = ({ usuario, setVistaActual }: AyudaProps) => {
    return (
    <div className='w-full'>
                {/* nombre de usuario y parrafo */}
        <div className='px-4'>
            <p>Hola, {usuario.name} {usuario.firstName}</p>
            <h2>¿Con que te ayudamos?</h2>
                        {/* contenedor de input de buscar ayuda */}
            <div className='flex items-center justify-center gap-2 mx-auto py-4 mt-4 relative w-lg'>
                <Icon icon="mingcute:search-ai-line" width="24" height="24" className='absolute left-18' />
                <input type="text" name="" id="" className='border rounded-sm w-sm p-1 pl-9' />
            </div>
        </div>
                        {/* contendor atajos y de las preguntas frecuentes  */}
        <div className='w-full mx-auto'>
            <p className='text-center pb-6'>Atajos personalizados</p>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between mx-4' onClick={()=> setVistaActual('misCompras')}>
                    <p>Devolver una compra</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className='flex justify-between mx-4' onClick={()=> setVistaActual('misCompras')}>
                    <p>Iniciar o seguir un reclamo</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className='flex justify-between mx-4' onClick={()=> setVistaActual('misCompras')}>
                    <p>Cuando llegan mis compras</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className='flex justify-between mx-4' onClick={()=> setVistaActual('cupones')}>
                    <p>Cupones disponibles</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
                <div className='flex justify-between mx-4' onClick={()=> setVistaActual('preguntasFrecuentes')}>
                    <p>Explorar las preguntas frecuentes</p>
                    <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
            </div>
        </div>
                    {/* div del contact */}
        <div className='py-8 px-4'>
            <p className=''>¿Necesitas mas ayuda?</p>
                <button className='flex gap-2 py-2'>
                    <Icon icon="tabler:message" width="24" height="24" className='' />
                    Contactanos
                </button>
        </div>
    </div>
    )
}