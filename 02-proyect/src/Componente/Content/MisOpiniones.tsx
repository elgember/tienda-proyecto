import { useState } from 'react';
import { Pendiente } from './Opinion__menu/Pendiente';
import { Realizadas } from './Opinion__menu/Realizadas';
import { Compra } from '../../Types';

interface Opinion {
    id: number | string;
    productId: number;
    rating: number;
    comment: string;
    fecha?: string;
}

interface MisOpinionesProps {
    misCompras: Compra[];
    misOpiniones: Opinion[];
    guardarOpinion: (opinion: Omit<Opinion, 'id'>) => void;
}

export const MisOpiniones = ({ misCompras = [], misOpiniones = [], guardarOpinion }: MisOpinionesProps) => {
    
    const [tabActual, setTabActual] = useState('pendientes');

    // extraemos todos los productos comprados
    const todosLosProductos = misCompras.flatMap(compra => compra.items || []);

    // filtramos los productos que no tienen una opinion realizada, para mostrarlos en pendientes
    const pendientes = todosLosProductos.filter((prod, index, self) => {
        //buscamos si el id del prducto ya existe en alguna opinion realizadas
        const existeOpinion = misOpiniones.some(op => String(op.productId) === String(prod.id));
        const primerProductoIndex = self.findIndex(p => String(p.id) === String(prod.id));
        return !existeOpinion && index === primerProductoIndex;
    });
    
    // filtramos las opiniones realizadas para mostrarlas en su pestaña
    const realizadas = misOpiniones;

    return (
    <div className='w-full'>
        <div className='w-full flex justify-evenly gap-4 border-b mb-4'>
            <button type='button' className={`${'flex-1 py-2'} ${tabActual === 'pendientes' ? 'active border-b-2 border-blue-500' : ''}`} onClick={() => setTabActual('pendientes')}>Pendientes</button>
            <button type='button' className={`${'flex-1 py-2'} ${tabActual === 'realizadas' ? 'active border-b-2 border-blue-500' : ''}`} onClick={() => setTabActual('realizadas')}>Realizadas</button>
        </div>
        <div>
            {tabActual === 'pendientes' ? (
                pendientes.length > 0 ? (
                    <div>
                        {pendientes.map((prod) => (
                            <Pendiente key={`pend-${prod.id}`} producto={prod} guardarOpinion={guardarOpinion} alEnviar={()=> setTabActual('realizadas')} /> 
                        ))}
                        </div>
                    ) : (
                    <p> no tienes opiniones pendientes</p>
                )
                ) : (
                    realizadas.length > 0 ? (
                        <div>
                            {realizadas.map((op) => (
                            <Realizadas key={`real-${op.id}`} opinion={op} />
                        ))}
                        </div>
                    ) : (
                        <p>Aun no has realizado ninguna opinion</p>
                    )
                )}
        </div>
    </div>
    )
}