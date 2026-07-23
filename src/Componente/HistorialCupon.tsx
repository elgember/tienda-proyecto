import { Icon } from "@iconify/react";

interface HistorialCuponProps {
    usado: string[];
}

export const HistorialCupon = ({ usado }: HistorialCuponProps) => {

    return (
    <div className=''>
        <h3 className=''><Icon icon="mdi:ticket-percent" width="20" /> Mis Cupones Usados</h3>
        {usado.length === 0 ? (
            <p className=''>Aun no has cangiado cupones</p>
        ) : (
            <ul className=''>
                {usado.map((codigo, index) => (
                    <li key={index} className=''>
                        <span className=''>{typeof codigo === 'object' ? codigo.codigo : codigo}</span>
                        <span className=''>Canjeado</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};