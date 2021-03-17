import { Product } from 'app/shared/Models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from 'app/shared/Models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((x: any) => {
          let key = x.key;
          let items = key ? x.payload.val().items : {};
          return new ShoppingCart(key, items);
        })
      );
  }

  addToCart(product: Product) {
    this.updateCart(product, 1);
  }

  removeCart(product: Product) {
    this.updateCart(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    //this function used in product-card.component.ts
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(
      '/shopping-carts/' + cartId + '/items/' + productId + '/'
    );
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateCart(product: Product, change: number) {
    let cartId = await this.getOrCreateCart();
    let items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
          if (!item) {
            items$.set({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: 1
            });
          } else {
            // @ts-ignore
            const quantity = item.quantity + change;
            if (quantity === 0) { items$.remove(); } else { items$.update({ quantity }); }
          }
    });
  }
}
