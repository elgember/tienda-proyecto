import { useEffect, useState } from 'react'
import { ProductList } from './Componente/ProductList';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Cart } from './Componente/Cart';
import { Cupon } from './Componente/Cupon';
import { BarraEnvio } from './Componente/BarraEnvio';
import { ProductDetalles } from './Componente/ProductDetalles';
import { HistorialCupon } from './Componente/HistorialCupon';
import { CompraAhora } from './Componente/CompraAhora';
import { Direccion } from './Componente/Direccion';
import { FinalizarCompra } from './Componente/FinalizarCompra';
import { PagoExito } from './Componente/PagoExito';
import { MenuBarra } from './Componente/MenuBarra';
import { MiCuenta } from './Componente/MiCuenta';
import { MiPerfil } from './Componente/MiPerfil';
import { Buscar } from './Componente/Buscar';
import { Favoritos } from './Componente/Content/Favoritos';
import { Categoria } from './Componente/BarraMenu/Categoria';
import { BarraMenuPrincipal } from './Componente/page/BarraMenuPrincipal';
import { Producto, CuponProps, Compra, Usuario, Opinion } from './Types';


function App() {

  // para navegara a garantia 
  const navigate = useNavigate();

  //para guarada los producto 
  const [products, setProducts] = useState<Producto[]>([]);

  //estado para controlar que ver 'menu', compra, favoritos
    const [vistaActual, setVistaActual] = useState('menu');

  //estado cargando al entrar paginas 
  const [loading, setLoading] = useState<string | null>(null);

   const [cerra, setCerrar] = useState<boolean>(true);

   // cupones activos
  const [nombreCuponActivo, setNombreCuponActivo] = useState<CuponProps | null>(null);


  // cupones validos
const cuponesValidos = [
  {id: 1, codigo: 'BIENVENIDO10', tipo: 'porcentaje', valor: 10, categoria: 'todas', min: 300, desc: '10% de descuento en tu primera compra sin monto minimo' },
  {id: 2, codigo: 'VERANO15', tipo: 'porcentaje', valor: 15, categoria: 'electronics', min: 500, desc: '15% de descuento en tu compra de verano' },
  {id: 3, codigo: 'OFERTA200', tipo: 'fijo', valor: 200, categoria: 'todas', min: 500, desc: '200 de descuento en tu compra' },
  {id: 4, codigo: 'GAMER20', tipo: 'porcentaje', valor: 20, categoria: 'gaming', min: 300, desc: '20% de descuento en productos de gaming' }
];


    // estado de lectura de memoria guardado
  const [cart, setCart] = useState<Producto[]>(() => {
    const guardadoCart = localStorage.getItem('carrito__compras');
    return guardadoCart ? JSON.parse(guardadoCart) : [];
  });

    //efecto para guardar cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito__compras', JSON.stringify(cart));
  }, [cart]);

    //guardar favorito
  const [favorito, setFavorito] = useState<Producto[]>(() => {
    const favoriteData = localStorage.getItem('mis__favoritos');
    return favoriteData ? JSON.parse(favoriteData) : [];
  });

  //guardar favorito en cuanto cambie
  useEffect(() => {
    localStorage.setItem('mis__favoritos', JSON.stringify(favorito));
  }, [favorito]);


  //funcion para alterna para (quitar/dar) me gusta
  const toggleFavorito = (products: Producto) => {
    const meGusta = favorito.find(item => item.id === products.id);
    if (meGusta) {
      //si ya esta, lo quitamos
      setFavorito(favorito.filter(item => item.id !== products.id));
    } else {
      setFavorito([...favorito, products]);
    }
  } 

      // descuento y guadado del decuento
  const [descuento, setDescuento] = useState(()=> {

    const guardado = localStorage.getItem('descuento');
    return guardado ? JSON.parse(guardado) : 0;
  });

  useEffect(()=> {
    localStorage.setItem('descuento', JSON.stringify(descuento));
  },[descuento]); 


  //estado global del usuario datos 
  const [usuario, setUsuario] = useState(() => {
    const Guardar = localStorage.getItem('datos__usuario');
    return Guardar? JSON.parse(Guardar) : null;
  });

  //funcion para guardar los datos desde cualquier componente
  const guardarCuenta = (datos: Usuario) => {
    setUsuario(datos);
    localStorage.setItem('datos__usuario', JSON.stringify(datos));
  }


  // cupones usados y guadados 
  const [usado, setUsado] = useState<CuponProps[]>(() => {
    const guardadoCupon = localStorage.getItem('cupones_usados');
    return guardadoCupon ? JSON.parse(guardadoCupon) : [];
  });

useEffect(() => {
  localStorage.setItem('cupones_usados', JSON.stringify(usado));
},[usado]);


