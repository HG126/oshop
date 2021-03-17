import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/shared/Models/product';
import { ShoppingCart } from 'app/shared/Models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product : Product;
  @Input('show-actions') showActions : true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService : ShoppingCartService) {

   }

  addToCart()
  {
    this.shoppingCartService.addToCart(this.product);
  }
  removeCart()
  {
    this.shoppingCartService.removeCart(this.product);
  }   
  
}
