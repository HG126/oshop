import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'app/shared/Models/order';
import { ShoppingCart } from 'app/shared/Models/shopping-cart';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping;
  userId : string;
  userSubscription : Subscription;

  @Input('cart') cart : ShoppingCart;

  constructor(private router : Router,
    private authService : AuthService,
    private orderService : OrderService) {
      this.shipping = { };
     }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user=>this.userId = user.uid) 
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();

  }

  async placeOrder() {
    let order= new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
   }

}
