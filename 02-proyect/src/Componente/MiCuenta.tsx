import { useState } from "react";
import { Notificaciones } from './Content/Notificaciones';
import { MisCompras } from './Content/MisCompras';
import { MisOpiniones } from './Content/MisOpiniones';
import { Oferta } from './Content/Oferta';
import { Cupones } from './Content/Cupones';
import { SeguroGarantia } from './Content/SeguroGarantia';
import { Historial } from './Content/Historial';
import { MenuPrinciapal } from './MenuPrincipal'
import { FormularioRegistro } from './FormularioRegistro';
import { Icon } from '@iconify/react';
import { Usuario, Producto, CuponProps } from '../Types';


interface Opinion {
    compraId: string;
    productoId: number;
    opinion: string;
}

interface MiCuentaProps {
    registro: (datos: Usuario) => void;
    usuario: Usuario | null;
    favorito: Producto[];
    toggleFavorito: (producto: Producto) => void;
    addToCart: (producto: Producto) => void;
    misCompras: (productos: Producto[]) => void;
    usado: string[];
    nombreCuponActivo: CuponProps | null;
    setNombreCuponActivo: (cupon: CuponProps | null) => void;
    cuponesValidos: CuponProps[];
    misOpiniones: Opinion[];
    guardarOpinion: (nuevaOpinion: Opinion) => void;
    products: Producto[];
    vistaActual: string;
    setVistaActual: (vista: string) => void;
}


export const MiCuenta = ({ registro, usuario, favorito, toggleFavorito, addToCart , misCompras, usado, nombreCuponActivo, setNombreCuponActivo, cuponesValidos, misOpiniones, guardarOpinion, products, vistaActual, setVistaActual }: MiCuentaProps) => {


    const [datosForm, setDatosForm] = useState<Usuario>({
        name: '', firstName: '', lastName: '', email: '', telefono: '', direccion: '',});

    const crear = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registro(datosForm); //enviamos los datos al padre
        alert('Cuenta creada con exito');
    };

    if (!usuario){
        return <FormularioRegistro registro={registro} setVistaActual={setVistaActual} crear={crear}  setDatosForm={setDatosForm} />
}
    //logica de navegacion
    const renderContent = () => {
        switch (vistaActual) {
            case 'notificaciones' : return <Notificaciones />;
            case 'misCompras' : return <MisCompras misCompras={misCompras} />;
            case 'misOpiniones' : return <MisOpiniones misCompras={misCompras} misOpiniones={misOpiniones} guardarOpinion={guardarOpinion} />;
            case 'oferta' : return <Oferta products={products} addToCart={addToCart} />;
            case 'cupones' : return <Cupones usado={usado} nombreCuponActivo={nombreCuponActivo} setNombreCuponActivo={setNombreCuponActivo} cuponesValidos={cuponesValidos} />
            case 'seguroGarantia' : return <SeguroGarantia />
            case 'historial' : return <Historial  />
            case 'menu':
            // caso de defecto: el menu de iconos
            default: return <MenuPrinciapal setVistaActual={setVistaActual} usuario={usuario} />
        }
    }

    return (
        <div className='w-full'>
            {vistaActual !== 'menu' && vistaActual !== '' && (
                <button onClick={()=> setVistaActual('menu')} className=''><Icon icon="solar:arrow-left-linear" width="24" height="24" className='' /></button>
            )}
            <div className=''>
                {renderContent()}
            </div>
        </div>
    )
}