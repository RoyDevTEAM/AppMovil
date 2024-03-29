import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/components/home/home.component';
import { ProductListComponent } from './client/components/product-list/product-list.component';
import { CartComponent } from './client/components/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardAdminComponent } from './admin/components/dashboard-admin/dashboard-admin.component';
import { ManageCategoriesComponent } from './admin/components/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './admin/components/manage-products/manage-products.component';
import { ManageProvidersComponent } from './admin/components/manage-providers/manage-providers.component';
import { ManageRolesComponent } from './admin/components/manage-roles/manage-roles.component';
import { ManageSalesComponent } from './admin/components/manage-sales/manage-sales.component';
import { ManageUsersComponent } from './admin/components/manage-users/manage-users.component';
import { AdminGuard } from './core/guards/admin.guard';
import { CartGuard } from './core/guards/card.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: ' ', redirectTo: '/home' }, // Ruta por defecto
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent, canActivate: [CartGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: DashboardAdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/categories', component: ManageCategoriesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/products', component: ManageProductsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/providers', component: ManageProvidersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/roles', component: ManageRolesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/sales', component: ManageSalesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // Asegúrate de exportar RouterModule aquí
})
export class AppRoutingModule { }
