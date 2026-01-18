import { useEffect, useState } from 'react'
import './App.css'
import { ProductList } from './Componente/ProductList';
import { IrToCart } from './Componente/page/IrToCart';
import { Routes, Route } from 'react-router-dom';
import { Cart } from './Componente/Cart';
import { Cupon } from './Componente/Cupon';
import { BarraEnvio } from './Componente/BarraEnvio';
import { ProductDetalles } from './Componente/ProductDetalles';
import { HistorialCupon } from './Componente/HistorialCupon';
import { CompraAhora } from './Componente/CompraAhora';


function App() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

   const [cerra, setCerrar] = useState(true);

    // estado de lectura de memoria
  const [cart, setCart] = useState(() => {
    const guardadoCart = localStorage.getItem('carrito__compras');
    return guardadoCart ? JSON.parse(guardadoCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito__compras', JSON.stringify(cart));
  }, [cart]);


      // descuento y guadado del decuento
  const [descuento, setDescuento] = useState(()=> {

    const guardado = localStorage.getItem('descuento');
    return guardado ? JSON.parse(guardado) : 0;
  });

  useEffect(()=> {
    localStorage.setItem('descuento', JSON.stringify(descuento));
  },[descuento]); 


  // cupones usados y guadados 
  const [usado, setUsado] = useState(() => {
    const guardadoCupon = localStorage.getItem('cupones_usados');
    return guardadoCupon ? JSON.parse(guardadoCupon) : [];
  });

useEffect(() => {
  localStorage.setItem('cupones_usados', JSON.stringify(usado));
},[usado]);

  const eliminarCupon = () => {
            setDescuento(0);
        }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      }
      catch (error) {
        console.log('Hubo un error', error);
      }
      setLoading(false);
    }
    fetchData();
  },[]);

  const addToCart = (product) => {
    
    // Buscamos si el producto ya esta en el carrito
    const itemInCart = cart.find(item => item.id === product.id);

    if (itemInCart) {
      //si ya existe actualizamos la contidad
      const newCart = cart.map(item => item.id === product.id ? {...item, quantity: item.quantity +1}
        : item //los demas quedan iguales
      );
      setCart(newCart);
    }
    else {
      //si es nuevo lo agrgamos con quantity: 1
      setCart([...cart, {...product, quantity: 1}]);
    }
  }

          //se calcula total 
  const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const ahorro = subTotal * ((descuento || 0) / 100);

  const totalFinal = subTotal - ahorro;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);


    // funcion para eliminar un producto completo (sin importar la contidad)
  const removeFromCart = (id) => {
    // filtramos dame todos los item cuyo id no sea el que quiero borrar
    const newCart = cart.filter(product => product.id !== id);
    setCart(newCart);
  }

  const menosProduct = (id) => {
    // buscamos el producto en el carrito
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart.quantity > 1) {
      const newCart = cart.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item);
      setCart(newCart);
    }
    else {
      removeFromCart(id);
    }
  };

    // condiciones de aplicacion del cupon

    useEffect(()=> {
      if (subTotal < 100 && descuento > 0) {
        setDescuento(0);
        setNombreCuponActivo('');
        alert('Solo aplica aun monto mayor $100');
      }
    },[subTotal, descuento]);
  
    const [nombreCuponActivo, setNombreCuponActivo] = useState('');

    const finalizarCompra = () => {
      if (cart.length === 0) return alert('Carrito esta vacio');

    if (nombreCuponActivo) {
      console.log('guardar cupon', nombreCuponActivo);
      setUsado([...usado, nombreCuponActivo]);
    }

    setCart([]);
    setDescuento(0);
    setNombreCuponActivo('');

    alert('Gracias por tu compra ! Tu pedido esta en proceso');
  };

  return (
      <main className='container'>
        <h1 className='title__principal'>Productos</h1>
        <Routes>
          <Route path='/' element={ <ProductList products={products} addToCart={addToCart} /> } />
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} menosProduct={menosProduct} addToCart={addToCart} totalItems={totalItems} descuento={descuento} ahorro={ahorro} totalFinal={totalFinal} subTotal={subTotal} finalizarCompra={finalizarCompra} /> } />
          <Route path='/cupon' element={<Cupon setDescuento={setDescuento} eliminarCupon={eliminarCupon} usado={usado} setUsado={setUsado} descuento={descuento} setNombreCuponActivo={setNombreCuponActivo} />}/>
          <Route path='/barraEnvio' element={<BarraEnvio totalFinal={totalFinal} />} />
          <Route path='/product/:id' element={<ProductDetalles products={products} addToCart={addToCart} setLoading={setLoading} />} />
          <Route path='/historialCupon' element={<HistorialCupon usado={usado} />} />
          <Route path='/compraAhora' element={<CompraAhora /> } />
        </Routes>
        <IrToCart cart={cart} totalItems={totalItems} totalFinal={totalFinal} />
      </main>
  )
}

export default App;
