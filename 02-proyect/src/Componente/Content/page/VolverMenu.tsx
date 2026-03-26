import { Icon } from "@iconify/react";

interface VolverMenuProps {
    setVistaActual: (vista: string) => void;
}

export const VolverMenu = ({ setVistaActual }: VolverMenuProps) => {

    return (
    <div className='' onClick={()=> setVistaActual('menu')}> 
        <Icon icon="solar:arrow-left-linear" width="24" height="24" className=''/>
    </div>
    )
}