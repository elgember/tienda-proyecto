import { useEffect, useState } from "react"
import { Btn__volver } from "./page/btn__volver"
import { Navigate, useNavigate } from "react-router-dom";

export const Direccion = ({ loading, setLoading, irFinalizarCompra }) => {

    //inicia el look aqui en la raiz del componente
    const navigate = useNavigate();

     //estado compartido para el formulario
    const [datosCliente, setDatosCliente] = useState({ name: '', firstName: '', lastName: '', email: '', direccion: '', telefono: '' });

    //para capturar el evento de escritura
    const datoNombre = (e) => {
        const { name, value } = e.target;
        setDatosCliente({ ...datosCliente, [name]: value });
    };
   
    const cargarCompraFinal = (totaCalculo) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(true);
            // devaneceder
            setTimeout(() => {
                navigate('/finalizarCompra', {
                    state: { totalApagar: totaCalculo, Cliente: datosCliente}
                });
                setLoading(false);
            }, 500);
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
                <label htmlFor="name" className="label">Nombre Completo
                    <input className="nombre" value={datosCliente.name} onChange={datoNombre} type="text" name="name" id="ed" placeholder="Nombres" />
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
                <input className="envio__direccion" type="text" name="direccion__usuario" id="direccion" placeholder=" Tu Direccion" />
            </label>
        </div>
        <div className="contanedor__boton">
            <button className="guandar__direccion" onClick={(() => cargarCompraFinal)}>Guardar</button>
        </div>
    </section>
    )
}