import { Categoria } from './categoria.model';

export interface Producto {
    idProducto?: number;
    nombreProducto: string;
    descripcionProducto: string;
    precioProducto: number;
    existencia: number;
    createAt?: string;
    idCategoria?: Categoria; // ManyToOne mapping in backend
}
