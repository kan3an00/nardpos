import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './transaction.component.html'
})
export class TransactionComponent {
  constructor(private http: HttpClient) {}
  transactions: any = [];
  ngOnInit(): void {
    this.http.get('http://localhost:3000/transactions').subscribe((res: any) => {
      this.transactions = res;
    });
  }
  format(created_at: any) {
    return new Date(created_at).toISOString().slice(0, 19).replace('T', ' ')
  }
}
