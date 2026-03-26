import React, { useEffect, useRef, useState,  } from "react"
import { HistorialCupon } from "./HistorialCupon";
import { CuponProps } from "../Types";

interface PropsCupon {
    setDescuento: (valor: number) => void;
    eliminarCupon: () => void;
    usado: string[];
    setUsado: React.Dispatch<React.SetStateAction<string[]>>;
    setNombreCuponActivo: (cupon: CuponProps | null) => void;
    cuponesValidos: CuponProps[];
    descuento: number;
}

export const Cupon: React.FC<PropsCupon> = ({ setDescuento, eliminarCupon, usado, setUsado, setNombreCuponActivo, cuponesValidos }) => {

    const [mover, setMover] = useState(true);
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [height, setHeight] = useState<string | number>(0);

    const contentRet = useRef<HTMLDivElement>(null);
    const inputRet = useRef<HTMLInputElement>(null);

    //limpiar mensaje despues de mostrarlo
    useEffect(()=> {
        if(mensaje !== '') {
            const time = setTimeout(() => {
                setMensaje('');
            }, 2000);
            return () => clearTimeout(time);
        }
    },[mensaje]);

    // focos en el input al cargar cupon
    useEffect(() => {
        if (contentRet.current) {
            const altura = mover ? contentRet.current.scrollHeight : 0;
            setHeight(altura);
        }
    }, [mover, mensaje]);

    useEffect(() => {
        if (inputRet.current) {
            inputRet.current.focus();
        }
    }, []);

    //le dice a ts que un evento de teclado en el input, si es enter se aplica el cupon
    const manejarTecla = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            aplicarCupon();
        }
    };

    const toggleAccordion = ()=> {
        setMover(!mover);
    }


    const aplicarCupon = (): void => {
        const codigoLimpio = codigo.trim().toUpperCase();

        //buscar el objeto completo del cupon
        const cuponEncontrado = cuponesValidos.find(c => c.codigo === codigoLimpio);

        if(!cuponEncontrado) {
            setMensaje('Codigo no Valido');
            setDescuento(0);
            setNombreCuponActivo(null);
            return;
        }

        //Verificar si el cupon ya fue usado
        if (usado.includes(codigoLimpio)) {
            setMensaje('Codigo ya fue Utilizado');
            return;
        }
    
    // mandar el descuento al componente padre
    setNombreCuponActivo(cuponEncontrado);
    setDescuento(cuponEncontrado.valor);

    setUsado([...usado, cuponEncontrado.codigo]);

    setMensaje(`Exito: Cupon ${cuponEncontrado.codigo} aplicado`);

    setCodigo('');
    }
    
    return (
    <section className=''>
        <div>
            <h3 className=''>Cupones</h3>
            <button onClick={eliminarCupon}>eliminar</button>
        </div>
           <div className={`acordion__container ${mover ? 'active' : ''}`}>
            <div className='' onClick={toggleAccordion}>
                <span className=''>Ingresar codigo</span>
                <span className={`arrow__icon ${mover ? 'rotate' : ''}`}></span>
            </div>
            <div className='' ref={contentRet} style={{maxHeight: typeof height === 'number' ? `${height}px` : height, overflow: 'hidden', transition: 'max-height 0.3s ease'}}>
                <div className=''  >
                    <input type="text" className={''} ref={inputRet} value={codigo}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)}
                      onKeyDown={manejarTecla}/>
                    <button className='' onClick={aplicarCupon}>Agregar cupon</button>
                    {mensaje && <p>{mensaje}</p>}
                </div>
            </div>
           </div>
           <HistorialCupon usado={usado} />
    </section>
    )
}