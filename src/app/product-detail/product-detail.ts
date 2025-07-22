import { Component, OnInit } from '@angular/core'; //元件生命週期
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; //ActivatedRoute：取得當前路由的參數
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})

export class ProductDetailComponent implements OnInit { //實作 OnInit 介面
  product: any = null; //儲存 API 回傳的特定商品資料
  quantity = 1;
  maxStock = 1;
  userPoints = 1000;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void { //初始化操作，自動執行此函式
    const productId = this.route.snapshot.paramMap.get('id');//從目前的路由快照中，抓出網址中的 id 參數
    this.http.get<any>('https://function-1-6gjnjd5fqa-as.a.run.app/product')
      .subscribe(res => {
        this.product = res.data.find((p: any) => p.productId.toString() === productId);
        this.maxStock = this.product?.stock || 1; //如果product存在，就回傳product.stock，否則回傳1
      });
  }

  changeQty(delta: number) { //變化量：+1 & -1
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
