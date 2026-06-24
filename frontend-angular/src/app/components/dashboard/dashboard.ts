import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    totalProductos = 0;
    totalCategorias = 0;

    constructor(
      private productoService: ProductoService,
      private categoriaService: CategoriaService
    ) {}

    ngOnInit(): void {
      this.cargarEstadisticas();
    }

    cargarEstadisticas(): void {
      this.productoService.findAll().subscribe({
        next: (productos) => this.totalProductos = productos.length,
        error: (err) => console.error('Error al cargar productos', err)
      });

      this.categoriaService.findAll().subscribe({
        next: (categorias) => this.totalCategorias = categorias.length,
        error: (err) => console.error('Error al cargar categorías', err)
      });
    }
}
