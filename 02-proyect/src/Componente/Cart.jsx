import { Icon } from "@iconify/react/dist/iconify.js";
import { IrCupon } from "./page/IrCupon";
import { BarraEnvio } from "./BarraEnvio";
import { Btn__volver } from "./page/btn__volver";

export const Cart = ({ cart, removeFromCart, menosProduct, addToCart, totalItems, totalFinal, ahorro, descuento, subTotal, finalizarCompra, irAGarantia }) => {

    const metaEnvio = 200;

    return (
    <div className="container__cart">
        <div>
            <Btn__volver/>
        </div>
            {cart.length === 0 ? (
            <div className="cart__vacio">
                <p className="vacio__icon"><Icon icon="raphael:cart" width="42" height="42" /><strong>El Carrito Esta Vacio</strong></p>
                <p className="vacio__icon">Articulos que te interesaron</p>
            </div>
        ) : (
             <div className="producto__selecionado">
                <div className="cart__principal">
                <h2 className="cart__title">Carrito</h2>
                <div>
                    <BarraEnvio totalFinal={totalFinal}/>
                </div>
                <ul className="list__cart">
                    {cart.map(item => (
                        <li key={item.id}>
                            <div className="div__cart">
                                <div className="div__product">
                                    <span className="title__product">{item.title}</span>
                                    <button onClick={()=> removeFromCart(item.id)} title="eliminar producto" className="btn__borrar"><Icon icon="material-symbols:delete-outline" width="24" height="24" /></button>
                                </div>
                                <div className="container__btn">
                                    <span>(x{item.quantity})</span>
                                    <button className="btn__menMax" onClick={()=> menosProduct(item.id)}>-</button>
                                    <button className="btn__menMax" onClick={()=> addToCart(item)}>+</button>
                                    <span className="precio"><strong>${(item.price * item.quantity).toFixed(2)}</strong></span>
                                </div>    
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="precio__total">
                <div>
                    <div>
                        <h4>Productos ({totalItems})</h4>
                    </div>
                    <div className="envio">
                        <p>Envio ({totalItems})</p>
                        <p>
                            {totalFinal >= metaEnvio ? 'Gratis' : '$60.00'}
                        </p>
                    </div>
                    <div>
                        <IrCupon />
                    </div>
            {descuento > 0 ? (
                    <div>
                        <div className="total">
                            <h4 className="ahorro__1">Descuento</h4>
                            <span className="ahorro__1">$ {ahorro.toFixed(2)}</span>
                        </div>
                        <div className="total">
                            <span>Total</span>
                            <p className="p__total">$ {totalFinal.toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                <div>
                    <div className="total">
                        <span>Total</span>
                        <p className="p__total">$ {subTotal.toFixed(2)}</p>
                    </div>
                </div>
            )}
                </div>
                    <div className="continuar__compra">
                        <button className="btn__compra" onClick={irAGarantia}>Continuar Compra</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}