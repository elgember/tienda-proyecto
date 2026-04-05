import { IrCupon } from "./page/IrCupon";
import { BarraEnvio } from "./BarraEnvio";
import { Btn__volver } from "./page/Btn__volver";
import { Producto } from "../Types";
import { Icon } from "@iconify/react";
import type React from "react";

interface CartProps {
    cart: Producto[];
    totalItems: number;
    totalFinal: number;
    ahorro: number;
    descuento: number;
    subTotal: number;
    nombreCuponActivo: string | null;
    //tipados de funciones
    removeFromCart: (id: number) => void;
    menosProduct: (id: number) => void;
    addToCart: (productos: Producto) => void;
    irAGarantia: () => void;
}

export const Cart: React.FC<CartProps> = ({ cart, removeFromCart, menosProduct, addToCart, totalItems, totalFinal, ahorro, descuento, subTotal, irAGarantia, nombreCuponActivo }) => {

    const metaEnvio = 200;

    return (
    <div className='relative p-4 py-10 max-w-7xl h-full mx-auto'>

    {/*boton volver a inicio */}
        <div className='absolute top-2 left-3'>
            <Btn__volver/>
        </div>
    
    {/* carrorito estando vacio */}
            {cart.length === 0 ? (
            <div className=''>
                <p className=''><Icon icon="raphael:cart" width="42" height="42" /><strong>El Carrito Esta Vacio</strong></p>
                <p className=''>Articulos que te interesaron</p>
            </div>
        ) : (    

    /* secion de los productos en el carrito */
             <div className='rounded-md p-4 w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white'>

    {/* contenedor de productos agregados  */}
            <div>
                <h2 className='text-center text-lg font-semibold'>Carrito</h2>
    {/* barra porcentaje de envio gratis */}

                <div>
                    <BarraEnvio totalFinal={totalFinal}/>
                </div>
                <ul className='md:border-b-0 mb-4 py-4 flex flex-col justify-between'>
                    {cart.map(item => (
                        <li key={item.id}>
                            <div className='py-2 border-b border-solid border-[#ccc] flex flex-col'>
                                <div className='flex justify-between items-center md:max-w-lg'>
                                    <span className=''>{item.title}</span>
                                    <button onClick={()=> removeFromCart(item.id)} title="eliminar producto" className='hover:scale-110 transition-transform ease-in-out mx-8'><Icon icon="material-symbols:delete-outline" width="24" height="24" /></button>
                                </div>

                        {/* cantidad de productos */}
                                <div className='m-2'>
                                    <span className="mr-2">(x{item.quantity})</span>
                                    <button className='border px-2 border-none shadow-md rounded-md mx-1 hover:scale-115 transition-transform ease-in-out' onClick={()=> menosProduct(item.id)}>-</button>
                                    <button className='border px-2 border-none shadow-md rounded-md mx-1 hover:scale-115 transition-transform ease-in-out' onClick={()=> addToCart(item)}>+</button>
                                    <span className='ml-2'><strong>${(item.price * item.quantity).toFixed(2)}</strong></span>
                                </div>    
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>

    {/* secion del contidad de productos, precio total, cupones, boton para continuar compra */}
                <div className='w-full md:p-10 md:m-6 h-max'>
                <div>
                    <div>
                        <h4>Productos ({totalItems})</h4>
                    </div>
                    <div className='flex justify-between my-4'>
                        <p>Envio ({totalItems})</p>
                        <p>
                            {totalFinal >= metaEnvio ? 'Gratis' : '$60.00'}
                        </p>
                    </div>

    {/* en caso activa cupones */}
                    <div>
                        <IrCupon />
                        {nombreCuponActivo && <p>Cupon Activo: {nombreCuponActivo}</p>}
                    </div>
            {descuento > 0 ? (
                    <div>
                        <div className='flex justify-between'>
                            <h4 className=''>Descuento</h4>
                            <span className=''>$ {ahorro.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between my-4'>
                            <span>Total</span>
                            <p className=''>$ {totalFinal.toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                <div>
                    <div className='flex justify-between my-4'>
                        <span>Total</span>
                        <p className=''> $ {totalFinal.toFixed(2)}</p>
                    </div>
                    
                </div>
            )}
                </div>
                    <div className='flex justify-center mt-10'>
                        <button className='bg-[#333] text-white p-3 rounded-md w-full cursor-pointer' onClick={irAGarantia}>Continuar Compra</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}