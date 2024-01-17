import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-create',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './transaction-create.component.html',
})

export class TransactionCreateComponent implements OnInit {
  products: any = [];
  selectedProduct: any = {};
  quantity: any;
  selectedProducts: any = [];
  showErrorDialog: boolean = false;
  errorDialogMessage: string = '';

  constructor(private readonly _router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    initFlowbite();
    this.http.get('http://localhost:3000/products').subscribe((res: any) => {
      this.products = res;
    });
  }

  addProduct() {
    const productFound = this.products.find((p: any) => p.id === +this.selectedProduct);
    if (productFound) {
      this.selectedProducts.push({
        "product_id": productFound.id,
        "quantity": this.quantity,
        "product": productFound,
      });
      this.products = this.products.filter((p: any) => p.id !== +productFound.id);
      this.selectedProduct = null;
      this.quantity = null;
    }
  }

  removeProduct(id: any) {
    const productFound = this.selectedProducts.find((p: any) => p.product_id === +id);
    if (productFound) {
      this.selectedProducts = this.selectedProducts.filter((p: any) => p.product_id !== +id);
      this.products.push(productFound.product);
    }
  }

  onSubmit() {
    const products = this.selectedProducts.map((p: any) => ({ product_id: p.product_id, quantity: p.quantity }));

    this.http.post('http://localhost:3000/transactions', { products }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(
      (res: any) => {
        this._router.navigate(['/dashboard/transactions']);
      },
      (err: any) => {
        this.showErrorDialog = true;
        this.errorDialogMessage = err.error.message;
      }
    )
  }

}
