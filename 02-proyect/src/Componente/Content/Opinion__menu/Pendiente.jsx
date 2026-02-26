import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import s from './Pendiente.module.css';

export const Pendiente = ({ guardarOpinion, producto, alEnviar }) => {

    const [rating, setRating] = useState(0);

    const [hover, setHover] = useState(0);
    
    const manejarEnvio = () => {
        guardarOpinion({
            productId: producto.id,
            titulo: producto.title,
            imagen: producto.image,
            estrella: rating
        });
        //ejecutamos el salto de pestaña que definimos en el padre
        if (alEnviar) alEnviar();
    }

    return (
    <div>
        <img src={producto.image} alt={producto.name} width='50' />
        <div>
            <p>{producto.title}</p>
            <div>
                {[1, 2, 3, 4, 5].map((num) => (
                    <Icon key={`${producto.id}-estrella-${num}`} icon={ num <= (hover || rating) ? "material-symbols-light:star-rounded" : "material-symbols-light:star-outline-rounded" } width="24" height="24"
                    className={num <= (hover || rating) ? s.starActive : s.starEmpty} onMouseEnter={() => setHover(num)} onMouseLeave={()=> setHover(0)} 
                    onClick={() => setRating(num)}/>
                ))}
            </div>
            {rating > 0 && (
                <button className={s.btenEnviar} onClick={manejarEnvio}>Enviar</button>
            )}
        </div>
    </div>
    )
}