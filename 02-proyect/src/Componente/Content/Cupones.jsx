import s from './Cupones.module.css';


export const Cupones = ({ usado, nombreCuponActivo, setNombreCuponActivo, cuponesValidos }) => {

    return (
    <div className={s.container__cupones}>
        <h2 className={s.title__cupones}>Tus Cupones disponibles</h2>
        <div className={s.cupones__ticke}>
            {cuponesValidos.map((cupon) => {
                const estaUsado = usado.includes(cupon.codigo);
                const estaActivo = nombreCuponActivo === cupon.codigo;
                return (
                    <div key={cupon.id } className={`${s.cart} ${estaActivo ? s.activo : ''} ${estaUsado ? s.usado : ''}`}>
                        <p>{cupon.codigo}</p>
                        <p>{cupon.desc}</p>
                        <div>
                            <button onClick={()=> !estaUsado && setNombreCuponActivo(cupon)} disabled={estaUsado || estaActivo} className={s.boton}>{estaUsado ? 'Usado' : estaActivo ? 'Activo' : 'Disponible'}</button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    )
}