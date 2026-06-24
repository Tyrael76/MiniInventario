import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];

  mostrarModal = false;
  productoActual: Producto = { nombreProducto: '', descripcionProducto: '', precioProducto: 0, existencia: 0 };
  modoEdicion = false;
  categoriaSeleccionadaId: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productoService.findAll().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  cargarCategorias(): void {
    this.categoriaService.findAll().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.productoActual = { nombreProducto: '', descripcionProducto: '', precioProducto: 0, existencia: 0 };
    this.categoriaSeleccionadaId = 0;
    this.mostrarModal = true;
  }

  abrirModalEditar(producto: Producto): void {
    this.modoEdicion = true;
    this.productoActual = { ...producto };
    this.categoriaSeleccionadaId = producto.idCategoria?.idCategoria || 0;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarProducto(): void {
    if (this.categoriaSeleccionadaId > 0) {
      this.productoActual.idCategoria = { idCategoria: Number(this.categoriaSeleccionadaId), nombreCategoria: '', descripcionCategoria: '' };
    } else {
      this.productoActual.idCategoria = undefined;
    }

    if (this.modoEdicion && this.productoActual.idProducto) {
      this.productoService.update(this.productoActual.idProducto, this.productoActual).subscribe({
        next: () => {
          this.cargarProductos();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al editar', err)
      });
    } else {
      this.productoService.create(this.productoActual).subscribe({
        next: () => {
          this.cargarProductos();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  eliminarProducto(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.delete(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
