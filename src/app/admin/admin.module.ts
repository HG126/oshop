import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    SharedModule,
    RouterModule.forChild([
     {
        path : 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate : [AuthGuard, AdminAuthGuard] 
      },
      {
        path : 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate : [AuthGuard, AdminAuthGuard] 
      },
      {
        path : 'admin/products', 
        component: AdminProductsComponent, 
        canActivate : [AuthGuard, AdminAuthGuard] 
      },
      {
        path : 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate : [AuthGuard, AdminAuthGuard] 
      }
  ]),
]
})
export class AdminModule { }
