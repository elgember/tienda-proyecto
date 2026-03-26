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
    <form className='' onSubmit={crear}>
        <fieldset>
            <legend>Crear Cuenta</legend>
            <input name='name' type="text" placeholder="Nombre" onChange={CambioDeEntrada} />
            <input name='firstName' type="text" placeholder="Primer apellido" onChange={CambioDeEntrada} />
            <input name='lastName' type='text' placeholder="Segundo apellido" onChange={CambioDeEntrada} />
            <input name='email' type="text" placeholder="Email" onChange={CambioDeEntrada} />
            <input name='telefono' type="number" placeholder="Numero de telefono" onChange={CambioDeEntrada} />
            <input name='direccion' type="text" placeholder="Direccion" onChange={CambioDeEntrada} />
            <button type="submit">Guardar Datos</button>
        </fieldset>
    </form>
    )
}