import { useLocation } from "react-router-dom"

export const Direccion = () => {
    const location = useLocation();

   
    return (
    <section className="section__envio">
        <h2 className="envio__title">direcion de envio</h2>
        <div className="envio__informacion">
            <label htmlFor="name">
                <input className="envio__nombre" type="text" name="nombres__usuario" id="ed" placeholder="Nombres" />
            </label>
            <label htmlFor="firtName">Primer Apellido
                <input className="envio__nombre" type="text" name="primer-apellido__usuario" id="firtName" placeholder="Primer Apellido" />
            </label>
            <label htmlFor="lastName">
                <input className="envio__nombre" type="text" name="segundoApellido" id="lastName" placeholder="Segundo Apellido" />
            </label>
        </div>
        <div>
            <label htmlFor="direccion">
                <input type="text" name="direccion__usuario" id="direccion" placeholder=" Tu Direccion" />
            </label>
        </div>
        <div>
            <button>Guardar</button>
        </div>
    </section>
    )
}