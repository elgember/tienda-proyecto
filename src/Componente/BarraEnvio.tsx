
interface BarraEnvioProps {
    totalFinal: number;
}

export const BarraEnvio = ({ totalFinal }: BarraEnvioProps) => {

    const metaEnvio = 200;

    const valor = Number(totalFinal) || 0;

    //calculamos el porcentaje (maximo 100%)
    const porcentaje = Math.min((valor / metaEnvio) * 100, 100);

    //calculamos cuanto falta 
    const faltante = Math.max(metaEnvio - valor, 0);

    // colores de la barra envio 
    let colorBarra = 'bg-red-500';
    if (porcentaje >= 100) {
        colorBarra = 'bg-green-500';
    }
    else if (porcentaje >= 50) {
        colorBarra = 'bg-yellow-500';
    }

    // colores del porcentaje envio
    let colorPorcentaje = 'text-red-500';
    if (porcentaje >= 100) {
        colorPorcentaje = 'text-green-500';
    }
    else if (porcentaje >= 50) {
        colorPorcentaje = 'text-yellow-500';
    }
    
    return (
    <div className=''>
        <div className=''>
            <h3 className=''>Envio Gratis</h3>
            <span className={`font-bold ${colorPorcentaje}`}>{Math.round(porcentaje)}%</span>
        </div>
        <div className='w-full h-4 bg-gray-300 rounded-full overflow-hidden'>
            <div className={`h-full transition-all duration-100 ${colorBarra}`} style={{width: `${Math.min(porcentaje, 100)}%` }}></div>
        </div>
        <div>
            {totalFinal >= metaEnvio ? (
                <div className=''>
                    <p className=''>Envio Gratis Desbloqueado</p>
                </div>
            ) : (
                <p className='text-sm'>Agrega <span className=''>${faltante.toFixed(2)}</span> para no pagar envio</p>
            ) }
        </div>
    </div>
    );
};