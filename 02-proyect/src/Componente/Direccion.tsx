import { useEffect, useState, type ChangeEvent } from "react"
import { Btn__volver } from "./page/Btn__volver.js"
import { useLocation, useNavigate } from "react-router-dom";
import { Usuario } from "../Types";


interface Datos {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    direccion: string;
    telefono: string;
}

interface DireccionProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    totalApagar: number;
    usuario: Usuario | null;
}

export const Direccion = ({ loading, setLoading, totalApagar, usuario }: DireccionProps) => {

    //inicia el look aqui en la raiz del componente
    const navigate = useNavigate();

    const location = useLocation();

    const [error, setError] = useState('');

    //estado de la animacion sacudida del boton estando vacion los input
    const [shake, setShake] = useState(false);

    //Rastear que input tiene el foco
    const [campoActivo, setCampoActivo] = useState<keyof Datos | ''>('');

    const sugerencias: Partial<Record<keyof Datos, string[]>> = {
        name: ['Alexander', 'Luis', 'Pedro', 'Pepe', 'Gonzalo', 'Martin'], 
        firstName: ['Perez', 'Gomez', 'Hernandez', 'Gonzalez', 'Lopez'],
        lastName: ['Perez', 'Gomez', 'Hernandez', 'Gonzalez', 'Lopez']
    };
     

    //valores de vacios de informacion del usuario
    const datosVacio: Datos = { 
        name: '', firstName: '', lastName: '', email: '', direccion: '', telefono: '' 
    }

     //estado compartido para el formulario y guardado 
    const [datosCliente, setDatosCliente] = useState<Datos>(() => {
        const guardado = localStorage.getItem('datos__confirmados');
        if (guardado) return JSON.parse(guardado);

        if (usuario) {
            return {
                ...datosVacio,
                name: usuario.name || '',
                firstName: usuario.firstName || '',
                lastName: usuario.lastName || '',
                direccion: usuario.direccion || '',
                telefono: usuario.telefono || ''
            };
        }
        return datosVacio;
    });

    //se inicia en true si el usuario ya tiene una direccion guardado
    const [confirmado, setConfirmado] = useState(!!datosCliente.direccion);


    //guaradar automaticamente cuando el usuario escribe
    useEffect(() => {
        localStorage.setItem('datos__confirmados', JSON.stringify(datosCliente));
    }, [datosCliente]);


    useEffect(() => {
        if(usuario) {
            setDatosCliente(prev => ({
                ...prev,
                name: prev.name || usuario.name || '',
                firstName: prev.firstName || usuario.firstName || '',
                lastName: prev.lastName || usuario.lastName || '',
                direccion: prev.direccion || usuario.direccion || '',
                
                telefono: prev.telefono || usuario.telefono || ''
            }));
        }
    }, [usuario]);


    //para capturar el evento de escritura
    const datoNombre = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'telefono') {
            const soloNumero = value.replace(/\D/g, '') // elimina cualquier cosa que no sea numero
            if (soloNumero.length <= 10) {
                setDatosCliente({ ...datosCliente, [name]: soloNumero });
            }
            return;
        }
        setDatosCliente({ ...datosCliente, [name]: value });
    };


    const obtenerSugerencia = (nombreCampo: string) => {
        const valorActual = datosCliente[nombreCampo as keyof Datos];
        const opciones = sugerencias[nombreCampo as keyof Datos];

        if (!valorActual || !opciones) return;

        return opciones.find(s => 
            s.toLowerCase().startsWith(valorActual.toLowerCase()) && s.toLowerCase() !== valorActual.toLowerCase()
        );
    }

    const sugerenciaActual = obtenerSugerencia(campoActivo);

    const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            //si hay sugerencia activa en el input la aplica primero
            if (sugerenciaActual && campoActivo) {
                e.preventDefault(); // Evita que el formulario en envie accidentamente
                setDatosCliente(prev => ({ ...prev, [campoActivo]: sugerenciaActual }));
            } else if (campoActivo === 'telefono' && formularioCompleto) {
                e.preventDefault();
                cargarCompraFinal();
            }
        }
    };

    const formularioCompleto = 
        datosCliente.name.trim() !== '' && 
        datosCliente.firstName.trim() !== '' &&
        datosCliente.lastName.trim() !== '' &&
        datosCliente.direccion.trim() !== '' &&    
        datosCliente.telefono.length >= 7; //validacion de longitud minima

    
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

        const datoParaEnviar = { ...datosCliente };

        setTimeout(() => {
            setLoading(false);

            localStorage.setItem('datos__confirmados', JSON.stringify(datoParaEnviar));

                //navega a la siguente pagina con los datos guardados
                navigate('/finalizarCompra', {
                    state: { cliente: datoParaEnviar,
                            totalApagar: precioParaPagar 
                        }
                }); 
        }, 1000);
    };


