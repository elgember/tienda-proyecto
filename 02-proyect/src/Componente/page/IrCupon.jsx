import { Link, useLocation } from "react-router-dom"

export const IrCupon = () => {

    const location = useLocation();

    if (location.pathname === '/cupon') {
        return null;
    }

    return (
    <div>
        <Link to={'/cupon'} className="link">
            <p className="cupon">Ingresar codigo del cupon</p>
        </Link>
    </div>
    )
}