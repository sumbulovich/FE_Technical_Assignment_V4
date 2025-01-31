import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home Page',
  },
  {
    path: ':category',
    loadComponent: () => import('./features/product-list/product-list.component').then(m => m.ProductListComponent),
  },
  {
    path: ':category/:productId',
    loadComponent: () => import('./features/product-view/product-view.component').then(m => m.ProductViewComponent),
  }
];
