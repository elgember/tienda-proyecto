import { Icon } from "@iconify/react/dist/iconify.js";
import s from './HistorialCupon.module.css';

export const HistorialCupon = ({ usado }) => {
    return (
    <div className={historial__container}>
        <h3 className={s.historial__title}><Icon icon="mdi:ticket-percent" width="20" /> Mis Cupones Usados</h3>
        {usado.length === 0 ? (
            <p className={s.historial__vacio}>Aun no has cangiado cupones</p>
        ) : (
            <ul className={s.historial__lista}>
                {usado.map((codigo, index) => (
                    <li key={index} className={s.historial__item}>
                        <span className={s.codigo__tachado}>{codigo}</span>
                        <span className={s.codigo__usado}>Canjeado</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};