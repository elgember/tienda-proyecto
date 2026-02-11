import s from './MiCuenta.module.css';
import { useState } from "react";
import { Inicio } from './Content/Inicio';
import { Buscar } from './Content/Buscar';
import { Ayuda } from './Content/Ayuda';
import { Notificaciones } from './Content/Notificaciones';
import { MisCompras } from './Content/MisCompras';
import { MisOpiniones } from './Content/MisOpiniones';
import { Favoritos } from './Content/Favoritos';
import { Oferta } from './Content/Oferta';
import { Cupones } from './Content/Cupones';
import { SeguroGarantia } from './Content/SeguroGarantia';
import { Historial } from './Content/Historial';
import { MenuPrinciapal } from './MenuPrinciapal'
import { FormularioRegistro } from './FormularioRegistro';




export const MiCuenta = ({ registro, usuario }) => {

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
        return <FormularioRegistro registro={registro} setVistaActual={setVistaActual} />
}
    //logica de navegacion
    const renderContent = () => {
        switch (vistaActual) {
            case 'inicio' : return <Inicio />;
            case 'buscar' : return <Buscar/>;
            case 'notificaciones' : return <Notificaciones />;
            case 'ayuda' : return <Ayuda />;
            case 'misCompras' : return <MisCompras />;
            case 'misOpiniones' : return <MisOpiniones />
            case 'favoritos' : return <Favoritos />;
            case 'oferta' : return <Oferta />;
            case 'cupones' : return <Cupones />
            case 'seguroGarantia' : return <SeguroGarantia />
            case 'historial' : return <Historial />

            // caso de defecto: el menu de iconos
            default: return <MenuPrinciapal setVistaActual={setVistaActual} usuario={usuario} />
        }
    }

    return (
        <div className={s.conatainer__vista}>
            {vistaActual !== 'menu' && (
                <button onClick={()=> setVistaActual('menu')}>Volver a menu</button>
            )}
            {renderContent()}
        </div>
    )
}