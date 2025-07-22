import { Component, OnInit } from '@angular/core'; //元件生命週期
import { CommonModule } from '@angular/common'; //引入 *ngIf、*ngFor
import { HttpClient} from '@angular/common/http'; //引入 GET / POST
import { RouterModule } from '@angular/router'; //引入 [routerLink]

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit { //實作 OnInit
  products: any[] = [];
  loading = true;
  error = false;

  constructor(private http: HttpClient) {}//相依注入

  ngOnInit(): void { //初始化時呼叫 
    this.http.get<any>('https://function-1-6gjnjd5fqa-as.a.run.app/product')
      .subscribe({ //監聽API回傳結果
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

//any    任意型別，取消型別檢查
//unknow 任意型別，保留型別檢查
//void   函式沒有回傳值

//GET：向指定的資源要求資料，類似於查詢操作
//POST：將要處理的資料提交給指定的資源，類似於更新操作。