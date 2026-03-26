import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Producto } from "../Types";

type garantiaSeleccionada = Record<number, { tipo: string; precio: number }>;

interface locationState {
    misProductos: Producto[];
}

interface ListaGarantiaProps {
    totalFinal: number;
    setLoading: (loading: string | null) => void;
    loading: string | null;
    selecciones: garantiaSeleccionada;
    setSelecciones: React.Dispatch<React.SetStateAction<garantiaSeleccionada>>;
    desvanecer: boolean;
    setDesvanecer: (desvanecer: boolean) => void;
    irDireccion: (total: number) => void;
}

export const ListaGarantia = ({ totalFinal, setLoading, loading, selecciones, setSelecciones, desvanecer, setDesvanecer, irDireccion }: ListaGarantiaProps) => {

    const location = useLocation();

    const state = location.state as locationState;

    const { misProductos } = state || { misProductos: [] };


    const [totalGarantia, setTotalGarantia] = useState(totalFinal);

    //Funcion para marcar la seleccion
    const seleccionarGarantia = (productId: number, precioExtra: number, tipoGarantia: string) => {
        setSelecciones(prev => {
            if (prev[productId]?.tipo === tipoGarantia) {
                const copia = {...prev};
                delete copia[productId];
                return copia;
            }
            //si no, guardamos la nueva seleccion
            return {
                ...prev,
                [productId]: { tipo: tipoGarantia, precio: precioExtra }
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
        return () => setLoading(null);
    }, [setLoading]);

    const cargarDireccion = (totalCalculo: number, nombreBoton: string)=> {
        if (loading) return;

        setLoading(nombreBoton); // activar la animacion

        setTimeout(() => {
            //iniciamo el desvanecimiento
            setDesvanecer(true);
        },500)

        setTimeout(() => {
            irDireccion(totalCalculo)
        },1000);
    };

    
    return (
    <div className=''>
        <div className={`garantia  ${desvanecer ? 'fade-out' : 'fade-in'}`}>
            <h2 className=''>Agrega una proteccion para este producto</h2>
        {misProductos.filter(product => product.price > 100).map((product) => {
            // se calculan los precios 
            const precio18 = product.price * 0.8;
            const precio24 = product.price * 0.9;

    return (
        <div key={product.id} className=''>
            <div className=''>
                <div className=''>
                    <img className='' src={product.image} alt={product.title} />
                </div>
                <div className=''>
                    <p className=''>proteccion para:</p>
                    <p className=''>{product.title}</p>
                </div>
            </div>
                                {/* Opcion de 12 meses garantia */}
            <div className={`opcion ${selecciones[product.id]?.tipo === '12' ? 'active' : ''}`} onClick={() => seleccionarGarantia(product.id, 50, '12')}>
                <p>12 meses de Garantia extendida</p>
                <span className=''>$ 50</span>
            </div>
                                {/* Opcion de 18 Meses garantia */}
            <div className={`opcion ${selecciones[product.id]?.tipo === '18' ? 'active' : ''}`} onClick={()=> seleccionarGarantia(product.id, precio18, '18')}>
                <p>18 meses de Garantia extendida</p>
                <div className=''>
                    <span className=''>$ {precio18.toFixed(2)}</span>
                    <span className=''>20% OFF</span>
                </div>
            </div>
                                {/* Opcion de 24 Meses garantia */}
            <div className={`opcion ${selecciones[product.id]?.tipo === '24' ? 'active' : ''}`} onClick={()=> seleccionarGarantia(product.id, precio24, '24')}>
                <p>24 meses de Garantia extendida</p>
                <div className=''>
                    <span className=''>$ {precio24.toFixed(2)}</span>
                    <span className=''>10% OFF</span>
                </div>
            </div>
        </div>
            )
})}
        </div>
        <div className=''>
            <button className={`garantia__aceptar no--garantia ${loading === 'no__gracias' ? 'btn__loading' : '' }`} onClick={()=> cargarDireccion(totalFinal, 'no__gracias')} disabled={loading !== null} > {loading === 'no__gracias' ? <div className="animation"></div> : `No, Gracias`}</button>
            <button className={`garantia__aceptar agregar--garantia ${loading === 'agregar' ? 'btn__loading' : '' } `} onClick={()=> cargarDireccion(totalGarantia, 'agregar')} disabled={loading !== null} >{loading === 'agregar' ? <div className="animation"></div> : `agregar` }</button>
            <div className=''>
                <p>Al agregar aceptas el envio del certificado de la garantia y los <a className='' href="#">Terminos de contratacion, cobertura, exclusiones.</a></p>
            </div>
        </div>
    </div>
    )
}