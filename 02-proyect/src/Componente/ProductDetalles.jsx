import { useParams } from "react-router-dom";
import { Btn__volver } from "./page/btn__volver";
import { useEffect } from "react";
import s from './ProductDetalles.module.css';

export const ProductDetalles = ({ products, addToCart, setLoading, garantia }) => {

    const { id } = useParams();  // captura el id de la URL

    //Buscamos el producto especifico
    const product = products.find(item => item.id === parseInt(id));

    useEffect(() => {
        if (!product) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [product, setLoading]);

    if (!product) {
        return(
            <div>
                <p>Cargando producto...</p>
            </div>
        )
    }

    return (
    <div className={s.detalle__contenedor}>
        <Btn__volver/>
        <div className={s.detalle__titulo}>
                <h2>{product.title}</h2>
        </div>
        <div className={s.detalle__contenido}>
            <img className={s.detalle__imagen} src={product.image} alt={product.title} />
        </div>
        <div className={s.detalle__info}>
                <p className={s.detalle__category}>{product.category}</p>
                <p className={s.detalle__description}>{product.description}</p>
                <p className={s.detalle__price}>${product.price}</p>
                <button className={s.btn__add} onClick={()=> addToCart(product)}>Agregar al carrito</button>
                <button className={s.btn__pagar} onClick={garantia}>Comprar</button>
            </div>
    </div>
    )
}