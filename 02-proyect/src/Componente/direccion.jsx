import { useEffect, useState } from "react"
import { Btn__volver } from "./page/btn__volver"
import { useNavigate } from "react-router-dom";

export const Direccion = ({ loading, setLoading, totalFinal }) => {

    //inicia el look aqui en la raiz del componente
    const navigate = useNavigate();

    //estado de la animacion sacudida del boton estando vacion los input
    const [shake, setShake] = useState(false);

     //estado compartido para el formulario y guardado 
    const [datosCliente, setDatosCliente] = useState(() => {
        const guardado = localStorage.getItem('datos__confirmados');
        return guardado ? JSON.parse(guardado) : { name: '', firstName: '', lastName: '', email: '', direccion: '', telefono: '' };
    });

    //guaradar automaticamente cuando el usuario escribe
    useEffect(() => {
        localStorage.setItem('datos__confirmados', JSON.stringify(datosCliente));
    }, [datosCliente]);

    //para capturar el evento de escritura
    const datoNombre = (e) => {
        const { name, value } = e.target;
        setDatosCliente({ ...datosCliente, [name]: value });
    };


    const formularioCompleto = 
        datosCliente.name.trim() !== '' && 
        datosCliente.firstName.trim() !== '' &&
        datosCliente.lastName.trim() !== '' &&
        datosCliente.direccion.trim() !== '';


    const cargarCompraFinal = (totaCalculo) => {
        //cuando el usuario intente guardar estando vacio los input 
        if (!formularioCompleto) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            alert('por favor, rellene todos los campos antes de guardar');
            return;
        }

        setLoading(true);

        localStorage.setItem('datosConfirmados', JSON.stringify(datosCliente));

        setTimeout(() => {
            setLoading(false);
            // devaneceder
            setTimeout(() => {
                setLoading(false);

                //navega a la siguente pagina con los datos guardados
                navigate('/finalizarCompra', {
                    state: { Cliente: datosCliente,
                            totalFinal: totalApagar,
                    }
                });
            });
        }, 1000);
    } 

    return (
    <section className="section__envio">
        <div className="volver">
            <Btn__volver/>
        </div>
        <div className="section__title">
            <h2 className="envio__title">direcion de envio</h2>
        </div>
        <div className="envio__informacion">
            <div className="envio__nombre envio__apellido">
                <label htmlFor="name" className="label">En caso de tener dos ambos nombres
                    <input className="nombre" value={datosCliente.name} onChange={datoNombre} type="text" name="name" id="ed" placeholder="Name" />
                </label>
            </div>
            <div className="envio__apellido">
                <label htmlFor="firtName" className="label">Primer Apellido
                    <input className="apellido" value={datosCliente.firstName} onChange={datoNombre} type="text" name="firstName" id="firtNombre" placeholder="Primer Apellido" />
                </label>
            </div>
            <div className="envio__apellido">
                <label htmlFor="lastName" className="label">Segundo Apellido
                    <input className="apellido" value={datosCliente.lastName} onChange={datoNombre} type="text" name="lastName" id="lastNombre" placeholder="Segundo Apellido" />
                </label>
            </div>
        </div>
        <div className="contenedor__direccion">
            <label htmlFor="direccion">Direccion
                <input className="envio__direccion" type="text" value={datosCliente.direccion} onChange={datoNombre} name="direccion" id="direccion__usuario" placeholder="Tu Direccion" />
            </label>
        </div>
        <div className="contanedor__boton">
            <button className={`guardar__direccion ${!formularioCompleto ? 'btn__desabilitado' : '' } ${shake ? 'shake-animation' : '' } `} onClick={(() => cargarCompraFinal(totalFinal))} >{loading ? 'cargando...' : 'Guardar'}</button>
        </div>
    </section>
    )
}