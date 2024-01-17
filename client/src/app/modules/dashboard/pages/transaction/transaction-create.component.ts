import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-transaction-create',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,

  ],
  templateUrl: './transaction-create.component.html',
})

export class TransactionCreateComponent implements OnInit {
  products: any = [];
  constructor(private readonly _router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    initFlowbite();
    this.http.get('http://localhost:3000/products').subscribe((res: any) => {
      this.products = res;
    });
  }

  onSubmit() {
    const products = this.products;
    // const productsMapped = products.map((product: any) => {product_id: product.id, quantity: 1});
    this.http.post('http://localhost:3000/transactions', { products }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(
      (res: any) => {
        this._router.navigate(['/dashboard/products']);
      }
    )
  }

}
