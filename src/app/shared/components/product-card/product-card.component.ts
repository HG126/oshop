import { ShoppingCart } from 'app/shared/Models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'app/shared/Models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  
})
export class ProductCardComponent{
  @Input('product') product : Product;
  @Input('show-actions') showActions : boolean;
  @Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private shoppingCartService : ShoppingCartService) {}
  addToCart()
  {
    this.shoppingCartService.addToCart(this.product);
  }
}
