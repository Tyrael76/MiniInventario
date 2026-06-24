import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];

  mostrarModal = false;
  categoriaActual: Categoria = { nombreCategoria: '', descripcionCategoria: '' };
  modoEdicion = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.findAll().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  abrirModalNuevo(): void {
    this.modoEdicion = false;
    this.categoriaActual = { nombreCategoria: '', descripcionCategoria: '' };
    this.mostrarModal = true;
  }

  abrirModalEditar(categoria: Categoria): void {
    this.modoEdicion = true;
    this.categoriaActual = { ...categoria }; 
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarCategoria(): void {
    if (this.modoEdicion && this.categoriaActual.idCategoria) {
      this.categoriaService.update(this.categoriaActual.idCategoria, this.categoriaActual).subscribe({
        next: () => {
          this.cargarCategorias();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al editar', err)
      });
    } else {
      this.categoriaService.create(this.categoriaActual).subscribe({
        next: () => {
          this.cargarCategorias();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  eliminarCategoria(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.delete(id).subscribe({
        next: () => this.cargarCategorias(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
