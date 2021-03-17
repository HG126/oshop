import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private shoppingCartService :ShoppingCartService,  private db : AngularFireDatabase) { }

  async placeOrder(order)
  {
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  getOrders() { 
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string){
    return this.db.list('/orders', ref=> ref.orderByChild('userId').equalTo(userId)
    ).valueChanges();
  }
}
