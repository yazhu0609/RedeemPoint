import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading = true;
  error = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://function-1-6gjnjd5fqa-as.a.run.app/product')
      .subscribe({
        next: res => {
          this.products = res.data || [];
          this.loading = false;
        },
        error: err => {
          this.error = true;
          this.loading = false;
          console.error(err);
        }
      });
  }
}
