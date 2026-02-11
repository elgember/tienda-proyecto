import { useEffect, useState } from "react"
import { Btn__volver } from "./page/btn__volver"
import { useLocation, useNavigate } from "react-router-dom";

export const Direccion = ({ loading, setLoading, totalApagar, usuario }) => {

    //inicia el look aqui en la raiz del componente
    const navigate = useNavigate();

    const location = useLocation();

    const [error, setError] = useState('');

    //estado de la animacion sacudida del boton estando vacion los input
    const [shake, setShake] = useState(false);

    //se inicia en true si el usuario ya tiene una direccion guardado
    const [confirmado, setConfirmado] = useState(!!usuario?.direccion);

    //Rastear que input tiene el foco
    const [campoActivo, setCampoActivo] = useState('');

    const sugerencias = {
        name: ['Alexander', 'Luis', 'Pedro', 'Pepe', 'Gonzalo', 'Martin'], 
        firstName: ['Perez', 'Gomez', 'Hernandez', 'Gonzalez', 'Lopez'],
        lastName: ['Perez', 'Gomez', 'Hernandez', 'Gonzalez', 'Lopez']
    };
     

    //valores de vacios de informacion del usuario
    const datosVacio = { 
        name: '', firstName: '', lastName: '', email: '', direccion: '', telefono: '' 
    }

     //estado compartido para el formulario y guardado 
    const [datosCliente, setDatosCliente] = useState(() => {
        const guardado = localStorage.getItem('datos__confirmados');
        return guardado ? JSON.parse(guardado) : datosVacio;
    });

    //guaradar automaticamente cuando el usuario escribe
    useEffect(() => {
        localStorage.setItem('datos__confirmados', JSON.stringify(datosCliente));
    }, [datosCliente]);


    useEffect(() => {
        if(usuario) {
            setDatosCliente(prev => ({
                ...prev,
                name: usuario.name || '',
                firstName: usuario.firstName || '',
                lastName: usuario.lastName || ''
            }));
        }
    }, [usuario]);


    //para capturar el evento de escritura
    const datoNombre = (e) => {
        const { name, value } = e.target;
        setDatosCliente({ ...datosCliente, [name]: value });
    };

    const obtenerSugerencia = (nombreCampo) => {
        const valorActual = datosCliente[nombreCampo];
        const opciones = sugerencias[nombreCampo];

        if (!valorActual || !opciones) return

        return opciones.find(s => 
            s.toLowerCase().startsWith(valorActual.toLowerCase()) && s.toLowerCase() !== valorActual.toLowerCase()
        );
    }

    const sugerenciaActual = obtenerSugerencia(campoActivo);

    const enterKey = (e) => {
        if (e.key === 'Enter' && sugerenciaActual) {
            e.preventDefault(); // Evita que el formulario en envie accidentamente
            setDatosCliente({ ...datosCliente, [campoActivo]: sugerenciaActual })
        }
    };

    const formularioCompleto = 
        datosCliente.name.trim() !== '' && 
        datosCliente.firstName.trim() !== '' &&
        datosCliente.lastName.trim() !== '' &&
        datosCliente.direccion.trim() !== '';

    
    const precioParaPagar = location.state?.totalApagar || totalApagar;

    const cargarCompraFinal = () => {
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
            setLoading(null);
                //navega a la siguente pagina con los datos guardados
                navigate('/finalizarCompra', {
                    state: { cliente: datosCliente,
                            totalApagar: precioParaPagar 
                        }
                }); 
        }, 1000);
    };


if (confirmado && usuario?.direccion) {
    return (
        <section>
            <div>
                 <Btn__volver/>
            </div>
            <h2>Confirma tu direccion de envio</h2>
            <div>
                <div>
                    <p><strong>Entrega a:</strong> {usuario.name} {usuario.firstName} {usuario.lastName}</p>
                    <p><strong>Direccion:</strong> {usuario.direccion}</p>
                    <p><strong>Email</strong> {usuario.email}</p>
                    <p><strong>Telefono</strong> {usuario.telefono}</p>
                </div>
                <button onClick={() => setConfirmado(false)}>Modificar direccion</button>
            </div>
            <div>
                <button>
                    {loading ? 'procesando...' : 'Confirmar y pagar'}
                </button>
            </div>
        </section>
    );
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
                    <input className="nombre" value={datosCliente.name} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('name')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} type="text" name="name" id="ed" placeholder="Name" />
                    {campoActivo === 'name' && sugerenciaActual && ( <span><strong>{sugerenciaActual}</strong></span>)}
                </label>
            </div>
            <div className="envio__apellido">
                <label htmlFor="firstName" className="label">Primer Apellido
                    <input className="apellido" value={datosCliente.firstName} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('firstName')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} type="text" name="firstName" id="firtNombre" placeholder="Primer Apellido" />
                    {campoActivo === 'firstName' && sugerenciaActual && ( <span><strong>{sugerenciaActual}</strong></span>)}
                </label>
            </div>
            <div className="envio__apellido">
                <label htmlFor="lastName" className="label">Segundo Apellido
                    <input className="apellido" value={datosCliente.lastName} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('lastName')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} type="text" name="lastName" id="lastNombre" placeholder="Segundo Apellido" />
                    {campoActivo === 'lastName' && sugerenciaActual && ( <span><strong>{sugerenciaActual}</strong></span>)}
                </label>
            </div>
        </div>
        <div className="container__direccion">
            <label htmlFor="direccion">Direccion
                <input className="envio__direccion" type="text" value={datosCliente.direccion} onChange={datoNombre} onKeyDown={enterKey} name="direccion" id="direccion__usuario" placeholder="Tu Direccion" />
            </label>
        </div>
        <div className="container__numero">
                <label htmlFor="num">Telefono
                    <input type="number" name="telefono" value={datosCliente.telefono} onChange={datoNombre} onKeyDown={enterKey} id="num" placeholder="Numero de telefono" />
                </label>
        </div>
        <div className="container__boton">
            <button className={`guardar__direccion ${!formularioCompleto ? 'btn__desabilitado' : '' } ${shake ? 'shake-animation' : '' } `} onClick={cargarCompraFinal} >{loading ? 'cargando...' : 'Guardar Direccion'}</button>
        </div>
    </section>
    );
}