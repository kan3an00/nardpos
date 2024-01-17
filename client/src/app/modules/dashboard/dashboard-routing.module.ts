import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { ProductCreateComponent } from './pages/product/product-create.component';
import { ProductEditComponent } from './pages/product/product-edit.component';
import { TransactionCreateComponent } from './pages/transaction/transaction-create.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products',
        children: [
          { path: '', component: ProductComponent },
          { path: 'create', component: ProductCreateComponent },
          { path: 'edit/:id', component: ProductEditComponent },
        ],
      },
      { path: 'transactions',
        children: [
          { path: '', component: TransactionComponent },
          { path: 'create', component: TransactionCreateComponent },
        ]
      },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
