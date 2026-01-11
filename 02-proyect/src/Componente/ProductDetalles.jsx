import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useParams } from "react-router-dom"

export const ProductDetalles = ({ products, addToCart, setLoading}) => {

    const { id } = useParams();  // captura el id de la URL
    const navigate = useNavigate();  //para volver atras

    //Buscamos el producto especifico
    const product = products.find(item => item.id === parseInt(id));

    if (!product) return setLoading(true);

    return (
    <div className="detalle__contenedor">
        <button className="btn__volver" onClick={()=> navigate(-1)}>
            <Icon icon="ion:arrow-back" /> Volver
        </button>
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