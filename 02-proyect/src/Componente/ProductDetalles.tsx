import { useParams } from "react-router-dom";
import { Btn__volver } from "./page/Btn__volver";
import { useEffect } from "react";
import { Producto } from "../Types";

interface ProductDetallesProps {
    products: Producto[];
    addToCart: (product: Producto) => void;
    setLoading: (state: boolean | null) => void;
    garantia: () => void;
}

export const ProductDetalles = ({ products, addToCart, setLoading, garantia }: ProductDetallesProps) => {

    //todo lo que biene de la URL es texto y el id es un numero, por eso lo convertimos a numero con Number()
    const { id } = useParams<{ id: string }>();  // captura el id de la URL

    //Buscamos el producto especifico
    const product = products.find(item => item.id === Number(id));

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
    <div className="flex flex-col items-center gap-2 p-8 relative max-w-7xl mx-auto bg-white sm:grid sm:grid-cols-2 rounded-md shadow-md">
        <div className="absolute top-2 left-2">
            <Btn__volver />
        </div>
            <div className="text-lg px-4">
                <h2 className="text-center text-base font-normal">{product.title}</h2>
            <div className="m-10 flex justify-center">
                <img className="w-40 m-4" src={product.image} alt={product.title} />
            </div>
        </div>
        <div className="flex flex-col gap-4">
                <p className='font-light'>{product.category}</p>
                <p className='break-words font-light'>{product.description}</p>
                <p className=''>${product.price.toFixed(2)}</p>
                <div className="flex gap-4 justify-center mb-4 flex-col">
                    <button className='bg-[#48e] text-white p-3 px-4 rounded-sm' onClick={()=> addToCart(product)}>Agregar al carrito</button>
                    <button className='bg-[#f00] text-white p-3 px-4 rounded-sm' onClick={garantia}>Comprar</button>
                </div>
            </div>
    </div>
    )
}