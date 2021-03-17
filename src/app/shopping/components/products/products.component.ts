import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'app/shared/Models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products : Product[]=[];
  filteredProducts : Product[] = [];
  category : string;
  cart : any;
  subscription : Subscription;

  constructor(route : ActivatedRoute, productService : ProductService, private shoppingCartService : ShoppingCartService)
   {
     productService.getAll().switchMap(products => {
       this.products = products;
       return route.queryParamMap;
     }) //Using switchMap for removing the nested oservable

       .subscribe(params=>{
        this.category = params.get('category');
         this.filteredProducts = (this.category) ?
         this.products.filter(p=> p.category.toLowerCase() === this.category.toLowerCase()) : //toLowerCase(when you face small & capital letter prolem then you can use) relsove the display problem error
         this.products;
      });
    
    }

    async ngOnInit()
    {
      this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart =>{ this.cart=cart});
    }
    ngOnDestroy()
    {
      this.subscription.unsubscribe();
    }
}
