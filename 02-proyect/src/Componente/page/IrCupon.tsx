import { Link, useLocation } from "react-router-dom";

export const IrCupon = () => {

    const { pathname } = useLocation();

    if (pathname === '/cupon') {
        return null;
    }

    return (
    <div>
        <Link to='/cupon' className=''>
            <p className=''>Ingresar codigo del cupon</p>
        </Link>
    </div>
    )
}