import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Producto } from "../../Types";

interface OfertaProps {
    products: Producto[];
    addToCart: (product: Producto) => void;
}


export const Oferta = ({ products, addToCart }: OfertaProps) => {
    const [tiempo, setTiempo] = useState(86400);

    useEffect(() => {
        const timer = setInterval(() => {
            setTiempo(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTiempo = (segundos: number): string => {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segs = segundos % 60;
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
};

    const ofertaDelDia = products.slice(0, 4); // Suponiendo que products es un array de productos

    return (
    <section className=''>
        <div className=''>
            <div className=''>
                <Icon icon="bi:lightning" width="28" height="28" className='' />
                <h2>Oferta relámpago</h2>
            </div>
            <div className=''>
                <span>Termina en: {formatTiempo(tiempo)}</span>
            </div>
        </div>
            <div className=''>
                {ofertaDelDia.map(producto => (
                    <article key={producto.id} className=''>
                        <div className=''>
                            <img src={producto.image} alt={producto.title} className='' />
                            <span className=''>-30%</span>
                        </div>
                        <div>
                            <h3 className=''>{producto.title}</h3>
                            <div className=''>
                                <span className=''>${producto.price.toFixed(2)}</span>
                                <span className=''>${(producto.price * 0.7).toFixed(2)}</span>
                            </div>
                            <div>
                            <div className=''>
                                <div>
                                    <div className='' style={{width: '85%'}}></div>
                                </div>
                                <span>¡Casi agotados!</span>
                            </div>
                                <button onClick={() => addToCart(producto)} className=''>Aprovechar</button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
    </section>
    )
}