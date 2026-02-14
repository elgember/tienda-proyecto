import { Icon } from "@iconify/react/dist/iconify.js"
import { useNavigate } from "react-router-dom"

export const Btn__volver = () => {
    const navegate = useNavigate();
    
    return (
    <div className="container__volver">
        <button className="btn__volver" onClick={()=> navegate(-1)}>
            <Icon icon="solar:arrow-left-linear" width="24" height="24" className="arrow__volver"/> 
        </button>
    </div>
    )
}