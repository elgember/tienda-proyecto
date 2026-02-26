export const Realizadas = ({ opinion }) => {
    return (
    <div>
        <img src={opinion.imagen} alt={opinion.titulo} width='50' />
        <div>
            <h4>{opinion.titulo}</h4>
            <div>
                {[1,2,3,4,5].map(num => (
                    <span key={num} style={{ color: num <= opinion.estrella ? 'gold' : 'gray'}}>
                        ★
                    </span>
                ))}
            </div>
            <span>Calificado: {opinion.fecha}</span>
        </div>
    </div>
    )
}