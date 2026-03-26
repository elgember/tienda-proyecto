import { Icon } from "@iconify/react"
import { Link, useLocation } from "react-router-dom"

interface IrToCartProps {
    totalItems: number;
}

export const IrToCart = ({ totalItems = 0 }: IrToCartProps) => {

    const location = useLocation();

    if (location.pathname === '/cart') {
        return null;
    }

    return (
    <div className='mx-4 sm:block hidden relative'>
        <Link className='' to='/cart'>
            <Icon icon="garden:shopping-cart-fill-12" width="22" height="22" />
                {totalItems > 0 && (
                    <span className='text-black font-bold absolute -top-4 -right-3'>{totalItems}</span>
                )}
        </Link>
    </div>
    )
}