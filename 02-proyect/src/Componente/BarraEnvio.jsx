export const BarraEnvio = ({ totalFinal }) => {

    const metaEnvio = 200;

    const valor = Number(totalFinal) || 0;

    //calculamos el porcentaje (maximo 100%)
    const porcentaje = Math.min((valor / metaEnvio) * 100, 100);

    //calculamos cuanto falta 
    const faltante = Math.max(metaEnvio - valor, 0);

    // colores de la barra envio 
    let colorBarra = 'rojo';
    if (porcentaje >= 100) {
        colorBarra = 'verde';
    }
    else if (porcentaje >= 50) {
        colorBarra = 'amarillo';
    }

    // colores del porcentaje envio
    let colorPorcentaje = 'colorRojo';
    if (porcentaje >= 100) {
        colorPorcentaje = 'colorVerde';
    }
    else if (porcentaje >= 50) {
        colorPorcentaje = 'colorAmarillo';
    }
    
    return (
    <div className="container__barra">
        <div className="barra">
            <h3 className="barra__envio">Envio Gratis</h3>
            <span className={`porcentaje__envio ${colorPorcentaje}`}>{Math.round(porcentaje)}%</span>
        </div>
        <div className="barra__fondo">
            <div className={`barra__color ${colorBarra}`} style={{width: `${porcentaje}%` }}></div>
        </div>
        <div>
            {totalFinal >= metaEnvio ? (
                <div className="container__envio">
                    <p className="env__desbloqueado">Envio Gratis Desbloqueado</p>
                </div>
            ) : (
                <p className="p__agregar">Agrega <span className="s__faltante">${faltante.toFixed(2)}</span> para no pagar envio</p>
            ) }
        </div>
    </div>
    );
};