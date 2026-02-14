import s  from '../Componente/FormularioRegistro.module.css';

export const FormularioRegistro = ({ crear, registro, setVistaActual }) => {
    return (
    <form className={s.container__profile} onSubmit={crear}>
        <fieldset>
            <legend>Crear Cuenta</legend>
            <input type="text" placeholder="Nombre" onChange={(e)=> setDatosForm({...datosForm, name: e.target.value})} />
            <input type="text" placeholder="Primer apellido" onChange={(e) => setDatosForm({...datosForm, firstName: e.target.value})} />
            <input type='text' placeholder="Segundo apellido" onChange={(e) => setDatosForm({...datosForm, lastName: e.target.value})} />
            <input type="text" placeholder="Email" onChange={(e) => setDatosForm({...datosForm, email: e.target.value})} />
            <input type="number" placeholder="Numero de telefono" onChange={(e)=> setDatosForm({...datosForm, telefon: e.target.value})} />
            <input type="text" placeholder="Direccion" onChange={(e)=> setDatosForm({...datosForm, direccion: e.target.value})}/>
            <button type="submit">Guardar Datos</button>
        </fieldset>
    </form>
    )
}