// area de guardar las compras realizadas
const [misCompras, setMisCompras] = useState<Compra[]>(() => {
  const compraData = localStorage.getItem('mis__compras');
  return compraData ? JSON.parse(compraData) : [];
});

//asistir cambios 
useEffect(()=> {
  localStorage.setItem('mis__compras', JSON.stringify(misCompras));
}, [misCompras]);

const registrarCompra = (productos: Producto[], total: number) => {
  const nuevaCompra: Compra = {
    id: crypto.randomUUID(), //genera un id unico
    fecha: new Date().toLocaleString('es-MX'),    //fecha y hora actual
    items: [...productos], //los productos comprados
    total: total,
    ahorro: 0,
    cupon: typeof nombreCuponActivo === 'string' ? nombreCuponActivo : nombreCuponActivo?.codigo || 'ninguno'
  };
  setMisCompras((prevCompras) => [nuevaCompra, ...prevCompras]);  //la mas reciente primero
}


//Guardar busquedas relizadas el input
const [busquedaProducto, setBusquedaProducto] = useState(() => {
  const buscarData = localStorage.getItem('buscar__producto');
  return buscarData? JSON.parse(buscarData): [];
});

//guaeda los cambios en la busqueda
useEffect(() => {
  localStorage.setItem('buscar__producto', JSON.stringify(busquedaProducto));
}, [busquedaProducto]);

//guardamos busqueda sin repetir 
const agregarBusqueda = (termino: string) => {
  const terminoLimpio = termino.trim();
  if (!terminoLimpio) return;

  setBusquedaProducto((prev: string[]) => {
    const sinDuplicar = prev.filter(t => t.toLowerCase() !== terminoLimpio.toLowerCase());
    const nuevaBusqueda = [terminoLimpio, ...sinDuplicar];
    return nuevaBusqueda.slice(0,10);
  });
}


//array de guardado de opiniones realizadas
   const [misOpiniones, setMisOpiniones] = useState<Opinion[]>(() => {
    const opinioData = localStorage.getItem('mis__opiniones');
    return opinioData ? JSON.parse(opinioData) : [];
   });

   useEffect(() => {
    localStorage.setItem('mis__opiniones', JSON.stringify(misOpiniones));
   }, [misOpiniones]);

const guardarOpinion = (nuevaOpinion: Omit<Opinion, 'id' | 'fecha'>) => {
  const opinioConFecha = {
    ...nuevaOpinion,
    id: crypto.randomUUID(), //ID unico para cada opinion
    fecha: new Date().toLocaleDateString()
  };
  setMisOpiniones([opinioConFecha, ...misOpiniones]);
}


