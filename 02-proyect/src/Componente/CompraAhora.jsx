import { useState } from "react"
import { ListaGarantia } from "./ListaGarantia";

export const CompraAhora = ({ totalFinal, irDireccion, loading, setLoading }) => {

    //estado salida de animacion
    const [desvanecer, setDesvanecer] = useState(false);

    //Estado compartido para las garantias
    const [selecciones, setSeleciones] = useState({});

    return (
    <div className="wrapper__compra">
        <ListaGarantia selecciones={selecciones} setSelecciones={setSeleciones} desvanecer={desvanecer} setDesvanecer={setDesvanecer} loading={loading}  setLoading={setLoading} totalFinal={totalFinal} irDireccion={irDireccion} />
    </div>
    )
}