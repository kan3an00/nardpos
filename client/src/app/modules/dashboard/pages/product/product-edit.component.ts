import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  productId: string | null = null;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productId = this._route.snapshot.paramMap.get('id');

    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });

    this.fetchProductDetails(this.productId);
  }

  fetchProductDetails(productId: string | null): void {
    if (!productId) {
      this._router.navigate(['/dashboard/products']);
    }

    this.http.get(`http://localhost:3000/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(
      (res: any) => {
        const { name, price, quantity } = res;

        this.form.patchValue({
          name,
          price,
          quantity
        });
      }
    )
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    const { name, price, quantity } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.http.put(`http://localhost:3000/products/${this.productId}`, { name, price, quantity }, {
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
