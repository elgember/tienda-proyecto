import { Icon } from "@iconify/react/dist/iconify.js";
import { IrCupon } from "./page/IrCupon";
import { BarraEnvio } from "./BarraEnvio";
import { Btn__volver } from "./page/btn__volver";
import s from './Cart.module.css';

export const Cart = ({ cart, removeFromCart, menosProduct, addToCart, totalItems, totalFinal, ahorro, descuento, subTotal, irAGarantia, nombreCuponActivo }) => {

    const metaEnvio = 200;

    return (
    <div className={s.container__cart}>
    {/*boton volver a inicio */}
        <div className={s.volver__inicio}>
            <Btn__volver/>
        </div>
    {/* carrorito estando vacio */}
            {cart.length === 0 ? (
            <div className={s.cart__vacio}>
                <p className={s.vacio__icon}><Icon icon="raphael:cart" width="42" height="42" /><strong>El Carrito Esta Vacio</strong></p>
                <p className={s.vacio__icon}>Articulos que te interesaron</p>
            </div>
        ) : (          
    /* secion de los productos en el carrito */
             <div className={s.producto__selecionado}>
                <div className={s.cart__principal}>
                <h2 className={s.cart__title}>Carrito</h2>
        {/* barra porcentaje de envio gratis */}
                <div>
                    <BarraEnvio totalFinal={totalFinal}/>
                </div>
                <ul className={s.list__cart}>
                    {cart.map(item => (
                        <li key={item.id}>
                            <div className={s.div__cart}>
                                <div className={s.div__product}>
                                    <span className={s.title__product}>{item.title}</span>
                                    <button onClick={()=> removeFromCart(item.id)} title="eliminar producto" className={s.btn__borrar}><Icon icon="material-symbols:delete-outline" width="24" height="24" /></button>
                                </div>
                                <div className={s.container__btn}>
                                    <span>(x{item.quantity})</span>
                                    <button className={s.btn__menMax} onClick={()=> menosProduct(item.id)}>-</button>
                                    <button className={s.btn__menMax} onClick={()=> addToCart(item)}>+</button>
                                    <span className={s.precio}><strong>${(item.price * item.quantity).toFixed(2)}</strong></span>
                                </div>    
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
        {/* secion del contidad de productos, precio total, cupones, boton para continuar compra */}
                <div className={s.precio__total}>
                <div>
                    <div>
                        <h4>Productos ({totalItems})</h4>
                    </div>
                    <div className={s.envio}>
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
                        <div className={s.total}>
                            <h4 className={s.ahorro__1}>Descuento</h4>
                            <span className={s.ahorro__1}>$ {ahorro.toFixed(2)}</span>
                        </div>
                        <div className={s.total}>
                            <span>Total</span>
                            <p className={s.p__total}>$ {totalFinal.toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                <div>
                    <div className={s.total}>
                        <span>Total</span>
                        <p className={s.p__total}>$ {totalFinal.toFixed(2)}</p>
                    </div>
                    
                </div>
            )}
                </div>
                    <div className={s.continuar__compra}>
                        <button className={s.btn__compra} onClick={irAGarantia}>Continuar Compra</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}