import { Icon } from "@iconify/react/dist/iconify.js"
import { useNavigate } from "react-router-dom"

export const Btn__volver = () => {
    const navegate = useNavigate();
    
    return (
    <div className="container__volver">
        <button className="btn__volver" onClick={()=> navegate(-1)}>
            <Icon icon="ion:arrow-back" className="arrow__volver"/> 
        </button>
    </div>
    )
}