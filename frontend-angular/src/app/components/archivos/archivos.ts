import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivoService } from '../../services/archivo.service';
import { Archivo } from '../../models/archivo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-archivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './archivos.html'
})
export class Archivos implements OnInit {
  archivos: Archivo[] = [];
  archivoSeleccionado: File | null = null;
  cargando = false;

  constructor(private archivoService: ArchivoService) {}

  ngOnInit(): void {
    this.cargarArchivos();
  }

  cargarArchivos(): void {
    this.archivoService.findAll().subscribe({
      next: (data) => this.archivos = data,
      error: (err) => console.error('Error al cargar archivos', err)
    });
  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirArchivo(): void {
    if (this.archivoSeleccionado) {
      this.cargando = true;
      this.archivoService.subirArchivo(this.archivoSeleccionado).subscribe({
        next: () => {
          this.archivoSeleccionado = null;
          this.cargando = false;
          // Reseteamos el input del file
          const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          this.cargarArchivos();
        },
        error: (err) => {
          console.error('Error al subir archivo', err);
          this.cargando = false;
        }
      });
    }
  }

  descargar(id: number | undefined): void {
    if (id) {
      this.archivoService.descargarArchivo(id);
    }
  }
}
