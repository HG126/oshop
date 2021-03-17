import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'app/shared/Models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'app/shared/Models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {
  appUser : AppUser;
  cart$ : Observable<ShoppingCart>;

  constructor(public auth : AuthService,private shoppingCartService : ShoppingCartService) {
    
   }
   async ngOnInit()
   {
    this.auth.appUser$.subscribe(appUser=>this.appUser = appUser);
    this.cart$ = await (await this.shoppingCartService.getCart());
   }
  logout()
  {
    this.auth.logout();
  }
}
