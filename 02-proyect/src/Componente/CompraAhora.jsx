import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const CompraAhora = ({descuento, totalFinal, finalizarCompra, product, irAGarantia }) => {

    const location = useLocation();

    const [costoEnvio, setCostoEnvio] = useState(0);

    const { misProductos } = location.state || { misProductos: []};

    //estado para guardar la selecion { productoId: precioGarantia }
    const [selecciones, setSelecciones] = useState({});
    const [totalGarantia, setTotalGarantia] = useState(totalFinal);

    //Funcion para marcar la seleccion
    const seleccionarGarantia = (productId, precio) => {
        setSelecciones(prev => ({
            ...prev,
            [product.Id]: precio
        }));
    };


    //Recalcular el total cada vez que cambien las selecciones
    useEffect(() => {
        const extraGarantias = Object.values(selecciones).reduce((acc, curr) => acc + curr, 0);
        setTotalGarantia(totalFinal + extraGarantias);
    }, [selecciones, totalFinal]);
    

    // validacion de producto que aplica garantia y cupones
    useEffect(() => {
        if (totalFinal < 200) {
            setCostoEnvio(80);
        } else {
            setCostoEnvio(0);
        }
    }, [totalFinal]);

    
    return (
    <div className="container__garantia">
        <h2 className="title__garantia">Agrega una proteccion para este producto</h2>
        {misProductos.filter(product => product.price > 100).map((product) => {
    return (
        <div key={product.id} className="garantia">
            <div className="garantia__product">
                <div className="container__image">
                    <img className="image__garantia" src={product.image} alt={product.title} />
                </div>
                <div className="proteccion__product">
                    <h5>proteccion para:</h5>
                    <p>{product.title}</p>
                </div>
            </div>
            <div className={`opcion ${selecciones[product.id] === 50 ? 'selecionada' : ''}`} onClick={() => seleccionarGarantia(product.id, 50)}>
                <p>12 meses de Garantia extendida</p>
                <span>$ 50</span>
            </div>
            <div className={`opcion ${selecciones[product.id] === (product.price * 0.1) ? 'seleccionada' : ''}`} onClick={()=> seleccionarGarantia(product.id, product.price * 0.1)}>
                <p>18 meses de Garantia extendida</p>
                <div>
                    <span>$ {(product.price * 0.1).toFixed(2)}</span>
                    <span>10% OFF</span>
                </div>
            </div>
            <div className={`opcion ${selecciones[product.id] === (product.price * 0.2) ? 'seleccionada' : ''}`} onClick={()=> seleccionarGarantia(product.id, product.price * 0.01)}>
                <p>24 meses de Garantia extendida</p>
                <span>$ {(product.price * 0.2).toFixed(2)}</span>
            </div>
        </div>
            )
})}
        <div className="btn__garantia">
            <button className="no__garantia">No, gracias</button>
            <button className="agregar__garantia">Agregar</button>
        </div>
    </div>
    )
}