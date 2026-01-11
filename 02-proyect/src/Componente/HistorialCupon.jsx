import { Icon } from "@iconify/react/dist/iconify.js";

export const HistorialCupon = ({ usado }) => {
    return (
    <div className="historial__container">
        <h3 className="historial__title"><Icon icon="mdi:ticket-percent" width="20" /> Mis Cupones Usados</h3>
        {usado.length === 0 ? (
            <p className="historial__vacio">Aun no has cangiado cupones</p>
        ) : (
            <ul className="historial__lista">
                {usado.map((codigo, index) => (
                    <li key={index} className="historial__item">
                        <span className="codigo__tachado">{codigo}</span>
                        <span className="codigo__usado">Canjeado</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};