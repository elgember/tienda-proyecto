import { useEffect, useRef, useState,  } from "react"
import { HistorialCupon } from "./HistorialCupon";

export const Cupon = ({ setDescuento, eliminarCupon, usado, setUsado, setNombreCuponActivo }) => {

    const [mover, setMover] = useState(true);

    const [codigo, setCodigo] = useState('');

    const [mensaje, setMensaje] = useState('');

    const contentRet = useRef(null);

    const inputRet = useRef(null);

    useEffect(()=> {
        if(mensaje !== '') {
            const time = setTimeout(() => {
                setMensaje('');
            },2000);
            return () => clearTimeout(time);
        }
    },[mensaje]);

    // focos en el input al cargar cupon
    useEffect(() => {
        if (inputRet.current) {
            inputRet.current.focus();
        }
    },[]);


    const toggleAccordion = ()=> {
        setMover(!mover);
    }


    const aplicarCupon = () => {

        const codigoLimpio = codigo.trim().toUpperCase();

        const cuponesValidos = {
            'PROMO': 20,
            'OFERTA': 50,
            'OFERTON': 20,
            'PRO': 20,
            'OFER': 20
        }

        if(!cuponesValidos[codigoLimpio]) {
            setMensaje('Codigo no Valido');
            setDescuento(0);
            return;
        }
        if (usado.includes(codigoLimpio)) {
            setMensaje('Codigo ya fue Utilizado');
            return;
        }
    
    const valorDescuento = cuponesValidos[codigoLimpio];
    setDescuento(valorDescuento);
    setNombreCuponActivo(codigoLimpio);
    setUsado([...usado, codigoLimpio]);

    setMensaje(`Exito ${valorDescuento} % aplicado`);

    
    setCodigo('');

    }
    
    return (
    <section className="section">
        <div>
            <h3 className="title__cupones">Cupones</h3>
            <button onClick={eliminarCupon}>eliminar</button>
        </div>
           <div className={`acordion__container ${mover ? 'active' : ''}`}>
            <div className="acordion__header" onClick={toggleAccordion}>
                <span className="span__flecha">Ingresar codigo</span>
                <span className={`arrow__icon ${mover ? 'rotate' : ''}`}></span>
            </div>
            <div className="acordion__content" ref={contentRet} style={{maxHeight: mover ? `${contentRet.current?.scrollHeight}px` : '0px'}}>
                <div className="inner__padding">
                    <input type="text" className="text__cupon" ref={inputRet} value={codigo} onChange={(e) => setCodigo(e.target.value)}/>
                    <button className="btn__cupon" onClick={aplicarCupon}>Agregar cupon</button>
                    {mensaje && <p>{mensaje}</p>}
                </div>
            </div>
           </div>
           <HistorialCupon usado={usado} />
    </section>
    )
}