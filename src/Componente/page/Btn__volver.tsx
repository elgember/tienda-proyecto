import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export const Btn__volver = () => {

    const navigate = useNavigate();
    
    return (
    <div className='hover:scale-110 transition-transform ease-in-out duration-200'>
        <button className='' onClick={()=> navigate(-1)} aria-label="Volver a la página anterior" type="button">         
            <Icon icon="solar:arrow-left-linear" width="24" height="24" className=''/> 
        </button>
    </div>
    )
}