import { Icon } from "@iconify/react"
import { Link, useLocation } from "react-router-dom"

export const IrToCart = ({ totalItems }) => {

    const location = useLocation();

    if (location.pathname === '/cart') {
        return null;
    }

    return (
    <div className="cart">
        <Link className="cart__to" to='/cart'>
            <Icon icon="garden:shopping-cart-fill-12" width="24" height="24" />
                {totalItems > 0 && (
                    <span className="cantidad__cart">{totalItems}</span>
                )}
        </Link>
    </div>
    )
}