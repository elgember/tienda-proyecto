import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const CompraAhora = ({ totalFinal, product, irDireccion, setLoading, loading }) => {

    const location = useLocation();

    const [costoEnvio, setCostoEnvio] = useState(0);

    const { misProductos } = location.state || { misProductos: []};

    //estado para guardar la selecion { productoId: precioGarantia }
    const [selecciones, setSelecciones] = useState({});
    const [totalGarantia, setTotalGarantia] = useState(totalFinal);

    //Funcion para marcar la seleccion
    const seleccionarGarantia = (productId, precioExtra, tipoGarantia) => {
        setSelecciones(prev => {
            if (prev[productId]?.tipo === tipoGarantia) {
                const copia = {...prev};
                delete copia[productId];
                return copia;
            }
            //si no, guardamos la nueva seleccion
            return {
                ...prev,
                [productId]: { tipo: tipoGarantia, precio: parseFloat(precioExtra) }
            };
        });
    };


    //Recalcular el total cada vez que cambien las selecciones
    useEffect(() => {
        const extraGarantias = Object.values(selecciones).reduce((acc, g) => acc + g.precio, 0);
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


    const cargarDireccion = (total)=> {
        setLoading(true); // activar la animacion

        setTimeout(() => {
            irDireccion(total)
        },1500);
    };

    
    return (
    <div className="container__garantia">
        <h2 className="title__garantia">Agrega una proteccion para este producto</h2>
        {misProductos.filter(product => product.price > 100).map((product) => {
            // se calculan los precios 
            const precio18 = (product.price * 0.8);
            const precio24 = (product.price * 0.9);

    return (
        <div key={product.id} className="garantia">
            <div className="garantia__product">
                <div className="container__image">
                    <img className="image__garantia" src={product.image} alt={product.title} />
                </div>
                <div className="proteccion__product">
                    <p className="proteccion__para">proteccion para:</p>
                    <p className="proteccion__title">{product.title}</p>
                </div>
            </div>
                                {/* Opcion de 12 meses garantia */}
            <div className={`opcion ${selecciones[product.id]?.tipo === '12' ? 'active' : ''}`} onClick={() => seleccionarGarantia(product.id, 50, '12')}>
                <p>12 meses de Garantia extendida</p>
                <span className="garantia__precio">$ 50</span>
            </div>
                                {/* Opcion de 18 Meses garantia */}
            <div className={`opcion ${selecciones[product.id]?.tipo === '18' ? 'active' : ''}`} onClick={()=> seleccionarGarantia(product.id, precio18, '18')}>
                <p>18 meses de Garantia extendida</p>
                <div className="garantia__meses">
                    <span className="garantia__precio">$ {precio18.toFixed(2)}</span>
                    <span className="garantia__descuento">20% OFF</span>
                </div>
            </div>
                                {/* Opcion de 24 Meses garantia */}
            <div className={`opcion ${selecciones[product.id]?.tipo === '24' ? 'active' : ''}`} onClick={()=> seleccionarGarantia(product.id, precio24, '24')}>
                <p>24 meses de Garantia extendida</p>
                <div className="garantia__meses">
                    <span className="garantia__precio">$ {precio24.toFixed(2)}</span>
                    <span className="garantia__descuento">10% OFF</span>
                </div>
            </div>
        </div>
            )
})}
        <div className="btn__garantia">
            <button className={`garantia__aceptar no--garantia ${loading ? 'btn__loading' : '' }`} onClick={()=> irDireccion(totalFinal)} disabled={loading} >{loading ? <div className="animation"></div> : `No, Gracias`}</button>
            <button className={`garantia__aceptar agregar--garantia ${loading ? 'btn__loading' : '' } `} onClick={()=> cargarDireccion(totalGarantia)} disabled={loading} >{loading ? <div className="animation"></div> : `agregar` }</button>
            <div className="condiciones__garantia">
                <p>Al agregar aceptas el envio del certificado de la garantia y los <a className="terminos__condiciones" href="#">Terminos de contratacion, cobertura, exclusiones.</a></p>
            </div>
        </div>
    </div>
    )
}