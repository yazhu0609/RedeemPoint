import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  quantity = 1;
  maxStock = 1;
  userPoints = 1000;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.http.get<any>('https://function-1-6gjnjd5fqa-as.a.run.app/product')
      .subscribe(res => {
        this.product = res.data.find((p: any) => p.productId === productId);
        this.maxStock = this.product?.stock || 1;
      });
  }

  changeQty(delta: number) {
    const next = this.quantity + delta;
    if (next >= 1 && next <= this.maxStock) {
      this.quantity = next;
    }
  }

  redeem() {
  const totalPoints = this.product.points * this.quantity;
  if (totalPoints > this.userPoints) {
    alert(`點數不足！你目前有 ${this.userPoints} 點，但需要 ${totalPoints} 點`);
    return;
  }
  alert(`成功兌換 ${this.quantity} 個商品。`);
}
}
