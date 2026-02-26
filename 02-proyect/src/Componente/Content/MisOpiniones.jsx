import { useState } from 'react';
import s from './MisOpiniones.module.css';
import { Pendiente } from './Opinion__menu/Pendiente';
import { Realizadas } from './Opinion__menu/Realizadas';

export const MisOpiniones = ({ misCompras = [], misOpiniones = [], guardarOpinion }) => {
    
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
    <div>
        <div>
            <button className={`${s.tabBtn} ${tabActual === 'pendientes' ? s.active : ''}`} onClick={() => setTabActual('pendientes')}>Pendientes</button>
            <button className={`${s.tabBtn} ${tabActual === 'realizadas' ? s.active : ''}`} onClick={() => setTabActual('realizadas')}>Realizadas</button>
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