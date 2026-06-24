import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Productos } from './components/productos/productos';
import { Categorias } from './components/categorias/categorias';
import { Archivos } from './components/archivos/archivos';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'productos', component: Productos },
    { path: 'categorias', component: Categorias },
    { path: 'archivos', component: Archivos }
];
