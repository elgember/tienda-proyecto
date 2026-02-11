import { Icon } from "@iconify/react/dist/iconify.js"

export const MiPerfil = () => {



    return (
    <section>
        <div>
            <Icon icon="gg:profile" width="24" height="26" />
            <h2>Nombre Usuario</h2>
            <p>correo usuario</p>
        </div>
        <div>
            <div>
                <Icon icon="mdi:account-outline" width="26" height="28" />
                <p>Informacion Cuenta</p>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    </section>
    )
}