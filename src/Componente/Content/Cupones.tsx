import { CuponProps } from "../../Types";

interface CuponesProps {
    usado: string[];
    nombreCuponActivo: string;
    setNombreCuponActivo: (cupon: CuponProps) => void;
    cuponesValidos: CuponProps[];
}

export const Cupones = ({ usado, nombreCuponActivo, setNombreCuponActivo, cuponesValidos }: CuponesProps) => {

    return (
    <div className=''>
        <h2 className=''>Tus Cupones disponibles</h2>
        <div className=''>
            {cuponesValidos.map((cupon) => {
                const estaUsado = usado.includes(cupon.codigo);
                const estaActivo = nombreCuponActivo === cupon.codigo;
                return (
                    <div key={cupon.id } className={`${'cart'} ${estaActivo ? 'activo' : ''} ${estaUsado ? 'usado' : ''}`}>
                        <p>{cupon.codigo}</p>
                        <p>{cupon.desc}</p>
                        <div>
                            <button onClick={()=> !estaUsado && setNombreCuponActivo(cupon)} disabled={estaUsado || estaActivo} className=''>{estaUsado ? 'Usado' : estaActivo ? 'Activo' : 'Disponible'}</button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    )
}