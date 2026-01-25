import { useParams } from "react-router-dom"
import { Btn__volver } from "./page/btn__volver";

export const ProductDetalles = ({ products, addToCart, setLoading}) => {

    const { id } = useParams();  // captura el id de la URL

    //Buscamos el producto especifico
    const product = products.find(item => item.id === parseInt(id));

    if (!product) return setLoading(true);

    return (
    <div className="detalle__contenedor">
        <Btn__volver/>
        <div className="detalle__titulo">
                <h2>{product.title}</h2>
        </div>
        <div className="detalle__contenido">
            <img className="detalle__imagen" src={product.image} alt={product.title} />
            <div className="detalle__info">
                <p className="detalle__category">{product.category}</p>
                <p className="detalle__description">{product.description}</p>
                <p className="detalle__price">${product.price}</p>
                <button className="btn__add" onClick={()=> addToCart(product)}>Agregar al carrito</button>
            </div>
        </div>
    </div>
    )
}