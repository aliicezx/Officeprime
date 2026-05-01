import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalog/catalog').then(m => m.CatalogComponent)
  },
  {
    path: 'produto/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetailComponent)
  },
  {
    path: 'carrinho',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent)
  },
  {
    path: 'checkout/sucesso',
    loadComponent: () => import('./pages/checkout-success/checkout-success').then(m => m.CheckoutSuccessComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'admin/produtos',
    loadComponent: () => import('./admin/products/products').then(m => m.ProductsComponent)
  },
  {
    path: 'admin/produtos/form',
    loadComponent: () => import('./admin/products/product-form/product-form').then(m => m.ProductFormComponent)
  },
  {
    path: 'admin/produtos/form/:id',
    loadComponent: () => import('./admin/products/product-form/product-form').then(m => m.ProductFormComponent)
  },
  {
    path: 'admin/pedidos',
    loadComponent: () => import('./admin/pedidos/pedidos').then(m => m.PedidosComponent)
  },
  {
    path: 'admin/clientes',
    loadComponent: () => import('./admin/clientes/clientes').then(m => m.ClientesComponent)
  },
  {
    path: 'admin/configuracoes',
    loadComponent: () => import('./admin/configuracoes/configuracoes').then(m => m.ConfiguracoesComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent)
  }
];
