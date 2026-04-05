import { use, useRef, useState } from "react";

export const Notificaciones = () => {

    const [activeTab, setActiveTab] = useState<'local' | 'global'>('local');

    // referencias para cada secion de NOTIFICACIONES local y global
    const containerRef = useRef<HTMLDivElement>(null);
    const localRef = useRef<HTMLDivElement>(null);
    const globalRef = useRef<HTMLDivElement>(null);

    // funcion para el scroll suave a la seccion de notificaciones local
    const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>, tab: 'local' | 'global') => {
        if (elementRef.current && elementRef.current) {
            setActiveTab(tab);

            elementRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    };

    // datos de ejemplo para las notificaciones locales
    const promociones = [
        {id: 1,
            title: 'Oferta Relampago',
            description: 'Aprovecha esta oferta por tiempo limitado en ropa de verano. ¡Descuentos de hasta el 50% en prendas seleccionadas!', 
            time: 'hace 5 min',
            read: false,
            icon: '🩱'
        },
        {id: 2,
            title: 'Cupon disponible',
            description: 'Tienes un cupon de descuento del 20% para tu proxima compra en calzado.',
            time: 'hace 1 hora',
            read: false,
            icon: '👟'
        },
        {id: 3,
            title: 'Envio gratis',
            description: 'Aprovecha envios gratis en toda las categorias durante este fin de semana.',
            time: 'hace 3 horas',
            read: true,
            icon: '🚚'
        }
    ];

    return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50 overflow-hidden flex flex-col py-8">
        <nav className="sticky top-0 w-full z-10 border-b border-gray-200 flex">
            <button type="button" className={`flex-1 py-4 text-center ${activeTab === 'local' ? 'text-blue-500 border-b-2 border-b-blue-500' : ''}`} onClick={() => scrollToSection(localRef, 'local')}>Notificaciones</button>
            <button type="button" className={`flex-1 py-4 text-center ${activeTab === 'global' ? 'text-blue-500 border-b-2 border-b-blue-500' : ''}`} onClick={() => scrollToSection(globalRef, 'global')}>Notificaciones Seguidos</button>
        </nav>
        <div className="flex overflow-x-hidden snap-x snap-mandatory flex-1" ref={containerRef}>
            <section className="w-full flex-shrink-0 snap-start" ref={localRef}>
                <div className="m-4">
                    {promociones.length > 0 ? (
                        promociones.map((promo) => (
                            <div key={promo.id} className={`p-4 mb-4 rounded-lg ${promo.read ? 'bg-gray-200' : 'bg-white'} shadow`}>
                                <span className="text-2xl">{promo.icon}</span>
                                <div className="flex items-center">
                                    <h3 className={`text-lg font-semibold ${promo.read ? 'text-gray-700' : 'text-blue-900'}`}>{promo.title}</h3>
                                    {!promo.read && <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>}
                                </div>
                                <p className="text-sm text-gray-600">{promo.description}</p>
                                <span className="text-xs text-gray-400">{promo.time}</span>
                            </div>
                        ))
                    ) : (
                        <p>No tienes notificaciones locales</p>
                    )}
                </div>
            </section>
            <section className="w-full flex-shrink-0 snap-start" ref={globalRef}>
                <div className="m-4">
                    <h2>No tienes notificaciones globales</h2>
                </div>
            </section>
        </div>
    </div>
    )
}