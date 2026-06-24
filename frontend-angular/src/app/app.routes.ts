import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Productos } from './components/productos/productos';
import { Categorias } from './components/categorias/categorias';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'productos', component: Productos },
    { path: 'categorias', component: Categorias }
];
