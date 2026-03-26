export interface Producto {
    id: number;
    title: string;
    price: number; 
    description: string;
    category: string;
    image: string;
    quantity: number;
    rating: {
        rate: number;
        count: number;
    }
}

export interface CuponProps {
    id: number; 
    codigo: string;
    tipo: 'porcentaje' | 'fijo';
    valor: number;
    min: number;
    desc: string;
    categoria: string;
}

export interface Compra {
    id: string;
    fecha: string;
    items: Producto[];
    total: number;
    ahorro?: number;
    cupon?: string;
}

export interface Usuario {
    cart: Producto[];
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    direccion: string;
    telefono: string;
    apellido: string;
}

export interface Garantia {
    id: number;
    precio: number;
    productoId: number;
    precioExtra: number;
    tipoGarantia: string;
}

export interface Opinion {
    id: string;
    productoId: number;
    rating?: number;
    comentario: string;
    fecha: string;
    titulo: string;
    imagen: string;
}