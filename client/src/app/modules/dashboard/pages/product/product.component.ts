import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],

})
export class ProductComponent implements OnInit {
  constructor(private http: HttpClient) {}
  products: any = [];
  ngOnInit(): void {
    this.http.get('http://localhost:3000/products').subscribe((res: any) => {
      this.products = res;
      console.log(this.products)
    });
  }
}
