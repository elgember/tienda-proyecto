import { useState } from "react";
import { ListaGarantia } from "./ListaGarantia";
import { useLocation } from "react-router-dom";

interface CompraAhoraProps {
    totalFinal: number;
    irDireccion: (total: number) => void;
    loading: string | null;
    setLoading: (value: string | null) => void;
}

export const CompraAhora = ({ totalFinal, irDireccion, loading, setLoading }: CompraAhoraProps) => {

    const location = useLocation();

    //estado salida de animacion
    const [desvanecer, setDesvanecer] = useState<boolean>(false);

    //Estado compartido para las garantias
    const [selecciones, setSeleciones] = useState<{ [key: number]: boolean }>({});

    return (
    <div className=''>
        <ListaGarantia selecciones={selecciones} setSelecciones={setSeleciones} desvanecer={desvanecer} setDesvanecer={setDesvanecer} loading={loading}  setLoading={setLoading} totalFinal={totalFinal} irDireccion={irDireccion} />
    </div>
    )
}