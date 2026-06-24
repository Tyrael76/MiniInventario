import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Archivo } from '../models/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  private apiUrl = 'http://localhost:8085/apiArchivos/archivo';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Archivo[]> {
    return this.http.get<Archivo[]>(`${this.apiUrl}/lista`);
  }

  subirArchivo(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('archivo', file);
    return this.http.post(`${this.apiUrl}/subirArchivo`, formData);
  }

  descargarArchivo(id: number): void {
    window.open(`${this.apiUrl}/descargarArchivo/${id}`, '_blank');
  }
}
