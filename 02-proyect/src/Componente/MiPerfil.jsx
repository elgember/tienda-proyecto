export const MiPerfil = () => {
    return (
    <section>
        <div>
            <label htmlFor="name">
                <input type="text"  placeholder="Nombre Completo"/>
            </label>
        </div>
        <div>
            <input type="text" placeholder="Email" />
        </div>
        <div>
            <input type="number" name="" id="" placeholder="Numero de telefon" />
        </div>
        <div>
            <input type="text" placeholder="Direccion" />
        </div>
        <div>
            <label htmlFor="re">Escribe alguna referencia de tu direccion</label>
            <input type="text" id="re" placeholder="Referencia" />
        </div>
        <div>
            <button>Guardar</button>
        </div>
    </section>
    )
}