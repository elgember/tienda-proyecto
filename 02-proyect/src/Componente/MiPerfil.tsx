import { Icon } from "@iconify/react"
import { Btn__volver } from "./page/Btn__volver";
import { Usuario } from "../Types";

export const MiPerfil = ({ usuario }: { usuario: Usuario }) => {

    return (
    <section className='relative p-10'>
            <div className="absolute top-2 left-2">
                <Btn__volver />
            </div>
        <div className=''>
            <div className="flex items-center gap-4 mb-4">
                <Icon icon="gg:profile" width="28" height="28" />
                <h2 className=''>{usuario.name} {usuario.firstName}</h2>
            </div>
            <div>
                <p className=''>{usuario.email}</p>
            </div>
        </div>
        <div>
            <div className='pt-2'>
                <p>hola</p>
            </div>
        </div>
    </section>
    )
}