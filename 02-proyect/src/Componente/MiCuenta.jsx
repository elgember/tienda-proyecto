import s from '../Componente/MiCuenta.module.css';
import { useState } from "react";
import { Ayuda } from './Content/Ayuda';
import { Notificaciones } from './Content/Notificaciones';
import { MisCompras } from './Content/MisCompras';
import { MisOpiniones } from './Content/MisOpiniones';
import { Oferta } from './Content/Oferta';
import { Cupones } from './Content/Cupones';
import { SeguroGarantia } from './Content/SeguroGarantia';
import { Historial } from './Content/Historial';
import { MenuPrinciapal } from './MenuPrinciapal'
import { FormularioRegistro } from './FormularioRegistro';
import { Icon } from '@iconify/react/dist/iconify.js';




export const MiCuenta = ({ registro, usuario, favorito, toggleFavorito, addToCart , misCompras }) => {

    //estado para controlar que ver 'menu', compra, favoritos
    const [vistaActual, setVistaActual] = useState('menu');

    const [datosForm, setDatosForm] = useState({
        name: '', firstName: '', lastName: '', email: '', telefon: '', direccion: '',  })

    const crear = (e) => {
        e.preventDefault();
        registro(datosForm); //enviamos los datos al padre
        alert('Cuenta creada con exito');
    };

    if (!usuario){
        return <FormularioRegistro registro={registro} setVistaActual={setVistaActual} crear={crear} />
}
    //logica de navegacion
    const renderContent = () => {
        switch (vistaActual) {
            case 'notificaciones' : return <Notificaciones />;
            case 'ayuda' : return <Ayuda usuario={usuario} setVistaActual={setVistaActual} />;
            case 'misCompras' : return <MisCompras misCompras={misCompras} />;
            case 'misOpiniones' : return <MisOpiniones />
            case 'oferta' : return <Oferta />;
            case 'cupones' : return <Cupones />
            case 'seguroGarantia' : return <SeguroGarantia />
            case 'historial' : return <Historial  />

            // caso de defecto: el menu de iconos
            default: return <MenuPrinciapal setVistaActual={setVistaActual} usuario={usuario} />
        }
    }

    return (
        <div className={s.container__vista}>
            {vistaActual !== 'menu' && (
                <button onClick={()=> setVistaActual('menu')} className={s.regresar__menu}><Icon icon="solar:arrow-left-linear" width="24" height="24" className={s.icon__menu} /></button>
            )}
            {renderContent()}
        </div>
    )
}