const eliminarCupon = () => {
  setUsado([]);
}

  useEffect(() => {
    async function fetchData() {
      setLoading('cargando__inicio');

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      }
      catch (error) {
        console.log('Hubo un error', error);
      }
      setLoading(null);
    }
    fetchData();
  },[]);


  const addToCart = (product: Producto): void => {
    
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
  };

  const removeCart = (id: number): void => {
    setCart(cart.filter(product => product.id !== id));
  };


          //se calcula subTotal para cart 
  const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

                //funcion para calculara el total a pagar 
                //calculo del ahorro real (basado en el cupon seleccionado)
  const calculoTotal = (): number => {
    if (!nombreCuponActivo) return 0;

    // Verificamos compra minima (200 pesos)
    if (subTotal < nombreCuponActivo.min) {
        return 0; //no aplica el descuento si no llega al minimo
    }

    const catCupon = nombreCuponActivo.categoria?.toLowerCase();

    if (catCupon === 'todas' || catCupon === 'todos') {
      return nombreCuponActivo.tipo === 'porcentaje' 
      ? subTotal * (nombreCuponActivo.valor / 100) : nombreCuponActivo.valor;
    } else {
      // Solo aplicamos el descuento a los productos de la categoria especifica
      const subTotalCatgoria = cart.filter(item => item.category.toLowerCase() === catCupon)
      .reduce((acc, item) => acc + (item.price * item.quantity), 0);

      return nombreCuponActivo.tipo === 'porcentaje' ? subTotalCatgoria * (nombreCuponActivo.valor / 100) : 0;  // 0 el valor fijo solo aplica
    }
  }

  const ahorro = calculoTotal();

  const enviar = (subTotal > 0 && (subTotal - ahorro) < 100) ? 60 : 0;

  // VARIABLE para el decuento aplicado
  const totalFinal = Math.max(0, subTotal - ahorro) + enviar;



    // funcion para eliminar un producto completo (sin importar la contidad)
  const removeFromCart = (id: number) => {
    // filtramos dame todos los item cuyo id no sea el que quiero borrar
    const newCart = cart.filter(product => product.id !== id);
    setCart(newCart);
  }


  const menosProduct = (id: number) => {
    // buscamos el producto en el carrito
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart && itemInCart.quantity > 1) {
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
        setNombreCuponActivo(null);
        alert('Solo aplica aun monto mayor $100');
      }
    },[subTotal, descuento]);
  

    const finalizarCompra = (productos: Producto[], total: number) => {
    //validacion de los cupones
    if (nombreCuponActivo) { 
     setUsado(prevUsado => [...prevUsado, nombreCuponActivo]);
      setDescuento(0);
    }
    registrarCompra(productos, total);

    setCart([]);
    setNombreCuponActivo(null);

    alert('Pago procesado con exito');
     navigate('/pagoExito');
  }


    //verificacion de aplica o no la garantia en los productos solo arriba de 100
    const irAGarantia = () => {
      if (cart.length === 0) return alert('Carrito esta vacio');

      const tieneGarantia = cart.some(product => product.price > 200);

      if (tieneGarantia) {
        navigate('/compraAhora', { state: { misProductos: cart,
          totalApagar: totalFinal
         }});
      } else {
        navigate('/direccion', { state: { misProductos: cart
          , totalApagar: totalFinal
         }});
      }
  };


  const garantia = () => {
    const tieneGarantia = cart.some(product => product.price > 100);

    if(tieneGarantia) {
      navigate('/compraAhora', { state: { misProductos: cart, totalApagar: totalFinal }});
    } else {
      finalizarCompra(cart, totalFinal);
    }
  }


  const irDireccion = () => {
    navigate('/direccion', { state: { misProductos: cart, totalApagar: totalFinal }});
  }

  return (
      <main className='h-full bg-[#eee] relative'>
        <Routes>
          <Route path='/' element={<Navigate to={'/inicio'} replace /> } />
          <Route path='/inicio' element={ <> <Buscar cart={cart} usuario={usuario} products={products} addToCart={addToCart} agregarBusqueda={agregarBusqueda} favorito={favorito} toggleFavorito={toggleFavorito} vistaActual={vistaActual} setVistaActual={setVistaActual} /> <ProductList products={products} addToCart={addToCart} toggleFavorito={toggleFavorito} favorito={favorito} /> </> } />
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} menosProduct={menosProduct} addToCart={addToCart} totalItems={totalItems} descuento={descuento} ahorro={ahorro} totalFinal={totalFinal} subTotal={subTotal} finalizarCompra={finalizarCompra} irAGarantia={irAGarantia} nombreCuponActivo={nombreCuponActivo?.codigo} /> } />
          <Route path='/cupon' element={<Cupon setDescuento={setDescuento} eliminarCupon={eliminarCupon} usado={usado} setUsado={setUsado} descuento={descuento} setNombreCuponActivo={setNombreCuponActivo} cuponesValidos={cuponesValidos} />}/>
          <Route path='/barraEnvio' element={<BarraEnvio totalFinal={totalFinal} />} />
          <Route path='/product/:id' element={<ProductDetalles products={products} addToCart={addToCart} setLoading={setLoading} garantia={garantia} />} />
          <Route path='/historialCupon' element={<HistorialCupon usado={usado} />} />
          <Route path='/compraAhora' element={<CompraAhora totalFinal={totalFinal} irDireccion={irDireccion} loading={loading} setLoading={setLoading} /> } />
          <Route path='/direccion' element={<Direccion usuario={usuario} setLoading={setLoading} loading={loading} /> } />
          <Route path='/finalizarCompra' element={<FinalizarCompra setCart={setCart} cart={cart} finalizarCompra={finalizarCompra} /> } />
          <Route path='/pagoExito' element={<PagoExito /> } />
          <Route path='/miCuenta' element={<MiCuenta vistaActual={vistaActual} setVistaActual={setVistaActual} products={products} registro={guardarCuenta} misCompras={misCompras} misOpiniones={misOpiniones} guardarOpinion={guardarOpinion} usuario={usuario} favorito={favorito} toggleFavorito={toggleFavorito}  addToCart={addToCart} usado={usado} nombreCuponActivo={nombreCuponActivo} setNombreCuponActivo={setNombreCuponActivo} cuponesValidos={cuponesValidos}  /> } />
          <Route path='/miPerfil' element={<MiPerfil usuario={usuario} /> } />
          <Route path='/favoritos' element={<Favoritos addToCart={addToCart} toggleFavorito={toggleFavorito} favorito={favorito} products={products} /> } />
          <Route path='/categoria' element={<Categoria products={products} favorito={favorito} toggleFavorito={toggleFavorito} addToCart={addToCart} /> } />
      </Routes>
        <MenuBarra totalItems={totalItems} favorito={favorito} />
      </main>
  )
}

export default App;
