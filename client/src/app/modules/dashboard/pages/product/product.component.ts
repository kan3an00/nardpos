import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AngularSvgIconModule,
    FormsModule,
  ],

})
export class ProductComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  products: any = [];
  search: any;
  minprice: any;
  maxprice: any;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Use params to fetch data based on URL query parameters
      this.search = params['search'];
      this.minprice = params['minPrice'];
      this.maxprice = params['maxPrice'];
      this.filter();
    });
  }

  format(created_at: any) {
    return new Date(created_at).toISOString().slice(0, 19).replace('T', ' ')
  }
  filter() {
    let queryParams: any = {};

    if (this.search) {
      queryParams.search = this.search;
    }
    if (this.minprice) {
      queryParams.minPrice = this.minprice;
    }
    if (this.maxprice) {
      queryParams.maxPrice = this.maxprice;
    }

    this.router.navigate(['/dashboard/products'], { queryParams: queryParams });

    // Fetch data based on the queryParams
    this.http.get('http://localhost:3000/products', { params: queryParams }).subscribe((res: any) => {
      this.products = res;
    });
  }
  deleteProduct(id: any) {
    this.http.delete('http://localhost:3000/products/' + id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
}
