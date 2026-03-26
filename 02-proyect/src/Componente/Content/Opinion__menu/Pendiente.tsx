import { Icon } from "@iconify/react";
import { useState } from "react";
import { Producto, Opinion } from "../../../Types";

interface PendienteProps {
    guardarOpinion: (opinion: Opinion) => void;
    producto: Producto;
    alEnviar?: () => void; //funcion opcional para ejecutar algo despues de enviar la opinion
}

export const Pendiente = ({ guardarOpinion, producto, alEnviar }: PendienteProps) => {

    const [rating, setRating] = useState(0);

    const [hover, setHover] = useState(0);
    
    const manejarEnvio = () => {
        if(rating === 0) return; //validacion para no enviar sin rating
        guardarOpinion({
            id: window.crypto.randomUUID(),
            productoId: producto.id,
            titulo: producto.title,
            imagen: producto.image,
            rating: rating,
            comentario: '',
            fecha: new Date().toISOString()
        });
        //ejecutamos el salto de pestaña que definimos en el padre
        if (alEnviar) alEnviar();
    }

    return (
    <div>
        <img src={producto.image} alt={producto.title} width='50' />
        <div>
            <p>{producto.title}</p>
            <div>
                {[1, 2, 3, 4, 5].map((num) => (
                    <Icon key={`${producto.id}-estrella-${num}`} icon={ num <= (hover || rating) ? "material-symbols-light:star-rounded" : "material-symbols-light:star-outline-rounded" } width="24" height="24"
                    className={num <= (hover || rating) ? 'starActive' : 'starEmpty'} onMouseEnter={() => setHover(num)} onMouseLeave={()=> setHover(0)} 
                    onClick={() => setRating(num)}/>
                ))}
            </div>
            {rating > 0 && (
                <button className='' onClick={manejarEnvio}>Enviar</button>
            )}
        </div>
    </div>
    )
}