if (confirmado && datosCliente.direccion) {
    return (
        <section className="pb-6 mb-4">
            <div className="p-4">
                 <Btn__volver/>
            </div>
            <h2 className="text-center mb-5 font-bold text-2xl">Confirma tu direccion de envio</h2>
            <div>
                <div className="flex flex-col gap-2 mx-4">
                    <p><strong>Entrega a:</strong> {datosCliente.name} {datosCliente.firstName} {datosCliente.lastName}</p>
                    <p><strong>Direccion:</strong> {datosCliente.direccion}</p>
                    <p><strong>Telefono</strong> {datosCliente.telefono}</p>
                </div>
            </div>
            <div className="flex justify-center gap-4 my-10 mx-4">
                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setConfirmado(false)}>Modificar direccion</button>
                <button className="bg-[#48e] text-white py-2 px-12 rounded" onClick={cargarCompraFinal}> 
                    {loading ? 'procesando...' : 'Confirmar'}
                </button>
            </div>
        </section>
    );
}
    return (
        <section className='p-6 relative'>
        <div className='absolute top-4 left-4'>
            <Btn__volver/>
        </div>
        <div className=''>
            <h2 className='text-center mb-5 font-bold text-2xl'>Direccion de envio</h2>
        </div>
        <div className=''>
            <div className=''>
                <label htmlFor="name">En caso de tener dos (ambos nombres) <br />
                    <input className='input__direccion w-full' value={datosCliente.name} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('name')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} type="text" name="name" id="ed" placeholder="Name" />
                    {campoActivo === 'name' && sugerenciaActual && ( <span><strong>{sugerenciaActual}</strong></span>)}
                </label>
            </div>
            <div className='flex w-full gap-4 py-4'>
                <label htmlFor="firstName" className=''>Primer Apellido
                    <input className='input__direccion w-full' value={datosCliente.firstName} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('firstName')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} type="text" name="firstName" id="firtNombre" placeholder="Primer Apellido" />
                    {campoActivo === 'firstName' && sugerenciaActual && ( <span><strong>{sugerenciaActual}</strong></span>)}
                </label>
                <label htmlFor="lastName" className=''>Segundo Apellido
                    <input className='input__direccion w-full' value={datosCliente.lastName} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('lastName')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} type="text" name="lastName" id="lastNombre" placeholder="Segundo Apellido" />
                    {campoActivo === 'lastName' && sugerenciaActual && ( <span><strong>{sugerenciaActual}</strong></span>)}
                </label>
            </div>
        </div>
        <div className=''>
            <label htmlFor="direccion">Direccion
                <input className='input__direccion w-full' type="text" value={datosCliente.direccion} onChange={datoNombre} onKeyDown={enterKey} onFocus={()=> setCampoActivo('direccion')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} name="direccion" id="direccion__usuario" placeholder="Tu Direccion" />
            </label>
        </div>
        <div className=''>
                <label htmlFor="num">Telefono
                    <input className='input__direccion w-full' type="tel" name="telefono" value={datosCliente.telefono} onChange={datoNombre} onKeyDown={enterKey} id="num" onFocus={()=> setCampoActivo('telefono')} onBlur={()=> setTimeout(()=> setCampoActivo(''), 200)} placeholder="Numero de telefono" />
                </label>
        </div>
        <div className='text-center mt-10'>
            <button className={`bg-[#48e] text-white py-2 px-4 rounded-md ${!formularioCompleto ? 'btn__desabilitado' : '' } ${shake ? 'shake-animation' : '' } `} onClick={()=> cargarCompraFinal()} >{loading ? 'cargando...' : 'Guardar Direccion'}</button>
        </div>
    </section>
    );
}