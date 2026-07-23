import { Usuario } from '../Types';

interface FormularioRegistroProps {
    crear: (e: React.FormEvent<HTMLFormElement>) => void;
    registro: Usuario;
    setVistaActual: (vista: string) => void;
    setDatosForm: React.Dispatch<React.SetStateAction<Usuario>>;
}

export const FormularioRegistro = ({ crear, registro, setVistaActual, setDatosForm }: FormularioRegistroProps) => {

    const CambioDeEntrada = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDatosForm((prev: Usuario) => ({ ...prev,
            [name as keyof Usuario]: value 
        }));
    }

    return (
    <form className='m-6 mx-auto p-2' onSubmit={crear}>
        <fieldset className='border-2 border-gray-300 p-4 rounded-lg flex flex-col gap-4'>
            <legend>Crear Cuenta</legend>
            <input className='cuenta__input' name='name' type="text" placeholder="Nombre" onChange={CambioDeEntrada} />
            <input className='cuenta__input' name='firstName' type="text" placeholder="Primer apellido" onChange={CambioDeEntrada} />
            <input className='cuenta__input' name='lastName' type='text' placeholder="Segundo apellido" onChange={CambioDeEntrada} />
            <input className='cuenta__input' name='email' type="text" placeholder="Email" onChange={CambioDeEntrada} />
            <input className='cuenta__input' name='telefono' type="number" placeholder="Numero de telefono" onChange={CambioDeEntrada} />
            <input className='cuenta__input' name='direccion' type="text" placeholder="Direccion" onChange={CambioDeEntrada} />
            <button className='bg-blue-500 text-white px-4 py-2 rounded' type="submit">Guardar Datos</button>
        </fieldset>
    </form>
    )
}